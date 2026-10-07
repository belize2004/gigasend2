import type { APIRoute } from "astro";

export const prerender = true;

export const INDEXNOW_KEY = "c7849e47265a468d8ff1786e680a6f43";

export const GET: APIRoute = async () => {
  return new Response(`${INDEXNOW_KEY}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400, s-maxage=604800",
    },
  });
};
