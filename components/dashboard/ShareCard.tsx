import { formatBytes, formatDate } from '@/lib/utils';
import React, { useState } from 'react'
import { FiCalendar, FiCheck, FiCopy, FiMail, FiShare2 } from 'react-icons/fi';

interface Props {
  email: string;
  expiresAt: Date;
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

  return (
    <div className={`bg-white rounded-xl border-2 p-4 transition-all duration-200 ${isExpired
      ? 'border-red-200 bg-red-50'
      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
      }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <FiShare2 className={`mr-2 ${isExpired ? 'text-red-500' : 'text-blue-600'}`} />
          <div>
            <p className="font-semibold text-gray-900">{formatBytes(share.size)}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <FiMail className="mr-1" />
              <span>{share.email}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isExpired && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
              Expired
            </span>
          )}
          <button
            onClick={() => copyToClipboard(share.link)}
            className={`p-2 rounded-lg transition-all duration-200 ${copied
              ? 'bg-green-100 text-green-600'
              : isExpired
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            title="Copy link"
          >
            {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-500">
          <FiCalendar className="mr-1" />
          <span>Expires: {formatDate(share.expiresAt.toString())}</span>
        </div>
      </div>

      <div className="mt-3 p-2 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 font-mono break-all">{share.link}</p>
      </div>
    </div>
  )
}
