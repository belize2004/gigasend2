import React from 'react'
import { FiShield } from 'react-icons/fi'

export default function SecurityNotice() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center">
        <FiShield className="text-green-600 mr-3" />
        <div>
          <h4 className="font-semibold text-green-800">Secure Billing</h4>
          <p className="text-sm text-green-700">
            Your payment information is encrypted and secure. We use Stripe for processing all transactions.
          </p>
        </div>
      </div>
    </div>
  )
}
