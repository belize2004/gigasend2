import React from 'react'
import { FiShield } from 'react-icons/fi'

export default function SecurityNotice() {
  return (
    <div className="apple-subtle-glass bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
      <div className="flex items-center">
        <FiShield className="text-emerald-400 mr-3.5 text-lg shrink-0" />
        <div>
          <h4 className="font-bold text-emerald-400 font-display text-sm">Secure Billing</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Your payment information is encrypted and secure. We use Stripe for processing all transactions.
          </p>
        </div>
      </div>
    </div>
  )
}
