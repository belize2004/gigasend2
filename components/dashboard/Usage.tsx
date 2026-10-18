import { formatBytes } from '@/lib/utils'
import React from 'react'
import { FiAlertCircle, FiHardDrive } from 'react-icons/fi'

interface Props {
  usedStorage: number,
  allowedStorage: number
}

export default function Usage({ usedStorage, allowedStorage }: Props) {
  const usagePercentage = allowedStorage > 0 ? (usedStorage / allowedStorage) * 100 : 0;

  return (
    <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden group">
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="label-caps text-sky-400 text-[10px] block mb-0.5">Workspace Capacity</span>
          <h2 className="text-xl font-bold text-white font-display">Storage Usage</h2>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/20 flex items-center justify-center">
          <FiHardDrive className="text-xl" />
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-slate-300">Used Storage</span>
          <span className="font-bold text-white font-mono text-sm">
            {formatBytes(usedStorage)} <span className="text-slate-400">/ {formatBytes(allowedStorage)}</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-ocean-950 border border-white/10 rounded-full h-3.5 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${usagePercentage > 90
              ? 'bg-gradient-to-r from-rose-500 to-rose-400'
              : usagePercentage > 70
                ? 'bg-gradient-to-r from-gold-500 to-amber-400'
                : 'bg-gradient-to-r from-sky-400 to-emerald-400'
              }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 font-mono">{usagePercentage.toFixed(1)}% used</span>
          {usagePercentage > 90 ? (
            <div className="flex items-center text-rose-400 text-xs font-semibold">
              <FiAlertCircle className="mr-1.5" />
              <span>Storage almost full</span>
            </div>
          ) : (
            <span className="text-[11px] text-emerald-400 font-mono">Zero Cloud Egress</span>
          )}
        </div>
      </div>
    </div>
  )
}
