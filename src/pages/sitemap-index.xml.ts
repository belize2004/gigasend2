import type { APIRoute } from "astro";
import { brand } from "@/lib/brand";

export const prerender = true;

const today = new Date().toISOString().split("T")[0];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap-0.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${origin}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "x-robots-tag": "all",
    },
  });
};
