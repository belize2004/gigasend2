import Link from 'next/link';
import React from 'react';
import {
  FiCheck,
  FiCloud,
  FiUpload,
  FiUsers,
  FiShield,
  FiZap,
  FiStar
} from 'react-icons/fi';

const PricingPlans = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      storage: '10 GB',
      storageBytes: 10,
      popular: false,
      description: 'Perfect for getting started',
      features: [
        '10 GB storage',
        'Basic file sharing',
        'Standard upload speed',
        'Email support',
        '7-day file retention'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    },
    {
      name: 'Starter',
      price: 10,
      storage: '30 GB',
      storageBytes: 30,
      popular: false,
      description: 'Great for individuals',
      features: [
        '30 GB storage',
        'Advanced file sharing',
        'Fast upload speed',
        'Priority email support',
        '30-day file retention',
        'Password protection'
      ],
      buttonText: 'Choose Starter',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    {
      name: 'Pro',
      price: 20,
      storage: '80 GB',
      storageBytes: 80,
      popular: true,
      description: 'Most popular for professionals',
      features: [
        '80 GB storage',
        'Premium file sharing',
        'Ultra-fast upload speed',
        '24/7 priority support',
        '90-day file retention',
        'Advanced password protection',
        'Custom branding',
        'Analytics dashboard'
      ],
      buttonText: 'Choose Pro',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
    },
    {
      name: 'Studio',
      price: 50,
      storage: '200 GB',
      storageBytes: 200,
      popular: false,
      description: 'Perfect for creative teams',
      features: [
        '200 GB storage',
        'Unlimited file sharing',
        'Lightning-fast upload',
        'Dedicated support',
        '1-year file retention',
        'Advanced security features',
        'Team collaboration tools',
        'API access',
        'Custom integrations'
      ],
      buttonText: 'Choose Studio',
      buttonStyle: 'bg-indigo-600 text-white hover:bg-indigo-700'
    },
    {
      name: 'Agency',
      price: 100,
      storage: '500 GB',
      storageBytes: 500,
      popular: false,
      description: 'Enterprise-grade solution',
      features: [
        '500 GB storage',
        'Unlimited everything',
        'Maximum upload speed',
        'White-glove support',
        'Unlimited file retention',
        'Enterprise security',
        'Advanced team management',
        'Full API access',
        'Custom integrations',
        'SLA guarantee'
      ],
      buttonText: 'Choose Agency',
      buttonStyle: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <FiCloud className="text-4xl text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Giga Send</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your file sharing needs. Scale up as you grow with flexible storage options.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
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
                <button

                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${plan.buttonStyle}`}
                >
                  <Link
                    href="/checkout"
                  >
                    {plan.buttonText}
                  </Link>
                </button>
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