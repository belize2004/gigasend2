import React from 'react'
import { FiCreditCard } from 'react-icons/fi'

interface Props {
  last4: string,
  exp_month: string,
  exp_year: string
}

export default function PaymentMethod({ last4, exp_month, exp_year }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
        <FiCreditCard className="text-gray-600 mr-3 text-xl" />
        <div>
          <p className="font-medium text-gray-900">•••• •••• •••• ${last4}</p>
          <p className="text-sm text-gray-500">Expires {exp_month}/{exp_year}</p>
        </div>
      </div>
      {/* <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
          Update
        </button> */}
    </div>
  )
}
