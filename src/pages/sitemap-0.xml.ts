import type { APIRoute } from "astro";
import { seoLandingPages } from "../data/seoLandingPages";
import { brand } from "@/lib/brand";

export const prerender = true;

const staticPaths = [
  "",
  "transfer",
  "plans",
  "blogs",
  "signin",
  "signup",
  ...seoLandingPages.map((page) => page.slug),
  ...seoLandingPages.map((page) => `send/${page.slug}`),
];

const today = new Date().toISOString().split("T")[0];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");
  const urls = staticPaths
    .map((path) => {
      const loc = path ? `${origin}/${path}` : `${origin}/`;
      const priority = path === "" ? "1.0" : "0.8";
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
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
