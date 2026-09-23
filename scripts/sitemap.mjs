/**
 * Writes dist/sitemap.xml and dist/robots.txt after a build.
 *
 * Runs as part of `npm run build` so the sitemap cannot go stale relative to
 * the routes. lastmod is taken from the build time, which is accurate enough
 * for a site whose pages change when it is redeployed.
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { ROUTES, SITE_URL } from "./routes.mjs";

const OUT = "dist";
if (!existsSync(OUT)) {
  console.error("dist/ does not exist — run the build first.");
  process.exit(1);
}

const lastmod = new Date().toISOString().slice(0, 10);

const urls = ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join("\n");

writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);

// Written here rather than kept in public/ so the Sitemap line can never point
// at a domain the routes module has moved away from.
writeFileSync(
  `${OUT}/robots.txt`,
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

console.log(`sitemap.xml written with ${ROUTES.length} routes, robots.txt updated`);
