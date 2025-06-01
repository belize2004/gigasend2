import { PLANS } from '@/lib/constant';
import React from 'react';
import {
  FiCheck,
  FiUpload,
  FiUsers,
  FiShield,
  FiZap,
  FiStar
} from 'react-icons/fi';
import PlanButton from './PlanButton';
import { BsArrowUpSquareFill } from "react-icons/bs";

const PricingPlans = () => {

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <BsArrowUpSquareFill className="text-4xl text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">GigaSend</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your file sharing needs. Scale up as you grow with flexible storage options.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {Object.values(PLANS).map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
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
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      {plan.price > 0 && <span className="text-gray-600">/month</span>}
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
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose FileShare Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Upload and share files at incredible speeds with our optimized infrastructure.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your files are protected with enterprise-grade security and encryption.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Friendly</h3>
              <p className="text-gray-600">Collaborate seamlessly with your team using our advanced sharing tools.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPlans;