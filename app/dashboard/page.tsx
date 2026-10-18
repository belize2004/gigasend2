"use client"
import EmptyShares from '@/components/dashboard/EmptyShares';
import ShareCard from '@/components/dashboard/ShareCard';
import Usage from '@/components/dashboard/Usage';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FiUpload,
  FiInbox
} from 'react-icons/fi';
import type { DashboardData } from '@/types/app-data';

const DashboardHome: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    allowedStorage: 0,
    usedStorage: 0,
    shares: []
  });

  const activeShares = data.shares.filter(share => new Date(share.expiresAt) > new Date());
  const expiredShares = data.shares.filter(share => new Date(share.expiresAt) < new Date());

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get<ApiResponse<DashboardData>>('/api/dashboard');
        setData(res.data.data!);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
          console.error(axiosError.response.data.message);
        } else {
          console.error("An unexpected error occurred.");
        }
      }
    })()
  }, [])

  return (
    <div className="space-y-8">
      {/* Header with Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/15 text-gold-400 border border-gold-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Edge Node Active
            </span>
            <span className="text-xs text-slate-400 font-mono">Cloudflare Anycast</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Workspace Overview</h1>
          <p className="text-xs sm:text-sm text-slate-300 font-body mt-0.5">
            Direct edge streaming and transfer package management.
          </p>
        </div>
      </div>

      {/* Storage Usage Card */}
      <Usage allowedStorage={data.allowedStorage} usedStorage={data.usedStorage} />

      {/* Active Transfers */}
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="label-caps text-gold-400 text-[10px] block mb-0.5">Live Delivery</span>
            <h2 className="text-xl font-bold text-white font-display">Active Transfers</h2>
          </div>
          <div className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {activeShares.length} Active
          </div>
        </div>

        {activeShares.length > 0 ? (
          <div className="grid gap-4">
            {activeShares.map((share, key) => (
              <ShareCard key={key} {...share} />
            ))}
          </div>
        ) : (
          <EmptyShares
            title="No Active Transfers"
            description="Files you send will appear here while their download links are active."
            icon={FiUpload}
          />
        )}
      </div>

      {/* Expired Transfers */}
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="label-caps text-slate-400 text-[10px] block mb-0.5">Archive History</span>
            <h2 className="text-xl font-bold text-white font-display">Expired Transfers</h2>
          </div>
          <div className="bg-rose-500/15 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {expiredShares.length} Expired
          </div>
        </div>

        {expiredShares.length > 0 ? (
          <div className="grid gap-4">
            {expiredShares.map((share, key) => (
              <ShareCard key={key} {...share} />
            ))}
          </div>
        ) : (
          <EmptyShares
            title="No Expired Transfers"
            description="Transfers that pass their expiration date will be listed here."
            icon={FiInbox}
            showAction={false}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardHome;