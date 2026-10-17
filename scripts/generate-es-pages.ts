import fs from "node:fs";
import path from "node:path";

const sourceJsonPath = "/Users/blainebressman/Documents/GitHub/gigasend-app/src/data/programmatic-landing-pages.json";
const rawAll = JSON.parse(fs.readFileSync(sourceJsonPath, "utf8")) as any[];

const STATIC_ES_SLUGS = new Set([
  "enviar-videos-sin-perder-calidad",
  "enviar-archivos-mas-de-2gb",
  "espana",
  "mexico",
  "colombia",
  "argentina",
]);

const rawSpanish = rawAll.filter(
  (p: any) =>
    p.lang === "es" ||
    p.category?.includes("Spanish") ||
    p.category?.includes("Problemas") ||
    p.category?.includes("Competidores") ||
    p.category?.includes("Fotografía") ||
    p.category?.includes("Capacidades")
);

// The 23 D1 Spanish slugs from sync-longtail-expansion.py that were missing in programmatic-landing-pages.json
const MISSING_D1_SPANISH_SEEDS = [
  {
    slug: "enviar-archivos-10gb",
    category: "Tamaños de Archivo",
    h1: "Enviar Archivos de Más de 10 GB por Internet Gratis",
    targetKeyword: "enviar archivos de mas de 10gb por internet",
    pillBadge: "Hasta 25 GB Gratis • Red Anycast",
  },
  {
    slug: "enviar-archivos-20gb",
    category: "Tamaños de Archivo",
    h1: "Enviar Archivos de 20 GB Gratis y Sin Suscripción",
    targetKeyword: "enviar archivo de 20gb gratis",
    pillBadge: "20 GB Gratis • 1 Clic Descarga",
  },
  {
    slug: "enviar-archivos-50gb",
    category: "Tamaños de Archivo",
    h1: "Cómo Mandar Archivos de 50 GB Online Rápido",
    targetKeyword: "como mandar archivos de 50gb",
    pillBadge: "Paquete 50 GB ($10) • Sin Cuotas",
  },
  {
    slug: "enviar-archivos-100gb",
    category: "Tamaños de Archivo",
    h1: "Enviar Archivos de 100 GB Online Sin Límites",
    targetKeyword: "enviar archivo de 100gb online",
    pillBadge: "Paquete 100 GB ($20) • 12 Meses",
  },
  {
    slug: "enviar-video-largo-correo",
    category: "Problemas de Envío",
    h1: "Cómo Enviar un Video Largo por Correo (Gmail y Outlook)",
    targetKeyword: "como enviar un video largo por correo",
    pillBadge: "Supera el Límite de 25 MB",
  },
  {
    slug: "alternativas-a-wetransfer",
    category: "Alternativas a Competidores",
    h1: "La Mejor Alternativa a WeTransfer Gratis (Hasta 25 GB)",
    targetKeyword: "alternativas a wetransfer gratis",
    pillBadge: "25 GB Gratis vs 2 GB WeTransfer",
  },
  {
    slug: "programas-como-wetransfer",
    category: "Alternativas a Competidores",
    h1: "Programas Como WeTransfer Sin Límite de Tamaño",
    targetKeyword: "programas como wetransfer sin limite",
    pillBadge: "Sin Suscripción Mensual de $23",
  },
  {
    slug: "superar-limite-2gb-wetransfer",
    category: "Problemas de Envío",
    h1: "Cómo Superar el Límite de 2 GB de WeTransfer Gratis",
    targetKeyword: "wetransfer limite 2gb solucion",
    pillBadge: "Solución Directa Hasta 500 GB+",
  },
  {
    slug: "enviar-archivos-sin-registro",
    category: "Privacidad y Fricción",
    h1: "Transferir Archivos Grandes Sin Registro para el Cliente",
    targetKeyword: "transferir archivos grandes sin registro",
    pillBadge: "1 Clic Descarga • Sin Cuenta",
  },
  {
    slug: "enviar-fotos-raw-clientes",
    category: "Formatos y Códecs",
    h1: "Cómo Mandar Fotos RAW a Clientes Sin Comprimir",
    targetKeyword: "como mandar fotos raw sin comprimir",
    pillBadge: "CR3 • ARW • NEF • DNG Intactos",
  },
  {
    slug: "enviar-carpetas-pesadas",
    category: "Productividad",
    h1: "Enviar Carpetas Pesadas por Internet Sin Comprimir ZIP",
    targetKeyword: "enviar carpetas pesadas por internet",
    pillBadge: "Estructura de Carpetas Intacta",
  },
  {
    slug: "transferir-proyectos-premiere-pro",
    category: "Software y Proyectos",
    h1: "Transferir Proyectos de Adobe Premiere Pro (.PRPROJ)",
    targetKeyword: "transferir proyectos de premiere pro",
    pillBadge: "Premiere Pro • Proxies & Brutos",
  },
  {
    slug: "transferir-proyectos-davinci-resolve",
    category: "Software y Proyectos",
    h1: "Enviar Proyectos DaVinci Resolve (.DRP / .DRA) Completos",
    targetKeyword: "enviar proyectos davinci resolve completos",
    pillBadge: "DaVinci Resolve • Color & BRAW",
  },
  {
    slug: "transferencia-archivos-empresas",
    category: "Industrias y Equipos",
    h1: "Transferencia de Archivos Grandes para Empresas (B2B)",
    targetKeyword: "transferencia de archivos grandes para empresas",
    pillBadge: "TLS 1.3 + AES-256 • Sin Licencias",
  },
  {
    slug: "enviar-archivos-clientes-sin-cuenta",
    category: "Industrias y Equipos",
    h1: "Enviar Archivos Pesados a Clientes Sin Crear Cuenta",
    targetKeyword: "enviar archivos pesados a clientes sin cuenta",
    pillBadge: "Entrega Ejecutiva 1 Clic",
  },
  {
    slug: "transferir-archivos-cad-bim",
    category: "Software y Proyectos",
    h1: "Transferir Archivos AutoCAD (.DWG) y Modelos Revit BIM",
    targetKeyword: "transferir archivos cad y revit bim",
    pillBadge: "Ingeniería BIM • RVT • NWD • IFC",
  },
  {
    slug: "swisstransfer-alternativa",
    category: "Alternativas a Competidores",
    h1: "Alternativa Rápida a SwissTransfer en España y Latinoamérica",
    targetKeyword: "swisstransfer alternativa rapida",
    pillBadge: "Nodos Locales MAD • MEX • BOG • EZE",
  },
  {
    slug: "smash-alternativa",
    category: "Alternativas a Competidores",
    h1: "Alternativa a Smash Sin Cola de Espera Prioritaria",
    targetKeyword: "smash alternativa sin cola de espera",
    pillBadge: "Velocidad Máxima Garantizada",
  },
  {
    slug: "enviar-video-mp4-5gb",
    category: "Formatos y Códecs",
    h1: "Cómo Enviar un Video MP4 de Más de 5 GB Gratis",
    targetKeyword: "enviar video mp4 de mas de 5gb",
    pillBadge: "Hasta 25 GB Gratis • Sin Compresión",
  },
  {
    slug: "enviar-archivos-prores",
    category: "Formatos y Códecs",
    h1: "Enviar Archivos Apple ProRes 4K/8K Sin Comprimir",
    targetKeyword: "enviar archivos prores 4k sin comprimir",
    pillBadge: "ProRes 422 HQ & 4444 XQ • SHA-256",
  },
  {
    slug: "transferir-archivo-zip-10gb",
    category: "Formatos y Códecs",
    h1: "Transferir Carpeta Comprimida ZIP de Más de 10 GB",
    targetKeyword: "transferir carpeta comprimida zip de mas de 10gb",
    pillBadge: "Sin Corrupción de Bloques ZIP",
  },
  {
    slug: "enviar-archivos-whatsapp-sin-perder-calidad",
    category: "Compresión en Mensajería",
    h1: "Cómo Mandar un Archivo o Video Pesado por WhatsApp Sin Perder Calidad",
    targetKeyword: "como mandar un archivo pesado por whatsapp sin perder calidad",
    pillBadge: "Enlace Directo 4K/RAW en WhatsApp",
  },
  {
    slug: "transferencia-archivos-pago-por-uso",
    category: "Alternativas a Competidores",
    h1: "Compartir Archivos Gigantes en la Nube Sin Pagar Suscripción",
    targetKeyword: "compartir archivos gigantes en la nube sin pagar suscripcion",
    pillBadge: "Prepago 12 Meses ($20/100GB)",
  },
];

const existingSlugSet = new Set(rawSpanish.map((p: any) => p.slug));
for (const seed of MISSING_D1_SPANISH_SEEDS) {
  if (!existingSlugSet.has(seed.slug) && !STATIC_ES_SLUGS.has(seed.slug)) {
    rawSpanish.push({
      slug: seed.slug,
      lang: "es",
      category: seed.category,
      h1: seed.h1,
      metaTitle: `${seed.h1} | Gigasend`,
      metaDescription: `Solución para ${seed.targetKeyword}: envía hasta 25 GB gratis o 500 GB+ sin suscripción mensual. Descarga en 1 clic sin registro y nodos Anycast locales.`,
      pillBadge: seed.pillBadge,
      targetKeyword: seed.targetKeyword,
      directAnswer: `Para resolver "${seed.targetKeyword}", arrastra tus archivos o carpetas directamente a Gigasend. Transfiere hasta 25 GB gratis o paquetes prepagos de 100 GB ($20) y 1 TB ($180) válidos por 12 meses, con descarga inmediata en 1 clic sin obligar a tu cliente a crear cuenta.`,
    });
    existingSlugSet.add(seed.slug);
  }
}

function clampTitleEs(rawTitle: string, h1: string): string {
  const cleanBase = h1
    .replace(/\.$/, "")
    .replace(/\s+/g, " ")
    .trim();
  const suffix = " | Gigasend";
  const candidate = `${cleanBase}${suffix}`;
  if (candidate.length <= 65) return candidate;

  const shortBase = cleanBase
    .replace(/^Cómo /i, "")
    .replace(/ por Internet Gratis$/i, " Gratis")
    .replace(/ Rápido y Sin Suscripción$/i, "")
    .replace(/ Sin Suscripción Mensual$/i, "")
    .replace(/ Sin Perder Calidad$/i, " Sin Compresión")
    .replace(/ Sin Comprimir$/i, "");

  if (`${shortBase}${suffix}`.length <= 65) {
    return `${shortBase}${suffix}`;
  }
  const maxBase = 65 - suffix.length;
  const truncated = shortBase.slice(0, maxBase).replace(/\s+\S*$/, "").trim();
  return `${truncated}${suffix}`;
}

function clampMetaDescEs(rawDesc: string, h1: string, kw: string): string {
  const clean = (rawDesc || "").replace(/\s+/g, " ").trim();
  if (clean.length >= 115 && clean.length <= 158) {
    return clean;
  }
  const candidate = `${h1.replace(/\.$/, "")}: envía hasta 25 GB gratis o 500 GB+ sin suscripción mensual. Descarga en 1 clic sin cuenta en España y LatAm.`;
  if (candidate.length <= 158) return candidate;
  const fallback = `Transfiere con ${kw}: hasta 25 GB gratis o paquetes de 12 meses ($20/100GB). Descarga directa sin registro en nodos Anycast.`;
  if (fallback.length <= 158) return fallback;
  return fallback.slice(0, 155).replace(/\s+\S*$/, "") + "...";
}

function resolveEnAndPtEquivalents(slug: string, category: string): { enEquivalent: string; ptEquivalent: string } {
  const s = slug.toLowerCase();
  if (s.includes("wetransfer") && s.includes("2gb")) {
    return { enEquivalent: "/wetransfer-2gb-limit-bypass", ptEquivalent: "/pt/wetransfer-limite-20gb" };
  }
  if (s.includes("wetransfer") || s.includes("swisstransfer") || s.includes("smash")) {
    return { enEquivalent: "/wetransfer-alternative", ptEquivalent: "/pt/alternativa-wetransfer" };
  }
  if (s.includes("google-drive") || s.includes("drive")) {
    return { enEquivalent: "/google-drive-download-quota-exceeded-fix", ptEquivalent: "/pt/erro-cota-download-excedida-google-drive" };
  }
  if (s.includes("dropbox") || s.includes("onedrive")) {
    return { enEquivalent: "/dropbox-transfer-alternative", ptEquivalent: "/pt/alternativa-dropbox-transfer" };
  }
  if (s.includes("10gb") || s.includes("8gb") || s.includes("12gb")) {
    return { enEquivalent: "/send-10gb-file-free", ptEquivalent: "/pt/enviar-arquivo-10gb-gratis" };
  }
  if (s.includes("15gb")) {
    return { enEquivalent: "/send-15gb-file", ptEquivalent: "/pt/enviar-arquivo-15gb-gratis" };
  }
  if (s.includes("20gb")) {
    return { enEquivalent: "/deliver-20gb-file", ptEquivalent: "/pt/como-enviar-arquivo-maior-que-20gb" };
  }
  if (s.includes("25gb")) {
    return { enEquivalent: "/send-25gb-file", ptEquivalent: "/pt/enviar-arquivo-25gb-30gb" };
  }
  if (s.includes("30gb") || s.includes("40gb")) {
    return { enEquivalent: "/send-30gb-file", ptEquivalent: "/pt/enviar-arquivo-30gb-online" };
  }
  if (s.includes("50gb") || s.includes("60gb") || s.includes("70gb") || s.includes("75gb") || s.includes("80gb") || s.includes("90gb")) {
    return { enEquivalent: "/send-50gb-file", ptEquivalent: "/pt/enviar-arquivo-50gb-online" };
  }
  if (s.includes("100gb") || s.includes("150gb") || s.includes("200gb") || s.includes("250gb") || s.includes("300gb")) {
    return { enEquivalent: "/send-100gb-file", ptEquivalent: "/pt/enviar-arquivo-100gb" };
  }
  if (s.includes("500gb")) {
    return { enEquivalent: "/send-500gb-file", ptEquivalent: "/pt/transferir-500gb-1tb-online" };
  }
  if (s.includes("1tb") || s.includes("2tb")) {
    return { enEquivalent: "/send-1tb-file", ptEquivalent: "/pt/transferir-1tb-online-brasil" };
  }
  if (s.includes("2gb") || s.includes("3gb") || s.includes("4gb") || s.includes("5gb")) {
    return { enEquivalent: "/send-5gb-file-free", ptEquivalent: "/pt/enviar-arquivo-5gb-gratis" };
  }
  if (s.includes("braw") || s.includes("blackmagic")) {
    return { enEquivalent: "/send-braw-video-files", ptEquivalent: "/pt/enviar-arquivos-braw-davinci-resolve" };
  }
  if (s.includes("r3d") || s.includes("red-raw")) {
    return { enEquivalent: "/transfer-r3d-raw-footage", ptEquivalent: "/pt/transferir-brutos-red-r3d-arri-sony-canon" };
  }
  if (s.includes("arri")) {
    return { enEquivalent: "/deliver-arri-raw-footage", ptEquivalent: "/pt/transferir-brutos-red-r3d-arri-sony-canon" };
  }
  if (s.includes("mxf") || s.includes("dcp")) {
    return { enEquivalent: "/send-mxf-broadcast-video", ptEquivalent: "/pt/enviar-pacote-dcp-cinema-mxf-broadcast" };
  }
  if (s.includes("premiere")) {
    return { enEquivalent: "/transfer-premiere-pro-project", ptEquivalent: "/pt/enviar-projeto-premiere-final-cut-after-effects" };
  }
  if (s.includes("final-cut") || s.includes("fcp")) {
    return { enEquivalent: "/share-final-cut-pro-fcpbundle", ptEquivalent: "/pt/enviar-projeto-premiere-final-cut-after-effects" };
  }
  if (s.includes("davinci") || s.includes("prores")) {
    return { enEquivalent: "/transfer-davinci-resolve-project", ptEquivalent: "/pt/enviar-prores-raw" };
  }
  if (s.includes("revit") || s.includes("bim") || s.includes("autocad") || s.includes("cad") || s.includes("dwg")) {
    return { enEquivalent: "/send-revit-rvt-bim-models", ptEquivalent: "/pt/enviar-projeto-revit-bim-navisworks-autocad" };
  }
  if (s.includes("blender")) {
    return { enEquivalent: "/how-to-send-blender-blend-files", ptEquivalent: "/pt/transferir-projetos-blender-cinema4d-unreal-vfx" };
  }
  if (s.includes("cinema-4d") || s.includes("c4d")) {
    return { enEquivalent: "/transfer-cinema-4d-c4d-files", ptEquivalent: "/pt/transferir-projetos-blender-cinema4d-unreal-vfx" };
  }
  if (s.includes("houdini")) {
    return { enEquivalent: "/send-houdini-hip-projects", ptEquivalent: "/pt/enviar-arquivos-vfx-nuke-houdini-maya-render" };
  }
  if (s.includes("maya") || s.includes("3ds")) {
    return { enEquivalent: "/how-to-send-maya-mb-files", ptEquivalent: "/pt/enviar-arquivos-3ds-max-sketchup-lumion-arquitetura" };
  }
  if (s.includes("unreal")) {
    return { enEquivalent: "/how-to-transfer-unreal-engine-project", ptEquivalent: "/pt/transferir-projetos-blender-cinema4d-unreal-vfx" };
  }
  if (s.includes("pro-tools") || s.includes("ptx")) {
    return { enEquivalent: "/deliver-protools-ptx-files", ptEquivalent: "/pt/enviar-stems-audio-pro-tools-logic-ableton" };
  }
  if (s.includes("logic-pro")) {
    return { enEquivalent: "/transfer-logic-pro-x-sessions", ptEquivalent: "/pt/enviar-stems-audio-pro-tools-logic-ableton" };
  }
  if (s.includes("ableton") || s.includes("stems") || s.includes("wav")) {
    return { enEquivalent: "/share-multitrack-audio-stems", ptEquivalent: "/pt/enviar-stems-audio-pro-tools-logic-ableton" };
  }
  if (s.includes("correo") || s.includes("gmail") || s.includes("outlook") || s.includes("whatsapp")) {
    return { enEquivalent: "/send-large-files-by-email", ptEquivalent: "/pt/enviar-arquivos-grandes-por-email-gmail-outlook" };
  }
  if (s.includes("video") || s.includes("4k") || s.includes("mp4") || s.includes("mov")) {
    return { enEquivalent: "/send-large-video-files", ptEquivalent: "/pt/transferir-videos-4k" };
  }
  if (s.includes("sin-registro") || s.includes("sin-cuenta") || s.includes("clientes")) {
    return { enEquivalent: "/best-way-to-share-large-files-with-clients", ptEquivalent: "/pt/enviar-arquivos-para-clientes-sem-cadastro" };
  }
  if (category.includes("Tamaños")) {
    return { enEquivalent: "/send-large-files-free", ptEquivalent: "/pt/enviar-arquivos-pesados" };
  }
  return { enEquivalent: "/transfer-large-files-online", ptEquivalent: "/pt/transferir-arquivos-grandes" };
}

const assignedCanonicalEn = new Set<string>();

const processedEsPages = rawSpanish
  .filter((p: any) => !STATIC_ES_SLUGS.has(p.slug))
  .map((p: any, idx: number) => {
    const kw = (p.targetKeyword || p.h1 || p.slug.replace(/-/g, " ")).toLowerCase();
    const h1Clean = (p.h1 || kw).replace(/\.$/, "").trim();
    const title = clampTitleEs(p.metaTitle || h1Clean, h1Clean);
    const metaDescription = clampMetaDescEs(p.metaDescription || "", h1Clean, kw);
    const { enEquivalent, ptEquivalent } = resolveEnAndPtEquivalents(p.slug, p.category || "");

    const isCanonicalEnPair = !assignedCanonicalEn.has(enEquivalent);
    if (isCanonicalEnPair) {
      assignedCanonicalEn.add(enEquivalent);
    }

    const regionContexts = [
      "Madrid/Barcelona (ESpanix/CATNIX), Ciudad de México (MEX) y Bogotá (NAP Colombia)",
      "Ciudad de México, Guadalajara y Monterrey (Telmex/Totalplay/Izzi) y Madrid (Movistar/MasOrange)",
      "Buenos Aires y Córdoba (CABASE), Santiago de Chile (PIT Chile) y Bogotá/Medellín",
      "Madrid, Barcelona, Valencia, CDMX, Bogotá, Lima y Buenos Aires",
      "redes de fibra óptica de España, México, Colombia, Argentina, Chile y Perú",
    ];
    const regCtx = regionContexts[idx % regionContexts.length];

    const trapTitleVariants = [
      `Por qué fallan las nubes tradicionales al ${kw}`,
      `El cuello de botella de WeTransfer y Drive en "${kw}"`,
      `Riesgos de compresión y cortes de subida en ${h1Clean}`,
      `Por qué las suscripciones mensuales frenan tu flujo de ${kw}`,
    ];

    const solutionTitleVariants = [
      `Arquitectura Perimetral Gigasend para ${h1Clean}`,
      `Entrega Directa en 1 Clic (Sin Cuenta) para ${h1Clean}`,
      `Transmisión Multiparte SHA-256 en ${regCtx}`,
      `El Estándar Profesional Sin Cuotas Fijas para ${h1Clean}`,
    ];

    const legacyTrapPoints = [
      `Límites artificiales de 2 GB en planes gratuitos que bloquean "${kw}" y exigen suscripciones de $23 USD/mes.`,
      `Servidores lejanos con alta latencia que provocan errores de subida al 99% en ${regCtx}.`,
      `Fricción para tu destinatario: obligan a tu cliente a iniciar sesión, pedir permisos o saturar su propia cuota de almacenamiento.`,
    ];

    const gigasendSolutionPoints = [
      `Envía hasta 25 GB completamente gratis o activa paquetes prepagos ($10/50GB, $20/100GB, $180/1TB) con 12 meses de vigencia.`,
      `Aceleración perimetral HTTP/3 en ${regCtx} con reanudación automática ante microcortes.`,
      `Descarga ejecutiva en 1 clic sin registro obligatorio y con verificación criptográfica SHA-256 bit a bit.`,
    ];

    const faqs = [
      {
        question: (p.faqs?.[0]?.question) || `¿Cómo funciona ${kw} sin perder calidad ni pagar mensualidades?`,
        answer:
          (p.faqs?.[0]?.answer) ||
          `Arrastra tu archivo o carpeta directamente a Gigasend. El sistema divide la carga en bloques paralelos hacia el nodo Anycast más cercano en ${regCtx}, permitiendo enviar hasta 25 GB gratis o hasta 500 GB+ con paquetes prepagos de 12 meses.`,
      },
      {
        question: (p.faqs?.[1]?.question) || `¿Mi cliente necesita crear una cuenta o instalar algo para descargar?`,
        answer:
          (p.faqs?.[1]?.answer) ||
          `No. Tu destinatario recibe un enlace HTTPS directo, hace clic y la descarga comienza de inmediato a velocidad máxima de fibra sin pedir correo, contraseña ni registro.`,
      },
      {
        question: `¿Qué pasa si se corta el internet durante la subida en ${regCtx.split(",")[0]}?`,
        answer: `El motor multiparte de Gigasend guarda cada bloque verificado con SHA-256 en la frontera de Cloudflare. Si tu conexión Wi-Fi, fibra o Starlink sufre un microcorte, la transferencia retoma desde el último bloque sin reiniciar desde cero.`,
      },
    ];

    const specs = p.specs && p.specs.length === 4
      ? p.specs
      : [
          { label: "Plan Gratuito", value: "Hasta 25 GB" },
          { label: "Capacidad Máxima", value: "500 GB+ / 2 TB" },
          { label: "Integridad", value: "SHA-256 Bit a Bit" },
          { label: "Vigencia Prepago", value: "12 Meses" },
        ];

    return {
      slug: p.slug,
      category: p.category || "Guías en Español",
      h1: h1Clean,
      metaTitle: title,
      metaDescription,
      pillBadge: p.pillBadge || "Hasta 25 GB Gratis • Red Anycast",
      targetKeyword: kw,
      directAnswer:
        p.directAnswer ||
        `Para ${kw} de forma rápida y segura, arrastra tus archivos al navegador con Gigasend. Transfiere hasta 25 GB gratis (o hasta 500 GB+ con paquetes prepagos válidos por 12 meses) a través de nodos locales en ${regCtx}, sin comprimir y sin exigir cuenta a tu cliente.`,
      legacyTrapTitle: trapTitleVariants[idx % trapTitleVariants.length],
      legacyTrapPoints,
      gigasendSolutionTitle: solutionTitleVariants[idx % solutionTitleVariants.length],
      gigasendSolutionPoints,
      specs,
      faqs,
      enEquivalent,
      ptEquivalent,
      isCanonicalEnPair,
    };
  });

let maxTitle = 0;
let maxDesc = 0;
for (const page of processedEsPages) {
  if (page.metaTitle.length > maxTitle) maxTitle = page.metaTitle.length;
  if (page.metaDescription.length > maxDesc) maxDesc = page.metaDescription.length;
}

console.log(`Processed ${processedEsPages.length} dynamic Spanish pages.`);
console.log(`Max metaTitle length: ${maxTitle} chars (limit <= 65)`);
console.log(`Max metaDescription length: ${maxDesc} chars (limit <= 158)`);

const outContent = `export type EsSeoLandingPage = {
  slug: string;
  category: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  pillBadge: string;
  targetKeyword: string;
  directAnswer: string;
  legacyTrapTitle: string;
  legacyTrapPoints: string[];
  gigasendSolutionTitle: string;
  gigasendSolutionPoints: string[];
  specs: Array<{ label: string; value: string }>;
  faqs: Array<{ question: string; answer: string }>;
  enEquivalent: string;
  ptEquivalent: string;
  isCanonicalEnPair: boolean;
};

export const ES_STATIC_PATHS = [
  "es",
  "es/espana",
  "es/mexico",
  "es/colombia",
  "es/argentina",
  "es/enviar-archivos-mas-de-2gb",
  "es/enviar-videos-sin-perder-calidad",
];

export const esSeoLandingPages: EsSeoLandingPage[] = ${JSON.stringify(processedEsPages, null, 2)};

export const esSeoLandingPageMap = new Map<string, EsSeoLandingPage>(
  esSeoLandingPages.map((p) => [p.slug, p])
);
`;

const outPath = path.resolve(process.cwd(), "src/data/esSeoLandingPages.ts");
fs.writeFileSync(outPath, outContent, "utf8");
console.log(`Wrote ${processedEsPages.length} Spanish pages to ${outPath} (${(outContent.length / 1024).toFixed(1)} KB)`);
