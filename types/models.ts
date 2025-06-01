import mongoose, { Document } from 'mongoose';

declare global {
  interface User extends Document {
    name: string;
    email: string;
    password: string;
    stripeCustomerId?: string;
  }

  interface StripePlan {
    name: string;
    planId: string;
  }

  interface StripeProduct extends Document {
    productId: string;
    plans: StripePlan[];
  }

  interface Share extends Document {
    email: string;
    expiresAt: Date;
    size: number; // size in bytes
    userId: mongoose.Types.ObjectId;
    link: string;
  }
}

export { }; // Ensures this file is treated as a module
