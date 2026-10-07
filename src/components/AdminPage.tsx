"use client";

import ProtectedPage from "@/components/ProtectedPage";
import { formatBytes } from "@/lib/utils";
import type { AdminOverviewData } from "@/types/app-data";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiCompass,
  FiCreditCard,
  FiDatabase,
  FiHardDrive,
  FiLock,
  FiMessageSquare,
  FiRefreshCw,
  FiSend,
  FiUsers,
} from "react-icons/fi";

const emptyData: AdminOverviewData = {
  stats: {
    totalUsers: 0,
    totalShares: 0,
    activeShares: 0,
    expiredShares: 0,
    activeStorageBytes: 0,
    totalSharedBytes: 0,
  },
  recentUsers: [],
  recentShares: [],
  stripePlans: [],
  recentSuggestions: [],
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "blue",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  tone?: "blue" | "green" | "purple" | "orange" | "slate";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${tones[tone]}`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [data, setData] = useState<AdminOverviewData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse<AdminOverviewData>>("/api/admin/overview");
      setData(response.data.data ?? emptyData);
      setLocked(false);
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse & { code?: string }>;
      const responseData = axiosError.response?.data;
      if (responseData?.code === "ADMIN_PASSWORD_REQUIRED") {
        setLocked(true);
        setError(null);
      } else {
        setError(responseData?.message ?? "Unable to load admin panel");
      }
    } finally {
      setLoading(false);
    }
  };

  const unlockAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnlocking(true);
    setError(null);
    try {
      await axios.post("/api/admin/login", { password });
      setPassword("");
      await loadAdminData();
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse>;
      setError(axiosError.response?.data?.message ?? "Unable to unlock admin panel");
    } finally {
      setUnlocking(false);
    }
  };

  const lockAdmin = async () => {
    await axios.post("/api/admin/logout").catch(() => undefined);
    setLocked(true);
    setData(emptyData);
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  return (
    <ProtectedPage>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">Admin</p>
              <h1 className="text-3xl font-bold text-gray-900">GigaSend Control Panel</h1>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/admin/seo"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors gap-2"
              >
                <FiCompass />
                <span>Keyword Intelligence</span>
                {data.seoStats && (
                  <span className="rounded-full bg-blue-500/80 px-2 py-0.5 text-xs font-bold text-white">
                    {data.seoStats.strikingDistanceCount} wins
                  </span>
                )}
              </a>
              <button
                onClick={locked ? undefined : loadAdminData}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow hover:bg-gray-50 disabled:opacity-60"
              >
                <FiRefreshCw className={`mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 flex items-center">
              <FiAlertCircle className="mr-3 flex-shrink-0" />
              {error}
            </div>
          )}

          {locked ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <FiLock className="text-xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Unlock Admin Panel</h2>
              <p className="text-sm text-gray-600 mt-2">
                Re-enter your account password to open this admin session.
              </p>
              <form onSubmit={unlockAdmin} className="mt-5 space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Admin password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="submit"
                  disabled={unlocking}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
                >
                  {unlocking ? "Unlocking..." : "Unlock Admin"}
                </button>
              </form>
            </div>
          ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
            <StatCard icon={FiUsers} label="Users" value={data.stats.totalUsers} tone="blue" />
            <StatCard icon={FiSend} label="Transfers" value={data.stats.totalShares} tone="purple" />
            <StatCard icon={FiCheckCircle} label="Active" value={data.stats.activeShares} tone="green" />
            <StatCard icon={FiActivity} label="Expired" value={data.stats.expiredShares} tone="orange" />
            <StatCard icon={FiHardDrive} label="Active Storage" value={formatBytes(data.stats.activeStorageBytes)} tone="slate" />
            <StatCard icon={FiDatabase} label="All-Time Data" value={formatBytes(data.stats.totalSharedBytes)} tone="slate" />
          </div>

          {data.seoStats && (
            <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl shadow-lg p-6 text-white border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                      Ops SEO Intelligence
                    </p>
                  </div>
                  <h2 className="text-xl font-bold mt-1 text-white">
                    GSC × DataForSEO Keyword Engine
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                    <strong className="text-emerald-400 font-semibold">Next Tactical Action:</strong> {data.seoStats.topAction}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="/admin/seo"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow transition-colors"
                  >
                    <FiCompass className="mr-2" />
                    Open Full Suite →
                  </a>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-slate-300">Tracked Keywords</p>
                  <p className="text-2xl font-bold text-white mt-1">{data.seoStats.totalKeywords}</p>
                </div>
                <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-400/20">
                  <p className="text-xs text-emerald-300">Striking Distance (Pos 4-20)</p>
                  <p className="text-2xl font-bold text-emerald-300 mt-1">{data.seoStats.strikingDistanceCount}</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-400/20">
                  <p className="text-xs text-amber-300">Underexposed Demands</p>
                  <p className="text-2xl font-bold text-amber-300 mt-1">{data.seoStats.underexposedCount}</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-400/20">
                  <p className="text-xs text-purple-300">High Product Fit (&ge;70)</p>
                  <p className="text-2xl font-bold text-purple-300 mt-1">{data.seoStats.highFitCount}</p>
                </div>
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">Recent Transfers</h2>
                <span className="text-sm text-gray-500">{data.recentShares.length} shown</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-3 pr-4 font-semibold">Sender</th>
                      <th className="py-3 pr-4 font-semibold">Receiver</th>
                      <th className="py-3 pr-4 font-semibold">Size</th>
                      <th className="py-3 pr-4 font-semibold">Created</th>
                      <th className="py-3 pr-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentShares.map((share) => (
                      <tr key={share.id} className="border-b last:border-b-0">
                        <td className="py-3 pr-4 text-gray-900">{share.senderEmail}</td>
                        <td className="py-3 pr-4 text-gray-700">{share.receiverEmail}</td>
                        <td className="py-3 pr-4 text-gray-700">{formatBytes(share.size)}</td>
                        <td className="py-3 pr-4 text-gray-700">{formatDate(share.createdAt)}</td>
                        <td className="py-3 pr-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${share.isExpired ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                            {share.isExpired ? "Expired" : "Active"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">Stripe Plans</h2>
                <button onClick={lockAdmin} className="text-sm font-semibold text-gray-500 hover:text-gray-900">
                  Lock
                </button>
              </div>
              <div className="space-y-3">
                {data.stripePlans.map((plan) => (
                  <div key={plan.name} className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold capitalize text-gray-900">{plan.name}</p>
                        <p className="text-xs text-gray-500 mt-1 break-all">{plan.planId}</p>
                      </div>
                      <FiCreditCard className="text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
              <span className="text-sm text-gray-500">{data.recentUsers.length} shown</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.recentUsers.map((user) => (
                <div key={user.id} className="rounded-xl border border-gray-200 p-4">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(user.createdAt)}</span>
                    <span className={user.stripeCustomerId ? "text-green-700" : "text-gray-500"}>
                      {user.stripeCustomerId ? "Stripe customer" : "Free user"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Suggestion Box</h2>
              <span className="text-sm text-gray-500">{data.recentSuggestions.length} shown</span>
            </div>
            {data.recentSuggestions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                <FiMessageSquare className="mx-auto text-2xl text-gray-400" />
                <p className="mt-3 text-sm font-semibold text-gray-700">No suggestions yet</p>
                <p className="mt-1 text-sm text-gray-500">Visitor feedback will appear here after it is submitted.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.recentSuggestions.map((suggestion) => (
                  <article key={suggestion.id} className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {suggestion.userEmail ?? "Anonymous visitor"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">{formatDate(suggestion.createdAt)}</p>
                      </div>
                      <FiMessageSquare className="mt-1 flex-shrink-0 text-blue-600" />
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-800">{suggestion.message}</p>
                    {suggestion.pageUrl && (
                      <a
                        href={suggestion.pageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 block truncate text-xs font-semibold text-blue-700 hover:text-blue-900"
                      >
                        {suggestion.pageUrl}
                      </a>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
          </>
          )}
        </div>
      </main>
    </ProtectedPage>
  );
}
