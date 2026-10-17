"use client"
import type { BillingData } from '@/types/app-data';
import React, { useEffect, useState } from 'react';
import Paid from './Paid';
import Free from './Free';
import axios, { AxiosError } from 'axios';


const DashboardBilling: React.FC = () => {
  const [data, setData] = useState<BillingData | null>(null)

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get<ApiResponse<BillingData>>('/api/dashboard/billing');
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

  if (!data) {
    return (
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl p-8 text-center text-slate-300 text-sm">
        Loading billing details...
      </div>
    )
  }

  if (!data.isFree) {
    return <Paid data={data} onSubscriptionCancel={() => setData({ isFree: true })} />
  }

  return <Free />
};

export default DashboardBilling;