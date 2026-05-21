import type { AstroCookies } from "astro";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  stripeCustomerId?: string | null;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  password: string;
  stripe_customer_id: string | null;
}

interface ShareRow {
  id: string;
  email: string;
  expires_at: string;
  size: number;
  user_id: string;
  link: string;
  file_key: string | null;
  download_notified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface StripePlanRow {
  name: string;
  plan_id: string;
}

interface AdminStatsRow {
  total_users: number;
  total_shares: number;
  active_shares: number;
  expired_shares: number;
  active_storage_bytes: number;
  total_shared_bytes: number;
}

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  stripe_customer_id: string | null;
  created_at: string;
}

interface AdminShareRow {
  id: string;
  receiver_email: string;
  sender_email: string;
  sender_name: string;
  size: number;
  expires_at: string;
  created_at: string;
  is_expired: number;
  has_file_key: number;
}

interface SuggestionRow {
  id: string;
  message: string;
  page_url: string | null;
  user_agent: string | null;
  user_id: string | null;
  user_email: string | null;
  created_at: string;
}

export type AppD1Database = {
  prepare: (query: string) => {
    bind: (...values: unknown[]) => AppD1PreparedStatement;
    first: <T = unknown>(columnName?: string) => Promise<T | null>;
    all: <T = unknown>() => Promise<{ results?: T[] }>;
    run: () => Promise<unknown>;
  };
};

type AppD1PreparedStatement = {
  first: <T = unknown>(columnName?: string) => Promise<T | null>;
  all: <T = unknown>() => Promise<{ results?: T[] }>;
  run: () => Promise<{ meta?: { changes?: number } }>;
};

export interface RuntimeLocals {
  runtime?: {
    env?: {
      DB?: AppD1Database;
      FILES?: {
        get: (key: string) => Promise<{
          body: ReadableStream<Uint8Array> | null;
        } | null>;
      };
    };
  };
}

export function getDb(locals: RuntimeLocals) {
  const db = locals.runtime?.env?.DB;
  if (!db) {
    throw new Error("Cloudflare D1 binding DB is not available");
  }
  return db;
}

function toUser(row: UserRow | null): UserRecord | null {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    stripeCustomerId: row.stripe_customer_id,
  };
}

function toShare(row: ShareRow) {
  return {
    id: row.id,
    _id: row.id,
    email: row.email,
    expiresAt: row.expires_at,
    size: row.size,
    userId: row.user_id,
    link: row.link,
    fileKey: row.file_key,
    downloadNotifiedAt: row.download_notified_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findUserByEmail(db: AppD1Database, email: string) {
  const row = await db
    .prepare(
      "SELECT id, name, email, password, stripe_customer_id FROM users WHERE lower(email) = lower(?) LIMIT 1",
    )
    .bind(email)
    .first<UserRow>();

  return toUser(row);
}

export async function findUserById(db: AppD1Database, id: string) {
  const row = await db
    .prepare("SELECT id, name, email, password, stripe_customer_id FROM users WHERE id = ? LIMIT 1")
    .bind(id)
    .first<UserRow>();

  return toUser(row);
}

export async function createUser(db: AppD1Database, input: { name: string; email: string; password: string }) {
  const id = crypto.randomUUID();
  await db
    .prepare("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)")
    .bind(id, input.name, input.email, input.password)
    .run();

  return { id, ...input, stripeCustomerId: null };
}

export async function updateUserStripeCustomerId(db: AppD1Database, userId: string, stripeCustomerId: string) {
  await db
    .prepare("UPDATE users SET stripe_customer_id = ?, updated_at = datetime('now') WHERE id = ?")
    .bind(stripeCustomerId, userId)
    .run();
}

export async function listActiveShares(db: AppD1Database, userId: string) {
  const { results = [] } = await db
    .prepare(
      "SELECT id, email, expires_at, size, user_id, link, file_key, download_notified_at, created_at, updated_at FROM shares WHERE user_id = ? AND expires_at > datetime('now') ORDER BY created_at DESC",
    )
    .bind(userId)
    .all<ShareRow>();

  return results.map(toShare);
}

export async function getActiveShareUsage(db: AppD1Database, userId: string) {
  const row = await db
    .prepare("SELECT COALESCE(SUM(size), 0) AS used_storage FROM shares WHERE user_id = ? AND expires_at > datetime('now')")
    .bind(userId)
    .first<{ used_storage: number }>();

  return Number(row?.used_storage ?? 0);
}

export async function createShare(
  db: AppD1Database,
  input: {
    userId: string;
    email: string;
    size: number;
    expiresAt: Date;
    fileKey: string;
    numberOfFiles?: number;
    getLink: (shareId: string) => string;
  },
) {
  const id = crypto.randomUUID();
  const link = input.getLink(id);
  await db
    .prepare(
      "INSERT INTO shares (id, user_id, email, size, expires_at, link, file_key, number_of_files) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      id,
      input.userId,
      input.email,
      input.size,
      input.expiresAt.toISOString(),
      link,
      input.fileKey,
      input.numberOfFiles ?? 1,
    )
    .run();

  return { id, link };
}

export async function getPublicStats(db: AppD1Database) {
  const row = await db
    .prepare(
      `
      SELECT
        COALESCE(SUM(number_of_files), COUNT(*), 0) AS files_sent,
        COUNT(*) AS transfers_sent
      FROM shares
      `,
    )
    .first<{ files_sent: number; transfers_sent: number }>();

  return {
    filesSent: Number(row?.files_sent ?? 0),
    transfersSent: Number(row?.transfers_sent ?? 0),
  };
}

export async function findShareById(db: AppD1Database, id: string) {
  const row = await db
    .prepare(
      "SELECT id, email, expires_at, size, user_id, link, file_key, download_notified_at, created_at, updated_at FROM shares WHERE id = ? LIMIT 1",
    )
    .bind(id)
    .first<ShareRow>();

  return row ? toShare(row) : null;
}

export async function markShareDownloadNotified(db: AppD1Database, id: string) {
  const result = await db
    .prepare(
      "UPDATE shares SET download_notified_at = datetime('now'), updated_at = datetime('now') WHERE id = ? AND download_notified_at IS NULL",
    )
    .bind(id)
    .run();

  return Number(result.meta?.changes ?? 0) > 0;
}

export async function findStripePlanByName(db: AppD1Database, planName: string) {
  const row = await db
    .prepare("SELECT name, plan_id FROM stripe_plans WHERE lower(name) = lower(?) LIMIT 1")
    .bind(planName)
    .first<StripePlanRow>();

  if (!row) return null;
  return { name: row.name, planId: row.plan_id };
}

export async function createSuggestion(
  db: AppD1Database,
  input: {
    message: string;
    pageUrl?: string | null;
    userAgent?: string | null;
    userId?: string | null;
  },
) {
  const id = crypto.randomUUID();
  await db
    .prepare(
      "INSERT INTO suggestions (id, message, page_url, user_agent, user_id) VALUES (?, ?, ?, ?, ?)",
    )
    .bind(id, input.message, input.pageUrl ?? null, input.userAgent ?? null, input.userId ?? null)
    .run();

  return {
    id,
    message: input.message,
    pageUrl: input.pageUrl ?? null,
    userAgent: input.userAgent ?? null,
    userId: input.userId ?? null,
  };
}

export async function getAdminOverview(db: AppD1Database) {
  const stats = await db
    .prepare(
      `
      SELECT
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM shares) AS total_shares,
        (SELECT COUNT(*) FROM shares WHERE expires_at > datetime('now')) AS active_shares,
        (SELECT COUNT(*) FROM shares WHERE expires_at <= datetime('now')) AS expired_shares,
        (SELECT COALESCE(SUM(size), 0) FROM shares WHERE expires_at > datetime('now')) AS active_storage_bytes,
        (SELECT COALESCE(SUM(size), 0) FROM shares) AS total_shared_bytes
      `,
    )
    .first<AdminStatsRow>();

  const { results: recentUsers = [] } = await db
    .prepare(
      "SELECT id, name, email, stripe_customer_id, created_at FROM users ORDER BY created_at DESC LIMIT 10",
    )
    .all<AdminUserRow>();

  const { results: recentShares = [] } = await db
    .prepare(
      `
      SELECT
        shares.id,
        shares.email AS receiver_email,
        users.email AS sender_email,
        users.name AS sender_name,
        shares.size,
        shares.expires_at,
        shares.created_at,
        CASE WHEN shares.expires_at <= datetime('now') THEN 1 ELSE 0 END AS is_expired,
        CASE WHEN shares.file_key IS NOT NULL AND shares.file_key != '' THEN 1 ELSE 0 END AS has_file_key
      FROM shares
      JOIN users ON users.id = shares.user_id
      ORDER BY shares.created_at DESC
      LIMIT 20
      `,
    )
    .all<AdminShareRow>();

  const { results: stripePlans = [] } = await db
    .prepare("SELECT name, plan_id FROM stripe_plans ORDER BY name")
    .all<StripePlanRow>();

  const { results: recentSuggestions = [] } = await db
    .prepare(
      `
      SELECT
        suggestions.id,
        suggestions.message,
        suggestions.page_url,
        suggestions.user_agent,
        suggestions.user_id,
        users.email AS user_email,
        suggestions.created_at
      FROM suggestions
      LEFT JOIN users ON users.id = suggestions.user_id
      ORDER BY suggestions.created_at DESC
      LIMIT 20
      `,
    )
    .all<SuggestionRow>();

  return {
    stats: {
      totalUsers: Number(stats?.total_users ?? 0),
      totalShares: Number(stats?.total_shares ?? 0),
      activeShares: Number(stats?.active_shares ?? 0),
      expiredShares: Number(stats?.expired_shares ?? 0),
      activeStorageBytes: Number(stats?.active_storage_bytes ?? 0),
      totalSharedBytes: Number(stats?.total_shared_bytes ?? 0),
    },
    recentUsers: recentUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      stripeCustomerId: user.stripe_customer_id,
      createdAt: user.created_at,
    })),
    recentShares: recentShares.map((share) => ({
      id: share.id,
      receiverEmail: share.receiver_email,
      senderEmail: share.sender_email,
      senderName: share.sender_name,
      size: share.size,
      expiresAt: share.expires_at,
      createdAt: share.created_at,
      isExpired: Boolean(share.is_expired),
      hasFileKey: Boolean(share.has_file_key),
    })),
    stripePlans: stripePlans.map((plan) => ({
      name: plan.name,
      planId: plan.plan_id,
    })),
    recentSuggestions: recentSuggestions.map((suggestion) => ({
      id: suggestion.id,
      message: suggestion.message,
      pageUrl: suggestion.page_url,
      userAgent: suggestion.user_agent,
      userId: suggestion.user_id,
      userEmail: suggestion.user_email,
      createdAt: suggestion.created_at,
    })),
  };
}

export type { AstroCookies };
