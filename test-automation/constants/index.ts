/** Centralized constants for the test-automation suite — single source of truth. */
export * from "./homepage-constants";
export * from "./api-constants";
export * from "./footer-constants";
export * from "./faq-constants";
export * from "./routes";
export * from "./careers-constants";

// Banking Company Netlify deploy target
export const BASE_URL = "https://banking-company-440.netlify.app";

// Database helpers referenced by base/api-base.ts
export const DB_PATH = "../prisma/dev.db";
export const SCHEMA_PATH = "../prisma/schema.prisma";
