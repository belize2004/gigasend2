import { connectToDB } from '@/lib/db';
import { createPlan, createProduct } from '@/lib/stripe';
import StripeProduct from '@/models/StripeProduct';
import { NextResponse } from 'next/server';

export async function POST() {
  let data = {}

  await connectToDB();
  const product = await createProduct("Subscription");

  const starterPlan = await createPlan({
    nickname: 'Starter',
    amount: 1000, // $10.00,
    productId: product.id
  })

  const proPlan = await createPlan({
    nickname: 'Pro',
    amount: 2000, // $20.00,
    productId: product.id
  })

  const studioPlan = await createPlan({
    nickname: 'Studio',
    amount: 5000, // $50.00,
    productId: product.id
  })

  const agencyPlan = await createPlan({
    nickname: 'Agency',
    amount: 10000, // $100.00,
    productId: product.id
  })

  const stripeProductDoc = new StripeProduct({
    productId: product.id,
    plans: [
      { name: 'starter', planId: starterPlan.id },
      { name: 'pro', planId: proPlan.id },
      { name: 'studio', planId: studioPlan.id },
      { name: 'agency', planId: agencyPlan.id },
    ]
  });

  // Save to database
  await stripeProductDoc.save();

  data = { starterPlan, proPlan, studioPlan, agencyPlan };

  return NextResponse.json({ success: true, data, message: 'Product and plans created save them in database' });
}
