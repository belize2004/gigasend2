import { PaidPlan } from '@/app/api/dashboard/billing/route'
import BillingDetails from '@/components/dashboard/billing/BillingDetails'
import PaymentMethod from '@/components/dashboard/billing/PaymentMethod'
import PlanDetails from '@/components/dashboard/billing/PlanDetails'
import SecurityNotice from '@/components/dashboard/billing/SecurityNotice'
import SubscriptionManagement from '@/components/dashboard/billing/SubscriptionManagement'
import React from 'react'

export default function Paid(
  { data, onSubscriptionCancel }: { data: PaidPlan, onSubscriptionCancel: () => void }
) {
  const calculateDaysUntilBilling = (): number => {
    const today = new Date();
    const nextBilling = new Date(data.nextBillingDate);
    const diffTime = nextBilling.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilBilling = calculateDaysUntilBilling();

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <PlanDetails nextBillingAmount={data.nextBillingAmount} planName={data.planName} daysUntilBilling={daysUntilBilling} />

      {/* Billing Details Card */}
      <BillingDetails
        nextBillingAmount={data.nextBillingAmount}
        nextBillingDate={data.nextBillingDate}
        subscriptionStartDate={data.subscriptionStartDate}
      />

      {/* Payment Method Card */}
      {/* <PaymentMethod
        last4={data.last4}
        exp_month={data.exp_month}
        exp_year={data.exp_year}
      /> */}

      {/* Subscription Management */}
      <SubscriptionManagement onSubscriptionCancel={onSubscriptionCancel} />

      {/* Security Notice */}
      <SecurityNotice />
    </div>
  )
}
