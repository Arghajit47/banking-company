import { NextResponse } from "next/server";

export interface Product {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ProductsResponse {
  products: Product[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    icon: "checking",
    title: "Checking Accounts",
    description:
      "Enjoy easy and convenient banking with our range of checking account options.",
  },
  {
    id: 2,
    icon: "savings",
    title: "Savings Accounts",
    description:
      "Build your savings with competitive interest rates and flexible account options.",
  },
  {
    id: 3,
    icon: "loans",
    title: "Home Loans",
    description:
      "Realize your dream of homeownership with our flexible mortgage solutions.",
  },
  {
    id: 4,
    icon: "insurance",
    title: "Insurance",
    description:
      "Protect what matters most with our comprehensive insurance products.",
  },
  {
    id: 5,
    icon: "investing",
    title: "Investments",
    description:
      "Grow your wealth with our tailored investment plans and expert guidance.",
  },
  {
    id: 6,
    icon: "credit",
    title: "Credit Cards",
    description:
      "Earn rewards and enjoy financial flexibility with our range of credit card options.",
  },
];

export async function GET(): Promise<NextResponse<ProductsResponse>> {
  return NextResponse.json({ products: PRODUCTS });
}
