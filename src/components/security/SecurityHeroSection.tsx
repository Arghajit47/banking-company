"use client";

import Image from "next/image";
import { useSecurityHeroData } from "@/lib/security-hero";
import { useMounted } from "@/lib/use-mounted";

function SecurityHeroSkeleton() {
  return (
    <section
      data-testid="security-hero-section"
      className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px]"
    >
      <div className="flex flex-col items-start md:flex-row">
        <div
          data-testid="security-hero-text-container"
          className="relative z-20 flex shrink-0 flex-col gap-[23px] rounded-[20px_0_80px_20px] bg-[#1A1A1A] p-8 md:w-[791px] md:p-[80px]"
        >
          <div
            data-testid="security-hero-heading"
            aria-hidden="true"
            className="flex flex-col gap-2"
          >
            <div className="h-10 w-3/4 animate-pulse rounded bg-[#333333]" />
            <div className="h-10 w-1/2 animate-pulse rounded bg-[#333333]" />
          </div>
          <div
            data-testid="security-hero-paragraph"
            aria-hidden="true"
            className="h-32 w-full animate-pulse rounded bg-[#333333]"
          />
        </div>
        <div
          data-testid="security-hero-image-wrapper"
          className="mt-6 flex-1 md:-ml-[260px] md:mt-0"
        >
          <div className="h-[400px] w-full animate-pulse rounded-[16px] bg-[#333333]" />
        </div>
      </div>
    </section>
  );
}

export function SecurityHeroSection() {
  const mounted = useMounted();
  const { data, error } = useSecurityHeroData();

  if (!mounted || !data) {
    return <SecurityHeroSkeleton />;
  }

  return (
    <section
      data-testid="security-hero-section"
      className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px]"
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
          {error && (
            <p className="text-sm text-red-400">
              Unable to load content. Please refresh.
            </p>
          )}
          <h1
            data-testid="security-hero-heading"
            className="font-[var(--font-urbanist)] text-[32px] font-medium leading-[130%] md:text-[48px] lg:text-[58px] laptop:text-[48px]"
          >
            <span className="text-white">{data.headline} </span>
            <span className="text-[#CAFF33]">{data.headlineAccent}</span>
          </h1>
          <p
            data-testid="security-hero-paragraph"
            className="font-[var(--font-urbanist)] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
          >
            {data.body}
          </p>
        </div>

        <div
          data-testid="security-hero-image-wrapper"
          className="relative z-10 mt-6 flex-1 md:-ml-[260px] md:mt-0"
        >
          <Image
            data-testid="security-hero-image"
            src={data.imageUrl}
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
