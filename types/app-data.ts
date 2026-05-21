import type { PaymentMethod } from "@stripe/stripe-js";
import type { PlanEnum } from "@/lib/constant";

export interface UsageData {
  allowedStorage: number;
  usedStorage: number;
  expiryDays: number;
}

export interface DashboardData {
  allowedStorage: number;
  usedStorage: number;
  shares: ShareData[];
}

export interface ShareData {
  id: string;
  _id: string;
  email: string;
  expiresAt: string;
  size: number;
  userId: string;
  link: string;
  fileKey?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaidPlan {
  planName: PlanEnum;
  planFeatures: string[];
  nextBillingDate: string;
  nextBillingAmount: number;
  subscriptionStartDate: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  isFree: false;
}

export interface FreePlan {
  isFree: true;
}

export type BillingData = PaidPlan | FreePlan;

export interface SubscriptionRequestBody {
  paymentMethod: PaymentMethod;
  planName: PlanEnum;
}

export interface AdminOverviewData {
  stats: {
    totalUsers: number;
    totalShares: number;
    activeShares: number;
    expiredShares: number;
    activeStorageBytes: number;
    totalSharedBytes: number;
  };
  recentUsers: AdminUserData[];
  recentShares: AdminShareData[];
  stripePlans: AdminStripePlanData[];
  recentSuggestions: AdminSuggestionData[];
}

export interface AdminUserData {
  id: string;
  name: string;
  email: string;
  stripeCustomerId?: string | null;
  createdAt: string;
}

export interface AdminShareData {
  id: string;
  receiverEmail: string;
  senderEmail: string;
  senderName: string;
  size: number;
  expiresAt: string;
  createdAt: string;
  isExpired: boolean;
  hasFileKey: boolean;
}

export interface AdminStripePlanData {
  name: string;
  planId: string;
}

export interface AdminSuggestionData {
  id: string;
  message: string;
  pageUrl?: string | null;
  userAgent?: string | null;
  userId?: string | null;
  userEmail?: string | null;
  createdAt: string;
}
