import type { AstroCookies } from "astro";
import { verifyToken } from "@/lib/verifyJwt";

export function json(data: unknown, init?: ResponseInit | number) {
  const responseInit = typeof init === "number" ? { status: init } : init;
  return new Response(JSON.stringify(data), {
    ...responseInit,
    headers: {
      "content-type": "application/json",
      ...(responseInit?.headers ?? {}),
    },
  });
}

export async function getAuthenticatedUserId(cookies: AstroCookies, locals?: any) {
  const token = cookies.get("token")?.value;
  if (!token) return null;

  const runtimeEnv = locals?.runtime?.env;
  const payload = await verifyToken(token, runtimeEnv);
  return payload?.userId ?? null;
}

export function setAuthCookie(cookies: AstroCookies, token: string) {
  cookies.set("token", token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(cookies: AstroCookies) {
  cookies.delete("token", {
    path: "/",
  });
}

export function unauthorized() {
  return json({ success: false, message: "Please sign in to continue." }, 401);
}
