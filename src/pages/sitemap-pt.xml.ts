import type { APIRoute } from "astro";
import { ptSeoLandingPages } from "../data/ptSeoLandingPages";
import { PT_ENGINEERING_GUIDES } from "../data/ptGuides";
import { brand } from "@/lib/brand";

export const prerender = true;

const today = new Date().toISOString().split("T")[0];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");

  const ptPaths = [
    { path: "pt", priority: "1.0" },
    { path: "pt/planos", priority: "0.95" },
    { path: "pt/comparar", priority: "0.95" },
    { path: "pt/calculadora-tempo-upload", priority: "0.95" },
    { path: "pt/guias", priority: "0.90" },
    ...PT_ENGINEERING_GUIDES.map((g) => ({
      path: `pt/guias/${g.slug}`,
      priority: "0.90",
    })),
    ...ptSeoLandingPages.map((p) => ({
      path: `pt/${p.slug}`,
      priority: "0.90",
    })),
  ];

  const urls = ptPaths
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
