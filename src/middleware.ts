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

const BRAZIL_TOP_BANNER_HTML = `<div id="br-geo-banner" class="bg-gradient-to-r from-emerald-950 via-ocean-900 to-amber-950/90 border-b border-gold-500/30 text-slate-100 px-4 py-2.5 text-xs sm:text-sm font-medium text-center relative z-[60]"><span>🇧🇷 Olá! Deseja ver esta página em Português? </span><a href="/pt" onclick="document.cookie='gigasend_lang=pt; path=/; max-age=31536000; SameSite=Lax';" class="ml-1.5 font-bold text-gold-400 underline hover:text-gold-300 transition-colors">Mudar para Português</a></div>`;

const SPANISH_COUNTRIES = new Set([
  "ES", "MX", "CO", "AR", "CL", "PE", "EC", "UY", "CR", "PA", "DO", "GT", "PY", "BO", "SV", "HN", "NI", "PR",
]);

const SPANISH_TOP_BANNER_HTML = `<div id="es-geo-banner" class="bg-gradient-to-r from-amber-950 via-ocean-900 to-rose-950/90 border-b border-gold-500/30 text-slate-100 px-4 py-2.5 text-xs sm:text-sm font-medium text-center relative z-[60]"><span>🇪🇸🇲🇽 ¡Hola! ¿Prefieres ver GigaSend en Español? </span><a href="/es" onclick="document.cookie='gigasend_lang=es; path=/; max-age=31536000; SameSite=Lax';" class="ml-1.5 font-bold text-gold-400 underline hover:text-gold-300 transition-colors">Cambiar a Español</a></div>`;

export const onRequest = defineMiddleware(async (context, next) => {
  const rawPath = context.url.pathname;
  const normalizedPath = rawPath === "/" ? "/" : rawPath.replace(/\/$/, "");

  // 1. Exact match redirect check
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

  // 4. Inspect Cloudflare's incoming request.cf?.country & language preference cookie (SSR routes only)
  let country = "";
  let langCookie: string | undefined;
  let showBrazilBanner = false;
  let showSpanishBanner = false;

  if (!context.isPrerendered) {
    const cfCountry =
      (context.request as any)?.cf?.country ||
      (context.locals as any)?.runtime?.cf?.country ||
      context.request.headers.get("cf-ipcountry") ||
      "";
    country = String(cfCountry).toUpperCase();

    const langParam = context.url.searchParams.get("lang");
    const isPtRoute = normalizedPath === "/pt" || normalizedPath.startsWith("/pt/");
    const isEsRoute = normalizedPath === "/es" || normalizedPath.startsWith("/es/");
    langCookie = context.cookies.get("gigasend_lang")?.value;

    if (langParam === "pt" || isPtRoute) {
      langCookie = "pt";
      context.cookies.set("gigasend_lang", "pt", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    } else if (langParam === "es" || isEsRoute) {
      langCookie = "es";
      context.cookies.set("gigasend_lang", "es", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    } else if (langParam === "en") {
      langCookie = "en";
      context.cookies.set("gigasend_lang", "en", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    showBrazilBanner =
      normalizedPath === "/" && (country === "BR" || langCookie === "pt");
    showSpanishBanner =
      normalizedPath === "/" && !showBrazilBanner && (SPANISH_COUNTRIES.has(country) || langCookie === "es");
  }

  (context.locals as any).country = country;
  (context.locals as any).gigasendLang = langCookie;
  (context.locals as any).showBrazilBanner = showBrazilBanner;
  (context.locals as any).showSpanishBanner = showSpanishBanner;

  // 5. Server-Side Execution & Brazil / Spanish Geo-Banner Injection on `/`
  try {
    const response = await next();

    if (
      (showBrazilBanner || showSpanishBanner) &&
      response.headers.get("content-type")?.includes("text/html")
    ) {
      const html = await response.text();
      const bannerHtml = showBrazilBanner ? BRAZIL_TOP_BANNER_HTML : SPANISH_TOP_BANNER_HTML;
      const bannerId = showBrazilBanner ? 'id="br-geo-banner"' : 'id="es-geo-banner"';
      if (!html.includes(bannerId)) {
        const injectedHtml = html.replace(
          /<body([^>]*)>/i,
          `<body$1>${bannerHtml}`
        );
        const headers = new Headers(response.headers);
        return new Response(injectedHtml, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }
      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    return response;
  } catch (error: any) {
    const cfRay = context.request.headers.get("cf-ray") || "local";
    const clientIp = context.request.headers.get("cf-connecting-ip") || "unknown";

    console.error("[SERVER_MIDDLEWARE_FAILURE]", JSON.stringify({
      pathname: rawPath,
      method: context.request.method,
      error: error?.message || String(error),
      stack: error?.stack || "",
      cfRay,
      clientIp,
      timestamp: new Date().toISOString(),
    }));

    if (rawPath.startsWith("/api/")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Internal server error occurred.",
          rayId: cfRay,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    throw error;
  }
});
