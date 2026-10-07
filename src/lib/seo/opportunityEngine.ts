import crypto from "node:crypto";
import type { MonthlySearchVolume } from "./dataforseoClient";

export interface KeywordScoringInput {
  query: string;
  origin: "gsc" | "dataforseo_discovery";
  gscClicks: number;
  gscImpressions: number;
  gscCtr: number;
  gscPosition: number;
  searchVolume: number | null;
  cpc: number | null;
  competition: number | null;
  keywordDifficulty: number | null;
  searchIntent: string | null;
  trendStatus: "Rising" | "Stable" | "Declining" | "Seasonal" | "Insufficient Data";
  landingPages: string[];
  isCannibalized?: boolean;
}

export interface KeywordScoringResult {
  opportunityScore: number;
  productFitScore: number;
  gscTractionScore: number;
  marketDemandScore: number;
  commercialIntentScore: number;
  rankingUpsideScore: number;
  trendScore: number;
  penalties: number;
  opportunityStatus:
    | "STRIKING DISTANCE"
    | "UNDEREXPOSED"
    | "HIGH IMPRESSIONS / LOW CTR"
    | "EMERGING"
    | "GSC-VALIDATED LONG TAIL"
    | "HIGH COMMERCIAL INTENT"
    | "CONTENT GAP"
    | "CANNIBALIZATION RISK"
    | "MONITOR";
  recommendedAction: string;
  actionReason: string;
  visibilityCoverageScore: number;
  visibilityCoverageLabel: string;
}

export const CLUSTERS = [
  {
    id: "cluster_file_size",
    name: "File Size",
    slug: "file-size",
    cluster_type: "Capacity",
    description: "Specific file capacity transfers (10GB, 20GB, 30GB, 50GB, 100GB, 1TB)",
  },
  {
    id: "cluster_file_type",
    name: "File Type & Codec",
    slug: "file-type",
    cluster_type: "Media Format",
    description: "Cinema RAW, BRAW, R3D, 3D Animation, Pro Tools PTX, ZIP, media projects",
  },
  {
    id: "cluster_profession",
    name: "Profession & Industry",
    slug: "profession",
    cluster_type: "Persona",
    description: "Filmmakers, videographers, editors, colorists, 3D artists, agencies",
  },
  {
    id: "cluster_problem",
    name: "Problem & Bottleneck",
    slug: "problem",
    cluster_type: "Pain Point",
    description: "Attachment too large, file too large for email, slow upload, dropped connections, high latency",
  },
  {
    id: "cluster_competitor",
    name: "Competitor & Alternative",
    slug: "competitor-alternative",
    cluster_type: "Competitive",
    description: "Comparisons and alternatives to WeTransfer, MASV, Filemail, Dropbox, Mimecast",
  },
  {
    id: "cluster_business_model",
    name: "Price & Business Model",
    slug: "price-business-model",
    cluster_type: "Commercial",
    description: "Pay as you go, no monthly subscription, cheap large-file transfer, free transfer",
  },
  {
    id: "cluster_security_infra",
    name: "Security & Infrastructure",
    slug: "security-infra",
    cluster_type: "Technical",
    description: "Zero egress, cloud file streaming, edge routing, resume uploads",
  },
  {
    id: "cluster_educational",
    name: "How-To & Educational",
    slug: "how-to-educational",
    cluster_type: "Informational",
    description: "Questions and tutorials on sending, storing, and transferring heavy files",
  },
  {
    id: "cluster_other",
    name: "Other & Unclassified",
    slug: "other",
    cluster_type: "General",
    description: "General or brand queries not mapped to specific functional topics",
  },
];

/**
 * Normalizes keyword text for deterministic matching and deduping
 */
export function normalizeKeyword(query: string): string {
  return query
    .toLowerCase()
    .replace(/['’"“”]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Creates a stable deterministic internal keyword ID
 */
export function generateKeywordId(query: string): string {
  const norm = normalizeKeyword(query);
  const hash = crypto.createHash("sha256").update(norm).digest("hex").slice(0, 16);
  return `kw_${hash}`;
}

/**
 * Assigns a keyword to one of GigaSend's defined topic clusters
 */
export function classifyTopicCluster(query: string): typeof CLUSTERS[number] {
  const norm = normalizeKeyword(query);

  if (/\b(\d+gb|\d+\s*gb|\d+tb|\d+\s*tb)\b/.test(norm)) {
    return CLUSTERS[0]; // File Size
  }
  if (
    norm.includes("video") ||
    norm.includes("braw") ||
    norm.includes("r3d") ||
    norm.includes("ptx") ||
    norm.includes("pro tools") ||
    norm.includes("animation") ||
    norm.includes("cinema") ||
    norm.includes("raw") ||
    norm.includes("footage")
  ) {
    return CLUSTERS[1]; // File Type
  }
  if (
    norm.includes("filmmaker") ||
    norm.includes("videographer") ||
    norm.includes("editor") ||
    norm.includes("colorist") ||
    norm.includes("client") ||
    norm.includes("customer") ||
    norm.includes("media companies")
  ) {
    return CLUSTERS[2]; // Profession
  }
  if (
    norm.includes("too large") ||
    norm.includes("attachment") ||
    norm.includes("slow") ||
    norm.includes("dropped") ||
    norm.includes("resume") ||
    norm.includes("latency") ||
    norm.includes("egress") ||
    norm.includes("sync")
  ) {
    return CLUSTERS[3]; // Problem
  }
  if (
    norm.includes("wetransfer") ||
    norm.includes("masv") ||
    norm.includes("filemail") ||
    norm.includes("dropbox") ||
    norm.includes("mimecast") ||
    norm.includes("frame io") ||
    norm.includes("alternative") ||
    norm.includes("vs")
  ) {
    return CLUSTERS[4]; // Competitor
  }
  if (
    norm.includes("pay as you go") ||
    norm.includes("no subscription") ||
    norm.includes("cost") ||
    norm.includes("pricing") ||
    norm.includes("cheap") ||
    norm.includes("free")
  ) {
    return CLUSTERS[5]; // Price / Business Model
  }
  if (
    norm.includes("streaming") ||
    norm.includes("cloud storage") ||
    norm.includes("secure") ||
    norm.includes("edge")
  ) {
    return CLUSTERS[6]; // Security & Infra
  }
  if (
    norm.startsWith("how to") ||
    norm.startsWith("why") ||
    norm.startsWith("where to") ||
    norm.includes("guide")
  ) {
    return CLUSTERS[7]; // Educational
  }

  return CLUSTERS[8]; // Other
}

/**
 * Calculates GigaSend Product Fit Score (0–100)
 * Evaluates how strongly a search indicates a person who needs GigaSend's service.
 */
export function calculateProductFit(query: string): number {
  const norm = normalizeKeyword(query);
  let score = 20; // baseline

  // Immediate disqualifiers / irrelevant queries
  if (norm === "gigasecond" || norm === "gaysend") {
    return 5;
  }

  // Large file transfer core value (+30)
  if (/\b(\d+gb|\d+\s*gb|\d+tb)\b/.test(norm) || norm.includes("large file") || norm.includes("big file") || norm.includes("heavy file")) {
    score += 30;
  }

  // Transfer / Send intent (+25)
  if (norm.includes("send") || norm.includes("transfer") || norm.includes("deliver") || norm.includes("upload") || norm.includes("share")) {
    score += 25;
  }

  // High-value media / creative formats (+20)
  if (norm.includes("video") || norm.includes("braw") || norm.includes("r3d") || norm.includes("animation") || norm.includes("ptx")) {
    score += 20;
  }

  // Pain point solving (+15)
  if (norm.includes("too large") || norm.includes("failed") || norm.includes("slow") || norm.includes("egress") || norm.includes("resume")) {
    score += 15;
  }

  // Commercial / pricing / alternative intent (+15)
  if (norm.includes("pay as you go") || norm.includes("no subscription") || norm.includes("alternative") || norm.includes("free")) {
    score += 15;
  }

  // Direct brand search (+35)
  if (norm.includes("gigasend") || norm.includes("giga send") || norm.includes("gbsend")) {
    score += 35;
  }

  // Client/customer file delivery (+15)
  if (norm.includes("client") || norm.includes("customer")) {
    score += 15;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Demand Trend Classifier:
 * Analyzes 12-month historical monthly search volume to classify into:
 * Rising, Stable, Declining, Seasonal, or Insufficient Data.
 */
export function classifyDemandTrend(
  monthlySearches: MonthlySearchVolume[]
): "Rising" | "Stable" | "Declining" | "Seasonal" | "Insufficient Data" {
  if (!monthlySearches || monthlySearches.length < 6) {
    return "Insufficient Data";
  }

  // Sort chronologically ascending
  const sorted = [...monthlySearches].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  const volumes = sorted.map((s) => s.search_volume);
  const total = volumes.reduce((sum, v) => sum + v, 0);

  if (total === 0) {
    return "Stable";
  }

  // Check recent 3 months vs prior 3 months
  const recent3 = volumes.slice(-3);
  const prior3 = volumes.slice(-6, -3);

  const avgRecent = recent3.reduce((a, b) => a + b, 0) / recent3.length;
  const avgPrior = prior3.reduce((a, b) => a + b, 0) / prior3.length;

  // Calculate standard deviation and coefficient of variation for seasonality
  const mean = total / volumes.length;
  const variance = volumes.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / volumes.length;
  const stdDev = Math.sqrt(variance);
  const cv = mean > 0 ? stdDev / mean : 0;

  if (cv > 0.45) {
    return "Seasonal";
  }

  if (avgPrior > 0) {
    const diffPct = (avgRecent - avgPrior) / avgPrior;
    if (diffPct > 0.18) return "Rising";
    if (diffPct < -0.18) return "Declining";
  }

  return "Stable";
}

/**
 * Directional Visibility Coverage (Section 7)
 * Never label GSC impressions / DataForSEO volume as literal "market share".
 * Instead, calculate a directional opportunity signal.
 */
export function calculateVisibilityCoverage(
  gscImpressions: number,
  searchVolume: number | null
): { score: number; label: string } {
  if (searchVolume === null || searchVolume === undefined) {
    if (gscImpressions > 0) {
      return {
        score: 100,
        label: "GSC-Validated Demand (Third-party volume unmeasured)",
      };
    }
    return { score: 0, label: "Insufficient data" };
  }

  if (searchVolume === 0) {
    if (gscImpressions > 0) {
      return {
        score: 100,
        label: "GSC-Validated Long Tail (Zero third-party volume)",
      };
    }
    return { score: 0, label: "Zero estimated market demand" };
  }

  // Normalize monthly volume to 28-day impression equivalent
  const estimated28dDemand = (searchVolume * 28) / 30;
  const ratio = (gscImpressions / estimated28dDemand) * 100;
  const score = Math.min(100, Math.round(ratio * 10) / 10);

  if (score >= 40) {
    return {
      score,
      label: "High Visibility Coverage (Prominently established in SERP)",
    };
  }
  if (score >= 10) {
    return {
      score,
      label: "Moderate Visibility Coverage (Room for position & CTR expansion)",
    };
  }
  return {
    score,
    label: "Low Visibility Coverage (Substantial uncaptured market demand)",
  };
}

/**
 * Transparent 0–100 Opportunity Scoring Engine (Section 15)
 */
export function scoreKeywordOpportunity(input: KeywordScoringInput): KeywordScoringResult {
  const norm = normalizeKeyword(input.query);
  const productFit = calculateProductFit(input.query);

  // 1. GSC Traction (0–25)
  let gscTraction = 0;
  if (input.gscImpressions > 0) {
    gscTraction += Math.min(8, input.gscClicks * 3);
    gscTraction += Math.min(8, input.gscImpressions / 3);
    if (input.gscPosition > 0 && input.gscPosition <= 3) gscTraction += 7;
    else if (input.gscPosition <= 10) gscTraction += 5;
    else if (input.gscPosition <= 20) gscTraction += 3;
    if (input.gscCtr > 0.03) gscTraction += 2;
  }
  gscTraction = Math.min(25, Math.round(gscTraction * 10) / 10);

  // 2. Market Demand (0–20)
  let marketDemand = 0;
  const vol = input.searchVolume ?? 0;
  if (vol > 0) {
    if (vol >= 10000) marketDemand = 20;
    else if (vol >= 5000) marketDemand = 17;
    else if (vol >= 2000) marketDemand = 14;
    else if (vol >= 800) marketDemand = 11;
    else if (vol >= 300) marketDemand = 8;
    else if (vol >= 100) marketDemand = 5;
    else marketDemand = 3;
  }
  marketDemand = Math.min(20, marketDemand);

  // 3. Commercial Intent (0–15)
  let commercialIntent = 0;
  const intent = input.searchIntent?.toLowerCase() || "";
  if (intent === "transactional") commercialIntent += 8;
  else if (intent === "commercial") commercialIntent += 7;
  else if (intent === "navigational") commercialIntent += 4;
  else commercialIntent += 3;

  const cpc = input.cpc ?? 0;
  if (cpc >= 5.0) commercialIntent += 7;
  else if (cpc >= 3.0) commercialIntent += 5;
  else if (cpc >= 1.5) commercialIntent += 3;
  else if (cpc > 0) commercialIntent += 1;
  commercialIntent = Math.min(15, commercialIntent);

  // 4. Product Fit Component (0–20)
  const productFitComponent = Math.round((productFit / 100) * 20 * 10) / 10;

  // 5. Ranking Upside & Attainability (0–10)
  let rankingUpside = 5;
  if (input.gscPosition > 3 && input.gscPosition <= 20) {
    rankingUpside += 3; // In striking distance!
  } else if (input.gscPosition > 20 && input.gscPosition <= 50) {
    rankingUpside += 1;
  }

  const kd = input.keywordDifficulty ?? 40;
  if (kd <= 30) rankingUpside += 2; // High attainability
  else if (kd >= 70) rankingUpside -= 2;
  rankingUpside = Math.min(10, Math.max(0, rankingUpside));

  // 6. Trend & Growth Component (0–10)
  let trendComponent = 4;
  if (input.trendStatus === "Rising") trendComponent = 10;
  else if (input.trendStatus === "Stable") trendComponent = 7;
  else if (input.trendStatus === "Seasonal") trendComponent = 6;
  else if (input.trendStatus === "Insufficient Data") trendComponent = 4;
  else if (input.trendStatus === "Declining") trendComponent = 1;

  // 7. Penalties
  let penalties = 0;
  if (productFit < 25) penalties += 15;
  if (kd > 75) penalties += 8;
  if (input.isCannibalized) penalties += 5;

  const rawTotal =
    gscTraction +
    marketDemand +
    commercialIntent +
    productFitComponent +
    rankingUpside +
    trendComponent -
    penalties;

  const opportunityScore = Math.min(100, Math.max(0, Math.round(rawTotal)));

  // Coverage signal
  const { score: coverageScore, label: coverageLabel } = calculateVisibilityCoverage(
    input.gscImpressions,
    input.searchVolume
  );

  // 8. Classify Opportunity Type
  let status: KeywordScoringResult["opportunityStatus"] = "MONITOR";

  if (input.isCannibalized) {
    status = "CANNIBALIZATION RISK";
  } else if (input.gscPosition >= 3.5 && input.gscPosition <= 20 && input.gscImpressions >= 2) {
    status = "STRIKING DISTANCE";
  } else if ((input.searchVolume ?? 0) >= 800 && input.gscImpressions <= 10 && productFit >= 50) {
    status = "UNDEREXPOSED";
  } else if (input.gscImpressions >= 15 && input.gscCtr < 0.015 && input.gscPosition <= 15) {
    status = "HIGH IMPRESSIONS / LOW CTR";
  } else if (input.gscImpressions >= 1 && (input.searchVolume === 0 || input.searchVolume === null)) {
    status = "GSC-VALIDATED LONG TAIL";
  } else if (
    (intent === "transactional" || intent === "commercial") &&
    (input.cpc ?? 0) >= 3.0 &&
    productFit >= 65
  ) {
    status = "HIGH COMMERCIAL INTENT";
  } else if (input.trendStatus === "Rising" && input.gscImpressions > 0) {
    status = "EMERGING";
  } else if ((input.searchVolume ?? 0) >= 400 && productFit >= 60 && input.landingPages.length === 0) {
    status = "CONTENT GAP";
  }

  // 9. Recommended Action Engine
  let recommendedAction = "Monitor Search Performance";
  let actionReason = "Search volume and traction indicate steady monitoring without immediate page creation.";

  switch (status) {
    case "STRIKING DISTANCE":
      recommendedAction = "Optimize Existing Page";
      actionReason = `GigaSend ranks position ${input.gscPosition.toFixed(1)} with ${input.gscImpressions} impressions. Targeted on-page tuning can break into top-3 territory.`;
      break;
    case "UNDEREXPOSED":
      recommendedAction = "Create Dedicated Page or Strengthen Authority";
      actionReason = `High third-party demand (${input.searchVolume?.toLocaleString()} searches/mo) but limited GSC visibility. Build focused landing page and acquire internal links.`;
      break;
    case "HIGH IMPRESSIONS / LOW CTR":
      recommendedAction = "Rewrite Title, Meta & SERP Snippet";
      actionReason = `${input.gscImpressions} impressions with only ${(input.gscCtr * 100).toFixed(1)}% CTR. Sharpen action verbs, highlight free transfer limits, and add rich FAQ schema.`;
      break;
    case "GSC-VALIDATED LONG TAIL":
      recommendedAction = "Protect Page & Add Supporting Section";
      actionReason = "Google is actively querying and exposing GigaSend for this term even though standard SEO tools estimate zero demand.";
      break;
    case "HIGH COMMERCIAL INTENT":
      recommendedAction = "Create Comparison / Conversion Page";
      actionReason = `High CPC ($${input.cpc?.toFixed(2)}) and transactional intent. Build clear feature breakdown contrasting GigaSend zero-egress vs competitors.`;
      break;
    case "EMERGING":
      recommendedAction = "Accelerate Internal Linking";
      actionReason = "Impression momentum is accelerating. Funnel internal link equity from top guides and tools to support ranking gains.";
      break;
    case "CONTENT GAP":
      recommendedAction = "Develop High-Intent Use-Case Page";
      actionReason = "Significant market demand with high product relevance, but GigaSend lacks a dedicated indexed landing page for this specific intent.";
      break;
    case "CANNIBALIZATION RISK":
      recommendedAction = "Consolidate / Canonical Review";
      actionReason = `Multiple GigaSend URLs (${input.landingPages.slice(0, 2).join(", ")}) are competing for the same search intent. Clarify primary ranking URL.`;
      break;
    default:
      if (productFit >= 70 && (input.searchVolume ?? 0) >= 300) {
        recommendedAction = "Create Use-Case Page";
        actionReason = "Strong product alignment with solid market demand.";
      }
      break;
  }

  return {
    opportunityScore,
    productFitScore: productFit,
    gscTractionScore: gscTraction,
    marketDemandScore: marketDemand,
    commercialIntentScore: commercialIntent,
    rankingUpsideScore: rankingUpside,
    trendScore: trendComponent,
    penalties,
    opportunityStatus: status,
    recommendedAction,
    actionReason,
    visibilityCoverageScore: coverageScore,
    visibilityCoverageLabel: coverageLabel,
  };
}
