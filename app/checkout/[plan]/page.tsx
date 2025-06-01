"use client"
import { SubscriptionRequestBody } from '@/app/api/payment/subscribe/route';
import { PlanEnum, PLANS } from '@/lib/constant';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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


const CheckoutPage = () => {
  const { plan }: { plan: PlanEnum } = useParams();
  const router = useRouter()

  const stripe = useStripe();
  const elements = useElements();

  const [selectedPlan, setSelectedPlan] = useState(PLANS[plan]);

  const [formData, setFormData] = useState({
    email: '',
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

  const monthlyPrice = selectedPlan.price;
  const currentPrice = monthlyPrice;

  const handleCheckout = async () => {
    if (!formData.email) {
      setError('Email is required.');
      return;
    }

    if (!elements || !stripe) {
      setError('Stripe.js has not loaded yet.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('CardElement not found');
      return;
    }

    const paymentMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: card
    });

    if (paymentMethod.error) {
      setError(paymentMethod.error.message || null);
      return;
    }

    try {
      await axios.post<SubscriptionRequestBody, ApiResponse>('/api/payment/subscribe', {
        paymentMethod: paymentMethod.paymentMethod,
        planName: selectedPlan.name
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError)
      if (axiosError.response) {
        setError(axiosError.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    setSelectedPlan(PLANS[plan]);
  }, [plan])

  // undefined plan
  if (!selectedPlan || selectedPlan.name == 'Free') {
    router.push('/plans');
    return <></>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/plans" className="flex items-center mr-6">
            <FiArrowLeft className="mr-2 text-gray-600 hover:text-gray-900 transition-colors duration-200" />
            <span className=' text-gray-600 hover:text-gray-900 transition-colors duration-200'>
              Back to Plans
            </span>
          </Link>
          <div className="flex items-center">
            <BsArrowUpSquareFill className="text-3xl text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">GigaSend</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Side - Order Summary */}
          <div className="space-y-6">

            {/* Plan Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                {selectedPlan.popular && (
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <FiStar className="mr-1" />
                    Most Popular
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
                  <div className="flex items-center">
                    <FiUpload className="text-blue-600 mr-1" />
                    <span className="font-semibold text-gray-800">{selectedPlan.storage}</span>
                  </div>
                </div>
                <p className='text-sm text-gray-500 mb-3'>Monthly Subscription</p>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <FiCheck className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>
                    {selectedPlan.name} Plan
                  </span>
                  <span className="font-semibold">
                    ${currentPrice}/mo
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${currentPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center">
                <FiShield className="text-green-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-green-800">Secure Payment</h4>
                  <p className="text-sm text-green-700">
                    Your payment information is encrypted and secure. We use Stripe for processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>

            {/* error */}
            <p
              className={`text-red-400 text-sm mb-4 transform transition-all duration-300 origin-top ${error ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0'
                }`}
            >
              {error ?? ''}
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className='text-red-500'>*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Card Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Card Information <span className='text-red-500'>*</span>
                </label>

                {/* Card Number, Expiry and CVC */}
                <CardElement
                  className='border border-gray-300 rounded-xl px-3 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4'
                />
              </div>

              {/* Payment Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                <FiLock className="mr-2" />
                Complete Payment - ${currentPrice}
              </button>

              {/* Security info */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Powered by <span className="font-semibold">Stripe</span> • Your payment info is secure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center">
            <FiShield className="text-green-600 mr-2" />
            <span className="text-sm text-gray-600">SSL Encrypted</span>
          </div>
          <div className="flex items-center justify-center">
            <FiZap className="text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">Instant Activation</span>
          </div>
          <div className="flex items-center justify-center">
            <FiUsers className="text-purple-600 mr-2" />
            <span className="text-sm text-gray-600">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;