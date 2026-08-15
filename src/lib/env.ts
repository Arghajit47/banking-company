export const NODE_ENV = process.env.NODE_ENV ?? "development";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const APP_ENV =
  process.env.NEXT_PUBLIC_APP_ENV ??
  process.env.APP_ENV ??
  (NODE_ENV === "production" ? "production" : "development");

export const isProduction = APP_ENV === "production";
export const isDevelopment = APP_ENV === "development";

/**
 * Returns the database URL to use.
 * - In production it must be supplied by the host (e.g. Netlify) via DATABASE_URL.
 * - In development it falls back to a local SQLite file.
 */
export function databaseUrl(): string {
  const url = process.env.DATABASE_URL;

  if (url) return url;

  if (isProduction) {
    throw new Error(
      "Missing DATABASE_URL environment variable. Set it in your Netlify project settings."
    );
  }

  return "file:./prisma/dev.db";
}
