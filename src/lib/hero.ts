"use client";

import useSWR from "swr";

export interface HeroTransaction {
  id: number;
  name: string;
  amount: string;
}

export interface HeroExchangeRate {
  id: number;
  code: string;
  name: string;
  value: string;
  icon: string;
}

export interface HeroCurrency {
  icon: string;
}

export interface HeroMonthlyIncome {
  icon: string;
  value: string;
  label: string;
}

export interface HeroStats {
  transactions: HeroTransaction[];
  exchangeRates: HeroExchangeRate[];
  currencies: HeroCurrency[];
  monthlyIncome: HeroMonthlyIncome;
}

export interface HeroResponse {
  headline: string;
  subtext: string;
  ctaLabel: string;
  stats: HeroStats;
}

const fetcher = async (url: string): Promise<HeroResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Hero data request failed: ${response.status}`);
  }
  return response.json();
};

export function useHeroData() {
  return useSWR<HeroResponse>("/api/home/hero", fetcher, {
    revalidateOnFocus: false,
  });
}
