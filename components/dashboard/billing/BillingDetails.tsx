import { formatDate } from '@/lib/utils'
import React from 'react'
import { FiCalendar, FiDollarSign } from 'react-icons/fi'

interface Props {
  nextBillingDate: string;
  nextBillingAmount: number;
  subscriptionStartDate: string;
  isVipPartner?: boolean;
}

export default function BillingDetails({ nextBillingDate, nextBillingAmount, subscriptionStartDate, isVipPartner }: Props) {
  return (
    <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
      <div className="mb-6">
        <span className="label-caps text-sky-400 text-[10px] block mb-0.5">Schedule & Cycle</span>
        <h2 className="text-xl font-bold text-white font-display">Billing Details</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-ocean-950/70 border border-white/10 rounded-2xl">
            <div className="flex items-center">
              <FiCalendar className="text-gold-400 mr-3 text-lg" />
              <span className="text-xs font-medium text-slate-300">Billing Cycle</span>
            </div>
            <span className="text-sm font-bold text-white font-display">
              {isVipPartner ? "12-Month VIP Grant" : "Monthly"}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-ocean-950/70 border border-white/10 rounded-2xl">
            <div className="flex items-center">
              <FiCalendar className="text-sky-400 mr-3 text-lg" />
              <span className="text-xs font-medium text-slate-300">
                {isVipPartner ? "Grant Expiration Date" : "Next Billing Date"}
              </span>
            </div>
            <span className="text-sm font-bold text-white font-mono">
              {formatDate(nextBillingDate)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-ocean-950/70 border border-white/10 rounded-2xl">
            <div className="flex items-center">
              <FiDollarSign className="text-emerald-400 mr-3 text-lg" />
              <span className="text-xs font-medium text-slate-300">Amount</span>
            </div>
            <span className="text-sm font-bold text-emerald-400 font-mono">
              {isVipPartner ? "$0.00 (Partner Sponsorship)" : `$${nextBillingAmount.toFixed(2)}`}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-ocean-950/70 border border-white/10 rounded-2xl">
            <div className="flex items-center">
              <FiCalendar className="text-gold-400 mr-3 text-lg" />
              <span className="text-xs font-medium text-slate-300">
                {isVipPartner ? "Grant Start Date" : "Subscription Start"}
              </span>
            </div>
            <span className="text-sm font-bold text-white font-mono">
              {formatDate(subscriptionStartDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
