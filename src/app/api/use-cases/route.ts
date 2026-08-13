import { NextResponse } from "next/server";

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

const USE_CASES: UseCase[] = [
  {
    id: 1,
    icon: "/assets/icons/icon_use_case_1.svg",
    title: "Managing Personal Finances",
    description:
      "Take control of your finances with our intuitive budgeting and expense tracking tools. Our personal finance management solutions help you set goals, monitor spending, and build a stronger financial future.",
    audience: "individual",
  },
  {
    id: 2,
    icon: "/assets/icons/icon_use_case_2.svg",
    title: "Saving for the Future",
    description:
      "Start building your nest egg with our high-yield savings accounts and investment options. Our financial advisors help you create a personalized savings strategy to achieve your long-term goals.",
    audience: "individual",
  },
  {
    id: 3,
    icon: "/assets/icons/icon_use_case_3.svg",
    title: "Homeownership",
    description:
      "Realize your dream of homeownership with our competitive mortgage rates and flexible loan options. Our dedicated mortgage specialists guide you through every step of the home-buying process.",
    audience: "individual",
  },
  {
    id: 4,
    icon: "/assets/icons/icon_use_case_4.svg",
    title: "Education Funding",
    description:
      "Invest in the future with our education savings accounts and student loan solutions. We provide flexible funding options to help you or your children pursue academic excellence without financial burden.",
    audience: "individual",
  },
  {
    id: 5,
    icon: "/assets/icons/icon_use_case_5.svg",
    title: "Startups and Entrepreneurs",
    description:
      "Launch and scale your business with our startup-friendly banking solutions. From business checking accounts to seed funding support, we provide the financial infrastructure growing businesses need.",
    audience: "business",
  },
  {
    id: 6,
    icon: "/assets/icons/icon_use_case_6.svg",
    title: "Cash Flow Management",
    description:
      "Keep your business running smoothly with our working capital solutions that optimize cash flow. Our cash management tools provide real-time visibility and control over your business finances.",
    audience: "business",
  },
  {
    id: 7,
    icon: "/assets/icons/icon_use_case_7.svg",
    title: "Business Expansion",
    description:
      "Fuel your growth ambitions with tailored financing options designed to support business expansion. Our business loans and credit lines provide the capital you need to scale operations confidently.",
    audience: "business",
  },
  {
    id: 8,
    icon: "/assets/icons/icon_use_case_8.svg",
    title: "Payment Solutions",
    description:
      "Streamline your payment processing with our comprehensive business payment solutions. From payroll management to merchant services, we simplify the financial transactions that keep your business moving.",
    audience: "business",
  },
];

export async function GET(): Promise<NextResponse<UseCasesResponse>> {
  return NextResponse.json({ useCases: USE_CASES });
}
