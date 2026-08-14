"use client";

import useSWR from "swr";

export interface CareersValueItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface CareersValuesResponse {
  values: CareersValueItem[];
}

const fetcher = async (url: string): Promise<CareersValuesResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Careers values data request failed: ${response.status}`);
  }
  return response.json();
};

export function useCareersValuesData() {
  return useSWR<CareersValuesResponse>("/api/careers/values", fetcher, {
    revalidateOnFocus: false,
  });
}
