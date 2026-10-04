import type { APIRoute } from "astro";
import { brand } from "@/lib/brand";

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
    `Sitemap: ${origin}/sitemap.xml`,
  ].join("\n");

  return new Response(`${content}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
