import { PlanEnum } from '@/lib/constant';
import { connectToDB } from '@/lib/db';
import { createCustomer, stripe } from '@/lib/stripe';
import { verifyToken } from '@/lib/verifyJwt';
import StripeProduct from '@/models/StripeProduct';
import User from '@/models/User';
import { PaymentMethod } from '@stripe/stripe-js';
import { NextRequest, NextResponse } from 'next/server';
import { StripeError } from '@stripe/stripe-js';

export interface SubscriptionRequestBody {
  paymentMethod: PaymentMethod,
  planName: PlanEnum
}

export async function POST(req: NextRequest) {
  await connectToDB()
  try {
    const body: SubscriptionRequestBody = await req.json();
    const { paymentMethod, planName } = body;

    
    const token = req.cookies.get('token')!.value!;
    const payload = await verifyToken(token);

    const userId = payload?.userId!;

    const user = await User.findById<User>(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await createCustomer({
        name: user.name,
        email: user.email,
      })
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.items']
    });

    if (subscriptions.data.length > 0) {
      const planName = subscriptions.data[0].items.data[0].plan.nickname;
      return NextResponse.json({
        success: false,
        message: `You already have an active plan : ${planName}`
      }, { status: 400 });
    }

    await stripe.paymentMethods.attach(
      paymentMethod?.id as string,
      {
        customer: customerId,
      }
    );

    // attach card for automatic payments
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod?.id as string,
      },
    });

    const product = await StripeProduct.findOne<StripeProduct>({ 'plans.name': planName.toLowerCase() });
    const plan = product?.plans.find(p => p.name.toLowerCase() === planName.toLowerCase());

    if (!plan) {
      return NextResponse.json({
        success: false,
        message: `Plan not found`
      }, { status: 404 });
    }

    if (plan.name == 'free') {
      return NextResponse.json({
        success: false,
        message: `Can not purchase free plan`
      }, { status: 400 });
    }

    await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: plan.planId }],
    });

    return NextResponse.json({ success: true, message: `Successfully subscribed to ${planName} plan` });

  } catch (error) {
    const stripeError = (error as StripeError)?.message || 'Something went wrong';

    return NextResponse.json<ApiResponse>({
      success: false,
      message: stripeError,
    }, { status: 500 });
  }

}
