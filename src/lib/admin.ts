import type { AstroCookies } from "astro";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { getAdminEmails as getEnvAdminEmails, getJwtSecret } from "@/lib/serverEnv";
import { findUserById, type AppD1Database } from "@/lib/d1";
import { getAuthenticatedUserId, json, unauthorized } from "@/src/lib/api";

const ADMIN_COOKIE = "admin_token";

function getSecretBytes(locals?: unknown) {
  const runtimeEnv = (locals as any)?.runtime?.env;
  return new TextEncoder().encode(getJwtSecret(runtimeEnv));
}

function getAdminEmails(locals?: unknown) {
  const runtimeEnv = (locals as any)?.runtime?.env;
  return getEnvAdminEmails(runtimeEnv).map((email) => email.trim().toLowerCase());
}

async function getAuthenticatedAdminIdentity(cookies: AstroCookies, db: AppD1Database, locals?: unknown) {
  const userId = await getAuthenticatedUserId(cookies, locals);
  if (!userId) return { response: unauthorized(), user: null };

  const user = await findUserById(db, userId);
  if (!user) return { response: json({ success: false, message: "User not found" }, 404), user: null };

  const adminEmails = getAdminEmails(locals);
  if (!adminEmails.includes(user.email.toLowerCase())) {
    return { response: json({ success: false, message: "Admin access required" }, 403), user: null };
  }

  return { response: null, user };
}

async function hasAdminSession(cookies: AstroCookies, userId: string, locals?: unknown) {
  const token = cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify<{ userId: string; scope: string }>(token, getSecretBytes(locals));
    return payload.userId === userId && payload.scope === "admin";
  } catch {
    return false;
  }
}

export async function createAdminSession(cookies: AstroCookies, db: AppD1Database, password: string, locals?: unknown) {
  const { response, user } = await getAuthenticatedAdminIdentity(cookies, db, locals);
  if (response || !user) return { response, user: null };

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return { response: json({ success: false, message: "Invalid admin password" }, 401), user: null };
  }

  const token = await new SignJWT({ userId: user.id, scope: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(getSecretBytes(locals));

  cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return { response: null, user };
}

export function clearAdminSession(cookies: AstroCookies) {
  cookies.delete(ADMIN_COOKIE, { path: "/" });
}

export async function getAuthenticatedAdmin(cookies: AstroCookies, db: AppD1Database, locals?: unknown) {
  const { response, user } = await getAuthenticatedAdminIdentity(cookies, db, locals);
  if (response || !user) return { response, user: null };

  if (!(await hasAdminSession(cookies, user.id, locals))) {
    return { response: json({ success: false, message: "Admin password required", code: "ADMIN_PASSWORD_REQUIRED" }, 401), user: null };
  }

  return { response: null, user };
}
