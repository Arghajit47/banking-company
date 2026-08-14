import { NextResponse } from "next/server";

export interface CareersHeroData {
  headline: string;
  body: string;
  ctaLabel: string;
  imageUrl: string;
}

const CAREERS_HERO: CareersHeroData = {
  headline: "Welcome to YourBank Careers!",
  body: "Join our team and embark on a rewarding journey in the banking industry. At YourBank, we are committed to fostering a culture of excellence and providing opportunities for professional growth. With a focus on innovation, customer service, and integrity, we strive to make a positive impact in the lives of our customers and communities. Join us today and be a part of our mission to shape the future of banking.",
  ctaLabel: "Apply Now",
  imageUrl: "/assets/images/hero_image.png",
};

export async function GET(): Promise<NextResponse<CareersHeroData>> {
  return NextResponse.json(CAREERS_HERO);
}
