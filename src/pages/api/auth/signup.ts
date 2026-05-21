import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { JWT_SECRET } from "@/lib/serverEnv";
import { createUser, findUserByEmail, getDb } from "@/lib/d1";
import { json, setAuthCookie } from "@/src/lib/api";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return json({ success: false, message: "Missing fields" }, 400);
  }

  const db = getDb(locals);

  const userExists = await findUserByEmail(db, email);
  if (userExists) {
    return json({ success: false, message: "User already exists" }, 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser(db, { name, email, password: hashedPassword });
  const token = await new SignJWT({ userId: newUser.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(JWT_SECRET));

  setAuthCookie(cookies, token);

  return json(
    {
      success: true,
      message: "User created successfully",
      data: { _id: newUser.id, email: newUser.email },
    },
    201,
  );
};
