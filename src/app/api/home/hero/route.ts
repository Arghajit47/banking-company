import { NextResponse } from "next/server";
import { z } from "zod";

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

const HERO_HEADLINE = "Welcome to YourBank";

const HERO_SUBTEXT =
  "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.";

const HERO_CTA_LABEL = "Open Account";

const HERO_TRANSACTIONS: HeroTransaction[] = [
  { id: 1, name: "Joel Kenley", amount: "-$68.00" },
  { id: 2, name: "Mark Smith", amount: "-$68.00" },
  { id: 3, name: "Lenen Roy", amount: "-$68.00" },
];

const HERO_EXCHANGE_RATES: HeroExchangeRate[] = [
  {
    id: 1,
    code: "INR",
    name: "Indian Rupees",
    value: "5,0000",
    icon: "/assets/hero/flag-inr.png",
  },
  {
    id: 2,
    code: "USD",
    name: "United States Dollar",
    value: "12.00",
    icon: "/assets/hero/flag-usd.png",
  },
];

const HERO_CURRENCIES: HeroCurrency[] = [
  { icon: "/assets/hero/currency-dollar.svg" },
  { icon: "/assets/hero/currency-euro.svg" },
  { icon: "/assets/hero/currency-bitcoin.svg" },
  { icon: "/assets/hero/currency-ethereum.svg" },
];

const HERO_MONTHLY_INCOME: HeroMonthlyIncome = {
  icon: "/assets/icons/icon_stat_1.svg",
  value: "+$5000,00",
  label: "Monthly Income",
};

const heroResponseSchema: z.ZodType<HeroResponse> = z.object({
  headline: z.string(),
  subtext: z.string(),
  ctaLabel: z.string(),
  stats: z.object({
    transactions: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        amount: z.string(),
      }),
    ),
    exchangeRates: z.array(
      z.object({
        id: z.number(),
        code: z.string(),
        name: z.string(),
        value: z.string(),
        icon: z.string(),
      }),
    ),
    currencies: z.array(
      z.object({
        icon: z.string(),
      }),
    ),
    monthlyIncome: z.object({
      icon: z.string(),
      value: z.string(),
      label: z.string(),
    }),
  }),
});

export const HERO_DATA: HeroResponse = {
  headline: HERO_HEADLINE,
  subtext: HERO_SUBTEXT,
  ctaLabel: HERO_CTA_LABEL,
  stats: {
    transactions: HERO_TRANSACTIONS,
    exchangeRates: HERO_EXCHANGE_RATES,
    currencies: HERO_CURRENCIES,
    monthlyIncome: HERO_MONTHLY_INCOME,
  },
};

export async function GET(): Promise<NextResponse<HeroResponse>> {
  return NextResponse.json(HERO_DATA);
}

export { heroResponseSchema };
