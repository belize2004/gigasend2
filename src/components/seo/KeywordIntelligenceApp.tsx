import React, { useEffect, useState } from "react";
import axios from "axios";
import type { SeoOverviewData, KeywordRecord } from "@/src/lib/seo/seoAdminService";
import OpportunityCards from "./OpportunityCards";
import KeywordTable from "./KeywordTable";
import OpportunityMatrix from "./OpportunityMatrix";
import PageIntelligenceView from "./PageIntelligenceView";
import CostObservabilityPanel from "./CostObservabilityPanel";
import KeywordDetailModal from "./KeywordDetailModal";
import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiCompass,
  FiDatabase,
  FiDollarSign,
  FiGrid,
  FiLayers,
  FiList,
  FiRefreshCw,
  FiSearch,
  FiSend,
  FiSliders,
  FiTrendingUp,
} from "react-icons/fi";

export default function KeywordIntelligenceApp() {
  const [data, setData] = useState<SeoOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "opportunities" | "table" | "matrix" | "pages" | "competitors" | "cost"
  >("opportunities");
  const [selectedKeywordId, setSelectedKeywordId] = useState<string | null>(null);
  const [runningAction, setRunningAction] = useState(false);
  const [broadcastingIndexNow, setBroadcastingIndexNow] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<{ success: boolean; data: SeoOverviewData }>(
        "/api/admin/seo/overview"
      );
      if (res.data?.success && res.data?.data) {
        setData(res.data.data);
      } else {
        setError("Failed to parse SEO overview response");
      }
    } catch (err: any) {
      console.error("Error loading SEO data:", err);
      setError(err?.response?.data?.message || err?.message || "Failed to connect to SEO engine");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRunAction = async (level: number) => {
    setRunningAction(true);
    setActionNotice(null);
    try {
      const res = await axios.post<{ success: boolean; data: SeoOverviewData; message: string }>(
        "/api/admin/seo/sync",
        { level }
      );
      if (res.data?.success && res.data?.data) {
        setData(res.data.data);
        setActionNotice(res.data.message || `Level ${level} completed successfully!`);
        setTimeout(() => setActionNotice(null), 5000);
      }
    } catch (err: any) {
      setActionNotice(err?.response?.data?.message || "Action failed");
    } finally {
      setRunningAction(false);
    }
  };

  const handleIndexNow = async () => {
    setBroadcastingIndexNow(true);
    setActionNotice(null);
    try {
      const res = await axios.post<{ success: boolean; message: string }>(
        "/api/admin/seo/indexnow"
      );
      if (res.data?.success) {
        setActionNotice(res.data.message || "IndexNow broadcast completed!");
        setTimeout(() => setActionNotice(null), 6000);
      } else {
        setActionNotice(res.data?.message || "IndexNow broadcast failed");
      }
    } catch (err: any) {
      setActionNotice(err?.response?.data?.message || "IndexNow request failed");
    } finally {
      setBroadcastingIndexNow(false);
    }
  };

  const selectedKeyword =
    selectedKeywordId && data ? data.keywords.find((k) => k.id === selectedKeywordId) || null : null;

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-gray-900 pb-24 antialiased selection:bg-blue-100">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <FiArrowLeft className="text-sm" />
              <span>Admin</span>
            </a>

            <div className="h-4 w-[1px] bg-gray-200" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h1 className="text-base font-bold tracking-tight text-gray-900">
                GigaSend Keyword Intelligence
              </h1>
              <span className="text-[10px] font-semibold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase">
                GSC × DataForSEO Engine
              </span>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-3">
            {actionNotice && (
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-in fade-in">
                {actionNotice}
              </span>
            )}

            <button
              onClick={handleIndexNow}
              disabled={broadcastingIndexNow || loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-full shadow-sm transition-all"
            >
              <FiSend className={`text-xs ${broadcastingIndexNow ? "animate-pulse" : ""}`} />
              <span>{broadcastingIndexNow ? "Broadcasting..." : "Broadcast IndexNow"}</span>
            </button>

            <button
              onClick={() => handleRunAction(1)}
              disabled={runningAction || loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-semibold rounded-full shadow-sm transition-all"
            >
              <FiRefreshCw className={`text-xs ${runningAction ? "animate-spin" : ""}`} />
              <span>{runningAction ? "Processing..." : "Sync & Enrich"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Badges Banner */}
        {data && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                GSC Discovered Queries
              </span>
              <span className="text-xl font-bold text-gray-900 mt-0.5 block">
                {data.summary.gscKeywordsCount}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">Verified by Google</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                DataForSEO Expansions
              </span>
              <span className="text-xl font-bold text-purple-700 mt-0.5 block">
                {data.summary.dataforseoDiscoveryCount}
              </span>
              <span className="text-[10px] text-purple-600 font-medium">Market Discovery</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                Striking Distance (4–20)
              </span>
              <span className="text-xl font-bold text-emerald-700 mt-0.5 block">
                {data.summary.strikingDistanceCount}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">Immediate upside</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                Underexposed Terms
              </span>
              <span className="text-xl font-bold text-amber-700 mt-0.5 block">
                {data.summary.underexposedCount}
              </span>
              <span className="text-[10px] text-amber-600 font-medium">High headroom</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                Total Market Demand
              </span>
              <span className="text-xl font-bold text-blue-900 mt-0.5 block">
                {Math.round(data.summary.totalRepresentedDemand / 1000)}K/mo
              </span>
              <span className="text-[10px] text-blue-600 font-medium">US search volume</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                Average Opportunity
              </span>
              <span className="text-xl font-bold text-gray-900 mt-0.5 block">
                {data.summary.avgOpportunityScore}/100
              </span>
              <span className="text-[10px] text-gray-400 font-medium">Universe health</span>
            </div>
          </div>
        )}

        {/* Cupertino Segmented Tab Control */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-gray-200/70 rounded-full border border-gray-200 shadow-2xs gap-1 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab("opportunities")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "opportunities"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiCompass className="text-xs" />
              <span>Top Opportunities</span>
            </button>

            <button
              onClick={() => setActiveTab("table")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "table"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiList className="text-xs" />
              <span>Keyword Table ({data?.keywords.length ?? 0})</span>
            </button>

            <button
              onClick={() => setActiveTab("matrix")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "matrix"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiGrid className="text-xs" />
              <span>Opportunity Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab("pages")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "pages"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiLayers className="text-xs" />
              <span>Page Intelligence</span>
            </button>

            <button
              onClick={() => setActiveTab("competitors")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "competitors"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiActivity className="text-xs" />
              <span>SERP Competitors</span>
            </button>

            <button
              onClick={() => setActiveTab("cost")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "cost"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiDollarSign className="text-xs" />
              <span>API Cost & Controls</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
            <FiRefreshCw className="text-3xl text-blue-600 animate-spin mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900">Loading Keyword Intelligence Engine...</h3>
            <p className="text-xs text-gray-500 mt-1">Connecting to Cloudflare D1 and parsing search records.</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 p-6 rounded-3xl border border-red-200 text-center space-y-2">
            <h3 className="text-sm font-bold text-red-900">Unable to load Keyword Intelligence</h3>
            <p className="text-xs text-red-700">{error}</p>
            <button
              onClick={loadData}
              className="mt-2 px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-full"
            >
              Retry
            </button>
          </div>
        )}

        {/* Tab 1: Top Opportunities */}
        {!loading && data && activeTab === "opportunities" && (
          <OpportunityCards
            opportunities={data.topOpportunities}
            onSelectKeyword={(id) => setSelectedKeywordId(id)}
          />
        )}

        {/* Tab 2: Keyword Table */}
        {!loading && data && activeTab === "table" && (
          <KeywordTable
            keywords={data.keywords}
            onSelectKeyword={(id) => setSelectedKeywordId(id)}
          />
        )}

        {/* Tab 3: Opportunity Matrix */}
        {!loading && data && activeTab === "matrix" && (
          <OpportunityMatrix
            keywords={data.keywords}
            onSelectKeyword={(id) => setSelectedKeywordId(id)}
          />
        )}

        {/* Tab 4: Page Intelligence */}
        {!loading && data && activeTab === "pages" && (
          <PageIntelligenceView pages={data.pageIntelligence} />
        )}

        {/* Tab 5: SERP Competitors */}
        {!loading && data && activeTab === "competitors" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                Organic Search Competitors Revealed by SERPs
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Frequency and average rank of competing domains appearing in the top 10 for GigaSend queries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {data.competitors.map((c) => (
                <div
                  key={c.id}
                  className="p-5 bg-gray-50/70 rounded-2xl border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-900">{c.name}</span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {c.competitorType}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">{c.domain}</div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{c.notes}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      SERP Overlap: <strong className="text-gray-800">{c.serpOverlapCount} queries</strong>
                    </span>
                    <span className="text-gray-500">
                      Avg Pos: <strong className="text-gray-800">{c.avgPosition}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: API Observability & Cost Controls */}
        {!loading && data && activeTab === "cost" && (
          <CostObservabilityPanel
            summary={data.summary}
            onRunAction={handleRunAction}
            loadingAction={runningAction}
          />
        )}
      </main>

      {/* Keyword Detail Modal */}
      {selectedKeyword && (
        <KeywordDetailModal
          keyword={selectedKeyword}
          onClose={() => setSelectedKeywordId(null)}
        />
      )}
    </div>
  );
}
