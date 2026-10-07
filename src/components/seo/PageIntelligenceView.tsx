import React from "react";
import type { PageIntelligenceData } from "@/src/lib/seo/seoAdminService";
import { FiAlertTriangle, FiCheck, FiExternalLink, FiFileText } from "react-icons/fi";

interface PageIntelligenceViewProps {
  pages: PageIntelligenceData[];
}

export default function PageIntelligenceView({ pages }: PageIntelligenceViewProps) {
  if (pages.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
        <FiFileText className="text-4xl text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No Page Aggregations Available</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
          Page telemetry will appear as GSC records map to active GigaSend landing pages.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Landing Page Intelligence & Unrealized Potential
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Aggregated search exposure, represented search market demand, and cannibalization checks by URL.
          </p>
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {pages.length} Pages Analyzed
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pages.map((p, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <a
                  href={p.landingPage}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1.5 break-all text-base"
                >
                  <span>{p.landingPage}</span>
                  <FiExternalLink className="text-xs text-gray-400 flex-shrink-0" />
                </a>

                {p.cannibalizationRisk ? (
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                    <FiAlertTriangle className="text-xs" />
                    <span>Cannibalization Risk</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                    <FiCheck className="text-xs" />
                    <span>Clean Canonical</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                <span>
                  Ranking for <strong className="text-gray-800">{p.rankingQueriesCount} queries</strong>
                </span>
                <span>•</span>
                <span>
                  Avg Google Position: <strong className="text-gray-800">{p.avgPosition}</strong>
                </span>
                <span>•</span>
                <span>
                  Opportunity Score: <strong className="text-gray-800">{p.avgOpportunityScore}/100</strong>
                </span>
              </div>

              <p className="text-xs text-gray-600 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                <span className="font-semibold text-gray-800">Action Strategy: </span>
                {p.recommendedFocus}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-3 md:w-80 flex-shrink-0">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                  Clicks
                </span>
                <span className="text-lg font-bold text-gray-900">{p.totalClicks}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                  Impressions
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {p.totalImpressions.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider block">
                  Market Demand
                </span>
                <span className="text-lg font-bold text-blue-900">
                  {p.representedSearchVolume.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
