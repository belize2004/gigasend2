import type { APIRoute } from "astro";
import { json } from "@/src/lib/api";

export const POST: APIRoute = async ({ request, url }) => {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const token = url.searchParams.get("secret");

  if (!secret || token !== secret) {
    return json({ message: "Invalid token" }, 401);
  }

  try {
    await request.json().catch(() => ({}));
    return json({ revalidated: true });
  } catch (err) {
    console.error("Error revalidating:", err);
    return json({ message: "Error revalidating" }, 500);
  }
};
