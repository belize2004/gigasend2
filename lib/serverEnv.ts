export function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
export const ADMIN_EMAILS = process.env.ADMIN_EMAILS || "";
