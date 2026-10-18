import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getAdminEmails, getJwtSecret } from "@/lib/serverEnv";
import { createUser, findUserByEmail, getDb, updateUserPassword } from "@/lib/d1";
import { json, setAuthCookie } from "@/src/lib/api";
import { brand } from "@/lib/brand";
import {
  generateWelcomeEmailHtml,
  generateWelcomeEmailText,
  sendEmailViaCloudflare,
} from "@/lib/email";

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return json({ success: false, message: "Invalid JSON body" }, 400);
    }
    const { name, email, password } = body as Record<string, unknown>;

    if (!name || typeof name !== "string" || !email || typeof email !== "string" || !password || typeof password !== "string") {
      return json({ success: false, message: "Missing fields" }, 400);
    }

    const db = getDb(locals);

    const userExists = await findUserByEmail(db, email);
    if (userExists) {
      // Seamlessly claim pre-provisioned / invited VIP accounts
      const isPreProvisioned =
        userExists.password.startsWith("INVITED_") ||
        userExists.password.startsWith("PREPROVISIONED_") ||
        userExists.password.startsWith("VIP_");

      if (isPreProvisioned) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await updateUserPassword(db, userExists.id, hashedPassword);

        const secretKey = getJwtSecret((locals as any)?.runtime?.env);
        const token = await new SignJWT({ userId: userExists.id })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("7d")
          .sign(new TextEncoder().encode(secretKey));

        setAuthCookie(cookies, token);

        return json({
          success: true,
          data: { _id: userExists.id, email: userExists.email },
          message: "Welcome to Gigasend! Your VIP Pro account is now active.",
        });
      }

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

    const emailBinding = (locals as any)?.runtime?.env?.EMAIL;
    const adminRecipients = getAdminEmails((locals as any)?.runtime?.env);

    // 1. Dispatch Welcome Email to the newly registered user
    const userWelcomePromise = sendEmailViaCloudflare(emailBinding, {
      from: brand.emailFrom,
      replyTo: brand.contactEmail,
      to: newUser.email,
      subject: "Welcome to Gigasend — Your high-speed file transfer workspace is live",
      html: generateWelcomeEmailHtml(newUser.name),
      text: generateWelcomeEmailText(newUser.name),
      headers: {
        "X-Entity-Ref-ID": `welcome-${newUser.id}`,
      },
    });

    // 2. Notify admin of new user registration
    const adminNotifyPromise =
      adminRecipients.length > 0
        ? sendEmailViaCloudflare(emailBinding, {
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
          })
        : Promise.resolve({ success: true });

    await Promise.allSettled([userWelcomePromise, adminNotifyPromise]);

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

