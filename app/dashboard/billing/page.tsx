"use client"
import { BillingData } from '@/app/api/dashboard/billing/route';
import BillingDetails from '@/components/dashboard/billing/BillingDetails';
import PaymentMethod from '@/components/dashboard/billing/PaymentMethod';
import PlanDetails from '@/components/dashboard/billing/PlanDetails';
import SecurityNotice from '@/components/dashboard/billing/SecurityNotice';
import SubscriptionManagement from '@/components/dashboard/billing/SubscriptionManagement';
import { PlanEnum } from '@/lib/constant';
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
        console.log(res.data.data)
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

  if (!data) return <></>

  if (!data.isFree) {
    return <Paid data={data} onSubscriptionCancel={() => setData({ isFree: true })} />
  }

  return <Free />
};

export default DashboardBilling;