import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getAdminEmails, getJwtSecret } from "@/lib/serverEnv";
import { createUser, findUserByEmail, getDb } from "@/lib/d1";
import { json, setAuthCookie } from "@/src/lib/api";
import { brand } from "@/lib/brand";
import { sendEmailViaCloudflare } from "@/lib/email";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
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
    const secretKey = getJwtSecret((locals as any)?.runtime?.env);
    const token = await new SignJWT({ userId: newUser.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secretKey));

    setAuthCookie(cookies, token);

    // Notify admin of new user registration
    const emailBinding = (locals as any)?.runtime?.env?.EMAIL;
    const adminRecipients = getAdminEmails((locals as any)?.runtime?.env);
    if (adminRecipients.length > 0) {
      sendEmailViaCloudflare(emailBinding, {
        from: brand.emailFrom,
        to: adminRecipients,
        subject: `New Gigasend Signup: ${newUser.name} (${newUser.email})`,
        html: `
          <h2>New User Registered on Gigasend</h2>
          <p><strong>Name:</strong> ${newUser.name}</p>
          <p><strong>Email:</strong> ${newUser.email}</p>
          <p><strong>User ID:</strong> ${newUser.id}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `,
        text: `New User Registered on Gigasend\nName: ${newUser.name}\nEmail: ${newUser.email}\nUser ID: ${newUser.id}\nTime: ${new Date().toISOString()}`,
      }).catch((notifyErr) => console.warn("Admin signup notification error:", notifyErr));
    }

    return json(
      {
        success: true,
        message: "User created successfully",
        data: { _id: newUser.id, email: newUser.email },
      },
      201,
    );
  } catch (err: any) {
    console.error("Sign-up error:", err);
    return json({ success: false, message: "Failed to create account. Please try again." }, 500);
  }
};
