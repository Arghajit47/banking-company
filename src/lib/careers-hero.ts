"use client";

import useSWR from "swr";

export interface CareersHeroData {
  headline: string;
  body: string;
  ctaLabel: string;
  imageUrl: string;
}

const fetcher = async (url: string): Promise<CareersHeroData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Careers hero data request failed: ${response.status}`);
  }
  return response.json();
};

export function useCareersHeroData() {
  return useSWR<CareersHeroData>("/api/careers/hero", fetcher, {
    revalidateOnFocus: false,
  });
}
