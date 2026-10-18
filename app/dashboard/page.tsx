"use client"
import EmptyShares from '@/components/dashboard/EmptyShares';
import ShareCard from '@/components/dashboard/ShareCard';
import Usage from '@/components/dashboard/Usage';
import Link from '@/components/compat/Link';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FiUpload
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
      {/* Header with Primary Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Transfers</h1>
          <p className="text-xs sm:text-sm text-slate-300 font-body mt-0.5">
            Manage your shared links and storage.
          </p>
        </div>
        <Link
          href="/transfer"
          className="inline-flex items-center gap-2 px-5 py-2.5 btn-gold font-bold font-display text-xs rounded-xl shadow-lg shadow-gold-500/15 transition-all duration-200 tap-tactile"
        >
          <FiUpload className="text-sm" />
          <span>Send Files</span>
        </Link>
      </div>

      {/* Storage Usage Card */}
      <Usage allowedStorage={data.allowedStorage} usedStorage={data.usedStorage} />

      {/* Active Transfers */}
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white font-display">Active Transfers</h2>
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
      {expiredShares.length > 0 && (
        <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-display">Expired Transfers</h2>
            <div className="bg-rose-500/15 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {expiredShares.length} Expired
            </div>
          </div>

          <div className="grid gap-4">
            {expiredShares.map((share, key) => (
              <ShareCard key={key} {...share} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;