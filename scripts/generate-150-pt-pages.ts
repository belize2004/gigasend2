import fs from "node:fs";
import path from "node:path";
import type { CompactPageSeed, PtClusterId } from "./pt-clusters/types";
import { C1_CAPACIDADE_PAGES } from "./pt-clusters/c1-capacidade";
import { C2_CONCORRENTES_PAGES } from "./pt-clusters/c2-concorrentes";
import { C3_DRONES_GIS_PAGES } from "./pt-clusters/c3-drones-gis";
import { C4_AUDIOVISUAL_PAGES } from "./pt-clusters/c4-audiovisual";
import { C5_BIM_3D_B2B_PAGES } from "./pt-clusters/c5-bim-3d-b2b";
import { C6_WHATSAPP_ISP_PAGES } from "./pt-clusters/c6-whatsapp-isp-regioes";

const CLUSTER_LABELS: Record<PtClusterId, string> = {
  "capacidade-tamanho": "Capacidade & Tamanho (2GB a 2TB)",
  "concorrentes-alternativas": "Alternativas a Concorrentes & Nuvem",
  "drones-gis-topografia": "Drones (ANAC SISANT), LiDAR & GIS",
  "audiovisual-cinema-raw": "Audiovisual 4K/8K, Cinema RAW & NLEs",
  "engenharia-bim-3d-b2b": "Engenharia BIM, 3D, RAW, Áudio & DICOM",
  "whatsapp-email-operadoras": "WhatsApp, E-mail, Operadoras & Regiões BR",
};

const CLUSTER_GUIDE_LINKS: Record<PtClusterId, { href: string; label: string }> = {
  "capacidade-tamanho": {
    href: "/pt/guias/como-enviar-arquivos-pesados-sem-lotar-hd-ou-nuvem",
    label: "guia técnico: como enviar 50GB–500GB sem lotar o Google Drive ou SSD",
  },
  "concorrentes-alternativas": {
    href: "/pt/guias/calculadora-custo-transferencia-arquivos-pre-pago-vs-assinatura",
    label: "análise financeira: pacotes pré-pagos (12 meses) vs assinaturas mensais",
  },
  "drones-gis-topografia": {
    href: "/pt/guias/como-entregar-mapeamento-drone-anac-sisant-ortomosaico-lidar",
    label: "manual ANAC SISANT: como entregar ortomosaicos GeoTIFF e LiDAR",
  },
  "audiovisual-cinema-raw": {
    href: "/pt/guias/como-enviar-videos-4k-raw-whatsapp-email-sem-comprimir",
    label: "guia audiovisual: enviar vídeos 4K, ProRes e BRAW sem compressão",
  },
  "engenharia-bim-3d-b2b": {
    href: "/pt/guias/como-enviar-arquivos-pesados-sem-lotar-hd-ou-nuvem",
    label: "arquitetura de entrega B2B sem exigir login e sem lotar a nuvem",
  },
  "whatsapp-email-operadoras": {
    href: "/pt/guias/por-que-upload-de-arquivos-grandes-e-lento-ou-cai",
    label: "engenharia de redes: por que o upload cai em 99% na Claro/Vivo/Starlink",
  },
};

/**
 * Validated 200 OK canonical English routes in `src/pages/` and `src/data/seoLandingPages.ts`.
 * Never returns 404s (/solutions/*, /file-types/*, /large-file-transfer), 301s (/pricing, /compare/*),
 * or non-canonical /send/* paths.
 */
function resolveCanonicalEnRoute(seed: CompactPageSeed): string {
  const s = seed.slug;
  const raw = seed.enEquivalent.replace(/^\/send\//, "/");

  // Direct slug-specific mappings to exact 46 canonical English slugs
  const exactSlugToEn: Record<string, string> = {
    "enviar-arquivos-pesados": "/send-large-files-free",
    "transferir-arquivos-grandes": "/transfer-large-files-online",
    "enviar-arquivo-2gb-3gb-gratis": "/send-files-larger-than-2gb",
    "enviar-arquivo-4gb-gratis": "/send-5gb-file-free",
    "enviar-arquivo-5gb-gratis": "/send-5gb-file-free",
    "enviar-arquivo-8gb-gratis": "/send-10gb-file-free",
    "enviar-arquivo-10gb-gratis": "/send-10gb-file-free",
    "enviar-arquivo-12gb-gratis": "/send-15gb-file",
    "enviar-arquivo-15gb-gratis": "/send-15gb-file",
    "como-enviar-arquivo-maior-que-20gb": "/deliver-20gb-file",
    "enviar-arquivo-25gb-30gb": "/send-25gb-file",
    "enviar-arquivo-30gb-online": "/send-30gb-file",
    "enviar-arquivo-40gb-online": "/send-50gb-file",
    "enviar-arquivo-50gb-online": "/send-50gb-file",
    "enviar-arquivo-60gb-online": "/send-100gb-file",
    "enviar-arquivo-80gb-online": "/send-100gb-file",
    "enviar-arquivo-100gb": "/send-100gb-file",
    "enviar-arquivo-150gb-online": "/send-500gb-file",
    "enviar-arquivo-200gb-online": "/send-500gb-file",
    "enviar-arquivo-250gb-300gb": "/send-500gb-file",
    "transferir-500gb-1tb-online": "/send-500gb-file",
    "transferir-1tb-online-brasil": "/send-1tb-file",
    "transferir-2tb-online-brasil": "/send-2tb-file",
    "enviar-pastas-grandes-sem-compactar-zip": "/free-large-file-transfer",
    "substituir-envio-hd-externo-pendrive-correios": "/fastest-way-to-send-large-files",
    "alternativa-wetransfer": "/wetransfer-alternative",
    "wetransfer-brasil": "/wetransfer-alternative",
    "wetransfer-limite-20gb": "/wetransfer-2gb-limit-bypass",
    "alternativa-google-drive-arquivos-grandes": "/google-drive-download-quota-exceeded-fix",
    "erro-cota-download-excedida-google-drive": "/google-drive-download-quota-exceeded-fix",
    "alternativa-dropbox-transfer": "/dropbox-transfer-alternative",
    "alternativa-onedrive-icloud-arquivos-grandes": "/dropbox-file-size-limit-bypass",
    "transferencia-arquivos-sem-assinatura-mensal-pre-pago": "/plans",
    "enviar-arquivos-braw-davinci-resolve": "/send-braw-video-files",
    "transferir-brutos-red-r3d-arri-sony-canon": "/transfer-r3d-raw-footage",
    "enviar-brutos-sony-fx3-fx6-a7siii-slog3": "/deliver-arri-raw-footage",
    "enviar-projeto-premiere-final-cut-after-effects": "/transfer-premiere-pro-project",
    "enviar-pacote-dcp-cinema-mxf-broadcast": "/send-mxf-broadcast-video",
    "enviar-arquivos-avid-media-composer-mxf-dnxhd": "/share-final-cut-pro-fcpbundle",
    "enviar-arquivos-color-grading-aces-exr-dpx": "/transfer-openexr-files",
    "enviar-arquivos-vfx-nuke-houdini-maya-render": "/send-houdini-hip-projects",
    "transferir-videos-4k": "/send-large-video-files",
    "enviar-prores-raw": "/transfer-davinci-resolve-project",
    "enviar-arquivos-para-clientes-sem-cadastro": "/best-way-to-share-large-files-with-clients",
    "enviar-projeto-revit-bim-navisworks-autocad": "/send-revit-rvt-bim-models",
    "enviar-arquivos-3ds-max-sketchup-lumion-arquitetura": "/how-to-send-maya-mb-files",
    "transferir-projetos-blender-cinema4d-unreal-vfx": "/how-to-transfer-unreal-engine-project",
    "enviar-projetos-autocad-civil-3d-infraworks-dwg": "/how-to-send-blender-blend-files",
    "enviar-projetos-solidworks-inventor-catia-nx-step": "/transfer-cinema-4d-c4d-files",
    "enviar-stems-audio-pro-tools-logic-ableton": "/deliver-protools-ptx-files",
    "enviar-pacote-legendas-closed-caption-dublagem-manda-me": "/share-multitrack-audio-stems",
    "enviar-fotos-raw-alta-resolucao-clientes": "/how-to-send-ableton-live-projects",
    "enviar-exames-dicom-bancos-sql-vms-pesados": "/secure-large-file-transfer",
    "compartilhar-arquivos-pesados": "/share-large-files-with-link",
    "como-enviar-video-pesado-whatsapp-sem-perder-qualidade": "/send-large-video-files",
    "enviar-arquivos-grandes-por-email-gmail-outlook": "/send-large-files-by-email",
    "enviar-apresentacoes-powerpoint-keynote-com-videos-pesados": "/email-attachment-too-large-alternative",
    "upload-arquivos-grandes-claro-vivo-oi-fibra": "/fast-large-file-transfer",
    "enviar-arquivos-pesados-starlink-brasil": "/fastest-way-to-send-large-files",
    "enviar-arquivos-grandes-com-senha-e-expiracao-lgpd": "/secure-large-file-transfer",
    "ultrapassar-limite-2gb-4gb-telegram-discord": "/send-files-larger-than-2gb",
    "transferir-ortomosaico-tiff": "/transfer-logic-pro-x-sessions",
  };

  if (exactSlugToEn[s]) {
    return exactSlugToEn[s];
  }

  const validCanonicalEnSet = new Set([
    "/send-large-files-free",
    "/free-large-file-transfer",
    "/send-10gb-file-free",
    "/send-large-files-by-email",
    "/send-large-video-files",
    "/send-files-larger-than-2gb",
    "/transfer-large-files-online",
    "/share-large-files-with-link",
    "/secure-large-file-transfer",
    "/fast-large-file-transfer",
    "/dropbox-transfer-alternative",
    "/send-30gb-file",
    "/deliver-20gb-file",
    "/how-to-send-maya-mb-files",
    "/transfer-davinci-resolve-project",
    "/send-2tb-file",
    "/deliver-protools-ptx-files",
    "/how-to-transfer-unreal-engine-project",
    "/transfer-openexr-files",
    "/send-braw-video-files",
    "/transfer-r3d-raw-footage",
    "/deliver-arri-raw-footage",
    "/send-mxf-broadcast-video",
    "/transfer-premiere-pro-project",
    "/share-final-cut-pro-fcpbundle",
    "/how-to-send-blender-blend-files",
    "/transfer-cinema-4d-c4d-files",
    "/send-houdini-hip-projects",
    "/send-revit-rvt-bim-models",
    "/how-to-send-ableton-live-projects",
    "/transfer-logic-pro-x-sessions",
    "/share-multitrack-audio-stems",
    "/wetransfer-alternative",
    "/wetransfer-2gb-limit-bypass",
    "/google-drive-download-quota-exceeded-fix",
    "/dropbox-file-size-limit-bypass",
    "/email-attachment-too-large-alternative",
    "/send-5gb-file-free",
    "/send-15gb-file",
    "/send-25gb-file",
    "/send-50gb-file",
    "/send-100gb-file",
    "/send-500gb-file",
    "/send-1tb-file",
    "/best-way-to-share-large-files-with-clients",
    "/fastest-way-to-send-large-files",
    "/compare",
    "/plans",
  ]);

  if (validCanonicalEnSet.has(raw)) {
    return raw;
  }

  if (seed.cluster === "concorrentes-alternativas") return "/compare";
  if (seed.cluster === "audiovisual-cinema-raw") return "/send-large-video-files";
  if (seed.cluster === "drones-gis-topografia") return "/fast-large-file-transfer";
  if (seed.cluster === "engenharia-bim-3d-b2b") return "/best-way-to-share-large-files-with-clients";
  if (seed.cluster === "whatsapp-email-operadoras") return "/share-large-files-with-link";
  return "/send-large-files-free";
}

function toTitleCasePt(str: string): string {
  const minor = new Set(["de", "da", "do", "das", "dos", "e", "em", "para", "por", "com", "sem", "no", "na", "ao", "a", "o"]);
  return str
    .split(/\s+/)
    .map((w, i) => {
      if (i > 0 && minor.has(w.toLowerCase())) return w.toLowerCase();
      if (/^[0-9]+(gb|tb|mb|k|fps)$/i.test(w)) return w.toUpperCase();
      if (/^(tiff|geotiff|lidar|las|laz|braw|r3d|dcp|mxf|bim|cad|dwg|rvt|sql|dicom|raw|anac|sp|rj|mg|pr|rs|sc|df|mt|go)$/i.test(w)) {
        return w.toUpperCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

/**
 * Guarantees `<title>` is <= 65 characters while keeping primary keyword front-loaded.
 */
function buildClampedTitle(seed: CompactPageSeed): string {
  const kwTitled = toTitleCasePt(seed.kw);
  const candidates = [
    `${kwTitled} (Até 25GB Grátis • SP/RJ) | GigaSend`,
    `${kwTitled} (Até 25GB Grátis) | GigaSend`,
    `${kwTitled} (Sem Login) | GigaSend`,
    `${kwTitled} no Brasil | GigaSend`,
    `${kwTitled} | GigaSend Brasil`,
    `${kwTitled} | GigaSend`,
  ];
  for (const c of candidates) {
    if (c.length <= 65) return c;
  }
  const suffix = " | GigaSend";
  return `${kwTitled.slice(0, 65 - suffix.length).trim()}${suffix}`;
}

/**
 * Guarantees `metaDescription` is between 125 and 158 characters with zero SERP truncation.
 */
function buildClampedMetaDesc(seed: CompactPageSeed): string {
  const pill0 = seed.pills[0] ?? "50GB a 500GB+";
  const candidates = [
    ` Solução para ${seed.kw} (${pill0}): envie até 25GB grátis ou 500GB+ no Brasil. Zero cadastro para o cliente, CDN SP/RJ e pacotes ($20/100GB • $180/1TB).`.trim(),
    `Transfira com ${seed.kw} (${pill0}) no Brasil: até 25GB grátis, CDN SP/RJ, download sem login e pacotes de 12 meses ($20/100GB • $180/1TB).`,
    `${toTitleCasePt(seed.kw)}: até 25GB grátis ou pacotes de 12 meses ($20/100GB • $180/1TB). CDN em SP e RJ e download direto sem cadastro.`,
  ];
  for (const c of candidates) {
    if (c.length <= 158) return c;
  }
  return candidates[2].slice(0, 155).replace(/\s+\S*$/, "") + "...";
}

const ALL_SEEDS: CompactPageSeed[] = [
  ...C1_CAPACIDADE_PAGES,
  ...C2_CONCORRENTES_PAGES,
  ...C3_DRONES_GIS_PAGES,
  ...C4_AUDIOVISUAL_PAGES,
  ...C5_BIM_3D_B2B_PAGES,
  ...C6_WHATSAPP_ISP_PAGES,
];

if (ALL_SEEDS.length !== 150) {
  throw new Error(`Expected 150 page seeds, got ${ALL_SEEDS.length}`);
}

const assignedCanonicalEn = new Set<string>(["/plans", "/compare"]);

const fullPages = ALL_SEEDS.map((seed, idx) => {
  const canonicalEn = resolveCanonicalEnRoute(seed);
  const isCanonicalEnPair = !assignedCanonicalEn.has(canonicalEn);
  if (isCanonicalEnPair) {
    assignedCanonicalEn.add(canonicalEn);
  }

  const clusterSiblings = ALL_SEEDS.filter(
    (s) => s.cluster === seed.cluster && s.slug !== seed.slug
  );
  const startOffset = idx % Math.max(1, clusterSiblings.length - 4);
  const pickedSiblings = clusterSiblings
    .slice(startOffset, startOffset + 4)
    .map((s) => ({
      href: `/pt/${s.slug}`,
      label: s.kw,
    }));

  const crossLinks = [
    CLUSTER_GUIDE_LINKS[seed.cluster],
    { href: "/pt/planos", label: "planos pré-pagos em português ($20/100GB • $180/1TB)" },
    { href: "/pt/comparar", label: "comparativo GigaSend vs WeTransfer, Drive e MASV" },
    { href: "/pt/calculadora-tempo-upload", label: "calculadora de tempo de upload (Claro, Vivo, Starlink)" },
  ];

  const sec0 = seed.secKws[0] ?? seed.kw;
  const sec1 = seed.secKws[1] ?? seed.kw;
  const sec2 = seed.secKws[2] ?? seed.kw;
  const sec3 = seed.secKws[3] ?? seed.kw;
  const pill0 = seed.pills[0] ?? "50GB a 500GB+";
  const pill1 = seed.pills[1] ?? "Zero Cadastro";
  const variant = idx % 5;

  const section2Variants = [
    {
      heading: `Zero Cadastro para o Cliente em Fluxos de ${toTitleCasePt(seed.kw)} (${pill0})`,
      body: `Quem busca por "${sec0}" ou "${sec1}" precisa de entrega imediata sem barreiras técnicas. No GigaSend, o seu destinatário clica no link e o download de ${pill0} começa direto na velocidade máxima — sem exigir login, senha ou conta Google/Microsoft. Além de até 25GB grátis, nossos pacotes pré-pagos ($10/50GB, $20/100GB e $180/1TB) duram 12 meses inteiros sem assinatura mensal.`,
    },
    {
      heading: `Pague Pelo Que Enviar ($20/100GB • $180/1TB) Sem Assinatura Mensal Recorrente`,
      body: `Operações que envolvem "${seed.kw}" e "${sec2}" funcionam por demanda e safra de projetos. Em vez de cobrar mensalidades fixas em dólar nos meses parados, o GigaSend oferece até 25GB grátis e créditos pré-pagos válidos por 1 ano inteiro, mantendo download direto em 1 clique com Zero Cadastro para o Cliente.`,
    },
    {
      heading: `Download Direto em 1 Clique para ${pill0} (Sem Fricção de Login ou Cota)`,
      body: `Ao resolver demandas de "${sec0}" e "${sec3}", obrigar o cliente final a criar conta ou liberar permissões atrasa aprovações. Com o GigaSend Brasil, o link de entrega abre uma página corporativa limpa onde os arquivos (${pill0}, ${pill1}) são baixados imediatamente, apoiados por pacotes de 12 meses ($20 por 100GB / $180 por 1TB).`,
    },
    {
      heading: `Economia de Até 80% em Entregas de ${pill0} com Créditos de 12 Meses`,
      body: `Profissionais que pesquisam "${seed.kw}" ou "${sec1}" economizam eliminando tanto assinaturas mensais ociosas quanto o envio físico de HDs externos via Sedex. Você envia até 25GB sem custo ou aciona pacotes pré-pagos ($20/100GB e $180/1TB) onde o cliente baixa com Zero Cadastro.`,
    },
    {
      heading: `Entrega Profissional B2B para "${toTitleCasePt(sec0)}" Sem Conta Obrigatória`,
      body: `Diferente de cofres de armazenamento que travam por cota excedida, o GigaSend separa o trânsito rápido do armazenamento frio. Seus envios de ${pill0} contam com Zero Cadastro para o Cliente e pacotes pré-pagos válidos por 12 meses inteiros ($20 por 100GB / $180 por 1TB).`,
    },
  ];

  const section3Variants = [
    {
      heading: `Servidores CDN na Borda em São Paulo (GRU) e Rio (GIG) para ${pill0}`,
      body: `Aceleramos cada transferência de "${seed.kw}" e "${sec2}" através de peering direto nos pontos de troca de tráfego brasileiros (IX.br SP e RJ). Isso elimina quedas aos 99% em conexões Claro Fibra, Vivo Fibra, Oi Fibra, Brisanet e Starlink, permitindo enviar 50GB, 100GB ou 500GB em um único link com verificação SHA-256.`,
    },
    {
      heading: `Streaming Multiparte HTTP/3 Anti-Queda (Claro, Vivo, Oi & Starlink Brasil)`,
      body: `Quando você executa "${sec0}" ou "${sec3}", nosso motor divide o pacote (${pill0}) em blocos independentes na memória RAM do navegador. Se a rede oscilar ou a Starlink trocar de satélite no campo, o upload retoma do milissegundo exato nos nós de borda de São Paulo e Rio de Janeiro.`,
    },
    {
      heading: `Integridade Bit a Bit (SHA-256) e Tamanho Ilimitado (50GB a 500GB+)`,
      body: `Entregas críticas de "${seed.kw}" (${pill0}, ${pill1}) não toleram arquivos .ZIP corrompidos. A infraestrutura de borda do GigaSend em São Paulo e Rio valida cada bloco com hash criptográfico SHA-256 e satura links de 300 Mbps a 1 Gbps em SP, RJ, BH, Curitiba, Porto Alegre, Brasília, Goiânia, Recife e Manaus.`,
    },
    {
      heading: `Por Que Rotas Locais em SP e RJ Superam Nuvens nos EUA para "${toTitleCasePt(sec1)}"`,
      body: `Enviar ${pill0} para servidores na Virgínia (EUA) ou Europa sofre com latência acima de 140ms e estrangulamento TCP. No GigaSend, o tráfego de "${seed.kw}" permanece na borda brasileira (GRU/GIG) com latência abaixo de 10ms e suporte a pacotes de 50GB, 100GB e 500GB+ num único link.`,
    },
    {
      heading: `Arquitetura Resiliente para Transferir 50GB, 100GB ou 500GB Sem Timeout`,
      body: `Projetado especificamente para a realidade das redes brasileiras, o GigaSend resolve "${sec2}" e "${sec3}" combinando ingestão local em São Paulo e Rio de Janeiro, retomada automática de blocos e Zero Cadastro para o Cliente baixar.`,
    },
  ];

  const faq3Variants = [
    {
      question: `Meu cliente precisa criar conta para baixar ao usar "${seed.kw}"?`,
      answer: `Não. Temos Zero Cadastro para o Cliente: quem recebe o link de ${pill0} clica e o download começa direto na velocidade máxima, sem login ou senha.`,
    },
    {
      question: `Como funciona o download sem login para entregas de ${pill0}?`,
      answer: `Assim que o upload de "${sec0}" termina, você recebe um link direto. O destinatário abre no navegador (PC, Mac ou celular) e baixa com 1 clique sem criar conta.`,
    },
    {
      question: `Preciso liberar permissão de e-mail como no Google Drive para ${seed.kw}?`,
      answer: `Não! Diferente do Drive ou OneDrive, o link do GigaSend para ${pill0} funciona com Zero Cadastro para o Cliente e não bloqueia por cota de 24h.`,
    },
  ];

  const faq4Variants = [
    {
      question: `Qual o valor para ${seed.kw} acima dos 25GB gratuitos?`,
      answer: `Você envia até 25GB grátis. Para arquivos maiores (${pill0}), ative pacotes pré-pagos de $10 (50GB), $20 (100GB) ou $180 (1TB) válidos por 12 meses inteiros, sem assinatura mensal.`,
    },
    {
      question: `Os créditos pré-pagos ($20/100GB e $180/1TB) expiram no fim do mês?`,
      answer: `Não. Todos os pacotes pré-pagos têm validade de 12 meses inteiros, ideal para fluxos sazonais de "${sec1}" sem pagar mensalidade em meses sem projetos.`,
    },
    {
      question: `O GigaSend cobra novamente se mais de uma pessoa baixar o link de ${pill0}?`,
      answer: `Não cobramos assinatura mensal e nossos pacotes de $20/100GB e $180/1TB (válidos por 12 meses) permitem entregas limpas para sua equipe e clientes no Brasil.`,
    },
  ];

  const faq5Variants = [
    {
      question: `Por que o envio de ${pill0} não cai na Claro, Vivo Fibra ou Starlink?`,
      answer: `Porque utilizamos servidores CDN na borda em São Paulo (GRU) e Rio de Janeiro (GIG) com upload multiparte HTTP/3 e retomada automática de blocos para "${sec2}".`,
    },
    {
      question: `Como evitar erro de timeout em 99% ao executar "${sec0}"?`,
      answer: `O GigaSend fatia o arquivo (${pill0}) em blocos independentes validados por SHA-256 nos nós de São Paulo e Rio. Se a internet piscar, apenas o bloco atual é retomado.`,
    },
    {
      question: `Qual a velocidade real para "${seed.kw}" nas operadoras do Brasil?`,
      answer: `Com peering direto no IX.br (SP e RJ), o GigaSend satura conexões de 300 Mbps a 1 Gbps na Claro, Vivo, Oi Fibra, Brisanet e Starlink em todo o Brasil.`,
    },
  ];

  return {
    slug: seed.slug,
    cluster: seed.cluster,
    clusterLabel: CLUSTER_LABELS[seed.cluster],
    enEquivalent: canonicalEn,
    isCanonicalEnPair,
    searchVolumeBr: seed.vol,
    cpcUsd: seed.cpc,
    searchIntent: seed.intent,
    primaryKeyword: seed.kw,
    secondaryKeywords: seed.secKws,
    supportedFormatsOrTiers: seed.pills,
    personaCtaNote: seed.note,
    title: buildClampedTitle(seed),
    metaDescription: buildClampedMetaDesc(seed),
    h1: seed.h1,
    eyebrow: seed.eyebrow,
    intro: seed.intro,
    cta: seed.cta,
    sections: [
      {
        heading: seed.secHeading,
        body: seed.secBody,
      },
      section2Variants[variant],
      section3Variants[variant],
    ],
    comparison: [
      {
        method: seed.compName,
        bestFor: seed.compBest,
        limitation: seed.compLimit,
        gigaSendAngle: seed.compAngle,
      },
      {
        method: `Nuvem Tradicional para ${pill0}`,
        bestFor: `Arquivos internos leves fora do fluxo de ${seed.kw}`,
        limitation: `Exige login do cliente, consome sua cota de 15GB e falha ao compactar ${pill0} em ZIP`,
        gigaSendAngle: `Zero Cadastro para o Cliente baixar ${pill0} em 1 clique sem ocupar sua nuvem`,
      },
      {
        method: `GigaSend CDN Brasil (${pill0})`,
        bestFor: `Demandas profissionais de ${seed.kw} e ${sec0}`,
        limitation: "Focado em trânsito acelerado e entrega executiva (não é arquivo morto eterno)",
        gigaSendAngle: `Borda local SP/RJ anti-queda + até 25GB grátis e pacotes de 12 meses ($20/100GB • $180/1TB)`,
      },
    ],
    faqs: [
      {
        question: seed.faq1Q,
        answer: seed.faq1A,
      },
      {
        question: seed.faq2Q,
        answer: seed.faq2A,
      },
      faq3Variants[idx % 3],
      faq4Variants[idx % 3],
      faq5Variants[idx % 3],
    ],
    internalLinks: [...pickedSiblings, ...crossLinks],
    differentiation: `Especializado em "${seed.kw}" (${pill0}, ${pill1}): combina Zero Cadastro para o Cliente com servidores CDN em São Paulo (GRU) e Rio de Janeiro (GIG) anti-timeout na Claro/Vivo/Starlink, links únicos de 50GB a 500GB+ e pacotes pré-pagos ($20/100GB • $180/1TB) válidos por 12 meses.`,
  };
});

// Verify title & metaDescription length limits across all 150 pages
let maxTitle = 0;
let maxDesc = 0;
for (const p of fullPages) {
  if (p.title.length > maxTitle) maxTitle = p.title.length;
  if (p.metaDescription.length > maxDesc) maxDesc = p.metaDescription.length;
}
console.log(`Max <title> length: ${maxTitle} chars (limit <= 65)`);
console.log(`Max metaDescription length: ${maxDesc} chars (limit <= 158)`);

const fileHeader = `import type { SeoLandingPage } from "./seoLandingPages";

export type PtClusterId =
  | "capacidade-tamanho"
  | "concorrentes-alternativas"
  | "drones-gis-topografia"
  | "audiovisual-cinema-raw"
  | "engenharia-bim-3d-b2b"
  | "whatsapp-email-operadoras";

export type PtSeoLandingPage = SeoLandingPage & {
  cluster: PtClusterId;
  clusterLabel: string;
  enEquivalent: string;
  isCanonicalEnPair: boolean;
  searchVolumeBr: number;
  cpcUsd: number;
  searchIntent: "transactional" | "commercial" | "informational";
  supportedFormatsOrTiers: string[];
  personaCtaNote: string;
};

export const PT_CORE_VALUE_PROPOSITIONS = [
  {
    badge: "1 Clique • Sem Login",
    title: "Zero Cadastro para o Cliente",
    description:
      "O cliente clica no link e o download começa direto na velocidade máxima, sem exigir login ou criação de conta.",
  },
  {
    badge: "$20/100GB • $180/1TB",
    title: "Pague Pelo que Enviar (Sem Assinatura Mensal)",
    description:
      "Pacotes pré-pagos ($20 por 100GB / $180 por 1TB) com validade de 12 meses inteiros. Chega de pagar mensalidades em meses sem gravações.",
  },
  {
    badge: "CDN SP & RJ • Anti-Queda",
    title: "Velocidade na Borda (São Paulo & Rio de Janeiro)",
    description:
      "Servidores CDN locais em São Paulo e Rio de Janeiro eliminando timeouts comuns em operadoras brasileiras (Claro, Vivo, Starlink).",
  },
  {
    badge: "50GB a 500GB+ num Link",
    title: "Tamanho Ilimitado (50GB, 100GB ou 500GB+)",
    description:
      "Transfira 50GB, 100GB ou 500GB em um único link seguro com retomada automática e integridade SHA-256.",
  },
] as const;

export const PT_CLUSTER_METADATA: Array<{
  id: PtClusterId;
  icon: string;
  title: string;
  shortLabel: string;
  description: string;
  monthlyVolumeBr: number;
}> = [
  {
    id: "capacidade-tamanho",
    icon: "📦",
    title: "Capacidade & Tamanho de Arquivo (De 2GB Grátis a 500GB / 2TB)",
    shortLabel: "Capacidade 2GB–2TB",
    description:
      "25 canais diretos otimizados por faixa de tamanho: envie até 25GB grátis ou transfira pacotes pesados de 30GB, 50GB, 100GB, 200GB, 500GB, 1TB e 2TB em um único link seguro sem assinatura mensal.",
    monthlyVolumeBr: 218630,
  },
  {
    id: "concorrentes-alternativas",
    icon: "🚀",
    title: "Alternativas ao WeTransfer, Google Drive, Dropbox, MASV & FTP no Brasil",
    shortLabel: "Alternativas & Nuvem",
    description:
      "25 comparativos diretos: supere o limite de 2GB do WeTransfer, o erro de 'Cota de download excedida' do Google Drive e a cobrança por download do MASV com pacotes pré-pagos ($20/100GB • $180/1TB) válidos por 12 meses.",
    monthlyVolumeBr: 124810,
  },
  {
    id: "drones-gis-topografia",
    icon: "🚁",
    title: "Drones (ANAC SISANT), Aerofotogrametria, LiDAR, Topografia & GIS",
    shortLabel: "Drones, LiDAR & GIS",
    description:
      "25 páginas dedicadas para os 186.000+ drones comerciais na ANAC: transfira ortomosaicos GeoTIFF, nuvens LiDAR (.LAS/.LAZ), Pix4D/Metashape, QGIS/ArcGIS, SIGEF/INCRA, mineração e mapas NDVI via Starlink.",
    monthlyVolumeBr: 72720,
  },
  {
    id: "audiovisual-cinema-raw",
    icon: "🎬",
    title: "Audiovisual 4K/8K, Cinema RAW (ProRes, BRAW, R3D, Sony FX) & NLEs",
    shortLabel: "Cinema 4K/RAW & NLEs",
    description:
      "25 fluxos sem recompressão para produtoras, DITs, editores e filmmakers: envie vídeos 4K/8K, Apple ProRes, Blackmagic RAW, RED .R3D, pacotes DCP, Dolby Atmos e projetos Premiere, Final Cut e DaVinci.",
    monthlyVolumeBr: 127350,
  },
  {
    id: "engenharia-bim-3d-b2b",
    icon: "🏗️",
    title: "Engenharia BIM (Revit/Civil 3D), ArchViz 3D, Fotos RAW, SQL, VMs & DICOM",
    shortLabel: "BIM, 3D, TI & Saúde",
    description:
      "25 páginas de entregas técnicas B2B com Zero Cadastro para o Cliente: modelos BIM (.RVT/.NWD/.IFC), SolidWorks, cenas 3ds Max/Lumion/Unreal 5, fotos RAW, backups SQL/VMs, autos judiciais e exames DICOM.",
    monthlyVolumeBr: 71990,
  },
  {
    id: "whatsapp-email-operadoras",
    icon: "⚡",
    title: "Bypass WhatsApp/E-mail/Telegram, Upload Resiliente (Claro/Vivo/Starlink) & Polos BR",
    shortLabel: "WhatsApp, ISP & Regiões",
    description:
      "25 soluções para enviar vídeos 4K no WhatsApp sem perder qualidade, superar os 25MB do Gmail/Outlook, fazer upload sem cair na Claro/Vivo/Starlink e conectar SP, RJ, BH, Curitiba, POA, Brasília, Goiânia, Recife e Manaus.",
    monthlyVolumeBr: 147740,
  },
];

export const ptSeoLandingPages: PtSeoLandingPage[] = ${JSON.stringify(fullPages, null, 2)};

export const ptSeoLandingPageMap = new Map(ptSeoLandingPages.map((page) => [page.slug, page]));

export function getLanguageSwitchPaths(pathname: string): {
  enPath: string;
  esPath: string;
  ptPath: string;
  enHref: string;
  esHref: string;
  ptHref: string;
  isEs: boolean;
  isPt: boolean;
} {
  const clean = pathname === "/" ? "/" : pathname.replace(/\\/$/, "");
  const isPt = clean === "/pt" || clean.startsWith("/pt/");
  const isEs = clean === "/es" || clean.startsWith("/es/");

  const staticTriplets: Array<[string, string, string]> = [
    ["/", "/es", "/pt"],
    ["/plans", "/es/transferencia-archivos-pago-por-uso", "/pt/planos"],
    ["/pricing", "/es/transferencia-archivos-pago-por-uso", "/pt/planos"],
    ["/compare", "/es/alternativas-a-wetransfer", "/pt/comparar"],
    ["/tools/transfer-speed-calculator", "/es", "/pt/calculadora-tempo-upload"],
    ["/guides", "/es/enviar-archivos-mas-de-2gb", "/pt/guias"],
    ["/guides/why-large-file-transfers-are-slow", "/es/enviar-archivos-mas-de-2gb", "/pt/guias/por-que-upload-de-arquivos-grandes-e-lento-ou-cai"],
    ["/guides/large-file-transfer-cost-calculator", "/es/transferencia-archivos-pago-por-uso", "/pt/guias/calculadora-custo-transferencia-arquivos-pre-pago-vs-assinatura"],
    ["/guides/transfer-large-files-without-failed-uploads", "/es/enviar-archivos-mas-de-2gb", "/pt/guias/como-entregar-mapeamento-drone-anac-sisant-ortomosaico-lidar"],
    ["/guides/send-large-files-without-filling-computer", "/es/enviar-carpetas-pesadas", "/pt/guias/como-enviar-arquivos-pesados-sem-lotar-hd-ou-nuvem"],
    ["/guides/file-transfer-vs-cloud-storage-vs-media-review", "/es/enviar-videos-sin-perder-calidad", "/pt/guias/como-enviar-videos-4k-raw-whatsapp-email-sem-comprimir"],
  ];

  for (const [enUrl, esUrl, ptUrl] of staticTriplets) {
    if (clean === enUrl || clean === esUrl || clean === ptUrl) {
      const canonicalEn = enUrl === "/pricing" ? "/plans" : enUrl;
      return {
        enPath: canonicalEn,
        esPath: esUrl,
        ptPath: ptUrl,
        enHref: canonicalEn === "/" ? "/?lang=en" : canonicalEn,
        esHref: esUrl,
        ptHref: ptUrl,
        isEs,
        isPt,
      };
    }
  }

  if (clean.startsWith("/es/")) {
    return {
      enPath: "/",
      esPath: clean,
      ptPath: "/pt",
      enHref: "/?lang=en",
      esHref: clean,
      ptHref: "/pt",
      isEs: true,
      isPt: false,
    };
  }

  if (clean.startsWith("/pt/guias/")) {
    return {
      enPath: "/guides",
      esPath: "/es/enviar-archivos-mas-de-2gb",
      ptPath: clean,
      enHref: "/guides",
      esHref: "/es/enviar-archivos-mas-de-2gb",
      ptHref: clean,
      isEs: false,
      isPt: true,
    };
  }

  if (clean.startsWith("/pt/")) {
    const ptSlug = clean.slice(4);
    const matchedPt = ptSeoLandingPageMap.get(ptSlug);
    const targetEn = matchedPt ? matchedPt.enEquivalent : "/";
    const targetEs =
      ptSlug.includes("wetransfer")
        ? "/es/alternativas-a-wetransfer"
        : ptSlug.includes("video") || ptSlug.includes("prores") || ptSlug.includes("braw")
        ? "/es/enviar-videos-sin-perder-calidad"
        : "/es/enviar-archivos-mas-de-2gb";
    return {
      enPath: targetEn,
      esPath: targetEs,
      ptPath: clean,
      enHref: targetEn === "/" ? "/?lang=en" : targetEn,
      esHref: targetEs,
      ptHref: clean,
      isEs: false,
      isPt: true,
    };
  }

  const normEn = clean.replace(/^\\/(send|bypass)\\//, "/");
  const matchedByEn =
    ptSeoLandingPages.find(
      (p) => p.isCanonicalEnPair && (p.enEquivalent === normEn || p.enEquivalent === clean)
    ) ??
    ptSeoLandingPages.find(
      (p) => p.enEquivalent === normEn || p.enEquivalent === clean
    );
  if (matchedByEn) {
    const ptUrl = \`/pt/\${matchedByEn.slug}\`;
    const esUrl =
      normEn.includes("wetransfer")
        ? "/es/alternativas-a-wetransfer"
        : normEn.includes("video") || normEn.includes("braw") || normEn.includes("r3d")
        ? "/es/enviar-videos-sin-perder-calidad"
        : "/es/enviar-archivos-mas-de-2gb";
    return {
      enPath: normEn,
      esPath: esUrl,
      ptPath: ptUrl,
      enHref: normEn,
      esHref: esUrl,
      ptHref: ptUrl,
      isEs: false,
      isPt: false,
    };
  }

  return {
    enPath: clean,
    esPath: "/es",
    ptPath: "/pt",
    enHref: clean,
    esHref: "/es",
    ptHref: "/pt",
    isEs: false,
    isPt: false,
  };
}
`;

const outPath = path.resolve(process.cwd(), "src/data/ptSeoLandingPages.ts");
fs.writeFileSync(outPath, fileHeader, "utf8");
console.log(`Generated ${fullPages.length} differentiated PtSeoLandingPage objects into ${outPath} (${(fileHeader.length / 1024).toFixed(1)} KB)`);
