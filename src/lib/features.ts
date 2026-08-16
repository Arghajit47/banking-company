"use client";

import useSWR from "swr";

export type FeatureTab =
  | "online-banking"
  | "financial-tools"
  | "customer-support";

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  tab: FeatureTab;
}

export interface FeaturesResponse {
  features: Feature[];
}

const fetcher = async (url: string): Promise<FeaturesResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Features data request failed: ${response.status}`);
  }
  return response.json();
};

export function useFeaturesData() {
  return useSWR<FeaturesResponse>("/api/features", fetcher, {
    revalidateOnFocus: false,
  });
}
