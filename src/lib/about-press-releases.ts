"use client";

import useSWR from "swr";

export interface PressReleaseItem {
  id: number;
  date: string;
  headline: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

export interface PressReleasesData {
  pressReleases: PressReleaseItem[];
}

const fetcher = async (url: string): Promise<PressReleasesData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Press releases data request failed: ${response.status}`);
  }
  return response.json();
};

export function useAboutPressReleasesData() {
  return useSWR<PressReleasesData>("/api/about/press-releases", fetcher, {
    revalidateOnFocus: false,
  });
}
