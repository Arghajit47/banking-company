import { NextResponse } from "next/server";

export interface SecurityHeroData {
  headline: string;
  headlineAccent: string;
  body: string;
  imageUrl: string;
}

const SECURITY_HERO: SecurityHeroData = {
  headline: "Your Security is Our",
  headlineAccent: "Top Priority",
  body: "At YourBank, we understand the importance of keeping your financial information secure. We employ robust security measures and advanced technologies to protect your personal and financial data. Rest assured that when you bank with us, your security is our utmost priority.",
  imageUrl: "/assets/images/security_hero_image.png",
};

export async function GET(): Promise<NextResponse<SecurityHeroData>> {
  return NextResponse.json(SECURITY_HERO);
}
