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
      const isPortuguese =
        typeof window !== 'undefined' &&
        (window.location.pathname.startsWith('/pt') ||
          document.documentElement.lang.startsWith('pt') ||
          document.referrer.includes('/pt'));
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
          locale: isPortuguese ? 'pt-BR' : isSpanish ? 'es' : 'auto',
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      alert(data.message || 'Couldn’t start checkout. Please check your connection and try again.');
    } catch (err: any) {
      console.error('PAYG checkout error:', err);
      alert('Couldn’t start checkout. Please check your connection and try again.');
    } finally {
      setLoadingPack(null);
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-800/80 border border-gold-500/30 text-gold-400 label-caps text-xs shadow-lg shadow-ocean-950/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Zero Cloud Egress Markups • Line-Rate Anycast Delivery
          </div>

          <div className="flex items-center justify-center gap-3">
            <BsArrowUpSquareFill className="text-3xl sm:text-4xl text-gold-400" />
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              {brand.productName} <span className="text-gold-400">Pricing</span>
            </h1>
          </div>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Choose a monthly plan or prepaid Pay-As-You-Go delivery packs valid for 12 months—powered by our global edge network across 335+ cities.
          </p>

          {/* Pricing Model Segmented Toggle */}
          <div className="flex justify-center pt-4">
            <div className="apple-glass bg-ocean-900/90 border border-white/10 p-1.5 rounded-2xl flex items-center shadow-2xl max-w-md w-full">
              <button
                type="button"
                onClick={() => setBillingModel('subscriptions')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer tap-tactile ${
                  billingModel === 'subscriptions'
                    ? 'btn-gold bg-gold-500 text-ocean-950 shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Monthly Plans
              </button>
              <button
                type="button"
                onClick={() => setBillingModel('payg')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer tap-tactile ${
                  billingModel === 'payg'
                    ? 'btn-gold bg-gold-500 text-ocean-950 shadow-lg'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>⚡ Pay-As-You-Go</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  billingModel === 'payg'
                    ? 'bg-ocean-950/20 text-ocean-950'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  No Monthly Fee
                </span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <TrustSignals />
          </div>
        </div>

        {/* ===================== TAB 1: MONTHLY SUBSCRIPTIONS ===================== */}
        {billingModel === 'subscriptions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 animate-fadeIn items-stretch">
            {Object.values(PLANS).map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between p-7 sm:p-8 ${
                  plan.popular
                    ? 'border-2 border-gold-500 bg-ocean-950 shadow-2xl shadow-gold-500/15 lg:-translate-y-2 z-10'
                    : 'apple-glass bg-ocean-900/80 border border-white/10 hover:border-gold-500/40 shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                    <div className="text-nowrap bg-gold-500 text-ocean-950 label-caps px-3.5 py-1 rounded-full text-[10px] font-bold flex items-center shadow-md">
                      <FiStar className="mr-1 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white font-display mb-2">{plan.name}</h3>
                      <p className="text-slate-300 text-sm mb-4">{plan.description}</p>
                      <div className="mb-4">
                        {plan.priceLabel ? (
                          <span className="text-4xl sm:text-5xl font-black text-white font-display">{plan.priceLabel}</span>
                        ) : (
                          <>
                            <span className="text-4xl sm:text-5xl font-black text-white font-display">${plan.price}</span>
                            {plan.price > 0 && <span className="text-slate-400 text-sm ml-1">/month</span>}
                          </>
                        )}
                      </div>
                      <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-ocean-800/80 border border-gold-500/30 mb-2">
                        <FiUpload className="text-gold-400" />
                        <span className="text-sm font-bold text-gold-400 font-display">{plan.storage}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <FiCheck className={`mr-3 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-gold-400' : 'text-emerald-400'}`} />
                          <span className="text-slate-200 text-sm">{feature}</span>
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
                    popular={plan.popular}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== TAB 2: PAY-AS-YOU-GO PACKS ===================== */}
        {billingModel === 'payg' && (
          <div className="mb-16 animate-fadeIn space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 label-caps text-xs">
                <FiClock className="text-gold-400" />
                12-Month Credit Validity • Deducted Only Upon Download
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                Buy Delivery Data Upfront. <span className="text-gold-400">Use It Anytime.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Ideal for freelance video editors, colorists, and boutique studios with project-based workflows. Recipients download uncompressed at line-rate speed with no account needed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {Object.values(PAYG_PACKS).map((pack) => (
                <div
                  key={pack.id}
                  className={`relative rounded-3xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between p-7 ${
                    pack.popular
                      ? 'border-2 border-gold-500 bg-ocean-950 shadow-2xl shadow-gold-500/15 lg:-translate-y-2 z-10'
                      : 'apple-glass bg-ocean-900/80 border border-white/10 hover:border-gold-500/40 shadow-xl'
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                      <div className="text-nowrap bg-gold-500 text-ocean-950 label-caps px-3.5 py-1 rounded-full text-[10px] font-bold flex items-center shadow-md">
                        <FiStar className="mr-1 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white font-display mb-1">{pack.name}</h3>
                      <p className="text-slate-300 text-xs mb-4">{pack.description}</p>
                      <div className="mb-3">
                        <span className="text-4xl font-black text-white font-display">${pack.price}</span>
                        <span className="text-xs text-slate-400 ml-1">one-time</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-ocean-800/90 border border-gold-500/30 text-gold-400 text-xs font-bold">
                        <FiUpload className="text-gold-400" />
                        <span>{pack.storage}</span>
                        <span className="text-slate-300 font-normal">({pack.rate})</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pack.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start text-xs text-slate-200">
                          <FiCheck className={`mr-2.5 mt-0.5 flex-shrink-0 ${pack.popular ? 'text-gold-400' : 'text-emerald-400'}`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBuyPaygPack(pack)}
                    disabled={loadingPack === pack.id}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer tap-tactile flex items-center justify-center gap-2 ${
                      pack.popular
                        ? 'btn-gold shadow-lg shadow-gold-500/20'
                        : 'btn-outline-gold'
                    } ${loadingPack === pack.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loadingPack === pack.id ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        <span>Preparing Checkout…</span>
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
            <div className="max-w-3xl mx-auto rounded-3xl apple-glass bg-ocean-900/70 border border-white/10 p-6 sm:p-8 shadow-xl text-center space-y-2">
              <h4 className="text-base font-bold text-white font-display flex items-center justify-center gap-2">
                <FiLock className="text-gold-400" />
                How Pay-As-You-Go Credits Work
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                Uploading files and creating share links are always free. Credits are deducted only when a recipient downloads your files, and remain valid for 12 months.
              </p>
            </div>
          </div>
        )}

        {/* Why Choose Gigasend Section */}
        <div className="apple-glass bg-ocean-900/60 border border-white/10 rounded-3xl shadow-xl p-8 sm:p-10 mb-12">
          <div className="text-center mb-10 space-y-2">
            <span className="label-caps text-gold-400 text-xs">The Zero-Egress Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Why Choose {brand.productName}?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="bg-gold-500/15 border border-gold-500/30 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3">
                <FiZap className="text-2xl text-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Lightning Fast</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Upload and share files at line-rate speeds with our optimized Cloudflare Anycast edge network.</p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3">
                <FiShield className="text-2xl text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Secure &amp; Private</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Your files are protected with enterprise-grade 256-bit TLS encryption and expiring secure links.</p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-gold-500/15 border border-gold-500/30 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3">
                <FiUsers className="text-2xl text-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Zero Recipient Friction</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Clients download files directly in their browser without registering an account or installing software.</p>
            </div>
          </div>
        </div>

        {/* FAQ Cards Section */}
        <div className="mb-12">
          <div className="text-center mb-8 space-y-2">
            <span className="label-caps text-gold-400 text-xs">Billing &amp; Delivery FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="apple-glass bg-ocean-900/60 border border-white/10 rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-bold text-white font-display">Do recipients need an account to download?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                No. Recipients click your share link and download immediately at unthrottled line speed directly in their browser.
              </p>
            </div>
            <div className="apple-glass bg-ocean-900/60 border border-white/10 rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-bold text-white font-display">When do Pay-As-You-Go credits expire?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prepaid PAYG packs remain valid for a full 12 months (365 days) from purchase, with no recurring monthly fee.
              </p>
            </div>
            <div className="apple-glass bg-ocean-900/60 border border-white/10 rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-bold text-white font-display">Are my video and RAW files compressed?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Never. {brand.productName} transfers every file bit-for-bit with zero transcoding or quality loss—ideal for ProRes, R3D, BRAW, and camera RAW.
              </p>
            </div>
            <div className="apple-glass bg-ocean-900/60 border border-white/10 rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-bold text-white font-display">Can I switch between Monthly and Pay-As-You-Go?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Yes. You can top up Pay-As-You-Go delivery data at any time or upgrade to a monthly plan as your studio volume scales.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Enterprise CTA Banner */}
        <div className="apple-glass bg-ocean-900/90 border border-gold-500/30 rounded-3xl p-8 sm:p-10 text-center shadow-2xl space-y-4">
          <span className="label-caps text-gold-400 text-xs">Custom Studio &amp; Enterprise Volume</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Moving 10 TB+ per month or need custom retention?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Talk to our engineering team for custom multi-terabyte pools, dedicated SLA onboarding, and ACH invoicing.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="/#contact"
              className="btn-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-gold-500/20 tap-tactile inline-flex items-center gap-2"
            >
              <span>Contact Studio Sales</span>
              <FiArrowRight />
            </a>
            <a
              href="/transfer"
              className="btn-outline-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold tap-tactile inline-flex items-center gap-2"
            >
              <span>Start a Transfer Now</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPlans;

