import { PlanEnum, PLANS } from '@/lib/constant';
import React from 'react'
import { FiCheck, FiDollarSign, FiStar, FiUpload } from 'react-icons/fi'

interface Props {
  planName: PlanEnum;
  nextBillingAmount: number;
  daysUntilBilling: number;
  isVipPartner?: boolean;
  planFeatures?: string[];
}

export default function PlanDetails({ planName, nextBillingAmount, daysUntilBilling, isVipPartner, planFeatures }: Props) {
  const planDef = PLANS[planName] ?? PLANS[String(planName || "").toLowerCase() as PlanEnum] ?? PLANS.pro;
  const isPopular = planDef.popular;
  const displayFeatures = planFeatures && planFeatures.length > 0 ? planFeatures : planDef.features;

  return (
    <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="label-caps text-gold-400 text-[10px] block mb-0.5">Workspace Tier</span>
          <h2 className="text-xl font-bold text-white font-display">
            {isVipPartner ? "Current Plan (VIP Partner Grant)" : "Current Plan"}
          </h2>
        </div>
        {isPopular && (
          <div className="bg-gold-500/15 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
            <FiStar className="mr-1.5" />
            Most Popular
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/20 flex items-center justify-center mr-3">
              <FiUpload className="text-lg" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              {planDef.name} {isVipPartner ? "(80 GB Partner Edition)" : ""}
            </h3>
          </div>

          <div className="space-y-2.5">
            {displayFeatures.map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <FiCheck className="text-emerald-400 mr-2.5 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-ocean-950/80 border border-gold-500/30 rounded-2xl p-5">
            <div className="flex items-center mb-2">
              <FiDollarSign className="text-gold-400 mr-2" />
              <span className="label-caps text-gold-400 text-[10px]">
                {isVipPartner ? "Partner Grant" : "Next Payment"}
              </span>
            </div>
            <p className="text-3xl font-black text-white font-display tracking-tight">
              {isVipPartner ? "$0.00" : `$${nextBillingAmount.toFixed(2)}`}
            </p>
            <p className="text-xs text-slate-300 mt-1 font-mono">
              {isVipPartner
                ? `Complimentary through Oct 18, 2027 (${daysUntilBilling} days remaining)`
                : daysUntilBilling > 0
                ? `Due in ${daysUntilBilling} days`
                : "Due today"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
