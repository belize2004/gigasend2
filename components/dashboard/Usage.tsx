import { formatBytes } from '@/lib/utils'
import React from 'react'
import { FiAlertCircle, FiHardDrive } from 'react-icons/fi'

interface Props {
  usedStorage: number,
  allowedStorage: number
}

export default function Usage({ usedStorage, allowedStorage }: Props) {
  const usagePercentage = (usedStorage / allowedStorage) * 100;


  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Storage Usage</h2>
        <FiHardDrive className="text-2xl text-blue-600" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Used Storage</span>
          <span className="font-semibold text-gray-900">
            {formatBytes(usedStorage)} / {formatBytes(allowedStorage)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${usagePercentage > 90
              ? 'bg-gradient-to-r from-red-500 to-red-600'
              : usagePercentage > 70
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{usagePercentage.toFixed(1)}% used</span>
          {usagePercentage > 90 && (
            <div className="flex items-center text-red-600 text-sm">
              <FiAlertCircle className="mr-1" />
              <span>Storage almost full</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
