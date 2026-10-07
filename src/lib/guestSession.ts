import type { AstroCookies } from "astro";
import { type AppD1Database, type UserRecord, findUserById } from "@/lib/d1";
import { getAuthenticatedUserId } from "@/src/lib/api";

const GUEST_COOKIE_NAME = "gigasend_guest_id";

export interface UserSession {
  userId: string;
  isGuest: boolean;
  user: UserRecord;
}

export async function findOrCreateGuestUser(db: AppD1Database, guestId: string): Promise<UserRecord> {
  const existing = await findUserById(db, guestId);
  if (existing) return existing;

  const email = `${guestId}@guest.gigasend.us`;
  await db
    .prepare("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)")
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

export async function getOrCreateUserSession(cookies: AstroCookies, db: AppD1Database): Promise<UserSession> {
  const authUserId = await getAuthenticatedUserId(cookies);
  if (authUserId) {
    const user = await findUserById(db, authUserId);
    if (user) {
      return { userId: user.id, isGuest: false, user };
    }
  }

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
  }

  const guestUser = await findOrCreateGuestUser(db, guestId);
  return {
    userId: guestUser.id,
    isGuest: true,
    user: guestUser,
  };
}
