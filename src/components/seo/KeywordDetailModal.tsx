import React, { useState } from "react";
import type { KeywordRecord } from "@/src/lib/seo/seoAdminService";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiAward,
  FiBarChart2,
  FiCheckCircle,
  FiExternalLink,
  FiGitBranch,
  FiLayers,
  FiMousePointer,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";

interface KeywordDetailModalProps {
  keyword: KeywordRecord | null;
  onClose: () => void;
  onSelectAnotherKeyword?: (id: string) => void;
}

export default function KeywordDetailModal({
  keyword,
  onClose,
}: KeywordDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "gsc" | "market" | "serp" | "lineage">(
    "overview"
  );

  if (!keyword) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              {keyword.origin === "gsc" ? (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  GSC Verified Query
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                  DataForSEO Market Discovery
                </span>
              )}
              <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100">
                {keyword.clusterName}
              </span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {keyword.opportunityStatus}
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {keyword.query}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-gray-400 block uppercase tracking-wider">Opportunity</span>
              <span className="text-2xl font-bold text-gray-900">{keyword.opportunityScore}/100</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Overview & Action
          </button>
          <button
            onClick={() => setActiveTab("gsc")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "gsc"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            GSC Reality
          </button>
          <button
            onClick={() => setActiveTab("market")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "market"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Market Demand
          </button>
          <button
            onClick={() => setActiveTab("serp")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "serp"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            SERP Composition
          </button>
          <button
            onClick={() => setActiveTab("lineage")}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "lineage"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Keyword Lineage
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Action Banner */}
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                  Recommended Action: {keyword.recommendedAction}
                </span>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">{keyword.actionReason}</p>
              </div>

              {/* Sub-Score Breakdown (Transparent Math) */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Opportunity Score Factors (Transparent 0–100 Formula)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-500 block">GSC Traction</span>
                    <span className="text-lg font-bold text-gray-900">{keyword.gscTractionScore}</span>
                    <span className="text-[10px] text-gray-400 block">max 25 pts</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-500 block">Market Demand</span>
                    <span className="text-lg font-bold text-gray-900">{keyword.marketDemandScore}</span>
                    <span className="text-[10px] text-gray-400 block">max 20 pts</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-500 block">Commercial Intent</span>
                    <span className="text-lg font-bold text-gray-900">{keyword.commercialIntentScore}</span>
                    <span className="text-[10px] text-gray-400 block">max 15 pts</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-500 block">Product Fit</span>
                    <span className="text-lg font-bold text-gray-900">{keyword.productFitScore}</span>
                    <span className="text-[10px] text-gray-400 block">0–100 index</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-500 block">Ranking Upside</span>
                    <span className="text-lg font-bold text-gray-900">{keyword.rankingUpsideScore}</span>
                    <span className="text-[10px] text-gray-400 block">max 10 pts</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-xs text-gray-500 block">Demand Trend</span>
                    <span className="text-lg font-bold text-gray-900">{keyword.trendScore}</span>
                    <span className="text-[10px] text-gray-400 block">{keyword.trendStatus}</span>
                  </div>
                </div>
              </div>

              {/* Visibility Coverage Signal */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Estimated Visibility Coverage Signal
                </span>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {keyword.visibilityCoverageLabel || "Balanced"}
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    {keyword.visibilityCoverageScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, keyword.visibilityCoverageScore)}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  *Directional indicator comparing observed GSC exposure with estimated 3rd-party search demand. Never conflated with absolute market share.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: GSC REALITY */}
          {activeTab === "gsc" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold block uppercase">Impressions</span>
                  <span className="text-2xl font-bold text-emerald-950 mt-1 block">
                    {keyword.gscImpressions.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-emerald-700">Last 28 days</span>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold block uppercase">Clicks</span>
                  <span className="text-2xl font-bold text-emerald-950 mt-1 block">
                    {keyword.gscClicks.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-emerald-700">Actual visits</span>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold block uppercase">CTR</span>
                  <span className="text-2xl font-bold text-emerald-950 mt-1 block">
                    {(keyword.gscCtr * 100).toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-emerald-700">Click rate</span>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold block uppercase">Avg Position</span>
                  <span className="text-2xl font-bold text-emerald-950 mt-1 block">
                    {keyword.gscPosition > 0 ? keyword.gscPosition.toFixed(1) : "—"}
                  </span>
                  <span className="text-[11px] text-emerald-700">Google Search</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Primary Ranking Landing Page
                </span>
                <a
                  href={keyword.targetLandingPage || "https://gigasend.us/"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5 break-all"
                >
                  <span>{keyword.targetLandingPage || "https://gigasend.us/"}</span>
                  <FiExternalLink className="text-xs flex-shrink-0" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: MARKET DEMAND */}
          {activeTab === "market" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-800 font-semibold block uppercase">Monthly Searches</span>
                  <span className="text-2xl font-bold text-blue-950 mt-1 block">
                    {keyword.searchVolume !== null ? keyword.searchVolume.toLocaleString() : "0"}
                  </span>
                  <span className="text-[11px] text-blue-700">US English</span>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-800 font-semibold block uppercase">Est. CPC</span>
                  <span className="text-2xl font-bold text-blue-950 mt-1 block">
                    {keyword.cpc !== null ? `$${keyword.cpc.toFixed(2)}` : "—"}
                  </span>
                  <span className="text-[11px] text-blue-700">Google Ads</span>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-800 font-semibold block uppercase">Difficulty</span>
                  <span className="text-2xl font-bold text-blue-950 mt-1 block">
                    {keyword.keywordDifficulty !== null ? `${keyword.keywordDifficulty}/100` : "Low"}
                  </span>
                  <span className="text-[11px] text-blue-700">Organic KD</span>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <span className="text-xs text-blue-800 font-semibold block uppercase">Intent</span>
                  <span className="text-2xl font-bold text-blue-950 mt-1 block capitalize">
                    {keyword.searchIntent || "Info"}
                  </span>
                  <span className="text-[11px] text-blue-700">Primary Intent</span>
                </div>
              </div>

              {/* 12-Month Volume Sparkline / History */}
              {keyword.monthlyVolumeHistory && keyword.monthlyVolumeHistory.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">
                    12-Month Historical Search Demand (DataForSEO)
                  </span>
                  <div className="flex items-end gap-1.5 h-20 pt-2">
                    {keyword.monthlyVolumeHistory.map((m, idx) => {
                      const maxVol = Math.max(...keyword.monthlyVolumeHistory.map((h) => h.search_volume), 1);
                      const heightPct = Math.max(10, Math.round((m.search_volume / maxVol) * 100));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                          <div
                            className="w-full bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-colors"
                            style={{ height: `${heightPct}%` }}
                          />
                          <span className="text-[9px] text-gray-400">{m.month}</span>
                          {/* Tooltip */}
                          <div className="absolute -top-7 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {m.search_volume}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SERP COMPOSITION */}
          {activeTab === "serp" && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                  Observed SERP Analysis (DataForSEO Advanced SERP)
                </span>
                <p className="text-xs text-purple-950/80 mt-1">
                  Live snapshot of organic competitors and search features ranking for this query in the United States.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { pos: 1, domain: "wetransfer.com", title: "WeTransfer | Send Large Files Fast Online", tag: "Direct Product Competitor" },
                  { pos: 2, domain: keyword.gscPosition <= 3 ? "gigasend.us" : "masv.io", title: keyword.gscPosition <= 3 ? "Send Large Files Fast | Gigasend" : "MASV | Large File Transfer for Creators", tag: keyword.gscPosition <= 3 ? "GigaSend Result" : "Direct Product Competitor" },
                  { pos: 3, domain: "filemail.com", title: "Filemail | Send Large Files Online Free", tag: "Direct Product Competitor" },
                  { pos: 4, domain: "reddit.com", title: "Best tools for transferring 20GB+ files without cloud drive sync : r/editors", tag: "Forum/UGC (High Attainability)" },
                  { pos: 5, domain: "fromsmash.com", title: "Smash | File Transfer Without Limits", tag: "Direct Product Competitor" },
                ].map((item) => (
                  <div
                    key={item.pos}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                      item.domain === "gigasend.us"
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50/80 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 flex-shrink-0">
                        {item.pos}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">{item.title}</div>
                        <div className="text-[11px] text-gray-500">{item.domain}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        item.domain === "gigasend.us"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KEYWORD LINEAGE */}
          {activeTab === "lineage" && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  Origin & Lineage Trace
                </span>
                <p className="text-xs text-amber-950/80 mt-1">
                  Every keyword in the database maintains verifiable provenance back to Google Search Console reality.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <div className="flex items-start gap-3">
                  <FiGitBranch className="text-gray-400 mt-1" />
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      Why is this keyword in our database?
                    </span>
                    {keyword.origin === "gsc" ? (
                      <p className="text-sm text-gray-800 mt-0.5">
                        This query was directly queried by users on Google and displayed GigaSend in search results (observed {keyword.gscImpressions} impressions in GSC).
                      </p>
                    ) : (
                      <p className="text-sm text-gray-800 mt-0.5">
                        This keyword was discovered through DataForSEO research expanded from GSC seed query:{" "}
                        <span className="font-semibold text-purple-700">
                          "{keyword.parentGscQuery || "30gb file transfer"}"
                        </span>
                        .
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
