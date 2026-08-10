import { z } from "zod";

export const FAQ_PATHS = {
  FAQ: "/api/faq",
} as const;

export const faqSchema = z.object({
  id: z.number(),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqResponseSchema = z.object({
  faqs: z.array(faqSchema),
  hasMore: z.boolean(),
});

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQResponse {
  faqs: FAQ[];
  hasMore: boolean;
}

export type FAQPage = "home" | "careers" | "security";

export const FAQ_ENDPOINTS = {
  HOME: `${FAQ_PATHS.FAQ}?page=home`,
  CAREERS: `${FAQ_PATHS.FAQ}?page=careers`,
  SECURITY: `${FAQ_PATHS.FAQ}?page=security`,
} as const;

export const FAQ_SCHEMA_LABELS = {
  FAQ_RESPONSE: "faq response schema",
} as const;

export const FAQ_TEXT = {
  HEADING_ACCENT: "Frequently",
  HEADING_REST: "Asked Questions",
  SUBHEADING_START: "Still you have any questions",
  LOAD_ALL: "Load All FAQ's",
  SHOW_LESS: "Show Less",
  EMPTY_STATE: "No FAQs available at the moment.",
} as const;

export const FAQ_UI = {
  INITIAL_VISIBLE_COUNT: 4,
  MOBILE_VIEWPORT: { width: 375, height: 667 },
  ANIMATION_DELAY_MS: 300,
} as const;
