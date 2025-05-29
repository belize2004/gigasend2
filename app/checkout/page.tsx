"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import {
  FiCloud,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiShield,
  FiArrowLeft,
  FiStar,
  FiUpload,
  FiUsers,
  FiZap,
  FiCalendar,
  FiMail
} from 'react-icons/fi';

const CheckoutPage = () => {
  const [selectedPlan, setSelectedPlan] = useState({
    name: 'Pro',
    price: 20,
    storage: '80 GB',
    popular: true,
    features: [
      '80 GB storage',
      'Premium file sharing',
      'Ultra-fast upload speed',
      '24/7 priority support',
      '90-day file retention',
      'Advanced password protection',
      'Custom branding',
      'Analytics dashboard'
    ]
  });

  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardName: '',
    country: 'US',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const yearlyDiscount = 0.2; // 20% discount for yearly
  const monthlyPrice = selectedPlan.price;
  const yearlyPrice = Math.round(monthlyPrice * 12 * (1 - yearlyDiscount));
  const currentPrice = monthlyPrice;

  const handleCheckout = () => {
    // This is where you'd integrate with Stripe
    console.log('Processing checkout for:', {
      plan: selectedPlan.name,
      price: currentPrice,
      customerData: formData
    });
  };

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
            <FiCloud className="text-3xl text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">FileShare Pro</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

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
                  {selectedPlan.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <FiCheck className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 mt-2">
                    +{selectedPlan.features.length - 4} more features included
                  </div>
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

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
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
                  Card Information
                </label>

                {/* Card Number */}
                <div className="relative mb-3">
                  <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-t-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="1234 1234 1234 1234"
                    maxLength={19}
                  />
                </div>

                {/* Expiry and CVC */}
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 border-r-0 rounded-bl-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-br-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="CVC"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Full name on card"
                />
              </div>

              {/* Country and Postal Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="12345"
                  />
                </div>
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