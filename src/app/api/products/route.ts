import { NextResponse } from "next/server";

export interface Product {
  id: number;
  icon: string;
  title: string;
  description: string;
  tab: "individuals" | "businesses";
}

export interface ProductsResponse {
  products: Product[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    icon: "checking",
    title: "Checking Accounts",
    tab: "individuals",
    description:
      "Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.",
  },
  {
    id: 2,
    icon: "savings",
    title: "Savings Accounts",
    tab: "individuals",
    description:
      "Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.",
  },
  {
    id: 3,
    icon: "loans",
    title: "Loans and Mortgages",
    tab: "individuals",
    description:
      "Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.",
  },
  {
    id: 4,
    icon: "insurance",
    title: "Business Accounts",
    tab: "businesses",
    description:
      "Efficiently manage your business finances with our tailored business account options, designed to help your business grow and succeed with seamless banking solutions.",
  },
  {
    id: 5,
    icon: "investing",
    title: "Business Loans",
    tab: "businesses",
    description:
      "Power your business ambitions with our flexible business loan solutions. Whether you need working capital or funds for expansion, our dedicated team is ready to support your growth.",
  },
  {
    id: 6,
    icon: "credit",
    title: "Cash Management",
    tab: "businesses",
    description:
      "Optimize your business cash flow with our comprehensive cash management services, giving you greater control and visibility over your business finances.",
  },
];

export async function GET(): Promise<NextResponse<ProductsResponse>> {
  return NextResponse.json({ products: PRODUCTS });
}
