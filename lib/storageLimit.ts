import { PlanEnum, PLANS } from "./constant";
import type { UserRecord } from "./d1";
import { gbToBytes } from "./utils";

const UNCAPPED_STORAGE_USERS = new Set([
  "blaine@flowwebdesigner.com",
]);

const UNCAPPED_STORAGE_LIMIT_BYTES = Number.MAX_SAFE_INTEGER;

export function getStorageLimitBytesForUser(user: Pick<UserRecord, "email">, planName: PlanEnum = "free") {
  const email = user.email.trim().toLowerCase();

  if (UNCAPPED_STORAGE_USERS.has(email)) {
    return UNCAPPED_STORAGE_LIMIT_BYTES;
  }

  return gbToBytes(PLANS[planName].storageBytes);
}
