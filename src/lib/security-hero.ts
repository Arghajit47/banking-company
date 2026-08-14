"use client";

import useSWR from "swr";

export interface SecurityHeroData {
  headline: string;
  headlineAccent: string;
  body: string;
  imageUrl: string;
}

const fetcher = async (url: string): Promise<SecurityHeroData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Security hero data request failed: ${response.status}`);
  }
  return response.json();
};

export function useSecurityHeroData() {
  return useSWR<SecurityHeroData>("/api/security/hero", fetcher, {
    revalidateOnFocus: false,
  });
}
