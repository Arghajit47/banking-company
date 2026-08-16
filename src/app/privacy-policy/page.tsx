import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy — YourBank",
  description:
    "YourBank's privacy policy is being finalised and will be published on this page shortly.",
  robots: {
    index: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-urbanist)]">
      <Navbar />
      <main className="px-4 py-8 md:px-8 md:py-12 lg:px-[162px] lg:py-[80px]">
        <section
          data-testid="privacy-policy-section"
          className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px]"
        >
          <div className="flex flex-col gap-[23px] rounded-[20px] bg-[#1A1A1A] p-8 md:p-[80px]">
            <h1
              data-testid="privacy-policy-heading"
              className="text-[32px] font-medium leading-[130%] text-white md:text-[48px] lg:text-[58px] laptop:text-[48px] desktop:text-[48px]"
            >
              Privacy Policy
            </h1>
            <p
              data-testid="privacy-policy-body-1"
              className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
            >
              We&apos;re finalising our privacy policy. The full policy will be
              published on this page shortly.
            </p>
            <p
              data-testid="privacy-policy-body-2"
              className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
            >
              In the meantime, if you have questions about how YourBank
              collects, uses, or protects your personal information, please
              contact us at{" "}
              <a
                data-testid="privacy-policy-contact-email"
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
