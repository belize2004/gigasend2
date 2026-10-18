import type { PaidPlan } from '@/types/app-data'
import BillingDetails from '@/components/dashboard/billing/BillingDetails'
// import PaymentMethod from '@/components/dashboard/billing/PaymentMethod'
import PlanDetails from '@/components/dashboard/billing/PlanDetails'
import SecurityNotice from '@/components/dashboard/billing/SecurityNotice'
import SubscriptionManagement from '@/components/dashboard/billing/SubscriptionManagement'
import React from 'react'

export default function Paid(
  { data, onSubscriptionCancel }: { data: PaidPlan, onSubscriptionCancel: () => void }
) {
  const calculateDaysUntilBilling = (): number => {
    const today = new Date();
    const nextBilling = new Date(data.nextBillingDate);
    const diffTime = nextBilling.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilBilling = calculateDaysUntilBilling();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {data.isVipPartner ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm">
                ⭐ VIP Partner Plan (12-Month Pro Grant)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Active Subscription
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Billing & Subscription</h1>
          <p className="text-xs sm:text-sm text-slate-300 font-body mt-0.5">
            {data.isVipPartner
              ? "Complimentary Partner access with 80 GB of storage and 30-day file retention through October 18, 2027."
              : "Manage your active plan, billing schedule, and subscription preferences."}
          </p>
        </div>
      </div>

      {/* Current Plan Card */}
      <PlanDetails
        nextBillingAmount={data.nextBillingAmount}
        planName={data.planName}
        daysUntilBilling={daysUntilBilling}
        isVipPartner={data.isVipPartner}
        planFeatures={data.planFeatures}
      />

      {/* Billing Details Card */}
      <BillingDetails
        nextBillingAmount={data.nextBillingAmount}
        nextBillingDate={data.nextBillingDate}
        subscriptionStartDate={data.subscriptionStartDate}
        isVipPartner={data.isVipPartner}
      />

      {/* Payment Method Card */}
      {/* <PaymentMethod
        last4={data.last4}
        exp_month={data.exp_month}
        exp_year={data.exp_year}
      /> */}

      {/* Subscription Management */}
      <SubscriptionManagement
        onSubscriptionCancel={onSubscriptionCancel}
        isVipPartner={data.isVipPartner}
      />

      {/* Security Notice */}
      <SecurityNotice />
    </div>
  )
}
