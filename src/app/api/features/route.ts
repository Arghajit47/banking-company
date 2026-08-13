import { NextResponse } from "next/server";

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesResponse {
  features: Feature[];
}

const FEATURES: Feature[] = [
  {
    id: 1,
    icon: "/assets/icons/icon_feature_1.svg",
    title: "24/7 Account Access",
    description:
      "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
  },
  {
    id: 2,
    icon: "/assets/icons/icon_feature_2.svg",
    title: "Mobile Banking App",
    description:
      "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.",
  },
  {
    id: 3,
    icon: "/assets/icons/icon_feature_3.svg",
    title: "Secure Transactions",
    description:
      "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.",
  },
  {
    id: 4,
    icon: "/assets/icons/icon_feature_4.svg",
    title: "Bill Pay and Transfers",
    description:
      "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.",
  },
];

export async function GET(): Promise<NextResponse<FeaturesResponse>> {
  return NextResponse.json({ features: FEATURES });
}
