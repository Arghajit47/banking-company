import { NextResponse } from "next/server";

export interface CareersBenefitItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface CareersBenefitsResponse {
  benefits: CareersBenefitItem[];
}

const CAREERS_BENEFITS: CareersBenefitItem[] = [
  {
    id: 1,
    icon: "/assets/icons/icon_benefit_1.svg",
    title: "Competitive Compensation",
    description:
      "We provide a competitive salary package that recognizes the skills and expertise of our employees. YourBank believes in rewarding exceptional performance and offering opportunities for financial growth.",
  },
  {
    id: 2,
    icon: "/assets/icons/icon_benefit_2.svg",
    title: "Health and Wellness",
    description:
      "We prioritize the health and well-being of our employees by providing comprehensive medical, dental, and vision insurance plans. We also offer wellness programs, gym memberships, and resources to support a healthy lifestyle.",
  },
  {
    id: 3,
    icon: "/assets/icons/icon_benefit_3.svg",
    title: "Retirement Planning",
    description:
      "YourBank is committed to helping employees plan for their future. We offer a retirement savings plan with a generous employer match to help them build a secure financial foundation for the long term.",
  },
  {
    id: 4,
    icon: "/assets/icons/icon_benefit_4.svg",
    title: "Work-Life Balance",
    description:
      "We understand the importance of maintaining a healthy work-life balance. YourBank offers flexible work arrangements, paid time off, parental leave, and other programs that support employees in managing their personal and professional commitments.",
  },
];

export async function GET(): Promise<NextResponse<CareersBenefitsResponse>> {
  return NextResponse.json({ benefits: CAREERS_BENEFITS });
}
