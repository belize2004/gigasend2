"use client"
import { PLANS } from '@/lib/constant';
import React, { useState } from 'react';
import {
  FiCreditCard,
  FiCalendar,
  FiDollarSign,
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiStar,
  FiUpload,
  FiUsers,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiArrowRight
} from 'react-icons/fi';

const Free: React.FC = () => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Mock data for demonstration - Free Plan
  const data = {
    planName: 'Free Plan',
    planFeatures: [
      '1GB Storage',
      '5 Shares per month',
      'Basic file types only',
      '24-hour file expiry'
    ],
    billingCycleDuration: 'Free',
    nextBillingDate: '',
    nextBillingAmount: 0,
    subscriptionStartDate: '2025-01-01',
    isFree: true
  };

  // Premium plan features for comparison
  const premiumFeatures = [
    { icon: FiZap, text: 'More than 10Gb Storage', highlight: true },
    { icon: FiCalendar, text: 'Upto 30 days retention', highlight: true },
    { icon: FiUsers, text: 'Unlimited Shares', highlight: false },
    { icon: FiUsers, text: 'Usage increase as previous share expire', highlight: false },
  ];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Card - Free */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gray-400">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
          <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
            Free
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <FiUpload className="text-gray-600 mr-2 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900">{data.planName}</h3>
            </div>

            <div className="space-y-2">
              {PLANS.free.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <FiCheck className="text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <FiDollarSign className="text-gray-600 mr-2" />
                <span className="font-semibold text-gray-700">Current Cost</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">$0.00</p>
              <p className="text-sm text-gray-600">Forever free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA Card */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <FiZap className="text-yellow-300 mr-3 text-2xl" />
            <h2 className="text-2xl font-bold">Unlock Premium Features</h2>
          </div>

          <p className="text-blue-100 mb-6 text-lg">
            Get unlimited storage, advanced features, and priority support with our Pro plan.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <feature.icon className={`mr-3 text-lg ${feature.highlight ? 'text-yellow-300' : 'text-blue-200'}`} />
                <span className={feature.highlight ? 'font-semibold' : 'font-medium'}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              <FiTrendingUp className="mr-2" />
              Upgrade to Pro - ${PLANS.pro.price}/month
              <FiArrowRight className="ml-2" />
            </button>
            <button className="px-6 py-4 border-2 border-white border-opacity-30 text-white rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-200">
              View All Plans
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-blue-200 text-sm">
              ✨ <strong>Stay Tuned:</strong> Exciting offers drop regularly — keep checking back!
            </p>
          </div>
        </div>
      </div>

      {/* Usage Limits Warning */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-start">
          <FiAlertTriangle className="text-orange-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800 mb-1">Approaching Limits</h4>
            <p className="text-sm text-orange-700 mb-2">
              About to end the usage limit?
            </p>
            <button
              className="text-orange-800 font-semibold text-sm hover:text-orange-900 underline"
            >
              Upgrade Now →
            </button>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center">
          <FiShield className="text-green-600 mr-3" />
          <div>
            <h4 className="font-semibold text-green-800">Secure & Trusted</h4>
            <p className="text-sm text-green-700">
              Your files are encrypted and secure. Trusted by over 10,000+ users worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Free;