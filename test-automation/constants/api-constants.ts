import { z } from "zod";

export const API_PATHS = {
  AUTH_STATUS: "/api/auth/status",
  CTA_CONFIG: "/api/config/cta",
} as const;

export const authStatusSchema = z.object({
  isLoggedIn: z.boolean(),
  user: z.object({
    name: z.string().min(1),
    avatarUrl: z.string().nullable(),
  }).nullable(),
});

export const ctaConfigSchema = z.object({
  headline: z.string().min(1),
  body: z.string().min(1),
  buttonLabel: z.string().min(1),
});

export interface AuthStatus {
  isLoggedIn: boolean;
  user: {
    name: string;
    avatarUrl: string | null;
  } | null;
}

export interface CTAConfig {
  headline: string;
  body: string;
  buttonLabel: string;
}

export type CTAPage = "home" | "careers";
