"use client"
import type { SubscriptionRequestBody } from '@/types/app-data';
import { PlanEnum, PLANS } from '@/lib/constant';
import { useAppSelector } from '@/lib/store';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios, { AxiosError } from 'axios';
import Link from '@/components/compat/Link';
import { useParams, useRouter } from '@/components/compat/navigation';
import React, { useEffect, useState } from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import {
  FiCheck,
  FiLock,
  FiShield,
  FiArrowLeft,
  FiStar,
  FiUpload,
  FiUsers,
  FiZap,
  FiMail
} from 'react-icons/fi';
import { brand } from '@/lib/brand';


const CheckoutPage = () => {
  const { plan }: { plan: PlanEnum } = useParams();
  const [loading, setLoading] = useState(false);
  const { email } = useAppSelector(state => state.user)
  const router = useRouter()

  const stripe = useStripe();
  const elements = useElements();

  const [selectedPlan, setSelectedPlan] = useState(PLANS[plan]);

  const [formData, setFormData] = useState({
    email: email!,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (error)
      setError(null)

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const monthlyPrice = selectedPlan?.price ?? 0;
  const currentPrice = monthlyPrice;

  const handleCheckout = async () => {
    if (stripe && elements && !formData.email) {
      setError('Enter your email address to continue.');
      return;
    }

    setLoading(true);

    if (elements && stripe) {
      const card = elements.getElement(CardElement);
      if (card) {
        const paymentMethod = await stripe.createPaymentMethod({
          type: 'card',
          card: card
        });

        if (paymentMethod.error) {
          setError(paymentMethod.error.message || null);
          setLoading(false);
          return;
        }

        try {
          await axios.post<SubscriptionRequestBody, ApiResponse>('/api/payment/subscribe', {
            paymentMethod: paymentMethod.paymentMethod,
            planName: selectedPlan.name
          });
          router.push(`/checkout/${selectedPlan.name.toLowerCase()}/success`);
          return;
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          if (axiosError.response) {
            setError(axiosError.response.data.message);
          } else {
            setError("Something went wrong while processing your payment. Please try again.");
          }
          setLoading(false);
          return;
        }
      }
    }

    // Direct Stripe Hosted Checkout Session (using server STRIPE_SECRET_KEY)
    try {
      const isPortuguese =
        typeof document !== 'undefined' &&
        (document.referrer.includes('/pt/') ||
         document.referrer.endsWith('/pt') ||
         window.location.pathname.startsWith('/pt') ||
         document.documentElement.lang.startsWith('pt'));
      const isSpanish =
        typeof document !== 'undefined' &&
        (document.referrer.includes('/es/') ||
         window.location.pathname.startsWith('/es') ||
         document.documentElement.lang.startsWith('es'));

      const res = await axios.post<{ success: boolean; url?: string; message?: string }>('/api/payment/create-checkout-session', {
        planName: selectedPlan.name,
        locale: isPortuguese ? 'pt-BR' : isSpanish ? 'es' : 'auto',
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
        return;
      }
      setError(res.data?.message || 'Couldn’t open checkout. Please refresh the page and try again.');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.message);
      } else {
        setError("Couldn’t open checkout. Please refresh the page and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const resolved = PLANS[plan];
    setSelectedPlan(resolved);
    if (!resolved || resolved.name === 'Free') {
      router.push('/plans');
    }
  }, [plan, router]);

  // undefined plan
  if (!selectedPlan || selectedPlan.name == 'Free') {
    return <></>
  }

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <Link href="/plans" className="flex items-center text-xs font-semibold text-slate-300 hover:text-gold-400 transition-colors duration-200 tap-tactile">
            <FiArrowLeft className="mr-2 text-base" />
            <span>Back to Plans</span>
          </Link>
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center mr-2.5 border border-gold-500/20">
              <BsArrowUpSquareFill className="text-lg text-gold-400" />
            </div>
            <h1 className="text-xl font-extrabold text-white font-display tracking-tight">{brand.productName}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Side - Order Summary */}
          <div className="space-y-6">

            {/* Plan Summary Card */}
            <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="label-caps text-gold-400 text-[10px] block mb-0.5">Selected Package</span>
                  <h2 className="text-xl font-bold text-white font-display">Order Summary</h2>
                </div>
                {selectedPlan.popular && (
                  <div className="bg-gold-500/15 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                    <FiStar className="mr-1.5" />
                    Most Popular
                  </div>
                )}
              </div>

              <div className="bg-ocean-950/80 border border-white/10 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-display">{selectedPlan.name} Plan</h3>
                  <div className="flex items-center px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/20 text-xs font-bold font-mono">
                    <FiUpload className="mr-1.5" />
                    <span>{selectedPlan.storage}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1 mb-4">Monthly Subscription</p>

                {/* Features List */}
                <div className="space-y-2.5">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <FiCheck className="text-emerald-400 mr-2.5 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>{selectedPlan.name} Plan</span>
                  <span className="font-semibold font-mono text-white">${currentPrice}/mo</span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white font-display">Total Due Today</span>
                    <div className="text-right">
                      <div className="text-3xl font-black text-gold-400 font-display tracking-tight">
                        ${currentPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="mb-6">
              <span className="label-caps text-gold-400 text-[10px] block mb-0.5">Encrypted Checkout</span>
              <h2 className="text-xl font-bold text-white font-display">Payment Details</h2>
            </div>

            {/* error */}
            <div
              className={`rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-body transition-all duration-300 origin-top ${
                error ? 'opacity-100 scale-100 p-4 mb-6' : 'opacity-0 scale-95 h-0 overflow-hidden p-0 mb-0 border-0'
              }`}
            >
              {error ?? ''}
            </div>

            <div className="space-y-6">
              {/* Card Information or Hosted Stripe Banner */}
              {stripe && elements ? (
                <>
                  {/* Email */}
                  <div>
                    <label className="block label-caps text-slate-200 text-[10px] mb-2">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-ocean-950 border border-white/15 rounded-xl text-sm text-white placeholder-slate-500 focus:border-gold-500 outline-none transition-all duration-200"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block label-caps text-slate-200 text-[10px] mb-2">
                      Card Information <span className="text-rose-400">*</span>
                    </label>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            color: '#f8fafc',
                            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                            fontSize: '14px',
                            '::placeholder': {
                              color: '#64748b',
                            },
                          },
                          invalid: {
                            color: '#fb7185',
                          },
                        },
                      }}
                      className="bg-ocean-950 border border-white/15 rounded-xl px-4 py-4 focus:border-gold-500 transition-all duration-200 mb-4"
                    />
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-gold-500/30 bg-ocean-950/80 p-6 text-center mb-4">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400 border border-gold-500/20">
                    <FiLock className="text-xl" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display">Secure Stripe Checkout</h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    Pay securely with a credit card, Apple Pay, or Google Pay through Stripe.
                  </p>
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`w-full btn-gold py-4 px-6 rounded-xl font-bold font-display text-xs shadow-lg shadow-gold-500/15 ${loading ? 'opacity-60 animate-pulse' : ''} transition-all duration-200 flex items-center justify-center cursor-pointer tap-tactile`}
              >
                <FiLock className="mr-2 text-sm" />
                {!loading
                  ? stripe && elements
                    ? `Complete Payment — $${currentPrice}`
                    : `Continue to Checkout — $${currentPrice}/mo`
                  : 'Opening Checkout…'}
              </button>

              {/* Security info */}
              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Encrypted checkout powered by <span className="font-semibold text-white">Stripe</span>. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
