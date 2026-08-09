import { NextResponse } from "next/server";

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

const TESTIMONIALS: Testimonial[] = [
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
    name: "John D",
    role: "Business Owner",
    quote:
      "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
    avatarUrl: null,
  },
  {
    id: 3,
    name: "Emily G",
    role: "Individual Customer",
    quote:
      "I love the convenience of YourBank banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
    avatarUrl: null,
  },
];

export async function GET(): Promise<NextResponse<TestimonialsResponse>> {
  return NextResponse.json({ testimonials: TESTIMONIALS });
}
