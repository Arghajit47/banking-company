import { NextRequest, NextResponse } from "next/server";

export interface CTAConfig {
  headline: string;
  body: string;
  buttonLabel: string;
}

export type CTAPage = "home" | "careers";

const ctaConfig: Record<CTAPage, CTAConfig> = {
  home: {
    headline: "Start your financial journey with YourBank today!",
    body: "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.",
    buttonLabel: "Open Account",
  },
  careers: {
    headline: "Start your financial journey with YourBank today!",
    body: "Lorem ipsum dolor sit amet consectetur. Blandit odio semper risus pellentesque elit. Pellentesque eget ut imperdiet nulla penatibus. Nascetur viverra arcu sed amet cursus purus.",
    buttonLabel: "Open Account",
  },
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<CTAConfig>> {
  const page = request.nextUrl.searchParams.get("page");
  const config = page === "careers" ? ctaConfig.careers : ctaConfig.home;
  return NextResponse.json(config);
}
