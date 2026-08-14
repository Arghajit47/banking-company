"use client";

import useSWR from "swr";

export interface CareersBenefitItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface CareersBenefitsResponse {
  benefits: CareersBenefitItem[];
}

const fetcher = async (url: string): Promise<CareersBenefitsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Careers benefits data request failed: ${response.status}`);
  }
  return response.json();
};

export function useCareersBenefitsData() {
  return useSWR<CareersBenefitsResponse>("/api/careers/benefits", fetcher, {
    revalidateOnFocus: false,
  });
}
