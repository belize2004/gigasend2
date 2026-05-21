import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  if (url.hostname === "gigasend.us") {
    url.hostname = "www.gigasend.us";
    return Response.redirect(url.toString(), 301);
  }

  return next();
});
