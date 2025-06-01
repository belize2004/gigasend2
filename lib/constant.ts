// Configuration constants for the application
export const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongo_uri';

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'stripe_publishable_key';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'stripe_secret_key';

export const NEXT_PUBLIC_RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY || 'resend_api_key';

// Pricing plans for the application
export const PLAN_ENUM = ["free", "starter", "pro", "studio", "agency"] as const;
export type PlanEnum = typeof PLAN_ENUM[number];

export const PLANS: Record<PlanEnum, Plan> = {
  free: {
    name: 'Free',
    price: 0,
    storage: '10 GB',
    storageBytes: 10,
    popular: false,
    description: 'Perfect for getting started',
    features: [
      '10 GB storage',
      'Email support',
      '3-day file retention'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  },
  starter: {
    name: 'Starter',
    price: 10,
    storage: '30 GB',
    storageBytes: 30,
    popular: false,
    description: 'Great for individuals',
    features: [
      '30 GB storage',
      'Email support',
      '30-day file retention',
    ],
    buttonText: 'Choose Starter',
    buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700'
  },
  pro: {
    name: 'Pro',
    price: 20,
    storage: '80 GB',
    storageBytes: 80,
    popular: true,
    description: 'Most popular for professionals',
    features: [
      '80 GB storage',
      'Email support',
      '30-day file retention',
    ],
    buttonText: 'Choose Pro',
    buttonStyle: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
  },
  studio: {
    name: 'Studio',
    price: 50,
    storage: '200 GB',
    storageBytes: 200,
    popular: false,
    description: 'Perfect for creative teams',
    features: [
      '200 GB storage',
      'Email support',
      '30-day file retention',
    ],
    buttonText: 'Choose Studio',
    buttonStyle: 'bg-indigo-600 text-white hover:bg-indigo-700'
  },
  agency: {
    name: 'Agency',
    price: 100,
    storage: '500 GB',
    storageBytes: 500,
    popular: false,
    description: 'Enterprise-grade solution',
    features: [
      '500 GB storage',
      'Email support',
      '30-day file retention',
    ],
    buttonText: 'Choose Agency',
    buttonStyle: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
  }
};