import { z } from "zod";

export const API_PATHS = {
  AUTH_STATUS: "/api/auth/status",
  CTA_CONFIG: "/api/config/cta",
  TESTIMONIALS: "/api/testimonials",
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

export const CTA_ENDPOINTS = {
  HOME: `${API_PATHS.CTA_CONFIG}?page=home`,
};

export const testimonialSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  role: z.string().min(1),
  quote: z.string().min(1),
  avatarUrl: z.string().nullable(),
});

export const testimonialsResponseSchema = z.object({
  testimonials: z.array(testimonialSchema),
});

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string | null;
}

export interface TestimonialsResponse {
  testimonials: Testimonial[];
}

export const TESTIMONIALS_ENDPOINTS = {
  LIST: API_PATHS.TESTIMONIALS,
};
