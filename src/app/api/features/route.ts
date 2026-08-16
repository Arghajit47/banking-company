import { NextResponse } from "next/server";

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

const FEATURES: Feature[] = [
  {
    id: 1,
    icon: "/assets/icons/icon_feature_1.svg",
    title: "24/7 Account Access",
    tab: "online-banking",
    description:
      "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
  },
  {
    id: 2,
    icon: "/assets/icons/icon_feature_2.svg",
    title: "Mobile Banking App",
    tab: "online-banking",
    description:
      "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.",
  },
  {
    id: 3,
    icon: "/assets/icons/icon_feature_3.svg",
    title: "Secure Transactions",
    tab: "online-banking",
    description:
      "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.",
  },
  {
    id: 4,
    icon: "/assets/icons/icon_feature_4.svg",
    title: "Bill Pay and Transfers",
    tab: "online-banking",
    description:
      "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.",
  },
  {
    id: 5,
    icon: "/assets/icons/icon_feature_1.svg",
    title: "Smart Budget Planner",
    tab: "financial-tools",
    description:
      "Automatically categorize your spending, set monthly limits, and track savings goals with visual, real-time analytics.",
  },
  {
    id: 6,
    icon: "/assets/icons/icon_feature_2.svg",
    title: "Investment & Portfolio Tracker",
    tab: "financial-tools",
    description:
      "Monitor your investments, review asset allocations, and track market performance across all your holdings in one place.",
  },
  {
    id: 7,
    icon: "/assets/icons/icon_feature_3.svg",
    title: "Loan & Mortgage Calculator",
    tab: "financial-tools",
    description:
      "Estimate monthly payments, analyze amortization schedules, and evaluate the impact of extra payments on your loans.",
  },
  {
    id: 8,
    icon: "/assets/icons/icon_feature_4.svg",
    title: "Credit Health Monitoring",
    tab: "financial-tools",
    description:
      "Access your credit score updates, view key credit factors, and receive personalized tips to help improve your financial score.",
  },
  {
    id: 9,
    icon: "/assets/icons/icon_feature_1.svg",
    title: "Live Concierge Chat",
    tab: "customer-support",
    description:
      "Connect directly with dedicated banking specialists within seconds for real-time guidance and instant troubleshooting.",
  },
  {
    id: 10,
    icon: "/assets/icons/icon_feature_2.svg",
    title: "Appointment Scheduling",
    tab: "customer-support",
    description:
      "Book one-on-one virtual or in-branch consultations with financial advisors at a time that works best for you.",
  },
  {
    id: 11,
    icon: "/assets/icons/icon_feature_3.svg",
    title: "Dedicated Dispute Center",
    tab: "customer-support",
    description:
      "Easily flag unauthorized charges, submit transaction disputes, and track resolution status in real time.",
  },
  {
    id: 12,
    icon: "/assets/icons/icon_feature_4.svg",
    title: "Personalized Financial Advisory",
    tab: "customer-support",
    description:
      "Receive tailored financial reviews and expert recommendations aligned with your long-term wealth and business milestones.",
  },
];

export async function GET(): Promise<NextResponse<FeaturesResponse>> {
  return NextResponse.json({ features: FEATURES });
}
