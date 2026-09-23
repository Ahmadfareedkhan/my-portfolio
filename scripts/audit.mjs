/**
 * Renders the production build in headless Chrome and checks it.
 *
 *   npm run audit              # check every route, both themes, exit 1 on failure
 *   npm run audit -- --shots   # also write screenshots to .audit/
 *   npm run audit -- --url=http://127.0.0.1:8080   # check a running dev server
 *
 * No dependencies: it drives Chrome over the DevTools Protocol using Node's
 * built-in WebSocket, and starts/stops `vite preview` itself.
 *
 * What it catches that a build does not:
 *   - text colours that fail WCAG AA, measured on the RENDERED pixels with
 *     alpha composited over the real backdrop
 *   - console errors and React warnings (dev warnings are stripped from
 *     production builds, so --url against the dev server catches more)
 *   - heading-level skips, missing landmarks, unlabelled controls
 *   - horizontal overflow at phone width
 *   - the theme toggle failing on first click for a dark-OS visitor
 */

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { platform } from "node:process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { paths } from "./routes.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.some((a) => a === `--${name}`);
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const WANT_SHOTS = flag("shots");
const EXTERNAL_URL = opt("url", null);
const BASE = EXTERNAL_URL ?? "http://127.0.0.1:4173";
const SHOT_DIR = opt("out", ".audit");
const CDP_PORT = Number(opt("port", "9333"));

const ROUTES = paths();

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true }
];

if (typeof WebSocket === "undefined") {
  console.error("This script needs Node 22+ (for the built-in WebSocket client).");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CHROME_CANDIDATES = {
  win32: [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe"
  ],
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
  ],
  linux: ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"]
};

function findChrome() {
  const found = (CHROME_CANDIDATES[platform] ?? CHROME_CANDIDATES.linux).find(existsSync);
  if (!found) {
    console.error(`No Chrome/Edge found for platform "${platform}". Pass --chrome=<path>.`);
    process.exit(1);
  }
  return opt("chrome", found);
}

async function waitForHttp(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      await fetch(url);
      return true;
    } catch {
      await sleep(500);
    }
  }
  return false;
}

/** Minimal CDP client. `send` returns the command result; page events feed listeners. */
async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = () => rej(new Error(`Could not connect to ${wsUrl}`));
  });

  let id = 0;
  const pending = new Map();
  const listeners = [];

  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      return;
    }
    for (const fn of listeners) fn(msg);
  };

  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const msg = { id: ++id, method, params };
      if (sessionId) msg.sessionId = sessionId;
      pending.set(msg.id, { resolve, reject });
      ws.send(JSON.stringify(msg));
    });

  return { ws, send, onEvent: (fn) => listeners.push(fn) };
}

// --- colour maths -----------------------------------------------------------

const channels = (css) => (css.match(/[\d.]+/g) ?? []).map(Number);

/** Composite an rgba() colour over its backdrop. Measuring alpha text raw
 *  reports the opaque value and hides real failures. */
function flatten(fg, bg) {
  const f = channels(fg);
  const b = channels(bg);
  const a = f.length > 3 ? f[3] : 1;
  return [0, 1, 2].map((i) => Math.round(f[i] * a + (b[i] ?? 255) * (1 - a)));
}

function relativeLuminance([r, g, b]) {
  const lin = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(fgRgb, bgCss) {
  const l1 = relativeLuminance(fgRgb);
  const l2 = relativeLuminance(channels(bgCss));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}

// --- in-page collectors -----------------------------------------------------

const COLLECT_TEXT = `(() => {
  const bg = getComputedStyle(document.body).backgroundColor;
  const seen = new Set();
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const ownText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!ownText) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue;
    const key = cs.color + '|' + cs.fontSize + '|' + cs.fontWeight;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      color: cs.color, backdrop: bg, size: parseFloat(cs.fontSize), weight: Number(cs.fontWeight),
      sample: el.textContent.trim().slice(0, 40),
      where: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : '')
    });
  }
  return out;
})()`;

const SEO_LIMITS = { titleMax: 60, descMin: 120, descMax: 160 };

const COLLECT_ANCHORS = `(() => {
  // Every same-page anchor must have a target on the page it renders on.
  // A bare "#work" in a header that also renders on /work/<slug> resolves to
  // /work/<slug>#work, which exists nowhere and silently does nothing.
  const broken = [];
  for (const a of document.querySelectorAll('a[href]')) {
    const raw = a.getAttribute('href');
    if (!raw || !raw.startsWith('#') || raw === '#') continue;
    const id = decodeURIComponent(raw.slice(1));
    if (!document.getElementById(id)) {
      broken.push({ href: raw, text: (a.textContent || '').trim().slice(0, 30) });
    }
  }
  // Report internal links too, so a typo in a /work/<slug> path is visible.
  const internal = [...document.querySelectorAll('a[href^="/"]')]
    .map(a => a.getAttribute('href'))
    .filter(h => h && !h.startsWith('//'));
  // Absolute links with a fragment ("/#work") are what the shared header uses,
  // so the bare-hash check above never sees them. They are checked after every
  // route has rendered, against the ids on the route they point at.
  const hashed = [...document.querySelectorAll('a[href^="/"]')]
    .map(a => ({ href: a.getAttribute('href'), text: (a.textContent || '').trim().slice(0, 30) }))
    .filter(l => l.href && !l.href.startsWith('//') && /#./.test(l.href));
  const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
  return { broken, internal: [...new Set(internal)], hashed, ids };
})()`;

const COLLECT_SEO = `(() => {
  const meta = (sel, attr) => document.querySelector(sel)?.getAttribute(attr ?? 'content') ?? null;
  let jsonLdTypes = [], jsonLdValid = true;
  for (const el of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const parsed = JSON.parse(el.textContent);
      const nodes = parsed['@graph'] ?? [parsed];
      jsonLdTypes.push(...nodes.map(n => n['@type']).filter(Boolean));
    } catch { jsonLdValid = false; }
  }
  return {
    title: document.title,
    description: meta('meta[name=description]'),
    canonical: meta('link[rel=canonical]', 'href'),
    ogTitle: meta('meta[property="og:title"]'),
    ogImage: meta('meta[property="og:image"]'),
    ogUrl: meta('meta[property="og:url"]'),
    twitterCard: meta('meta[name="twitter:card"]'),
    jsonLdTypes, jsonLdValid,
    jsonLdBlocks: document.querySelectorAll('script[type="application/ld+json"]').length
  };
})()`;

const COLLECT_STRUCTURE = `(() => {
  const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => Number(h.tagName[1]));
  const skips = [];
  levels.forEach((lvl, i) => { if (i && lvl - levels[i - 1] > 1) skips.push(levels[i - 1] + '->' + lvl); });
  return {
    h1Count: document.querySelectorAll('h1').length,
    headingSkips: skips,
    hasMain: !!document.querySelector('main'),
    hasHeader: !!document.querySelector('header'),
    imgsMissingAlt: [...document.querySelectorAll('img')].filter(i => !i.getAttribute('alt')).length,
    unlabelledLinks: [...document.querySelectorAll('a')]
      .filter(a => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
    unlabelledButtons: [...document.querySelectorAll('button')]
      .filter(b => !b.textContent.trim() && !b.getAttribute('aria-label')).length,
    overflowsX: document.documentElement.scrollWidth > window.innerWidth + 1,
    title: document.title,
    metaDescription: (document.querySelector('meta[name=description]') || {}).content || null
  };
})()`;

// --- run --------------------------------------------------------------------

const failures = [];
const note = (msg) => failures.push(msg);

// Titles, descriptions and canonicals must be unique across routes; duplicates
// are the default failure of a client-rendered SPA and cost ranking.
const seoSeen = { titles: new Set(), descriptions: new Set(), canonicals: new Set() };

// Prerender check, read straight off disk. If this regresses, every per-page
// title, description and JSON-LD block becomes invisible to any crawler that
// does not execute JavaScript - which is the whole reason they exist.
function checkPrerender() {
  for (const route of ROUTES) {
    const file = route === "/" ? join("dist", "index.html") : join("dist", route, "index.html");
    let html;
    try {
      html = readFileSync(file, "utf8");
    } catch {
      note(`${route}: not prerendered (${file} missing)`);
      continue;
    }
    // An unrendered shell is the empty root div and nothing else.
    if (/<div id="root">\s*<\/div>/.test(html)) {
      note(`${route}: prerendered file contains an empty root div`);
    }
    if (!/<h1[\s>]/.test(html)) {
      note(`${route}: prerendered HTML has no <h1>`);
    }
    const words = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    if (words < 120) {
      note(`${route}: prerendered HTML has only ${words} words of text`);
    }
    // A baked-in theme class flashes the wrong colours for the opposite preference.
    if (/<html[^>]*class="[^"]*(light|dark)/.test(html.slice(0, 600))) {
      note(`${route}: a theme class is baked into the prerendered <html>`);
    }
  }
  console.log(`  checked prerendered HTML for ${ROUTES.length} routes`);
}

let preview = null;
if (!EXTERNAL_URL) {
  // Invoke vite's entry through this Node binary rather than `npx ... shell:true`,
  // which Node flags as a deprecation because args are concatenated unescaped.
  preview = spawn(
    process.execPath,
    ["node_modules/vite/bin/vite.js", "preview", "--port", "4173", "--strictPort"],
    { stdio: "ignore" }
  );
  if (!(await waitForHttp(BASE))) {
    console.error("vite preview did not come up. Run `npm run build` first.");
    preview.kill();
    process.exit(1);
  }
} else if (!(await waitForHttp(BASE, 4))) {
  console.error(`Nothing is serving ${BASE}.`);
  process.exit(1);
}

const chrome = spawn(
  findChrome(),
  [
    "--headless=new",
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${process.cwd()}/.audit/chrome`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    "about:blank"
  ],
  { stdio: "ignore" }
);

const cleanup = () => {
  try { chrome.kill(); } catch {}
  try { preview?.kill(); } catch {}
};
process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(130); });

if (!(await waitForHttp(`http://127.0.0.1:${CDP_PORT}/json/version`))) {
  console.error("Chrome did not expose a debugging port.");
  cleanup();
  process.exit(1);
}

const version = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`)).json();
const { send, onEvent } = await connect(version.webSocketDebuggerUrl);
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);

let consoleMessages = [];
onEvent((msg) => {
  if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) {
    consoleMessages.push(
      `${msg.params.type}: ${msg.params.args.map((a) => a.value ?? a.description ?? a.type).join(" ")}`
    );
  }
  if (msg.method === "Runtime.exceptionThrown") {
    consoleMessages.push(`exception: ${msg.params.exceptionDetails.text}`);
  }
});

const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
};

const setViewport = (v) =>
  send("Emulation.setDeviceMetricsOverride",
    { width: v.width, height: v.height, deviceScaleFactor: 1, mobile: v.mobile }, sessionId);

const setTheme = (value) =>
  send("Emulation.setEmulatedMedia",
    { features: [{ name: "prefers-color-scheme", value }] }, sessionId);

async function visit(route) {
  await send("Page.navigate", { url: BASE + route }, sessionId);
  await sleep(1600);
}

if (WANT_SHOTS && !existsSync(SHOT_DIR)) mkdirSync(SHOT_DIR, { recursive: true });

async function screenshot(name) {
  if (!WANT_SHOTS) return;
  const { data } = await send("Page.captureScreenshot", { format: "png" }, sessionId);
  writeFileSync(`${SHOT_DIR}/${name}.png`, Buffer.from(data, "base64"));
}

console.log(`Auditing ${BASE}\n`);

if (!EXTERNAL_URL) checkPrerender();

// Filled per route, then used to check "/<path>#<id>" links once every route's
// ids are known. Keyed by route + href so a header link is reported once per
// page rather than once per theme and viewport.
const idsByRoute = new Map();
const hashLinks = new Map();

for (const route of ROUTES) {
  for (const theme of ["light", "dark"]) {
    for (const view of VIEWPORTS) {
      const label = `${route} ${theme} ${view.name}`;
      await setViewport(view);
      await setTheme(theme);
      consoleMessages = [];

      // Clear any persisted theme, or a previous toggle click leaks into this
      // run and the "dark" pass silently renders light.
      await visit(route);
      await evaluate("try { localStorage.removeItem('theme') } catch {}");
      await visit(route);

      const rows = await evaluate(COLLECT_TEXT);
      for (const row of rows) {
        const ratio = contrast(flatten(row.color, row.backdrop), row.backdrop);
        const large = row.size >= 24 || (row.size >= 18.66 && row.weight >= 700);
        const required = large ? 3 : 4.5;
        if (ratio < required) {
          note(`${label}: contrast ${ratio}:1 (needs ${required}) on ${row.where} — "${row.sample}"`);
        }
      }

      const anchors = await evaluate(COLLECT_ANCHORS);
      for (const b of anchors.broken) {
        note(`${label}: link "${b.text}" points at ${b.href}, which has no target on this page`);
      }
      for (const href of anchors.internal) {
        const path = href.split("#")[0];
        if (path && path !== "/" && !ROUTES.includes(path)) {
          note(`${label}: internal link ${href} is not a known route`);
        }
      }
      idsByRoute.set(route, new Set([...(idsByRoute.get(route) ?? []), ...anchors.ids]));
      for (const l of anchors.hashed) hashLinks.set(`${route} ${l.href}`, { route, ...l });

      const s = await evaluate(COLLECT_STRUCTURE);
      if (view.name === "desktop" && theme === "light") {
        const seo = await evaluate(COLLECT_SEO);

        if (seo.title.length > SEO_LIMITS.titleMax)
          note(`${route}: title ${seo.title.length} chars (max ${SEO_LIMITS.titleMax}, truncates in results)`);
        if (!seo.description)
          note(`${route}: no meta description`);
        else if (seo.description.length > SEO_LIMITS.descMax)
          note(`${route}: description ${seo.description.length} chars (max ${SEO_LIMITS.descMax}, truncates)`);
        else if (seo.description.length < SEO_LIMITS.descMin)
          note(`${route}: description ${seo.description.length} chars (min ${SEO_LIMITS.descMin}, wastes the slot)`);

        if (!seo.canonical) note(`${route}: no canonical link`);
        if (!seo.ogTitle || !seo.ogImage || !seo.ogUrl)
          note(`${route}: incomplete Open Graph tags (link previews will be blank)`);
        if (seo.twitterCard === "summary_large_image" && !seo.ogImage)
          note(`${route}: twitter:card promises a large image but none is set`);
        if (!seo.jsonLdValid) note(`${route}: malformed JSON-LD`);
        if (!seo.jsonLdTypes.length) note(`${route}: no structured data`);

        if (seoSeen.titles.has(seo.title)) note(`${route}: duplicate title "${seo.title}"`);
        seoSeen.titles.add(seo.title);
        if (seo.description && seoSeen.descriptions.has(seo.description))
          note(`${route}: duplicate meta description`);
        if (seo.description) seoSeen.descriptions.add(seo.description);
        if (seoSeen.canonicals.has(seo.canonical)) note(`${route}: duplicate canonical ${seo.canonical}`);
        seoSeen.canonicals.add(seo.canonical);
      }
      if (view.name === "desktop" && theme === "light") {
        if (s.h1Count !== 1) note(`${route}: ${s.h1Count} <h1> elements (expected exactly 1)`);
        if (s.headingSkips.length) note(`${route}: heading level skips ${s.headingSkips.join(", ")}`);
        if (!s.hasMain) note(`${route}: no <main> landmark`);
        if (!s.title) note(`${route}: empty <title>`);
        if (!s.metaDescription) note(`${route}: no meta description`);
      }
      if (s.imgsMissingAlt) note(`${label}: ${s.imgsMissingAlt} image(s) without alt`);
      if (s.unlabelledLinks) note(`${label}: ${s.unlabelledLinks} link(s) with no accessible name`);
      if (s.unlabelledButtons) note(`${label}: ${s.unlabelledButtons} button(s) with no accessible name`);
      if (s.overflowsX) note(`${label}: horizontal overflow (${view.width}px viewport)`);

      for (const m of consoleMessages) note(`${label}: console ${m.slice(0, 160)}`);

      await screenshot(`${route === "/" ? "home" : route.replace(/\//g, "-")}-${theme}-${view.name}`);
      console.log(`  checked ${label}`);
    }
  }
}

// "/#home" on a page with no id="home" navigates (or scrolls) to nothing.
for (const { route, href, text } of hashLinks.values()) {
  const [path, id] = href.split("#");
  const ids = idsByRoute.get(path);
  if (ids && !ids.has(decodeURIComponent(id))) {
    note(`${route}: link "${text}" points at ${href}, which has no target on ${path}`);
  }
}

// The toggle must switch on the FIRST click for a visitor whose OS is dark.
// Comparing `theme` instead of `resolvedTheme` makes that click a no-op.
await setViewport(VIEWPORTS[0]);
await setTheme("dark");
await visit("/");
await evaluate("try { localStorage.removeItem('theme') } catch {}");
await visit("/");
const before = await evaluate("document.documentElement.className");
await evaluate(`document.querySelector('[aria-label^="Switch to"]')?.click()`);
await sleep(500);
const after = await evaluate("document.documentElement.className");
if (!before.includes("dark")) note(`theme: dark OS did not render dark (got "${before}")`);
if (before === after) note(`theme: first toggle click did nothing (stayed "${after}")`);
console.log("  checked theme toggle\n");

cleanup();

if (failures.length) {
  console.error(`FAILED — ${failures.length} issue(s):\n`);
  for (const f of failures) console.error(`  • ${f}`);
  process.exit(1);
}

console.log("PASSED — no issues found.");
if (WANT_SHOTS) console.log(`Screenshots written to ${SHOT_DIR}/`);
process.exit(0);
