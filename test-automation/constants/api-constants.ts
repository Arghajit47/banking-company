import { z } from "zod";

export const API_PATHS = {
  AUTH_STATUS: "/api/auth/status",
  CTA_CONFIG: "/api/config/cta",
  TESTIMONIALS: "/api/testimonials",
  HERO: "/api/home/hero",
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

// BC-21 — Hero Section
export const heroTransactionSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  amount: z.string().min(1),
});

export const heroExchangeRateSchema = z.object({
  id: z.number(),
  code: z.string().min(1),
  name: z.string().min(1),
  value: z.string().min(1),
  icon: z.string().min(1),
});

export const heroCurrencySchema = z.object({
  icon: z.string().min(1),
});

export const heroMonthlyIncomeSchema = z.object({
  icon: z.string().min(1),
  value: z.string().min(1),
  label: z.string().min(1),
});

export const heroStatsSchema = z.object({
  transactions: z.array(heroTransactionSchema),
  exchangeRates: z.array(heroExchangeRateSchema),
  currencies: z.array(heroCurrencySchema),
  monthlyIncome: heroMonthlyIncomeSchema,
});

export const heroResponseSchema = z.object({
  headline: z.string().min(1),
  subtext: z.string().min(1),
  ctaLabel: z.string().min(1),
  stats: heroStatsSchema,
});

export interface HeroTransaction {
  id: number;
  name: string;
  amount: string;
}

export interface HeroExchangeRate {
  id: number;
  code: string;
  name: string;
  value: string;
  icon: string;
}

export interface HeroCurrency {
  icon: string;
}

export interface HeroMonthlyIncome {
  icon: string;
  value: string;
  label: string;
}

export interface HeroStats {
  transactions: HeroTransaction[];
  exchangeRates: HeroExchangeRate[];
  currencies: HeroCurrency[];
  monthlyIncome: HeroMonthlyIncome;
}

export interface HeroResponse {
  headline: string;
  subtext: string;
  ctaLabel: string;
  stats: HeroStats;
}

export const HERO_ENDPOINTS = {
  HOME: API_PATHS.HERO,
};

export const HERO_SCHEMA_LABELS = {
  HERO_RESPONSE: "hero response schema",
} as const;
