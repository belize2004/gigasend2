import { PLAN_ENUM } from '@/lib/constant';
import mongoose, { Schema, model } from 'mongoose';

const planSchema = new Schema<StripePlan>({
  name: {
    type: String,
    enum: PLAN_ENUM,
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
});

const stripeProductSchema = new Schema<StripeProduct>({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  plans: {
    type: [planSchema],
    required: true,
  },
});

export default mongoose.models.StripeProduct || model<StripeProduct>('StripeProduct', stripeProductSchema);
// It will have only one document in the collection
// representing the Stripe product with all plans
// and the productId from Stripe. using the /api/payment/init
