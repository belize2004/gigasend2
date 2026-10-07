import React, { useState, useMemo } from "react";
import type { KeywordRecord } from "@/src/lib/seo/seoAdminService";
import {
  FiArrowDown,
  FiArrowUp,
  FiChevronRight,
  FiFilter,
  FiSearch,
  FiSliders,
} from "react-icons/fi";

interface KeywordTableProps {
  keywords: KeywordRecord[];
  onSelectKeyword: (id: string) => void;
}

type SortField =
  | "opportunityScore"
  | "productFitScore"
  | "gscImpressions"
  | "gscClicks"
  | "gscPosition"
  | "searchVolume"
  | "cpc"
  | "keywordDifficulty"
  | "query";

export default function KeywordTable({ keywords, onSelectKeyword }: KeywordTableProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("opportunityScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filterTabs = [
    { id: "all", label: "All Keywords", count: keywords.length },
    {
      id: "striking_distance",
      label: "Striking Distance",
      count: keywords.filter((k) => k.opportunityStatus === "STRIKING DISTANCE").length,
    },
    {
      id: "underexposed",
      label: "Underexposed",
      count: keywords.filter((k) => k.opportunityStatus === "UNDEREXPOSED").length,
    },
    {
      id: "high_commercial",
      label: "Commercial Intent",
      count: keywords.filter((k) => k.opportunityStatus === "HIGH COMMERCIAL INTENT").length,
    },
    {
      id: "gsc_long_tail",
      label: "GSC Long Tail",
      count: keywords.filter((k) => k.opportunityStatus === "GSC-VALIDATED LONG TAIL").length,
    },
    {
      id: "discovery",
      label: "DataForSEO Discovery",
      count: keywords.filter((k) => k.origin === "dataforseo_discovery").length,
    },
    {
      id: "high_fit",
      label: "High Product Fit (≥70)",
      count: keywords.filter((k) => k.productFitScore >= 70).length,
    },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection(field === "gscPosition" ? "asc" : "desc");
    }
  };

  const filtered = useMemo(() => {
    return keywords.filter((k) => {
      // 1. Text Search
      if (search) {
        const queryNorm = k.query.toLowerCase();
        const clusterNorm = (k.clusterName || "").toLowerCase();
        const actionNorm = (k.recommendedAction || "").toLowerCase();
        const term = search.toLowerCase();
        if (!queryNorm.includes(term) && !clusterNorm.includes(term) && !actionNorm.includes(term)) {
          return false;
        }
      }

      // 2. Filter Tabs
      if (activeFilter === "striking_distance") return k.opportunityStatus === "STRIKING DISTANCE";
      if (activeFilter === "underexposed") return k.opportunityStatus === "UNDEREXPOSED";
      if (activeFilter === "high_commercial") return k.opportunityStatus === "HIGH COMMERCIAL INTENT";
      if (activeFilter === "gsc_long_tail") return k.opportunityStatus === "GSC-VALIDATED LONG TAIL";
      if (activeFilter === "discovery") return k.origin === "dataforseo_discovery";
      if (activeFilter === "high_fit") return k.productFitScore >= 70;

      return true;
    });
  }, [keywords, search, activeFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (aVal === null || aVal === undefined) aVal = sortDirection === "asc" ? Infinity : -Infinity;
      if (bVal === null || bVal === undefined) bVal = sortDirection === "asc" ? Infinity : -Infinity;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      const numA = Number(aVal);
      const numB = Number(bVal);

      return sortDirection === "asc" ? numA - numB : numB - numA;
    });
  }, [filtered, sortField, sortDirection]);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-6 border-b border-gray-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
              Keyword Intelligence Matrix
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Side-by-side GSC exposure and DataForSEO market demand for {keywords.length} total keywords.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search queries, clusters, actions..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilter === tab.id
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeFilter === tab.id
                    ? "bg-gray-800 text-gray-200"
                    : "bg-gray-200/70 text-gray-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider select-none">
              <th
                onClick={() => handleSort("query")}
                className="py-3.5 pl-6 pr-4 cursor-pointer hover:text-gray-900"
              >
                <div className="flex items-center gap-1">
                  <span>Keyword & Origin</span>
                  {sortField === "query" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("opportunityScore")}
                className="py-3.5 px-3 text-right cursor-pointer hover:text-gray-900"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Opp Score</span>
                  {sortField === "opportunityScore" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("productFitScore")}
                className="py-3.5 px-3 text-right cursor-pointer hover:text-gray-900"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Product Fit</span>
                  {sortField === "productFitScore" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              {/* GSC Columns */}
              <th
                onClick={() => handleSort("gscImpressions")}
                className="py-3.5 px-3 text-right cursor-pointer hover:text-gray-900 bg-emerald-50/20"
              >
                <div className="flex items-center justify-end gap-1 text-emerald-800">
                  <span>GSC Imp</span>
                  {sortField === "gscImpressions" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("gscPosition")}
                className="py-3.5 px-3 text-right cursor-pointer hover:text-gray-900 bg-emerald-50/20"
              >
                <div className="flex items-center justify-end gap-1 text-emerald-800">
                  <span>GSC Rank</span>
                  {sortField === "gscPosition" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              {/* DataForSEO Columns */}
              <th
                onClick={() => handleSort("searchVolume")}
                className="py-3.5 px-3 text-right cursor-pointer hover:text-gray-900 bg-blue-50/20"
              >
                <div className="flex items-center justify-end gap-1 text-blue-800">
                  <span>Est Volume</span>
                  {sortField === "searchVolume" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("cpc")}
                className="py-3.5 px-3 text-right cursor-pointer hover:text-gray-900 bg-blue-50/20"
              >
                <div className="flex items-center justify-end gap-1 text-blue-800">
                  <span>CPC</span>
                  {sortField === "cpc" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("keywordDifficulty")}
                className="py-3.5 px-3 text-right cursor-pointer hover:text-gray-900 bg-blue-50/20"
              >
                <div className="flex items-center justify-end gap-1 text-blue-800">
                  <span>KD</span>
                  {sortField === "keywordDifficulty" && (
                    sortDirection === "asc" ? <FiArrowUp className="text-xs" /> : <FiArrowDown className="text-xs" />
                  )}
                </div>
              </th>

              <th className="py-3.5 px-4 text-left">Status</th>
              <th className="py-3.5 pr-6 pl-3 text-left">Recommended Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {sorted.map((k) => (
              <tr
                key={k.id}
                onClick={() => onSelectKeyword(k.id)}
                className="hover:bg-blue-50/30 cursor-pointer transition-colors group"
              >
                {/* Keyword & Origin */}
                <td className="py-3.5 pl-6 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {k.query}
                    </span>
                    {k.origin === "gsc" ? (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        GSC
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                        Discovery
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-2">
                    <span>{k.clusterName}</span>
                    {k.parentGscQuery && (
                      <span className="text-purple-600 font-medium">
                        ↳ from: "{k.parentGscQuery}"
                      </span>
                    )}
                  </div>
                </td>

                {/* Opportunity Score */}
                <td className="py-3.5 px-3 text-right">
                  <span
                    className={`inline-block font-bold text-sm px-2.5 py-0.5 rounded-full ${
                      k.opportunityScore >= 75
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : k.opportunityScore >= 50
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {k.opportunityScore}
                  </span>
                </td>

                {/* Product Fit */}
                <td className="py-3.5 px-3 text-right font-medium text-gray-700">
                  {k.productFitScore}
                  <span className="text-xs text-gray-400">/100</span>
                </td>

                {/* GSC Imp */}
                <td className="py-3.5 px-3 text-right font-medium text-emerald-800 bg-emerald-50/10">
                  {k.gscImpressions.toLocaleString()}
                </td>

                {/* GSC Rank */}
                <td className="py-3.5 px-3 text-right font-medium text-emerald-800 bg-emerald-50/10">
                  {k.gscPosition > 0 ? k.gscPosition.toFixed(1) : "—"}
                </td>

                {/* DataForSEO Volume */}
                <td className="py-3.5 px-3 text-right font-medium text-blue-900 bg-blue-50/10">
                  {k.searchVolume !== null ? k.searchVolume.toLocaleString() : "0"}
                </td>

                {/* CPC */}
                <td className="py-3.5 px-3 text-right text-gray-700 bg-blue-50/10">
                  {k.cpc !== null ? `$${k.cpc.toFixed(2)}` : "—"}
                </td>

                {/* KD */}
                <td className="py-3.5 px-3 text-right font-medium text-gray-700 bg-blue-50/10">
                  {k.keywordDifficulty !== null ? k.keywordDifficulty : "—"}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                    {k.opportunityStatus}
                  </span>
                </td>

                {/* Recommended Action */}
                <td className="py-3.5 pr-6 pl-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-900 line-clamp-1">
                      {k.recommendedAction}
                    </span>
                    <FiChevronRight className="text-gray-400 text-xs flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
