import { formatDate } from '@/lib/utils'
import React from 'react'
import { FiCalendar, FiDollarSign } from 'react-icons/fi'

interface Props {
  nextBillingDate: string
  nextBillingAmount: number;
  subscriptionStartDate: string
}

export default function BillingDetails({ nextBillingDate, nextBillingAmount, subscriptionStartDate }: Props) {
  console.log('subscriptionStartDate',subscriptionStartDate)
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <FiCalendar className="text-gray-600 mr-3" />
              <span className="font-medium text-gray-700">Billing Cycle</span>
            </div>
            <span className="font-semibold text-gray-900">Monthly</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <FiCalendar className="text-gray-600 mr-3" />
              <span className="font-medium text-gray-700">Next Billing Date</span>
            </div>
            <span className="font-semibold text-gray-900">
              {formatDate(nextBillingDate)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <FiDollarSign className="text-gray-600 mr-3" />
              <span className="font-medium text-gray-700">Amount</span>
            </div>
            <span className="font-semibold text-gray-900">
              ${nextBillingAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <FiCalendar className="text-gray-600 mr-3" />
              <span className="font-medium text-gray-700">Subscription Start</span>
            </div>
            <span className="font-semibold text-gray-900">
              {formatDate(subscriptionStartDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
