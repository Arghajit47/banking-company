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
  {
    id: 7,
    name: "James K",
    role: "Individual Customer",
    quote:
      "The savings tools at YourBank helped me cut down unnecessary spending and build an emergency fund in under six months. I feel financially secure for the first time.",
    avatarUrl: null,
  },
  {
    id: 8,
    name: "Lisa R",
    role: "Individual Customer",
    quote:
      "Opening an account with YourBank took minutes and their customer support is always available. Their zero-hidden-fee promise is real — I have not been surprised once.",
    avatarUrl: null,
  },
  {
    id: 9,
    name: "David C",
    role: "Individual Customer",
    quote:
      "YourBank's interest rates on savings accounts are the best I have found. My savings have grown significantly, and the mobile app makes it easy to track every dollar.",
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
  {
    id: 10,
    name: "Sophie T",
    role: "Business CFO",
    quote:
      "The business credit line we secured through YourBank gave our startup the runway we needed. The process was fast, transparent, and the terms were excellent.",
    avatarUrl: null,
  },
  {
    id: 11,
    name: "Marcus W",
    role: "Operations Manager",
    quote:
      "YourBank's multi-user business account saved us hours of admin every week. The permissions system is intuitive and their payroll integration works flawlessly.",
    avatarUrl: null,
  },
  {
    id: 12,
    name: "Karen L",
    role: "Business Owner",
    quote:
      "Switching our corporate accounts to YourBank was the best financial decision for our company. Their dedicated support team understands our industry and always goes the extra mile.",
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
