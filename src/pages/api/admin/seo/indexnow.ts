import type { APIRoute } from "astro";
import { getDb } from "@/lib/d1";
import { json } from "@/src/lib/api";
import { getAuthenticatedAdmin } from "@/src/lib/admin";
import { seoLandingPages } from "@/src/data/seoLandingPages";
import { ptSeoLandingPages } from "@/src/data/ptSeoLandingPages";
import { esSeoLandingPages, ES_STATIC_PATHS } from "@/src/data/esSeoLandingPages";
import { PT_ENGINEERING_GUIDES } from "@/src/data/ptGuides";
import { brand } from "@/lib/brand";
import { INDEXNOW_KEY } from "@/src/pages/c7849e47265a468d8ff1786e680a6f43.txt";

export const POST: APIRoute = async ({ cookies, locals }) => {
  const db = getDb(locals);

  const isDev = import.meta.env.DEV;
  if (!isDev) {
    const { response } = await getAuthenticatedAdmin(cookies, db, locals);
    if (response) return response;
  }

  try {
    const origin = brand.siteUrl.replace(/\/$/, "");

    // Compile all canonical endpoints across EN, PT-BR, and ES
    const coreHubs = [
      "",
      "transfer",
      "plans",
      "pricing",
      "compare",
      "directory",
      "pt",
      "pt/planos",
      "pt/comparar",
      "pt/calculadora-tempo-upload",
      "pt/guias",
      ...ES_STATIC_PATHS,
    ];

    const guidePages = [
      "guides",
      "guides/why-large-file-transfers-are-slow",
      "guides/file-transfer-vs-cloud-storage-vs-media-review",
      "guides/large-file-transfer-cost-calculator",
      "guides/transfer-large-files-without-failed-uploads",
      "guides/send-large-files-without-filling-computer",
      ...PT_ENGINEERING_GUIDES.map((g) => `pt/guias/${g.slug}`),
    ];

    const toolPages = [
      "tools/transfer-speed-calculator",
    ];

    const pseoPages = [
      ...seoLandingPages.map((page) => page.slug),
      ...ptSeoLandingPages.map((page) => `pt/${page.slug}`),
      ...esSeoLandingPages.map((page) => `es/${page.slug}`),
    ];

    const allCanonicalPaths = [
      ...coreHubs,
      ...guidePages,
      ...toolPages,
      ...pseoPages,
    ];

    const urlList = Array.from(
      new Set(allCanonicalPaths.map((p) => (p ? `${origin}/${p}` : `${origin}/`)))
    );

    // Submit to IndexNow API (Bing, Yandex, Naver, Seznam)
    const indexNowPayload = {
      host: "gigasend.us",
      key: INDEXNOW_KEY,
      keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    let indexNowStatus = 200;
    let indexNowMessage = "Submitted";
    try {
      const indexNowRes = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(indexNowPayload),
      });
      indexNowStatus = indexNowRes.status;
      indexNowMessage = indexNowRes.ok ? "Success" : `HTTP ${indexNowRes.status}`;
    } catch (e) {
      indexNowStatus = 502;
      indexNowMessage = e instanceof Error ? e.message : "IndexNow fetch failed";
    }

    return json({
      success: true,
      data: {
        urlCount: urlList.length,
        indexNowStatus,
        indexNowMessage,
        sitemapUrl: `${origin}/sitemap-index.xml`,
        keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
      },
      message: `Broadcasting complete: ${urlList.length} canonical URLs (EN, PT-BR, ES) submitted to IndexNow.`,
    });
  } catch (error) {
    console.error("IndexNow broadcast error:", error);
    return json(
      {
        success: false,
        message: "Failed to broadcast URLs to search engines",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};
