"use client"
import { PlanEnum, PLANS } from '@/lib/constant';
import { useParams, useRouter } from '@/components/compat/navigation';
import React, { useEffect, useState } from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import {
  FiCheck,
  FiUpload,
  FiUsers,
  FiZap,
  FiStar,
  FiCheckCircle,
  FiArrowRight
} from 'react-icons/fi';
import { brand } from '@/lib/brand';

const Page = () => {
  const { plan }: { plan: PlanEnum } = useParams();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(PLANS[plan]);

  useEffect(() => {
    const resolved = PLANS[plan];
    setSelectedPlan(resolved);
    if (!resolved || resolved.name === 'Free') {
      router.push('/plans');
    }
  }, [plan, router]);

  // Redirect if no valid plan
  if (!selectedPlan || selectedPlan.name === 'Free') {
    return <></>;
  }

  const handleDashboardRedirect = () => {
    router.push('/dashboard');
  };

  const handleTransferRedirect = () => {
    router.push('/transfer');
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center mr-3 border border-gold-500/20">
              <BsArrowUpSquareFill className="text-xl text-gold-400" />
            </div>
            <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">{brand.productName}</h1>
          </div>
        </div>

        {/* Success Card */}
        <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 text-center mb-8">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6">
            <FiCheckCircle className="w-8 h-8 text-emerald-400" />
          </div>

          {/* Success Message */}
          <span className="label-caps text-emerald-400 text-xs block mb-1">Subscription Active</span>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mb-3">
            You’re Subscribed to {selectedPlan.name}
          </h2>
          <p className="text-base text-slate-300 mb-8 max-w-lg mx-auto">
            Your plan is active and your expanded storage is ready to use.
          </p>

          {/* Plan Details Card */}
          <div className="bg-ocean-950/80 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h3 className="text-xl font-bold text-white font-display">
                {selectedPlan.name} Plan
              </h3>
              {selectedPlan.popular && (
                <div className="bg-gold-500/15 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                  <FiStar className="mr-1.5" />
                  Most Popular
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-white/10">
              {/* Storage Info */}
              <div className="flex items-center justify-center">
                <FiUpload className="text-sky-400 mr-2 text-lg" />
                <span className="font-bold text-white font-display">
                  {selectedPlan.storage} Storage
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-black text-gold-400 font-display">
                  ${selectedPlan.price}/month
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="text-left max-w-md mx-auto">
              <h4 className="label-caps text-slate-300 text-[10px] mb-3 text-center">
                What&apos;s Included
              </h4>
              <div className="space-y-2.5">
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <FiCheck className="text-emerald-400 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDashboardRedirect}
              className="btn-gold py-4 px-6 rounded-xl font-bold font-display text-xs shadow-lg shadow-gold-500/15 transition-all duration-200 flex items-center justify-center tap-tactile"
            >
              Go to Dashboard
              <FiArrowRight className="ml-2 text-sm" />
            </button>

            <button
              onClick={handleTransferRedirect}
              className="btn-outline-gold border border-white/15 text-white py-4 px-6 rounded-xl font-bold font-display text-xs hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center tap-tactile"
            >
              Send Files
              <FiUpload className="ml-2 text-sm" />
            </button>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/20 flex items-center justify-center mx-auto mb-3">
              <FiZap className="text-xl" />
            </div>
            <h4 className="font-bold text-white font-display text-sm mb-1">Instant Access</h4>
            <p className="text-xs text-slate-300">
              Your plan is active immediately.
            </p>
          </div>
          
          <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <FiUpload className="text-xl" />
            </div>
            <h4 className="font-bold text-white font-display text-sm mb-1">Ready to Upload</h4>
            <p className="text-xs text-slate-300">
              Start sending files right away.
            </p>
          </div>
          
          <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/20 flex items-center justify-center mx-auto mb-3">
              <FiUsers className="text-xl" />
            </div>
            <h4 className="font-bold text-white font-display text-sm mb-1">24/7 Support</h4>
            <p className="text-xs text-slate-300">
              We&apos;re here to help anytime.
            </p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-xs">
            Thank you for choosing {brand.productName}! If you have any questions,
            <a href="/contact" className="text-gold-400 hover:text-amber-300 font-semibold ml-1 transition">contact our support team</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
