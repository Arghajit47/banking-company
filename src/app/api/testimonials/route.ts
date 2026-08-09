import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

const tabSchema = z.enum(["individuals", "businesses"]);

const TESTIMONIALS_INDIVIDUALS: Testimonial[] = [
  {
    id: 1,
    name: "Sara T",
    role: "Individual Customer",
    quote:
      "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
    avatarUrl: null,
  },
  {
    id: 2,
    name: "Emily G",
    role: "Individual Customer",
    quote:
      "I love the convenience of YourBank banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
    avatarUrl: null,
  },
  {
    id: 3,
    name: "Michael B",
    role: "Individual Customer",
    quote:
      "Switching to YourBank was the best financial decision I ever made. Their zero-fee accounts and competitive interest rates have helped me save more and grow my personal wealth steadily.",
    avatarUrl: null,
  },
];

const TESTIMONIALS_BUSINESSES: Testimonial[] = [
  {
    id: 4,
    name: "John D",
    role: "Business Owner",
    quote:
      "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
    avatarUrl: null,
  },
  {
    id: 5,
    name: "Alex P",
    role: "Business Director",
    quote:
      "YourBank's business banking suite is exactly what our growing company needed. From multi-user account access to seamless payroll integration, every feature is designed with businesses like ours in mind.",
    avatarUrl: null,
  },
  {
    id: 6,
    name: "Rachel M",
    role: "Business Manager",
    quote:
      "The dedicated relationship manager at YourBank truly understands our industry. They helped us restructure our credit lines and unlock better cash flow management — our business has never been more financially healthy.",
    avatarUrl: null,
  },
];

const TAB_DATA: Record<z.infer<typeof tabSchema>, Testimonial[]> = {
  individuals: TESTIMONIALS_INDIVIDUALS,
  businesses: TESTIMONIALS_BUSINESSES,
};

export async function GET(req: NextRequest): Promise<NextResponse<TestimonialsResponse>> {
  const tabParam = req.nextUrl.searchParams.get("tab");
  const parsed = tabSchema.safeParse(tabParam);
  const tab = parsed.success ? parsed.data : "individuals";
  return NextResponse.json({ testimonials: TAB_DATA[tab] });
}
