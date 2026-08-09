"use client";

import useSWR from "swr";

export interface CTAConfig {
  headline: string;
  body: string;
  buttonLabel: string;
}

export type CTAPage = "home" | "careers";

const fetcher = async (url: string): Promise<CTAConfig> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CTA config request failed: ${response.status}`);
  }
  return response.json();
};

export function useCTAConfig(page: CTAPage = "home") {
  return useSWR<CTAConfig>(`/api/config/cta?page=${page}`, fetcher, {
    revalidateOnFocus: false,
  });
}
