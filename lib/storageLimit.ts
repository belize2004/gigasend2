import { PlanEnum, PLANS } from "./constant";
import type { UserRecord } from "./d1";
import { gbToBytes } from "./utils";

const UNCAPPED_STORAGE_USERS = new Set([
  "blaine@flowwebdesigner.com",
]);

const UNCAPPED_STORAGE_LIMIT_BYTES = Number.MAX_SAFE_INTEGER;

export interface VipPlanGrant {
  plan: PlanEnum;
  storageGB: number;
  expiresAt: string;
  notes: string;
}

export const VIP_GRANTED_PLANS: Record<string, VipPlanGrant> = {
  "mailnicob@gmail.com": {
    plan: "pro",
    storageGB: 80,
    expiresAt: "2027-10-18T00:00:00Z",
    notes: "Influencer Barter - 12 Month 80GB Pro Plan",
  },
};

export function getVipGrantForUser(user: Pick<UserRecord, "email"> | null | undefined): VipPlanGrant | null {
  if (!user || !user.email) return null;
  const email = user.email.trim().toLowerCase();
  const grant = VIP_GRANTED_PLANS[email];
  if (!grant) return null;

  if (new Date(grant.expiresAt).getTime() < Date.now()) {
    return null;
  }
  return grant;
}

export function getStorageLimitBytesForUser(user: Pick<UserRecord, "email">, planName: PlanEnum = "free") {
  const email = user.email.trim().toLowerCase();

  if (UNCAPPED_STORAGE_USERS.has(email)) {
    return UNCAPPED_STORAGE_LIMIT_BYTES;
  }

  const vipGrant = getVipGrantForUser(user);
  if (vipGrant) {
    const vipBytes = gbToBytes(vipGrant.storageGB);
    const standardBytes = gbToBytes(PLANS[planName]?.storageBytes ?? PLANS.free.storageBytes);
    return Math.max(vipBytes, standardBytes);
  }

  return gbToBytes(PLANS[planName]?.storageBytes ?? PLANS.free.storageBytes);
}

