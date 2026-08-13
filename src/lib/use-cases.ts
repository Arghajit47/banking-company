"use client";

import useSWR from "swr";

export interface UseCase {
  id: number;
  icon: string;
  title: string;
  description: string;
  audience: "individual" | "business";
}

export interface UseCasesResponse {
  useCases: UseCase[];
}

const fetcher = async (url: string): Promise<UseCasesResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Use cases data request failed: ${response.status}`);
  }
  return response.json();
};

export function useUseCasesData() {
  return useSWR<UseCasesResponse>("/api/use-cases", fetcher, {
    revalidateOnFocus: false,
  });
}
