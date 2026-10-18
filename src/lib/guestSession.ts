import type { AstroCookies } from "astro";
import { type AppD1Database, type UserRecord, findUserById, getActiveShareUsage } from "@/lib/d1";
import { getAuthenticatedUserId } from "@/src/lib/api";

const GUEST_COOKIE_NAME = "gigasend_guest_id";

export interface UserSession {
  userId: string;
  isGuest: boolean;
  user: UserRecord;
}

export interface UserSessionWithUsage extends UserSession {
  usedLimit: number;
}

export interface FastSessionIdentity {
  userId: string;
  isGuest: boolean;
}

function getOrMintGuestCookie(cookies: AstroCookies): { guestId: string; isNewGuest: boolean } {
  let guestId = cookies.get(GUEST_COOKIE_NAME)?.value;
  if (!guestId || typeof guestId !== "string" || !guestId.startsWith("guest_")) {
    guestId = `guest_${crypto.randomUUID().replace(/-/g, "")}`;
    cookies.set(GUEST_COOKIE_NAME, guestId, {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return { guestId, isNewGuest: true };
  }
  return { guestId, isNewGuest: false };
}

/**
 * Zero-D1-query session identity check (<0.1ms).
 * Cryptographically verifies JWT if present, otherwise uses or mints guest cookie.
 */
export async function getFastSessionIdentity(
  cookies: AstroCookies,
  locals?: unknown,
): Promise<FastSessionIdentity> {
  const authUserId = await getAuthenticatedUserId(cookies, locals);
  if (authUserId) {
    return { userId: authUserId, isGuest: false };
  }
  const { guestId } = getOrMintGuestCookie(cookies);
  return { userId: guestId, isGuest: true };
}

export async function findOrCreateGuestUser(
  db: AppD1Database,
  guestId: string,
  skipSelect = false,
): Promise<UserRecord> {
  if (!skipSelect) {
    const existing = await findUserById(db, guestId);
    if (existing) return existing;
  }

  const email = `${guestId}@guest.gigasend.us`;
  await db
    .prepare("INSERT OR IGNORE INTO users (id, name, email, password) VALUES (?, ?, ?, ?)")
    .bind(guestId, "Guest User", email, "guest_ephemeral")
    .run();

  return {
    id: guestId,
    name: "Guest User",
    email,
    password: "guest_ephemeral",
    stripeCustomerId: null,
  };
}

export async function getOrCreateUserSession(
  cookies: AstroCookies,
  db: AppD1Database,
  locals?: unknown,
): Promise<UserSession> {
  const authUserId = await getAuthenticatedUserId(cookies, locals);
  if (authUserId) {
    const user = await findUserById(db, authUserId);
    if (user) {
      return { userId: user.id, isGuest: false, user };
    }
  }

  const { guestId, isNewGuest } = getOrMintGuestCookie(cookies);
  const guestUser = await findOrCreateGuestUser(db, guestId, isNewGuest);
  return {
    userId: guestUser.id,
    isGuest: true,
    user: guestUser,
  };
}

/**
 * Resolves user session AND active share usage in parallel (single D1 round-trip
 * instead of two sequential D1 queries).
 */
export async function getOrCreateUserSessionWithUsage(
  cookies: AstroCookies,
  db: AppD1Database,
  locals?: unknown,
): Promise<UserSessionWithUsage> {
  const authUserId = await getAuthenticatedUserId(cookies, locals);
  if (authUserId) {
    const [user, usedLimit] = await Promise.all([
      findUserById(db, authUserId),
      getActiveShareUsage(db, authUserId),
    ]);
    if (user) {
      return { userId: user.id, isGuest: false, user, usedLimit };
    }
  }

  const { guestId, isNewGuest } = getOrMintGuestCookie(cookies);
  if (isNewGuest) {
    const guestUser = await findOrCreateGuestUser(db, guestId, true);
    return {
      userId: guestUser.id,
      isGuest: true,
      user: guestUser,
      usedLimit: 0,
    };
  }

  const [guestUser, usedLimit] = await Promise.all([
    findOrCreateGuestUser(db, guestId, false),
    getActiveShareUsage(db, guestId),
  ]);
  return {
    userId: guestUser.id,
    isGuest: true,
    user: guestUser,
    usedLimit,
  };
}

