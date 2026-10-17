"use client";

import { PLANS, PAYG_PACKS, PaygPack } from '@/lib/constant';
import React, { useState, useEffect } from 'react';
import {
  FiCheck,
  FiUpload,
  FiUsers,
  FiShield,
  FiZap,
  FiStar,
  FiClock,
  FiLock,
  FiArrowRight
} from 'react-icons/fi';
import PlanButton from './PlanButton';
import { BsArrowUpSquareFill } from "react-icons/bs";
import TrustSignals from "@/components/TrustSignals";
import { brand } from "@/lib/brand";

const PricingPlans = () => {
  const [billingModel, setBillingModel] = useState<'subscriptions' | 'payg'>('subscriptions');
  const [loadingPack, setLoadingPack] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('model') === 'payg' || urlParams.get('tab') === 'payg' || window.location.hash === '#payg') {
        setBillingModel('payg');
      }
    }
  }, []);

  const handleBuyPaygPack = async (pack: PaygPack) => {
    setLoadingPack(pack.id);
    try {
      const isSpanish =
        typeof window !== 'undefined' &&
        (window.location.pathname.startsWith('/es') ||
          document.documentElement.lang.startsWith('es') ||
          document.referrer.includes('/es'));

      const res = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId: pack.id,
          planName: pack.id,
          locale: isSpanish ? 'es' : 'auto',
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      alert(data.message || 'Unable to start Stripe checkout session.');
    } catch (err: any) {
      console.error('PAYG checkout error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoadingPack(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <BsArrowUpSquareFill className="text-4xl text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">{brand.productName}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your file sharing needs. Scale up as you grow with flexible storage options.
          </p>

          {/* Pricing Model Segmented Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-slate-200/90 p-1.5 rounded-2xl flex items-center shadow-inner max-w-md w-full border border-slate-300/60">
              <button
                type="button"
                onClick={() => setBillingModel('subscriptions')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  billingModel === 'subscriptions'
                    ? 'bg-white text-slate-900 shadow-md ring-1 ring-black/5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Plans
              </button>
              <button
                type="button"
                onClick={() => setBillingModel('payg')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  billingModel === 'payg'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>⚡ Pay-As-You-Go</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  billingModel === 'payg' ? 'bg-white/25 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  No Monthly Fee
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <TrustSignals />
          </div>
        </div>

        {/* ===================== TAB 1: MONTHLY SUBSCRIPTIONS ===================== */}
        {billingModel === 'subscriptions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fadeIn">
            {Object.values(PLANS).map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="text-nowrap bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center">
                      <FiStar className="mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="flex flex-col justify-between h-full p-6">
                  <div>
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      <div className="mb-4">
                        {plan.priceLabel ? (
                          <span className="text-4xl font-bold text-gray-900">{plan.priceLabel}</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                            {plan.price > 0 && <span className="text-gray-600">/month</span>}
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <FiUpload className="text-blue-600 mr-2" />
                        <span className="text-lg font-semibold text-gray-800">{plan.storage}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <FiCheck className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <PlanButton
                    buttonStyle={plan.buttonStyle}
                    buttonText={plan.buttonText}
                    planName={plan.name}
                    contactSales={plan.contactSales}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== TAB 2: PAY-AS-YOU-GO PACKS ===================== */}
        {billingModel === 'payg' && (
          <div className="mb-12 animate-fadeIn space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <FiClock className="text-emerald-600" />
                12-Month Credit Validity • Deducted Only Upon Download
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Buy Data When You Need It. <span className="text-blue-600">Zero Monthly Fees.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Ideal for freelance video editors, colorists, and boutique studios with project-based workflows. Recipients download uncompressed at line-rate speed with no account needed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {Object.values(PAYG_PACKS).map((pack) => (
                <div
                  key={pack.id}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between p-6 ${
                    pack.popular ? 'ring-2 ring-purple-500 scale-105 z-10' : 'border border-slate-200'
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="text-nowrap bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-md">
                        <FiStar className="mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{pack.name}</h3>
                      <p className="text-gray-500 text-xs mb-3">{pack.description}</p>
                      <div className="mb-2">
                        <span className="text-4xl font-extrabold text-gray-900">${pack.price}</span>
                        <span className="text-xs text-gray-500 ml-1">one-time</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                        <FiUpload className="text-blue-600" />
                        <span>{pack.storage}</span>
                        <span className="text-slate-400 font-normal">({pack.rate})</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-8">
                      {pack.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start text-xs text-gray-700">
                          <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBuyPaygPack(pack)}
                    disabled={loadingPack === pack.id}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 ${pack.buttonStyle} ${
                      loadingPack === pack.id ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loadingPack === pack.id ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Connecting to Stripe...</span>
                      </>
                    ) : (
                      <>
                        <span>{pack.buttonText}</span>
                        <FiArrowRight className="text-sm" />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* PAYG Guarantee Notice */}
            <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-slate-200 p-6 shadow-sm text-center space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center gap-2">
                <FiLock className="text-emerald-600" />
                How Pay-As-You-Go Credits Work
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl mx-auto">
                Uploads and generating share links are always free. Credits deduct from your balance only when your recipient successfully downloads the file. Unused credits remain active for 365 days.
              </p>
            </div>
          </div>
        )}

        {/* Additional Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose {brand.productName}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Upload and share files at incredible speeds with our optimized Cloudflare Anycast edge network.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your files are protected with enterprise-grade 256-bit TLS encryption and expiring secure links.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Zero Recipient Friction</h3>
              <p className="text-gray-600">Clients download files directly in their browser without registering an account or installing software.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPlans;
