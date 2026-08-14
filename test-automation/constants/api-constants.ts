import { z } from "zod";

export const API_PATHS = {
  AUTH_STATUS: "/api/auth/status",
  CTA_CONFIG: "/api/config/cta",
  TESTIMONIALS: "/api/testimonials",
  HERO: "/api/home/hero",
  CAREERS_HERO: "/api/careers/hero",
  CAREERS_VALUES: "/api/careers/values",
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

// BC-24 — Products Section
export const productSchema = z.object({
  id: z.number().int(),
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
});

export interface Product {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ProductsResponse {
  products: Product[];
}

export const PRODUCTS_ENDPOINTS = {
  LIST: "/api/products",
} as const;

export const PRODUCTS_SCHEMA_LABELS = {
  PRODUCTS_RESPONSE: "products response schema",
} as const;

// BC-27 — Use Cases Section
export const useCaseSchema = z.object({
  id: z.number().int(),
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  audience: z.enum(["individual", "business"]),
});

export const useCasesResponseSchema = z.object({
  useCases: z.array(useCaseSchema),
});

export interface UseCase {
  id: number;
  icon: string;
  title: string;
  description: string;
  audience: "individual" | "business";
}

export interface UseCasesResponse {
  useCases: UseCase[];
}

export const USE_CASES_ENDPOINTS = {
  LIST: "/api/use-cases",
} as const;

export const USE_CASES_SCHEMA_LABELS = {
  USE_CASES_RESPONSE: "use cases response schema",
} as const;

// BC-30 — Features Section
export const FEATURES_API_PATH = "/api/features" as const;

export const featureSchema = z.object({
  id: z.number().int(),
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const featuresResponseSchema = z.object({
  features: z.array(featureSchema),
});

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesResponse {
  features: Feature[];
}

export const FEATURES_SCHEMA_LABELS = {
  FEATURES_RESPONSE: "features response schema",
} as const;

// BC-33 — Careers Hero Section
export const careersHeroSchema = z.object({
  headline: z.string().min(1),
  body: z.string().min(1),
  ctaLabel: z.string().min(1),
  imageUrl: z.string().min(1),
});

export interface CareersHeroData {
  headline: string;
  body: string;
  ctaLabel: string;
  imageUrl: string;
}

export const CAREERS_HERO_ENDPOINTS = {
  HERO: API_PATHS.CAREERS_HERO,
} as const;

export const CAREERS_HERO_SCHEMA_LABELS = {
  CAREERS_HERO_RESPONSE: "careers hero response schema",
} as const;

// BC-35/BC-36 — Careers Values Section
export const careersValueItemSchema = z.object({
  id: z.number().int(),
  icon: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const careersValuesResponseSchema = z.object({
  values: z.array(careersValueItemSchema),
});

export interface CareersValueItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface CareersValuesData {
  values: CareersValueItem[];
}

export const CAREERS_VALUES_ENDPOINTS = {
  VALUES: API_PATHS.CAREERS_VALUES,
} as const;

export const CAREERS_VALUES_SCHEMA_LABELS = {
  CAREERS_VALUES_RESPONSE: "careers values response schema",
} as const;

// BC-44/BC-45 — About Page Hero Section
export const aboutHeroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  body: z.string().min(1),
  imageUrl: z.string().min(1),
});

export interface AboutHeroData {
  headline: string;
  subheadline: string;
  body: string;
  imageUrl: string;
}

export const ABOUT_HERO_ENDPOINTS = {
  HERO: "/api/about/hero",
} as const;

export const ABOUT_HERO_SCHEMA_LABELS = {
  ABOUT_HERO_RESPONSE: "about hero response schema",
} as const;

// BC-41/BC-42 — Careers Job Openings Section
export const jobOpeningSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(["Full-Time", "Part-Time"]),
  description: z.string().min(1),
});

export const jobsResponseSchema = z.object({
  jobs: z.array(jobOpeningSchema),
});

export interface JobOpeningItem {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time";
  description: string;
}

export interface JobsData {
  jobs: JobOpeningItem[];
}

export const CAREERS_JOBS_ENDPOINTS = {
  LIST: "/api/careers/jobs",
} as const;

export const CAREERS_JOBS_SCHEMA_LABELS = {
  JOBS_RESPONSE: "careers jobs response schema",
} as const;

// BC-38/BC-39 — Careers Benefits Section
export const careersBenefitItemSchema = z.object({
  id: z.number().int(),
  icon: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const careersBenefitsResponseSchema = z.object({
  benefits: z.array(careersBenefitItemSchema),
});

export interface CareersBenefitItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface CareersBenefitsData {
  benefits: CareersBenefitItem[];
}

export const CAREERS_BENEFITS_ENDPOINTS = {
  BENEFITS: "/api/careers/benefits",
} as const;

export const CAREERS_BENEFITS_SCHEMA_LABELS = {
  CAREERS_BENEFITS_RESPONSE: "careers benefits response schema",
} as const;

// BC-47/BC-48 — About Mission & Vision Section
export const missionVisionItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const missionVisionResponseSchema = z.object({
  mission: missionVisionItemSchema,
  vision: missionVisionItemSchema,
});

export interface MissionVisionItem {
  title: string;
  description: string;
}

export interface MissionVisionData {
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

export const ABOUT_MISSION_VISION_ENDPOINTS = {
  MISSION_VISION: "/api/about/mission-vision",
} as const;

export const ABOUT_MISSION_VISION_SCHEMA_LABELS = {
  MISSION_VISION_RESPONSE: "about mission vision response schema",
} as const;

// BC-50/BC-51 — About Press Releases Section
export const pressReleaseItemSchema = z.object({
  id: z.number().int(),
  date: z.string().min(1),
  headline: z.string().min(1),
  excerpt: z.string().min(1),
  imageUrl: z.string().min(1),
  url: z.string(),
});

export const pressReleasesResponseSchema = z.object({
  pressReleases: z.array(pressReleaseItemSchema),
});

export interface PressReleaseItemType {
  id: number;
  date: string;
  headline: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

export interface PressReleasesDataType {
  pressReleases: PressReleaseItemType[];
}

export const ABOUT_PRESS_RELEASES_ENDPOINTS = {
  LIST: "/api/about/press-releases",
} as const;

export const ABOUT_PRESS_RELEASES_SCHEMA_LABELS = {
  PRESS_RELEASES_RESPONSE: "about press releases response schema",
} as const;

// BC-53/BC-54 — Security Page Hero Section
export const securityHeroSchema = z.object({
  headline: z.string().min(1),
  headlineAccent: z.string().min(1),
  body: z.string().min(1),
  imageUrl: z.string().min(1),
});

export interface SecurityHeroDataType {
  headline: string;
  headlineAccent: string;
  body: string;
  imageUrl: string;
}

export const SECURITY_HERO_ENDPOINTS = {
  HERO: "/api/security/hero",
} as const;

export const SECURITY_HERO_SCHEMA_LABELS = {
  SECURITY_HERO_RESPONSE: "security hero response schema",
} as const;

// BC-56/BC-57 — Security Protections Section
export const protectionItemSchema = z.object({
  id: z.number().int(),
  icon: z.string().min(1),
  badgeIcon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const protectionsResponseSchema = z.object({
  protections: z.array(protectionItemSchema),
});

export interface ProtectionItemType {
  id: number;
  icon: string;
  badgeIcon: string;
  title: string;
  description: string;
}

export interface ProtectionsDataType {
  protections: ProtectionItemType[];
}

export const SECURITY_PROTECTIONS_ENDPOINTS = {
  LIST: "/api/security/protections",
} as const;

export const SECURITY_PROTECTIONS_SCHEMA_LABELS = {
  PROTECTIONS_RESPONSE: "security protections response schema",
} as const;

// BC-59/BC-60 — Login Form API
export const loginResponseSchema = z.object({
  success: z.boolean(),
  token: z.string().optional(),
  error: z.string().optional(),
});

export interface LoginResponseType {
  success: boolean;
  token?: string;
  error?: string;
}

export const LOGIN_ENDPOINTS = {
  LOGIN: "/api/auth/login",
} as const;

export const LOGIN_SCHEMA_LABELS = {
  LOGIN_RESPONSE: "login response schema",
} as const;

export const LOGIN_TEXT = {
  HEADING: "Login",
  SUBTEXT: "Welcome back!",
  FORGOT_PASSWORD: "Forgot Password?",
  LOGIN_BUTTON: "Login",
  SIGNUP_BUTTON: "Sign Up",
  OR_DIVIDER: "Or",
} as const;

// BC-62/BC-63 — Sign Up Form API
export const signupResponseSchema = z.object({
  success: z.boolean(),
  userId: z.string().optional(),
  error: z.string().optional(),
});

export interface SignupResponseType {
  success: boolean;
  userId?: string;
  error?: string;
}

export const SIGNUP_ENDPOINTS = {
  SIGNUP: "/api/auth/signup",
} as const;

export const SIGNUP_SCHEMA_LABELS = {
  SIGNUP_RESPONSE: "signup response schema",
} as const;

export const SIGNUP_TEXT = {
  HEADING: "Sign Up",
  SUBTEXT: "Join our community today!",
  SIGNUP_BUTTON: "Sign Up",
  LOGIN_BUTTON: "Login",
  OR_DIVIDER: "Or",
} as const;
