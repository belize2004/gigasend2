import axios from 'axios';
import React, { useState } from 'react'
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export default function SubscriptionManagement({ onSubscriptionCancel }: { onSubscriptionCancel: () => void }) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelConfirm = async () => {
    setIsCancelling(true);
    try {
      // Handle successful cancellation
      await axios.post('/api/payment/cancel')
      alert('Your subscription has been cancelled successfully.');
      onSubscriptionCancel();
    } catch (error) {
      alert(`Error: Failed to cancel subscription.`);
      console.error('Failed to cancel subscription:', error);
    } finally {
      setIsCancelling(false);
      setShowCancelConfirm(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Subscription Management</h2>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start">
              <FiAlertTriangle className="text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Before you cancel</h4>
                <p className="text-sm text-yellow-700">
                  You&apos;ll lose access to all premium features and your files will be removed after the current billing period ends.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 flex items-center justify-center"
          >
            <FiX className="mr-2" />
            Cancel Subscription
          </button>
        </div>
      </div>
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50 w-screen h-screen">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <FiAlertTriangle className="text-red-600 mr-3 text-2xl" />
              <h3 className="text-lg font-bold text-gray-900">Cancel Subscription</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? This action cannot be undone and you&apos;ll lose access to all premium features.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                disabled={isCancelling}
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={isCancelling}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
