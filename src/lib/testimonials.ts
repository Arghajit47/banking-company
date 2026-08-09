"use client";

import useSWR from "swr";

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

const fetcher = async (url: string): Promise<TestimonialsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Testimonials request failed: ${response.status}`);
  }
  return response.json();
};

export function useTestimonials() {
  return useSWR<TestimonialsResponse>("/api/testimonials", fetcher, {
    revalidateOnFocus: false,
  });
}
