import axios from 'axios';
import React, { useState } from 'react'
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export default function SubscriptionManagement({
  onSubscriptionCancel,
  isVipPartner,
}: {
  onSubscriptionCancel: () => void;
  isVipPartner?: boolean;
}) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  if (isVipPartner) {
    return (
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white font-display mb-4">Partner Grant Status</h2>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
          <div className="flex items-start">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mr-3.5 shrink-0 text-base">
              ⭐
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 font-display text-sm mb-1">
                Complimentary VIP Creator Access
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your account is provisioned with 80 GB Pro storage and 30-day file retention as part of the Influencer Partner Program. No recurring credit card charges apply. Valid through October 18, 2027.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white font-display mb-6">Subscription Management</h2>

        <div className="space-y-5">
          <div className="bg-gold-500/10 border border-gold-500/30 rounded-2xl p-4">
            <div className="flex items-start">
              <FiAlertTriangle className="text-gold-400 mr-3.5 mt-0.5 text-lg shrink-0" />
              <div>
                <h4 className="font-bold text-gold-400 font-display text-sm mb-1">Before you cancel</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You&apos;ll lose access to all premium features and your files will be removed after the current billing period ends.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full md:w-auto px-6 py-3 bg-rose-500/15 border border-rose-500/40 text-rose-300 hover:bg-rose-500/25 hover:text-white rounded-xl font-bold font-display text-xs transition-all duration-200 flex items-center justify-center tap-tactile"
          >
            <FiX className="mr-2 text-base" />
            Cancel Subscription
          </button>
        </div>
      </div>
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 w-screen h-screen">
          <div className="apple-glass bg-ocean-900/95 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center mr-3.5">
                <FiAlertTriangle className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Cancel Subscription</h3>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Are you sure you want to cancel your subscription? This action cannot be undone and you&apos;ll lose access to all premium features.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-white/15 text-slate-200 rounded-xl font-semibold text-xs hover:bg-white/[0.06] transition-all duration-200 tap-tactile"
                disabled={isCancelling}
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={isCancelling}
                className="flex-1 px-4 py-2.5 bg-rose-600 text-white rounded-xl font-bold font-display text-xs hover:bg-rose-500 transition-all duration-200 disabled:opacity-50 tap-tactile"
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
