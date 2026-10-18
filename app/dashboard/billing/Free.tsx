"use client"
import { PLANS } from '@/lib/constant';
import { useRouter } from '@/components/compat/navigation';
import React from 'react';
import {
  FiCalendar,
  FiDollarSign,
  FiCheck,
  FiAlertTriangle,
  FiUpload,
  FiUsers,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiArrowRight,
  FiRefreshCw
} from 'react-icons/fi';

const Free: React.FC = () => {
  const router = useRouter();

  const data = {
    planName: 'Free Plan',
    planFeatures: [
      '10 GB storage',
      '3-day file retention',
      'Email support'
    ],
    billingCycleDuration: 'Free',
    nextBillingDate: '',
    nextBillingAmount: 0,
    subscriptionStartDate: '2025-01-01',
    isFree: true
  };

  // Premium plan features for comparison
  const premiumFeatures = [
    { icon: FiZap, text: '80 GB active storage', highlight: true },
    { icon: FiCalendar, text: '30-day file retention', highlight: true },
    { icon: FiUsers, text: 'Unlimited transfers', highlight: false },
    { icon: FiRefreshCw, text: 'Automatic storage reclamation', highlight: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/15 text-gold-400 border border-gold-500/30">
              Plan & Capacity
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Billing & Subscription</h1>
          <p className="text-xs sm:text-sm text-slate-300 font-body mt-0.5">
            Manage your workspace storage tier and transfer capacity.
          </p>
        </div>
      </div>

      {/* Current Plan Card - Free */}
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white font-display">Current Plan</h2>
          <div className="bg-white/10 text-slate-200 border border-white/15 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Free
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mr-3 border border-sky-500/20">
                <FiUpload className="text-lg" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">{data.planName}</h3>
            </div>

            <div className="space-y-2.5">
              {PLANS.free.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <FiCheck className="text-emerald-400 mr-2.5 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-ocean-950/80 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center mb-2">
                <FiDollarSign className="text-gold-400 mr-2" />
                <span className="label-caps text-slate-300 text-[10px]">Current Cost</span>
              </div>
              <p className="text-3xl font-black text-white font-display tracking-tight">$0.00</p>
              <p className="text-xs text-slate-400 mt-1">Forever free tier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA Card */}
      <div className="apple-glass bg-ocean-900/95 border border-gold-500/40 rounded-3xl shadow-2xl shadow-gold-500/10 p-8 text-white relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/15 text-gold-400 flex items-center justify-center mr-3.5 border border-gold-500/30">
              <FiZap className="text-xl" />
            </div>
            <div>
              <span className="label-caps text-gold-400 text-[10px] block">Pro Capacity</span>
              <h2 className="text-2xl font-extrabold font-display tracking-tight">Unlock Premium Features</h2>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Get high-capacity storage, extended retention, and priority edge delivery with our Pro plan.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center p-3.5 rounded-2xl bg-ocean-950/70 border border-white/10">
                <feature.icon className={`mr-3 text-lg ${feature.highlight ? 'text-gold-400' : 'text-sky-400'}`} />
                <span className={`text-sm ${feature.highlight ? 'font-bold text-white' : 'font-medium text-slate-200'}`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={
                () => router.push('/checkout/pro')
              }
              className="flex-1 btn-gold px-8 py-4 rounded-xl font-bold font-display text-sm transition-all duration-200 flex items-center justify-center shadow-lg shadow-gold-500/15 tap-tactile"
            >
              <FiTrendingUp className="mr-2" />
              Upgrade to Pro — ${PLANS.pro.price}/month
              <FiArrowRight className="ml-2" />
            </button>
            <button
              onClick={
                () => router.push(`/plans`)
              }
              className="px-6 py-4 btn-outline-gold border border-white/15 text-white rounded-xl font-semibold text-sm hover:bg-white/[0.08] transition-all duration-200 tap-tactile">
              View All Plans
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-300 text-xs">
              Need project-based capacity without a monthly plan? Explore Pay-As-You-Go packs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Free;
