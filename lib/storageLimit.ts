import { PlanEnum, PLANS } from "./constant";
import type { UserRecord } from "./d1";
import { gbToBytes } from "./utils";

const USER_STORAGE_LIMIT_OVERRIDES_GB: Record<string, number> = {
  "blaine@flowwebdesigner.com": 100,
};

export function getStorageLimitBytesForUser(user: Pick<UserRecord, "email">, planName: PlanEnum = "free") {
  const email = user.email.trim().toLowerCase();
  const overrideGb = USER_STORAGE_LIMIT_OVERRIDES_GB[email];

  if (overrideGb) {
    return gbToBytes(overrideGb);
  }

  return gbToBytes(PLANS[planName].storageBytes);
}
