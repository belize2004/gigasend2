import { defineMiddleware } from "astro:middleware";

const EXACT_REDIRECTS: Record<string, string> = {
  "/blog": "/guides",
  "/blog/": "/guides",
  "/blog/the-true-cost-of-file-transfers-calculator": "/guides/large-file-transfer-cost-calculator",
  "/blog/the-true-cost-of-file-transfers-calculator/": "/guides/large-file-transfer-cost-calculator",
  "/blog/why-browser-multipart-uploads-beat-desktop-apps": "/guides/transfer-large-files-without-failed-uploads",
  "/blog/why-browser-multipart-uploads-beat-desktop-apps/": "/guides/transfer-large-files-without-failed-uploads",
  "/blog/direct-to-edge-vs-cloud-relays": "/guides/why-large-file-transfers-are-slow",
  "/blog/direct-to-edge-vs-cloud-relays/": "/guides/why-large-file-transfers-are-slow",
  "/blog/how-to-send-large-video-files-without-compression": "/send-large-video-files",
  "/blog/how-to-send-large-video-files-without-compression/": "/send-large-video-files",
  "/blog/how-to-deliver-client-photo-galleries-in-raw": "/send-large-files-free",
  "/blog/how-to-deliver-client-photo-galleries-in-raw/": "/send-large-files-free",
  "/compare/file-transfer-vs-dropbox": "/dropbox-transfer-alternative",
  "/compare/file-transfer-vs-dropbox/": "/dropbox-transfer-alternative",
  "/compare/file-transfer-vs-google-drive": "/google-drive-download-quota-exceeded-fix",
  "/compare/file-transfer-vs-google-drive/": "/google-drive-download-quota-exceeded-fix",
  "/compare/file-transfer-vs-frame-io": "/guides/file-transfer-vs-cloud-storage-vs-media-review",
  "/compare/file-transfer-vs-frame-io/": "/guides/file-transfer-vs-cloud-storage-vs-media-review",
  "/best-way-to-send-large-files": "/best-way-to-share-large-files-with-clients",
  "/best-way-to-send-large-files/": "/best-way-to-share-large-files-with-clients",
};

export const onRequest = defineMiddleware(async (context, next) => {
  const rawPath = context.url.pathname;
  const normalizedPath = rawPath === "/" ? "/" : rawPath.replace(/\/$/, "");

  // 1. Exact match check
  const exactTarget = EXACT_REDIRECTS[rawPath] || EXACT_REDIRECTS[normalizedPath];
  if (exactTarget) {
    return context.redirect(exactTarget, 301);
  }

  // 2. Fallback for any other legacy /blog/* paths
  if (normalizedPath.startsWith("/blog/")) {
    return context.redirect("/guides", 301);
  }

  // 3. Fallback for any unknown /compare/* paths
  if (normalizedPath.startsWith("/compare/") && normalizedPath !== "/compare") {
    return context.redirect("/compare", 301);
  }

  return next();
});
