import { NextResponse } from "next/server";

export interface ProtectionItem {
  id: number;
  icon: string;
  badgeIcon: string;
  title: string;
  description: string;
}

export interface ProtectionsData {
  protections: ProtectionItem[];
}

const PROTECTIONS: ProtectionItem[] = [
  {
    id: 1,
    icon: "/assets/icons/icon_protection_1.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_1.svg",
    title: "Secure Online Banking Platform",
    description:
      "Our online banking platform is built with multiple layers of security to safeguard your information. We utilize industry-standard encryption protocols to ensure that your data remains confidential and protected during transmission.",
  },
  {
    id: 2,
    icon: "/assets/icons/icon_protection_2.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_2.svg",
    title: "Multi-Factor Authentication",
    description:
      "To enhance the security of your online banking experience, we employ multi-factor authentication. This additional layer of security requires you to provide multiple pieces of identification, such as a password and a one-time verification code, to access your account.",
  },
  {
    id: 3,
    icon: "/assets/icons/icon_protection_3.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_3.svg",
    title: "Fraud Monitoring",
    description:
      "We have sophisticated fraud detection systems in place to monitor your accounts for any suspicious activities. Our dedicated team works around the clock to detect and prevent unauthorized transactions, providing you with peace of mind.",
  },
  {
    id: 4,
    icon: "/assets/icons/icon_protection_4.svg",
    badgeIcon: "/assets/icons/icon_protection_badge_4.svg",
    title: "Secure Mobile Banking",
    description:
      "Our mobile banking app is designed with the same level of security as our online banking platform. You can confidently access your accounts, make transactions, and manage your finances on the go, knowing that your information is protected.",
  },
];

export async function GET(): Promise<NextResponse<ProtectionsData>> {
  return NextResponse.json({ protections: PROTECTIONS });
}
