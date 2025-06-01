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
import { DashboardData } from '../api/dashboard/route';

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
    <div className="space-y-6">
      {/* Storage Usage Card */}
      <Usage allowedStorage={data.allowedStorage} usedStorage={data.usedStorage} />

      {/* Active Shares */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Active Shares</h2>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
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
            title="No Active Shares"
            description="You don't have any active shares at the moment. Create a new share to get started."
            icon={FiUpload}
          />
        )}
      </div>

      {/* Expired Shares */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Expired Shares</h2>
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
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
            title="No Expired Shares"
            description="You don't have any expired shares. This is good - all your shares are still active!"
            icon={FiInbox}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardHome;