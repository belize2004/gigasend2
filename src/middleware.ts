import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // 1. Enforce canonical apex domain: redirect www.gigasend.us -> gigasend.us
  if (url.hostname === "www.gigasend.us") {
    url.hostname = "gigasend.us";
    return Response.redirect(url.toString(), 301);
  }

  // 2. Trailing slash normalization: 301 redirect /path/ -> /path (excluding root /)
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    return Response.redirect(url.toString(), 301);
  }

  return next();
});
