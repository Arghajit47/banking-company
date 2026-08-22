import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Terms of Service — YourBank",
  description:
    "YourBank's terms of service are being finalised and will be published on this page shortly.",
  robots: {
    index: false,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-lexend)]">
      <Navbar />
      <main className="px-4 py-8 md:px-8 md:py-12 lg:px-[162px] lg:py-[80px]">
        <section
          data-testid="terms-of-service-section"
          className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px]"
        >
          <div className="flex flex-col gap-[23px] rounded-[20px] bg-[#1A1A1A] p-8 md:p-[80px]">
            <h1
              data-testid="terms-of-service-heading"
              className="text-[32px] font-medium leading-[130%] text-white md:text-[48px] lg:text-[58px] laptop:text-[48px] desktop:text-[48px]"
            >
              Terms of Service
            </h1>
            <p
              data-testid="terms-of-service-body-1"
              className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
            >
              We&apos;re finalising our terms of service. The full terms will be
              published on this page shortly.
            </p>
            <p
              data-testid="terms-of-service-body-2"
              className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
            >
              If you have questions about using YourBank&apos;s products and
              services in the meantime, please contact us at{" "}
              <a
                data-testid="terms-of-service-contact-email"
                href="mailto:support@yourbank.com"
                className="text-[#CAFF33] underline-offset-2 hover:underline"
              >
                support@yourbank.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
