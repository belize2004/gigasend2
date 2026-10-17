import { formatBytes, formatDate } from '@/lib/utils';
import React, { useState } from 'react'
import { FiCalendar, FiCheck, FiCopy, FiMail, FiShare2 } from 'react-icons/fi';

interface Props {
  email: string;
  expiresAt: string;
  size: number; // size in bytes
  link: string;
}

export default function ShareCard(share: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (link: string,) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isExpired = new Date(share.expiresAt) < new Date();
  const isLinkOnly = share.email === "__share_link__";

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-200 ${isExpired
      ? 'border-rose-500/30 bg-rose-500/5'
      : 'apple-subtle-glass bg-ocean-950/70 border-white/10 hover:border-gold-500/40 shadow-lg'
      }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3.5 border ${
            isExpired
              ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
              : 'bg-gold-500/15 text-gold-400 border-gold-500/30'
          }`}>
            <FiShare2 className="text-lg" />
          </div>
          <div>
            <p className="font-bold text-white font-display text-base">{formatBytes(share.size)}</p>
            <div className="flex items-center text-xs text-slate-300 mt-1">
              {isLinkOnly ? <FiShare2 className="mr-1.5 text-gold-400" /> : <FiMail className="mr-1.5 text-sky-400" />}
              <span>{isLinkOnly ? "Shareable link" : share.email}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isExpired && (
            <span className="bg-rose-500/15 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Expired
            </span>
          )}
          <button
            onClick={() => copyToClipboard(share.link)}
            className={`p-2.5 rounded-xl border transition-all duration-200 tap-tactile ${copied
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : isExpired
                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/25'
                : 'bg-white/[0.06] text-gold-400 border-white/10 hover:bg-white/[0.12] hover:text-amber-300'
              }`}
            title="Copy link"
          >
            {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mt-2">
        <div className="flex items-center text-slate-400">
          <FiCalendar className="mr-1.5 text-slate-500" />
          <span>Expires: {formatDate(share.expiresAt.toString())}</span>
        </div>
      </div>

      <div className="mt-3 p-3 bg-ocean-950 border border-white/10 rounded-xl">
        <p className="text-xs text-slate-300 font-mono break-all">{share.link}</p>
      </div>
    </div>
  )
}
