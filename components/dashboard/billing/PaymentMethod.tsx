import React from 'react'
import { FiCreditCard } from 'react-icons/fi'

interface Props {
  last4: string,
  exp_month: string,
  exp_year: string
}

export default function PaymentMethod({ last4, exp_month, exp_year }: Props) {
  return (
    <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white font-display mb-6">Payment Method</h2>

      <div className="flex items-center justify-between p-4 bg-ocean-950/70 border border-white/10 rounded-2xl">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/20 flex items-center justify-center mr-3.5">
            <FiCreditCard className="text-lg" />
          </div>
          <div>
            <p className="font-bold text-white font-mono text-sm">•••• •••• •••• {last4}</p>
            <p className="text-xs text-slate-400 mt-0.5">Expires {exp_month}/{exp_year}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
