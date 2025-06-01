import { PlanEnum, PLANS } from '@/lib/constant';
import { connectToDB } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { gbToBytes } from '@/lib/utils';
import { verifyToken } from '@/lib/verifyJwt';
import Share from '@/models/Share';
import User from '@/models/User';
import { Document } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export interface DashboardData {
  allowedStorage: number;
  usedStorage: number;
  shares: Array<Omit<Share, keyof Document>>;
}

export async function GET(req: NextRequest) {

  await connectToDB();

  
const token = req.cookies.get('token')!.value!;
  const payload = await verifyToken(token);
  const userId = payload?.userId!

  const user = await User.findById<User>(userId);

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  let allowedStorage = gbToBytes(PLANS.free.storageBytes)

  if (user.stripeCustomerId) {
    const subscription = await stripe.subscriptions.list({
      status: 'active',
      customer: user.stripeCustomerId,
      expand: ['data.items'],
    })

    if (subscription.data.length > 0) {
      const planName = subscription.data[0].items.data[0].plan.nickname;
      const subscribedPlan = PLANS[planName as PlanEnum] || PLANS.free;

      if (!subscribedPlan) {
        return NextResponse.json({ success: false, message: 'Subscribed plan not found' }, { status: 404 });
      }

      allowedStorage = gbToBytes(subscribedPlan.storageBytes);
    }
  }

  const shares = await Share.find<Share>({
    userId,
    expiresAt: { $gt: new Date() } // Only non-expired shares
  });

  const usedStorage = shares.reduce((acc, share) => share.expiresAt > new Date() ? acc + share.size : 0, 0)

  const data: DashboardData = {
    allowedStorage,
    usedStorage,
    shares
  }

  return NextResponse.json({ success: true, data, message: 'Dashboard data retrieved' }, { status: 200 });
}
