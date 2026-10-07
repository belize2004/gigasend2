import React, { useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiDollarSign,
  FiKey,
  FiLock,
  FiRefreshCw,
  FiShield,
  FiZap,
} from "react-icons/fi";

interface CostObservabilityPanelProps {
  summary: {
    totalKeywords: number;
    apiCallsCount: number;
    apiSpendTotalUsd: number;
    cacheHitRatePct: number;
    lastSyncedAt: string | null;
  };
  onRunAction: (level: number) => Promise<void>;
  loadingAction: boolean;
}

export default function CostObservabilityPanel({
  summary,
  onRunAction,
  loadingAction,
}: CostObservabilityPanelProps) {
  const [selectedJob, setSelectedJob] = useState<{
    level: number;
    title: string;
    description: string;
    estimatedCost: string;
    estimatedKeywords: number;
  } | null>(null);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState<string | null>(null);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsStatus(null);
    try {
      const res = await fetch("/api/admin/seo/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataforseo_login: login,
          dataforseo_password: password,
        }),
      });
      if (res.ok) {
        setSettingsStatus("Credentials saved successfully to Cloudflare D1.");
      } else {
        setSettingsStatus("Failed to save credentials.");
      }
    } catch {
      setSettingsStatus("Network error updating credentials.");
    } finally {
      setSavingSettings(false);
    }
  };

  const actionJobs = [
    {
      level: 1,
      title: "Sync GSC & Run Level 1 Enrichment",
      description: "Pull latest Search Console query rows and run bulk search volume, CPC, difficulty, and intent enrichment.",
      estimatedCost: "$0.05 USD",
      estimatedKeywords: 56,
    },
    {
      level: 2,
      title: "Run Level 2 Promising SERP Intelligence",
      description: "Deep SERP analysis for striking-distance keywords (ranks 4–20). Identifies live competitor domains, URLs, and SERP features.",
      estimatedCost: "$0.02 USD",
      estimatedKeywords: 10,
    },
    {
      level: 3,
      title: "Run Level 3 High-Value Keyword Expansion",
      description: "Discovers long-tail related questions, buyer intent variations, and competitor gaps for top seed terms.",
      estimatedCost: "$0.04 USD",
      estimatedKeywords: 7,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          DataForSEO API Observability & Budget Controls
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Real-time API spend telemetry, TTL caching enforcement, and guarded job execution to prevent unexpected costs.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total API Spend</span>
            <FiDollarSign className="text-base text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${summary.apiSpendTotalUsd.toFixed(2)}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">Cumulative logged spend</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cache Hit Rate</span>
            <FiZap className="text-base text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            {summary.cacheHitRatePct}%
          </div>
          <span className="text-xs text-emerald-600 mt-1 block">Duplicate spend prevented</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Keywords Enriched</span>
            <FiDatabase className="text-base text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {summary.totalKeywords}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">Across all 3 levels</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Last Run</span>
            <FiClock className="text-base text-gray-500" />
          </div>
          <div className="text-sm font-bold text-gray-800 line-clamp-1 mt-1">
            {summary.lastSyncedAt ? summary.lastSyncedAt.split(" ")[0] : "Today"}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">Automatic 30-day TTL</span>
        </div>
      </div>

      {/* Manual Actions with Cost Confirmation Guards */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-gray-900 tracking-tight">
          Guarded Pipeline Execution
        </h3>
        <p className="text-xs text-gray-500">
          Expensive bulk API runs require explicit confirmation showing estimated cost and keyword scope.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionJobs.map((job) => (
            <div
              key={job.level}
              className="p-5 bg-gray-50/70 rounded-2xl border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100/60 px-2.5 py-0.5 rounded-full">
                    Level {job.level}
                  </span>
                  <span className="text-xs font-semibold text-gray-800">
                    Est. {job.estimatedCost}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900">{job.title}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{job.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  {job.estimatedKeywords} keywords
                </span>
                <button
                  disabled={loadingAction}
                  onClick={() => setSelectedJob(job)}
                  className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
                >
                  <FiRefreshCw className={loadingAction ? "animate-spin" : ""} />
                  <span>Run Job</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Form for DataForSEO Credentials */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <FiKey className="text-blue-600" />
          <h3 className="text-base font-semibold text-gray-900 tracking-tight">
            DataForSEO API Credentials
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Provide your DataForSEO API Login and API Password. When configured, live HTTP Basic Auth requests will be made; otherwise the calibrated fallback engine serves verified search space data.
        </p>

        <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                API Login (Email)
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="your-email@domain.com"
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                API Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="DataForSEO API Password"
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={savingSettings}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-full transition-colors"
            >
              {savingSettings ? "Saving..." : "Save Credentials"}
            </button>
            {settingsStatus && (
              <span className="text-xs font-medium text-gray-600">{settingsStatus}</span>
            )}
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <FiShield className="text-xl" />
              <h3 className="text-base font-bold text-gray-900">Confirm API Execution</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              You are about to execute <strong>{selectedJob.title}</strong> across{" "}
              <strong>{selectedJob.estimatedKeywords} keywords</strong>.
            </p>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Estimated Cost:</span>
              <span className="font-bold text-gray-900">{selectedJob.estimatedCost}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const level = selectedJob.level;
                  setSelectedJob(null);
                  await onRunAction(level);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              >
                Confirm & Run
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
