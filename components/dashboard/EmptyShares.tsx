import React from 'react'
import Link from '@/components/compat/Link';

interface Props {
  title: string;
  description: string;
  icon: React.ElementType;
  showAction?: boolean;
}

export default function EmptyShares({ title, description, icon: Icon, showAction = true }: Props) {
  return (
    <div className="text-center py-8 px-4">
      <div className="w-14 h-14 rounded-2xl bg-gold-500/15 text-gold-400 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="text-2xl text-gold-400" />
      </div>
      <h3 className="text-lg font-bold text-white font-display mb-2">{title}</h3>
      <p className={`text-sm text-slate-300 ${showAction ? 'mb-6' : ''} max-w-md mx-auto`}>{description}</p>
      {showAction && (
        <Link
          href="/transfer"
          className="inline-flex items-center px-6 py-3 btn-gold font-bold font-display text-xs rounded-xl shadow-lg shadow-gold-500/15 transition-all duration-200 tap-tactile"
        >
          Send Files
        </Link>
      )}
    </div>
  )
}
