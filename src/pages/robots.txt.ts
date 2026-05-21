import type { APIRoute } from "astro";
import { brand } from "@/lib/brand";

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? brand.siteUrl;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
