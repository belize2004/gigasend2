import React from "react";
import type { OpportunityCardData } from "@/src/lib/seo/seoAdminService";
import {
  FiArrowUpRight,
  FiAward,
  FiCrosshair,
  FiEye,
  FiLayers,
  FiMousePointer,
  FiTrendingUp,
} from "react-icons/fi";

interface OpportunityCardsProps {
  opportunities: OpportunityCardData[];
  onSelectKeyword: (id: string) => void;
}

export default function OpportunityCards({
  opportunities,
  onSelectKeyword,
}: OpportunityCardsProps) {
  if (opportunities.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
        <FiCrosshair className="text-4xl text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No High-Score Opportunities Found</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
          Run the sync pipeline to analyze GSC telemetry and DataForSEO market demand.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "STRIKING DISTANCE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "UNDEREXPOSED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "HIGH COMMERCIAL INTENT":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "HIGH IMPRESSIONS / LOW CTR":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "GSC-VALIDATED LONG TAIL":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "EMERGING":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Top Priority SEO Opportunities
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Algorithmic recommendations comparing GigaSend Google exposure against verified search market demand.
          </p>
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Showing Top {opportunities.length} Action Items
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span
                      className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        opp.opportunityStatus
                      )}`}
                    >
                      {opp.opportunityStatus}
                    </span>
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                      {opp.clusterName}
                    </span>
                    {opp.origin === "dataforseo_discovery" && (
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                        Market Discovery
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    {opp.query}
                  </h3>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="inline-flex flex-col items-end">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Score
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
                      {opp.opportunityScore}
                      <span className="text-xs text-gray-400 font-normal">/100</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Comparison Box */}
              <div className="mt-5 grid grid-cols-2 gap-3 p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80">
                {/* GSC Reality */}
                <div className="space-y-1.5 border-r border-gray-200/60 pr-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    <FiMousePointer className="text-[11px]" />
                    <span>GSC Reality</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {opp.gsc.impressions.toLocaleString()}{" "}
                    <span className="text-xs text-gray-500 font-normal">impressions</span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-between">
                    <span>Position:</span>
                    <span className="font-semibold text-gray-900">
                      {opp.gsc.position > 0 ? opp.gsc.position.toFixed(1) : "Not ranked"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-between">
                    <span>Clicks / CTR:</span>
                    <span className="font-medium text-gray-900">
                      {opp.gsc.clicks} ({(opp.gsc.ctr * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* DataForSEO Market Estimate */}
                <div className="space-y-1.5 pl-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                    <FiTrendingUp className="text-[11px]" />
                    <span>Market Demand</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {opp.market.searchVolume !== null
                      ? `${opp.market.searchVolume.toLocaleString()} searches/mo`
                      : "0 (GSC Long Tail)"}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-between">
                    <span>CPC / Intent:</span>
                    <span className="font-medium text-gray-900">
                      {opp.market.cpc ? `$${opp.market.cpc.toFixed(2)}` : "—"} ·{" "}
                      <span className="capitalize">{opp.market.searchIntent || "—"}</span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium text-gray-900">
                      {opp.market.keywordDifficulty !== null
                        ? `${opp.market.keywordDifficulty}/100`
                        : "Low"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="mt-4 p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100/60">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Recommended Action: {opp.recommendedAction}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600 leading-relaxed">{opp.actionReason}</p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Product Fit:</span>
                <span className="text-xs font-semibold text-gray-800">
                  {opp.productFitScore}/100
                </span>
              </div>

              <button
                onClick={() => onSelectKeyword(opp.id)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100/80 px-3 py-1.5 rounded-full transition-colors"
              >
                <span>Inspect Intelligence</span>
                <FiArrowUpRight className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
