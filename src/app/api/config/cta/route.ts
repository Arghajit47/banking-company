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
    body: "Ready to take control of your finances? Join YourBank now, and let us help you achieve your financial goals with our tailored solutions and exceptional customer service",
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
