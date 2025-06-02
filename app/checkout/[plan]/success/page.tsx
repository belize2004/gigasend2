"use client"
import { PlanEnum, PLANS } from '@/lib/constant';
import { useParams, useRouter } from 'next/navigation';
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

const Page = () => {
  const { plan }: { plan: PlanEnum } = useParams();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(PLANS[plan]);

  useEffect(() => {
    setSelectedPlan(PLANS[plan]);
  }, [plan]);

  // Redirect if no valid plan
  if (!selectedPlan || selectedPlan.name === 'Free') {
    router.push('/plans');
    return <></>;
  }

  const handleDashboardRedirect = () => {
    router.push('/dashboard');
  };

  const handleTransferRedirect = () => {
    router.push('/transfer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <BsArrowUpSquareFill className="text-3xl text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">GigaSend</h1>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <FiCheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Congratulations! Your subscription has been activated successfully.
          </p>

          {/* Plan Details Card */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 mr-3">
                {selectedPlan.name} Plan
              </h3>
              {selectedPlan.popular && (
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                  <FiStar className="mr-1" />
                  Most Popular
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Storage Info */}
              <div className="flex items-center justify-center">
                <FiUpload className="text-blue-600 mr-2" />
                <span className="font-semibold text-gray-800">
                  {selectedPlan.storage} Storage
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">
                  ${selectedPlan.price}/month
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="text-left max-w-md mx-auto">
              <h4 className="font-semibold text-gray-900 mb-3 text-center">
                What's included:
              </h4>
              <div className="space-y-2">
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDashboardRedirect}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              Go to Dashboard
              <FiArrowRight className="ml-2" />
            </button>

            <button
              onClick={handleTransferRedirect}
              className="bg-white border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
            >
              Start Transferring Files
              <FiUpload className="ml-2" />
            </button>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <FiZap className="text-blue-600 mx-auto mb-2 text-2xl" />
            <h4 className="font-semibold text-gray-900 mb-1">Instant Access</h4>
            <p className="text-sm text-gray-600">
              Your plan is active immediately
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md">
            <FiUpload className="text-green-600 mx-auto mb-2 text-2xl" />
            <h4 className="font-semibold text-gray-900 mb-1">Ready to Upload</h4>
            <p className="text-sm text-gray-600">
              Start sending files right away
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md">
            <FiUsers className="text-purple-600 mx-auto mb-2 text-2xl" />
            <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
            <p className="text-sm text-gray-600">
              We're here to help anytime
            </p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Thank you for choosing GigaSend! If you have any questions, 
            <span className="text-blue-600 font-medium"> contact our support team</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;