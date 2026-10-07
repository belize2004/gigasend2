import type { APIRoute } from "astro";
import { seoLandingPages } from "../data/seoLandingPages";
import { brand } from "@/lib/brand";

export const prerender = true;

const bypassSlugs = [
  "wetransfer-2gb-limit-bypass",
  "wetransfer-alternative",
  "google-drive-download-quota-exceeded-fix",
  "dropbox-file-size-limit-bypass",
  "email-attachment-too-large-alternative",
  "dropbox-transfer-alternative",
  "send-files-larger-than-2gb",
];

const guideSlugs = [
  "why-large-file-transfers-are-slow",
  "large-file-transfer-cost-calculator",
  "transfer-large-files-without-failed-uploads",
  "file-transfer-vs-cloud-storage-vs-media-review",
  "send-large-files-without-filling-computer",
];

const staticPaths = [
  "",
  "transfer",
  "plans",
  "directory",
  "guides",
  "tools/transfer-speed-calculator",
  "blogs",
  "signin",
  "signup",
  ...guideSlugs.map((slug) => `guides/${slug}`),
  ...seoLandingPages.map((page) => page.slug),
  ...seoLandingPages.map((page) => `send/${page.slug}`),
  ...bypassSlugs.map((slug) => `bypass/${slug}`),
];

const today = new Date().toISOString().split("T")[0];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin ?? brand.siteUrl).replace(/\/$/, "");
  const urls = staticPaths
    .map((path) => {
      const loc = path ? `${origin}/${path}` : `${origin}/`;
      const priority =
        path === ""
          ? "1.0"
          : path === "directory" || path === "transfer" || path === "tools/transfer-speed-calculator"
            ? "0.9"
            : "0.8";
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
