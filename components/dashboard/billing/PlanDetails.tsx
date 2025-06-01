import { PlanEnum, PLANS } from '@/lib/constant';
import React from 'react'
import { FiCheck, FiDollarSign, FiStar, FiUpload } from 'react-icons/fi'

interface Props {
  planName: PlanEnum,
  nextBillingAmount: number,
  daysUntilBilling: number
}

export default function PlanDetails({ planName, nextBillingAmount, daysUntilBilling }: Props) {
  const isPopular = PLANS[planName].popular;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
        {isPopular && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <FiStar className="mr-1" />
            Most Popular
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <FiUpload className="text-blue-600 mr-2 text-xl" />
            <h3 className="text-lg font-semibold text-gray-900">{PLANS[planName].name}</h3>
          </div>

          <div className="space-y-2">
            {PLANS[planName].features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <FiCheck className="text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <FiDollarSign className="text-blue-600 mr-2" />
              <span className="font-semibold text-blue-800">Next Payment</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              ${nextBillingAmount.toFixed(2)}
            </p>
            <p className="text-sm text-blue-700">
              {daysUntilBilling > 0 ? `Due in ${daysUntilBilling} days` : 'Due today'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
