import type { APIRoute } from "astro";
import { esSeoLandingPages, ES_STATIC_PATHS } from "../data/esSeoLandingPages";
import { brand } from "@/lib/brand";

export const prerender = true;

const today = new Date().toISOString().split("T")[0];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");

  const esPaths = [
    ...ES_STATIC_PATHS.map((path, idx) => ({
      path,
      priority: idx === 0 ? "1.0" : "0.95",
    })),
    ...esSeoLandingPages.map((p) => ({
      path: `es/${p.slug}`,
      priority: "0.90",
    })),
  ];

  const urls = esPaths
    .map(
      ({ path, priority }) =>
        `  <url>\n    <loc>${origin}/${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "x-robots-tag": "all",
    },
  });
};
