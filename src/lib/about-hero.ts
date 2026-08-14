"use client";

import useSWR from "swr";

export interface AboutHeroData {
  headline: string;
  subheadline: string;
  body: string;
  imageUrl: string;
}

const fetcher = async (url: string): Promise<AboutHeroData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`About hero data request failed: ${response.status}`);
  }
  return response.json();
};

export function useAboutHeroData() {
  return useSWR<AboutHeroData>("/api/about/hero", fetcher, {
    revalidateOnFocus: false,
  });
}
