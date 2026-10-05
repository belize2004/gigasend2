import type { APIRoute } from "astro";
import { brand } from "@/lib/brand";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");
  const content = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /dashboard",
    "Disallow: /dashboard/",
    "Disallow: /admin",
    "Disallow: /admin/",
    "Disallow: /api/",
    "",
    `Sitemap: ${origin}/sitemap-index.xml`,
    `Sitemap: ${origin}/sitemap.xml`,
    `Sitemap: ${origin}/sitemap-0.xml`,
  ].join("\n");

  return new Response(`${content}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
};
