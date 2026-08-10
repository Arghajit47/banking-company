"use client";

import useSWR from "swr";

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

const fetcher = async (url: string): Promise<FAQResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FAQ request failed: ${response.status}`);
  }
  return response.json();
};

export function useFAQConfig(page: FAQPage = "home") {
  return useSWR<FAQResponse>(`/api/faq?page=${page}`, fetcher, {
    revalidateOnFocus: false,
  });
}
