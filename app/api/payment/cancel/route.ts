import { connectToDB } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { verifyToken } from '@/lib/verifyJwt';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectToDB()
  try {
    const token = req.cookies.get('token')?.value!;
    const payload = await verifyToken(token);

    const userId = payload?.userId!;

    const user = await User.findById<User>(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      return NextResponse.json({ success: false, message: 'No Stripe customer ID found' }, { status: 400 });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1, // there will only be 1 active subscription at a time
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ success: false, message: 'No active subscriptions to cancel' }, { status: 400 });
    }

    const subscriptionId = subscriptions.data[0].id;

    const canceled = await stripe.subscriptions.cancel(subscriptionId);

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription: canceled,
    });

  } catch (error: any) {
    const stripeError = error?.raw?.message || error?.message || 'Something went wrong';

    return NextResponse.json<ApiResponse>({
      success: false,
      message: stripeError,
    }, { status: 500 });
  }

}
