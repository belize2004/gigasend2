import type { APIRoute } from "astro";
import { seoLandingPages } from "../data/seoLandingPages";
import { brand } from "@/lib/brand";

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

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");
  const urls = staticPaths
    .map((path) => {
      const loc = path ? `${origin}/${path}` : `${origin}/`;
      return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${path === "" ? "1.0" : "0.8"}</priority></url>`;
    })
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
};
