import Image from "next/image";

const HEADLINE = "Your Security is Our";
const HEADLINE_ACCENT = "Top Priority";
const BODY =
  "At YourBank, we understand the importance of keeping your financial information secure. We employ robust security measures and advanced technologies to protect your personal and financial data. Rest assured that when you bank with us, your security is our utmost priority.";

export function SecurityHeroSection() {
  return (
    <section
      data-testid="security-hero-section"
      className="relative mx-auto w-full max-w-[1599px] overflow-hidden rounded-[20px] bg-[#1C1C1C] p-[50px]"
    >
      <Image
        src="/assets/illustrations/abstract_design_hero_illustration.svg"
        alt=""
        width={505}
        height={480}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden md:block"
        aria-hidden="true"
      />

      <div className="flex flex-col items-start md:flex-row">
        <div
          data-testid="security-hero-text-container"
          className="relative z-20 flex shrink-0 flex-col gap-[23px] rounded-[20px_0_80px_20px] bg-[#1A1A1A] p-8 md:w-[791px] md:p-[80px]"
        >
          <h1
            data-testid="security-hero-heading"
            className="font-[var(--font-lexend)] text-[32px] font-medium leading-[130%] md:text-[48px] lg:text-[58px]"
          >
            <span className="text-white">{HEADLINE} </span>
            <span className="text-[#CAFF33]">{HEADLINE_ACCENT}</span>
          </h1>
          <p
            data-testid="security-hero-paragraph"
            className="font-[var(--font-lexend)] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
          >
            {BODY}
          </p>
        </div>

        <div
          data-testid="security-hero-image-wrapper"
          className="relative z-10 mt-6 flex-1 md:-ml-[260px] md:mt-0"
        >
          <Image
            data-testid="security-hero-image"
            src="/assets/images/security_hero_image.png"
            alt="Security at YourBank"
            width={968}
            height={716}
            className="w-full rounded-[16px] object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
