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
  isVipPartner?: boolean;
  partnerNotes?: string;
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
  seoStats?: {
    totalKeywords: number;
    strikingDistanceCount: number;
    underexposedCount: number;
    highFitCount: number;
    topAction: string;
  } | null;
  transferExperience?: TransferExperienceOverview | null;
}

export type ExperienceGradeCode = "A" | "B" | "C" | "D" | "F";

export interface TransferStepBreakdownItem {
  stepNumber: number;
  label: string;
  phaseName: string;
  durationMs: number;
  durationText: string;
  percentOfTotal: number;
  plainExplanation: string;
}

export interface AdaptiveSpeedTuning {
  profile: "turbo_fiber" | "balanced_edge" | "stabilized_wifi";
  label: string;
  concurrency: number;
  chunkSizeMultiplier: 0.5 | 1 | 2;
  presignBatchSize: number;
  plainExplanation: string;
}

export interface PlainEnglishTransferEvaluation {
  grade: ExperienceGradeCode;
  gradeLabel: string;
  gradeColor: "emerald" | "blue" | "amber" | "orange" | "red";
  headline: string;
  story: string;
  speedComparison: string;
  edgeLocationLabel: string;
  steps: TransferStepBreakdownItem[];
  stepSummaryLine: string;
  recommendations: string[];
  recommendedTuning?: AdaptiveSpeedTuning;
  bottleneck:
    | "none"
    | "client_internet"
    | "network_instability"
    | "zip_packaging"
    | "server_finalize"
    | "user_paused"
    | "failed_transfer";
  bottleneckLabel: string;
}

export interface TransferExperienceRecord {
  id: string;
  shareId?: string | null;
  direction: "upload" | "download";
  event: string;
  transferMode?: string | null;
  deliveryMode?: string | null;
  fileCount: number;
  totalBytes: number;
  durationMs: number;
  averageMbps: number;
  retryCount: number;
  httpStatus: number;
  edgeLocationLabel: string;
  grade: ExperienceGradeCode;
  gradeLabel: string;
  story: string;
  stepSummaryLine: string;
  steps: TransferStepBreakdownItem[];
  recommendations: string[];
  bottleneck: string;
  bottleneckLabel: string;
  createdAt: string;
}

export interface TransferExperienceOverview {
  overallGradeLabel: string;
  plainEnglishHeadline: string;
  totalEvaluated: number;
  completedUploads: number;
  totalDownloads: number;
  autoHealedRetries: number;
  successRatePercent: number;
  averageUploadMbps: number;
  averageDownloadStartMs: number;
  gradeDistribution: Record<ExperienceGradeCode, number>;
  topActionableInsights: string[];
  recentEvaluations: TransferExperienceRecord[];
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

