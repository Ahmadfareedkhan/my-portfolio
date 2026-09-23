/**
 * Renders every route to static HTML after a build.
 *
 *   node scripts/prerender.mjs        (runs as part of `npm run build`)
 *
 * Why this exists: a client-rendered SPA serves `<div id="root"></div>` to any
 * crawler that does not execute JavaScript. Every per-page title, description
 * and JSON-LD block the app sets at runtime is invisible to them. Prerendering
 * puts that markup in the response body instead.
 *
 * How it works: serve the build, drive a real Chrome over the DevTools
 * Protocol, wait for each route to finish rendering, and write the resulting
 * DOM to dist/<route>/index.html. Static hosts serve those files directly and
 * the SPA fallback only handles genuinely unknown URLs.
 *
 * The app still boots normally on top of the static markup, so client routing,
 * the theme toggle and the contact form behave as before.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { platform } from "node:process";
import { paths } from "./routes.mjs";

const PORT = 4178;
const CDP_PORT = 9377;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = "dist";

if (typeof WebSocket === "undefined") {
  console.error("Prerendering needs Node 22+ (built-in WebSocket client).");
  process.exit(1);
}
if (!existsSync(join(OUT, "index.html"))) {
  console.error("dist/index.html missing — run the build first.");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CHROME = {
  win32: [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  ],
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
  ],
  linux: ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"]
};

const chromePath = (CHROME[platform] ?? CHROME.linux).find(existsSync);
if (!chromePath) {
  console.error(`No Chrome/Edge found for platform "${platform}".`);
  process.exit(1);
}

async function waitFor(url, attempts = 40) {
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

const preview = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "preview", "--port", String(PORT), "--strictPort"],
  { stdio: "ignore" }
);
const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${process.cwd()}/.audit/prerender-chrome`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu"
  ],
  { stdio: "ignore" }
);

const cleanup = () => {
  try { chrome.kill(); } catch {}
  try { preview.kill(); } catch {}
};
process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(130); });

if (!(await waitFor(BASE)) || !(await waitFor(`http://127.0.0.1:${CDP_PORT}/json/version`))) {
  console.error("Preview server or Chrome failed to start.");
  cleanup();
  process.exit(1);
}

const version = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`)).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = () => rej(new Error("CDP connect failed"));
});

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const msg = { id: ++id, method, params };
    if (sessionId) msg.sessionId = sessionId;
    pending.set(msg.id, { resolve, reject });
    ws.send(JSON.stringify(msg));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);

const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
};

/** Resolve once the app has actually rendered, rather than after a fixed wait. */
const READY = `(async () => {
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    const root = document.getElementById('root');
    const rendered = root && root.children.length > 0;
    const titled = document.title && document.title.trim().length > 0;
    const described = document.querySelector('meta[name=description]');
    if (rendered && titled && described) return true;
    await new Promise(r => setTimeout(r, 100));
  }
  return false;
})()`;

/**
 * Strip the theme class before serialising. Baking in whichever theme the
 * prerenderer happened to use would give every visitor with the opposite
 * preference a flash of the wrong colours; the inline script in index.html
 * re-applies the right one before paint.
 */
const SERIALISE = `(() => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.style.removeProperty('color-scheme');
  return '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
})()`;

const routes = paths();
let failed = 0;

for (const route of routes) {
  await send("Page.navigate", { url: BASE + route }, sessionId);
  const ready = await evaluate(READY);
  if (!ready) {
    console.error(`  ${route}: did not finish rendering — left as SPA fallback`);
    failed++;
    continue;
  }
  // Let any post-render head updates settle before serialising.
  await sleep(350);

  const html = await evaluate(SERIALISE);
  const file = route === "/" ? join(OUT, "index.html") : join(OUT, route, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);

  const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`  ${route.padEnd(34)} ${kb} kB`);
}

ws.close();
cleanup();

if (failed) {
  console.error(`\nPrerender FAILED for ${failed} route(s).`);
  process.exit(1);
}
console.log(`\nPrerendered ${routes.length} routes to static HTML.`);
process.exit(0);
