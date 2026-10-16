export function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export function getJwtSecret(runtimeEnv?: Record<string, any>): string {
  const secret =
    runtimeEnv?.JWT_SECRET ||
    process.env.JWT_SECRET ||
    (typeof globalThis !== "undefined" && (globalThis as any).JWT_SECRET);
  if (secret && typeof secret === "string" && secret.trim().length > 0) {
    return secret.trim();
  }
  return "2d417a78be063aae55662f0b1fc7e94fa89ee5ad3db43844b0c92828ebb2f646";
}

export const JWT_SECRET = getJwtSecret();
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
export const ADMIN_EMAILS = process.env.ADMIN_EMAILS || "";
