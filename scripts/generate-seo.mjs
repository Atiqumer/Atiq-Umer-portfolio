import siteConfig from "../site.config.json" with { type: "json" };
import { writeFile } from "node:fs/promises";

const siteUrl = new URL(process.env.VITE_SITE_URL ?? siteConfig.productionSiteUrl).origin;

await writeFile(
  new URL("../public/robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);

await writeFile(
  new URL("../public/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n  <url><loc>${siteUrl}/projects</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>\n`,
);
