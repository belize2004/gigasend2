import { PlanEnum, PLANS } from '@/lib/constant';
import { connectToDB } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { gbToBytes } from '@/lib/utils';
import { verifyToken } from '@/lib/verifyJwt';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export interface PaidPlan {
  planName: PlanEnum;
  planFeatures: string[];
  nextBillingDate: string;
  nextBillingAmount: number;
  subscriptionStartDate: string;
  last4: string;
  exp_month: string,
  exp_year: string
  isFree: false
}

export interface FreePlan {
  isFree: true
}

export type BillingData = PaidPlan | FreePlan

export async function GET(req: NextRequest) {
  await connectToDB();

  const token = req.cookies.get('token')?.value!;
  const payload = await verifyToken(token);
  const userId = payload?.userId!;

  const user = await User.findById<User>(userId);

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  let allowedStorage = gbToBytes(PLANS.free.storageBytes);

  if (user.stripeCustomerId) {
    const subscriptions = await stripe.subscriptions.list({
      status: 'active',
      customer: user.stripeCustomerId,
    });

    const subscription:Stripe.Subscription = subscriptions.data[0];
    if (subscription) {
      const planName = subscription.items.data[0].plan.nickname!.toLowerCase();
      const subscribedPlan = PLANS[planName as PlanEnum];

      if (!subscribedPlan) {
        return NextResponse.json({ success: false, message: 'Subscribed plan not found' }, { status: 404 });
      }

      allowedStorage = gbToBytes(subscribedPlan.storageBytes);

      // Get default payment method details
      const defaultPaymentMethodId = subscription.default_payment_method;
      let last4 = '', exp_month = '', exp_year = '';

      if (defaultPaymentMethodId && typeof defaultPaymentMethodId === 'string') {
        const paymentMethod = await stripe.paymentMethods.retrieve(defaultPaymentMethodId);
        if (paymentMethod.type === 'card' && paymentMethod.card) {
          last4 = paymentMethod.card.last4;
          exp_month = String(paymentMethod.card.exp_month);
          exp_year = String(paymentMethod.card.exp_year);
        }
      }
      const data: PaidPlan = {
        isFree: false,
        planName: planName as PlanEnum,
        planFeatures: subscribedPlan.features,
        subscriptionStartDate: new Date(subscription.start_date * 1000).toISOString(),
        nextBillingDate: new Date().toISOString(), //subscription.current_period_end! * 1000
        nextBillingAmount: subscription.items.data[0].price.unit_amount! / 100, // assuming USD
        last4,
        exp_month,
        exp_year,
      };

      return NextResponse.json({ success: true, data, allowedStorage, message: 'Billing data retrieved' }, { status: 200 });
    }
  }

  // If no active subscription — user is on free plan
  const data: FreePlan = {
    isFree: true,
  };

  return NextResponse.json({ success: true, data, allowedStorage, message: 'Billing data retrieved' }, { status: 200 });
}

