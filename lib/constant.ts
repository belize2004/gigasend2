// Configuration constants for the application
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'stripe_publishable_key';

// Pricing plans for the application
export const PLAN_ENUM = ["free", "starter", "pro", "studio", "agency", "enterprise"] as const;
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
  },
  enterprise: {
    name: 'Enterprise',
    price: 0,
    priceLabel: 'Custom',
    storage: '5 TB',
    storageBytes: 5120,
    popular: false,
    description: 'Custom plans for high-volume teams',
    features: [
      'Up to 5 TB single file uploads',
      'Custom storage and retention',
      'Priority support',
      'Team onboarding',
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
    contactSales: true,
  }
};

export interface PaygPack {
  id: string;
  name: string;
  price: number;
  storage: string;
  rate: string;
  popular: boolean;
  description: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
}

export const PAYG_PACKS: Record<string, PaygPack> = {
  starter: {
    id: 'pack_starter',
    name: 'Starter Pack',
    price: 10,
    storage: '50 GB',
    rate: '$0.20/GB',
    popular: false,
    description: 'Ideal for 1–2 client project deliveries',
    features: [
      '50 GB downloaded delivery',
      'Valid for 12 months',
      'Used only when files are downloaded',
      'No account required for recipients',
      'Cloudflare Anycast edge-accelerated',
      'No monthly recurring commitment'
    ],
    buttonText: 'Buy 50 GB ($10)',
    buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700'
  },
  creator: {
    id: 'pack_creator',
    name: 'Creator Pack',
    price: 20,
    storage: '100 GB',
    rate: '$0.20/GB',
    popular: true,
    description: 'Most popular for active freelance video editors',
    features: [
      '100 GB downloaded delivery',
      'Valid for 12 months',
      'Used only when files are downloaded',
      'No account required for recipients',
      'Cloudflare Anycast edge-accelerated',
      'No monthly recurring commitment'
    ],
    buttonText: 'Buy 100 GB ($20)',
    buttonStyle: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
  },
  studio: {
    id: 'pack_studio',
    name: 'Studio Pack',
    price: 180,
    storage: '1,000 GB (1 TB)',
    rate: '$0.18/GB',
    popular: false,
    description: 'High-volume pack with 10% volume discount',
    features: [
      '1,000 GB (1 TB) downloaded delivery',
      '10% volume discount ($0.18/GB)',
      'Valid for 12 months',
      'Optional auto-reload top-up',
      'Priority edge routing',
      'No monthly recurring commitment'
    ],
    buttonText: 'Buy 1 TB ($180)',
    buttonStyle: 'bg-indigo-600 text-white hover:bg-indigo-700'
  },
  business: {
    id: 'pack_business',
    name: 'Business Pack',
    price: 800,
    storage: '5,000 GB (5 TB)',
    rate: '$0.16/GB',
    popular: false,
    description: 'Studio & commercial production tier (20% off)',
    features: [
      '5,000 GB (5 TB) downloaded delivery',
      '20% volume discount ($0.16/GB)',
      'Valid for 12 months',
      'Dedicated enterprise edge routing',
      'Priority support & invoicing',
      'No monthly recurring commitment'
    ],
    buttonText: 'Buy 5 TB ($800)',
    buttonStyle: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
  }
};

