import React, { useState } from "react";
import type { KeywordRecord } from "@/src/lib/seo/seoAdminService";

interface OpportunityMatrixProps {
  keywords: KeywordRecord[];
  onSelectKeyword: (id: string) => void;
}

export default function OpportunityMatrix({
  keywords,
  onSelectKeyword,
}: OpportunityMatrixProps) {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [minProductFit, setMinProductFit] = useState<number>(0);

  const clusters = Array.from(new Set(keywords.map((k) => k.clusterName || "Other")));

  const filtered = keywords.filter((k) => {
    if (selectedCluster !== "all" && k.clusterName !== selectedCluster) return false;
    if (k.productFitScore < minProductFit) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            2D Search Opportunity Matrix
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Plotting verified GSC Traction (X-axis) against estimated Market Demand (Y-axis).
          </p>
        </div>

        {/* Matrix Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-500">Topic Cluster:</label>
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-gray-700 focus:outline-none"
            >
              <option value="all">All Clusters</option>
              {clusters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-500">Min Product Fit:</label>
            <select
              value={minProductFit}
              onChange={(e) => setMinProductFit(Number(e.target.value))}
              className="text-xs bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-gray-700 focus:outline-none"
            >
              <option value={0}>Any Fit (0+)</option>
              <option value={50}>Moderate (50+)</option>
              <option value={75}>High Fit (75+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Quadrants Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Left: Major Opportunity */}
        <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 tracking-wide uppercase">
                Quadrant 2 · Major Opportunities
              </span>
              <span className="text-xs font-medium text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                High Demand + Low Traction
              </span>
            </div>
            <p className="text-xs text-amber-900/80 mt-1">
              Substantial market demand where GigaSend is underexposed. Primary targets for dedicated content and landing pages.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {filtered
              .filter((k) => (k.searchVolume ?? 0) >= 500 && (k.gscPosition === 0 || k.gscPosition > 20))
              .slice(0, 4)
              .map((k) => (
                <div
                  key={k.id}
                  onClick={() => onSelectKeyword(k.id)}
                  className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-100 hover:border-amber-300 cursor-pointer transition-all shadow-2xs"
                >
                  <span className="text-xs font-medium text-gray-900 line-clamp-1">{k.query}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-blue-700 font-semibold">
                      {k.searchVolume?.toLocaleString()} vol
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      {k.opportunityScore}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Top Right: Protect and Improve */}
        <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">
                Quadrant 1 · Protect & Optimize
              </span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                High Demand + High Traction
              </span>
            </div>
            <p className="text-xs text-emerald-900/80 mt-1">
              Established Google visibility with active impressions. Refine on-page titles and CTR snippets to secure #1–#3 rankings.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {filtered
              .filter((k) => (k.searchVolume ?? 0) >= 300 && k.gscPosition > 0 && k.gscPosition <= 20)
              .slice(0, 4)
              .map((k) => (
                <div
                  key={k.id}
                  onClick={() => onSelectKeyword(k.id)}
                  className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 cursor-pointer transition-all shadow-2xs"
                >
                  <span className="text-xs font-medium text-gray-900 line-clamp-1">{k.query}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-emerald-700 font-semibold">
                      Pos {k.gscPosition.toFixed(1)}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {k.opportunityScore}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom Left: Low Priority */}
        <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-600 tracking-wide uppercase">
                Quadrant 4 · Low Priority / Monitor
              </span>
              <span className="text-xs font-medium text-gray-600 bg-gray-200/60 px-2 py-0.5 rounded-full">
                Low Demand + Low Traction
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Low search demand with minimal Google exposure. Keep in database for automated tracking without active resource spend.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {filtered
              .filter((k) => (k.searchVolume ?? 0) < 300 && (k.gscPosition === 0 || k.gscPosition > 40))
              .slice(0, 4)
              .map((k) => (
                <div
                  key={k.id}
                  onClick={() => onSelectKeyword(k.id)}
                  className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-100 hover:border-gray-300 cursor-pointer transition-all shadow-2xs"
                >
                  <span className="text-xs font-medium text-gray-700 line-clamp-1">{k.query}</span>
                  <span className="text-xs text-gray-400">Score {k.opportunityScore}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom Right: Niche Long-Tail */}
        <div className="p-5 bg-teal-50/40 rounded-2xl border border-teal-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-800 tracking-wide uppercase">
                Quadrant 3 · Niche & GSC Long-Tail
              </span>
              <span className="text-xs font-medium text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full">
                Low/Zero Volume + High GSC Traction
              </span>
            </div>
            <p className="text-xs text-teal-900/80 mt-1">
              Terms with low reported volume in traditional tools, but verified actual impressions in Google Search Console.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {filtered
              .filter((k) => (k.searchVolume ?? 0) < 300 && k.gscPosition > 0 && k.gscPosition <= 20)
              .slice(0, 4)
              .map((k) => (
                <div
                  key={k.id}
                  onClick={() => onSelectKeyword(k.id)}
                  className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-teal-100 hover:border-teal-300 cursor-pointer transition-all shadow-2xs"
                >
                  <span className="text-xs font-medium text-gray-900 line-clamp-1">{k.query}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-teal-700 font-semibold">
                      Pos {k.gscPosition.toFixed(1)}
                    </span>
                    <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                      {k.opportunityScore}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
