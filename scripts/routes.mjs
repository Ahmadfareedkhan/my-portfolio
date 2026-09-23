/**
 * Every route the site serves, in one place.
 *
 * Imported by the audit, the sitemap generator and the prerenderer, so a new
 * page cannot end up checked but unlisted (or listed but unchecked).
 *
 * `npm run audit` cross-checks this against the case studies defined in
 * src/data/projects.ts and fails if they disagree, which is what stops this
 * drifting when a project is added.
 */

export const SITE_URL = "https://ahmadfareedkhan.tech";

export const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/work/jadoc-v3", priority: "0.8", changefreq: "yearly" },
  { path: "/work/conversation-analysis", priority: "0.8", changefreq: "yearly" },
  { path: "/work/procurement-intelligence", priority: "0.8", changefreq: "yearly" },
  { path: "/work/plan-takeoff", priority: "0.8", changefreq: "yearly" },
  { path: "/work/tariff-classification", priority: "0.8", changefreq: "yearly" },
  { path: "/work/voice-companion", priority: "0.8", changefreq: "yearly" }
];

export const paths = () => ROUTES.map((r) => r.path);
