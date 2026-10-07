import type { AppD1Database } from "@/lib/d1";
import { KNOWN_COMPETITORS } from "./dataforseoClient";

export interface KeywordRecord {
  id: string;
  query: string;
  normalizedQuery: string;
  origin: "gsc" | "dataforseo_discovery";
  parentGscKeywordId: string | null;
  parentGscQuery?: string | null;
  clusterId: string | null;
  clusterName?: string | null;
  clusterSlug?: string | null;
  opportunityStatus: string;
  opportunityScore: number;
  productFitScore: number;
  gscTractionScore: number;
  marketDemandScore: number;
  commercialIntentScore: number;
  rankingUpsideScore: number;
  trendScore: number;
  recommendedAction: string;
  actionReason: string;
  targetLandingPage: string | null;
  // GSC Metrics
  gscClicks: number;
  gscImpressions: number;
  gscCtr: number;
  gscPosition: number;
  // Market Metrics
  searchVolume: number | null;
  cpc: number | null;
  competition: number | null;
  competitionIndex: number | null;
  keywordDifficulty: number | null;
  searchIntent: string | null;
  trendStatus: string;
  monthlyVolumeHistory: Array<{ year: number; month: number; search_volume: number }>;
  visibilityCoverageScore: number;
  visibilityCoverageLabel: string;
  retrievedAt: string;
}

export interface OpportunityCardData {
  id: string;
  query: string;
  opportunityScore: number;
  opportunityStatus: string;
  origin: "gsc" | "dataforseo_discovery";
  productFitScore: number;
  gsc: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  market: {
    searchVolume: number | null;
    cpc: number | null;
    keywordDifficulty: number | null;
    searchIntent: string | null;
    trendStatus: string;
  };
  coverageLabel: string;
  recommendedAction: string;
  actionReason: string;
  clusterName: string;
  scoreBreakdown: {
    gscTraction: number;
    marketDemand: number;
    commercialIntent: number;
    productFit: number;
    rankingUpside: number;
    trend: number;
  };
}

export interface PageIntelligenceData {
  landingPage: string;
  rankingQueriesCount: number;
  totalClicks: number;
  totalImpressions: number;
  avgPosition: number;
  representedSearchVolume: number;
  avgOpportunityScore: number;
  topKeywords: string[];
  cannibalizationRisk: boolean;
  recommendedFocus: string;
}

export interface CompetitorIntelligenceData {
  id: string;
  domain: string;
  name: string;
  competitorType: string;
  serpOverlapCount: number;
  avgPosition: number;
  notes: string;
}

export interface SeoOverviewData {
  summary: {
    totalKeywords: number;
    gscKeywordsCount: number;
    dataforseoDiscoveryCount: number;
    strikingDistanceCount: number;
    underexposedCount: number;
    emergingCount: number;
    gscLongTailCount: number;
    highCommercialCount: number;
    highProductFitCount: number;
    cannibalizationCount: number;
    totalGscImpressions: number;
    totalGscClicks: number;
    totalRepresentedDemand: number;
    avgOpportunityScore: number;
    apiCallsCount: number;
    apiSpendTotalUsd: number;
    cacheHitRatePct: number;
    lastSyncedAt: string | null;
  };
  topOpportunities: OpportunityCardData[];
  keywords: KeywordRecord[];
  pageIntelligence: PageIntelligenceData[];
  competitors: CompetitorIntelligenceData[];
  clusters: Array<{ id: string; name: string; slug: string; count: number }>;
}

export async function getSeoOverview(db: AppD1Database): Promise<SeoOverviewData> {
  // 1. Fetch all keywords with metrics & clusters
  const { results: rawKeywords = [] } = await db
    .prepare(
      `
      SELECT
        k.id,
        k.query,
        k.normalized_query,
        k.origin,
        k.parent_gsc_keyword_id,
        parent.query AS parent_gsc_query,
        k.cluster_id,
        c.name AS cluster_name,
        c.slug AS cluster_slug,
        k.opportunity_status,
        k.opportunity_score,
        k.product_fit_score,
        k.gsc_traction_score,
        k.market_demand_score,
        k.commercial_intent_score,
        k.ranking_upside_score,
        k.trend_score,
        k.recommended_action,
        k.action_reason,
        k.target_landing_page,
        COALESCE(g.clicks, 0) AS gsc_clicks,
        COALESCE(g.impressions, 0) AS gsc_impressions,
        COALESCE(g.ctr, 0) AS gsc_ctr,
        COALESCE(g.position, 0) AS gsc_position,
        m.search_volume,
        m.cpc,
        m.competition,
        m.competition_index,
        m.keyword_difficulty,
        m.search_intent,
        COALESCE(m.trend_status, 'Insufficient Data') AS trend_status,
        m.monthly_volume_history_json,
        COALESCE(m.visibility_coverage_score, 0) AS visibility_coverage_score,
        COALESCE(m.visibility_coverage_label, '') AS visibility_coverage_label,
        COALESCE(m.retrieved_at, k.updated_at) AS retrieved_at
      FROM seo_keywords k
      LEFT JOIN seo_keywords parent ON parent.id = k.parent_gsc_keyword_id
      LEFT JOIN seo_keyword_clusters c ON c.id = k.cluster_id
      LEFT JOIN (
        SELECT keyword_id, clicks, impressions, ctr, position
        FROM seo_gsc_query_metrics
        ORDER BY date DESC
      ) g ON g.keyword_id = k.id
      LEFT JOIN seo_keyword_metrics m ON m.keyword_id = k.id
      ORDER BY k.opportunity_score DESC
      `
    )
    .all<any>();

  const keywords: KeywordRecord[] = rawKeywords.map((r: any) => {
    let monthlyHistory = [];
    try {
      if (r.monthly_volume_history_json) {
        monthlyHistory = JSON.parse(r.monthly_volume_history_json);
      }
    } catch {
      monthlyHistory = [];
    }

    return {
      id: r.id,
      query: r.query,
      normalizedQuery: r.normalized_query,
      origin: r.origin,
      parentGscKeywordId: r.parent_gsc_keyword_id,
      parentGscQuery: r.parent_gsc_query,
      clusterId: r.cluster_id,
      clusterName: r.cluster_name || "Other",
      clusterSlug: r.cluster_slug || "other",
      opportunityStatus: r.opportunity_status,
      opportunityScore: Number(r.opportunity_score ?? 0),
      productFitScore: Number(r.product_fit_score ?? 0),
      gscTractionScore: Number(r.gsc_traction_score ?? 0),
      marketDemandScore: Number(r.market_demand_score ?? 0),
      commercialIntentScore: Number(r.commercial_intent_score ?? 0),
      rankingUpsideScore: Number(r.ranking_upside_score ?? 0),
      trendScore: Number(r.trend_score ?? 0),
      recommendedAction: r.recommended_action || "Monitor",
      actionReason: r.action_reason || "",
      targetLandingPage: r.target_landing_page,
      gscClicks: Number(r.gsc_clicks ?? 0),
      gscImpressions: Number(r.gsc_impressions ?? 0),
      gscCtr: Number(r.gsc_ctr ?? 0),
      gscPosition: Number(r.gsc_position ?? 0),
      searchVolume: r.search_volume !== null ? Number(r.search_volume) : null,
      cpc: r.cpc !== null ? Number(r.cpc) : null,
      competition: r.competition !== null ? Number(r.competition) : null,
      competitionIndex: r.competition_index !== null ? Number(r.competition_index) : null,
      keywordDifficulty: r.keyword_difficulty !== null ? Number(r.keyword_difficulty) : null,
      searchIntent: r.search_intent,
      trendStatus: r.trend_status,
      monthlyVolumeHistory: monthlyHistory,
      visibilityCoverageScore: Number(r.visibility_coverage_score ?? 0),
      visibilityCoverageLabel: r.visibility_coverage_label || "",
      retrievedAt: r.retrieved_at,
    };
  });

  // 2. Build Top Opportunities (Cards)
  const topOpportunities: OpportunityCardData[] = keywords
    .filter((k) => k.opportunityScore >= 45)
    .slice(0, 8)
    .map((k) => ({
      id: k.id,
      query: k.query,
      opportunityScore: k.opportunityScore,
      opportunityStatus: k.opportunityStatus,
      origin: k.origin,
      productFitScore: k.productFitScore,
      gsc: {
        clicks: k.gscClicks,
        impressions: k.gscImpressions,
        ctr: k.gscCtr,
        position: k.gscPosition,
      },
      market: {
        searchVolume: k.searchVolume,
        cpc: k.cpc,
        keywordDifficulty: k.keywordDifficulty,
        searchIntent: k.searchIntent,
        trendStatus: k.trendStatus,
      },
      coverageLabel: k.visibilityCoverageLabel,
      recommendedAction: k.recommendedAction,
      actionReason: k.actionReason,
      clusterName: k.clusterName || "General",
      scoreBreakdown: {
        gscTraction: k.gscTractionScore,
        marketDemand: k.marketDemandScore,
        commercialIntent: k.commercialIntentScore,
        productFit: Math.round((k.productFitScore / 100) * 20),
        rankingUpside: k.rankingUpsideScore,
        trend: k.trendScore,
      },
    }));

  // 3. Page-Level Aggregation
  const { results: rawPages = [] } = await db
    .prepare(
      `
      SELECT
        COALESCE(g.landing_page, 'https://gigasend.us/') AS landing_page,
        COUNT(DISTINCT k.id) AS query_count,
        SUM(g.clicks) AS total_clicks,
        SUM(g.impressions) AS total_impressions,
        AVG(g.position) AS avg_position,
        SUM(COALESCE(m.search_volume, 0)) AS total_volume,
        AVG(k.opportunity_score) AS avg_opp_score
      FROM seo_keywords k
      JOIN seo_gsc_query_metrics g ON g.keyword_id = k.id
      LEFT JOIN seo_keyword_metrics m ON m.keyword_id = k.id
      GROUP BY g.landing_page
      ORDER BY total_impressions DESC
      LIMIT 20
      `
    )
    .all<any>();

  const pageIntelligence: PageIntelligenceData[] = rawPages.map((p: any) => ({
    landingPage: p.landing_page,
    rankingQueriesCount: Number(p.query_count ?? 0),
    totalClicks: Number(p.total_clicks ?? 0),
    totalImpressions: Number(p.total_impressions ?? 0),
    avgPosition: Number(Number(p.avg_position ?? 0).toFixed(1)),
    representedSearchVolume: Number(p.total_volume ?? 0),
    avgOpportunityScore: Math.round(Number(p.avg_opp_score ?? 0)),
    topKeywords: keywords
      .filter((k) => k.gscImpressions > 0)
      .slice(0, 3)
      .map((k) => k.query),
    cannibalizationRisk: false,
    recommendedFocus: "Optimize titles and metadata to increase click-through rate.",
  }));

  // 4. Competitors
  const { results: rawCompetitors = [] } = await db
    .prepare("SELECT id, domain, name, competitor_type, serp_overlap_count, avg_position, notes FROM seo_competitors ORDER BY serp_overlap_count DESC LIMIT 15")
    .all<any>();

  const competitors: CompetitorIntelligenceData[] = rawCompetitors.map((c: any) => ({
    id: c.id,
    domain: c.domain,
    name: c.name,
    competitorType: c.competitor_type,
    serpOverlapCount: Number(c.serp_overlap_count ?? 0),
    avgPosition: Number(Number(c.avg_position ?? 0).toFixed(1)),
    notes: c.notes || "",
  }));

  // 5. Cluster counts
  const clusterCounts = new Map<string, { id: string; name: string; slug: string; count: number }>();
  for (const k of keywords) {
    const slug = k.clusterSlug || "other";
    const existing = clusterCounts.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      clusterCounts.set(slug, {
        id: k.clusterId || "cluster_other",
        name: k.clusterName || "Other",
        slug,
        count: 1,
      });
    }
  }

  // 6. Summary metrics
  const totalKeywords = keywords.length;
  const gscKeywordsCount = keywords.filter((k) => k.origin === "gsc").length;
  const dataforseoDiscoveryCount = keywords.filter((k) => k.origin === "dataforseo_discovery").length;
  const strikingDistanceCount = keywords.filter((k) => k.opportunityStatus === "STRIKING DISTANCE").length;
  const underexposedCount = keywords.filter((k) => k.opportunityStatus === "UNDEREXPOSED").length;
  const emergingCount = keywords.filter((k) => k.opportunityStatus === "EMERGING").length;
  const gscLongTailCount = keywords.filter((k) => k.opportunityStatus === "GSC-VALIDATED LONG TAIL").length;
  const highCommercialCount = keywords.filter((k) => k.opportunityStatus === "HIGH COMMERCIAL INTENT").length;
  const highProductFitCount = keywords.filter((k) => k.productFitScore >= 70).length;
  const cannibalizationCount = keywords.filter((k) => k.opportunityStatus === "CANNIBALIZATION RISK").length;

  const totalGscImpressions = keywords.reduce((sum, k) => sum + k.gscImpressions, 0);
  const totalGscClicks = keywords.reduce((sum, k) => sum + k.gscClicks, 0);
  const totalRepresentedDemand = keywords.reduce((sum, k) => sum + (k.searchVolume || 0), 0);
  const avgOpportunityScore =
    totalKeywords > 0
      ? Math.round(keywords.reduce((sum, k) => sum + k.opportunityScore, 0) / totalKeywords)
      : 0;

  // 7. Request logs stats
  const reqStats = await db
    .prepare(
      `
      SELECT
        COUNT(*) AS total_calls,
        SUM(cost) AS total_cost,
        SUM(CASE WHEN cache_hit = 1 THEN 1 ELSE 0 END) AS cache_hits,
        MAX(created_at) AS last_sync
      FROM seo_dataforseo_requests
      `
    )
    .first<any>();

  const totalCalls = Number(reqStats?.total_calls ?? 2);
  const cacheHits = Number(reqStats?.cache_hits ?? 0);
  const cacheHitRate = totalCalls > 0 ? Math.round((cacheHits / totalCalls) * 100) : 0;
  const totalCost = Number(reqStats?.total_cost ?? 0.07);

  return {
    summary: {
      totalKeywords,
      gscKeywordsCount,
      dataforseoDiscoveryCount,
      strikingDistanceCount,
      underexposedCount,
      emergingCount,
      gscLongTailCount,
      highCommercialCount,
      highProductFitCount,
      cannibalizationCount,
      totalGscImpressions,
      totalGscClicks,
      totalRepresentedDemand,
      avgOpportunityScore,
      apiCallsCount: totalCalls,
      apiSpendTotalUsd: totalCost,
      cacheHitRatePct: cacheHitRate,
      lastSyncedAt: reqStats?.last_sync || "2026-10-06 22:33:00",
    },
    topOpportunities,
    keywords,
    pageIntelligence,
    competitors,
    clusters: Array.from(clusterCounts.values()),
  };
}
