"use client";

import Image from "next/image";
import { useSecurityHeroData } from "@/lib/security-hero";
import { useMounted } from "@/lib/use-mounted";

function SecurityHeroSkeleton() {
  return (
    <section
      data-testid="security-hero-section"
      className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px] desktop:p-[50px]"
    >
      <div className="flex flex-col-reverse items-start md:flex-row">
        <div
          data-testid="security-hero-text-container"
          className="relative z-20 -mt-[41px] flex shrink-0 flex-col gap-[14px] rounded-[20px] bg-[#1A1A1A] p-6 md:mt-0 md:shrink md:w-full md:max-w-[791px] md:gap-[23px] md:rounded-[20px_0_80px_20px] md:p-[80px] laptop:w-[658px] laptop:gap-[20px] laptop:rounded-[20px_0_60px_20px] laptop:p-[60px] desktop:w-[791px] desktop:gap-[23px] desktop:rounded-[20px_0_80px_20px] desktop:p-[80px]"
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
          className="flex-1 md:min-w-[260px] laptop:-ml-[174px] desktop:-ml-[260px]"
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
      className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px] desktop:p-[50px]"
    >
      <Image
        src="/assets/illustrations/abstract_design_hero_illustration.svg"
        alt=""
        width={505}
        height={480}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden md:block"
        aria-hidden="true"
      />

      <div className="flex flex-col-reverse items-start md:flex-row">
        <div
          data-testid="security-hero-text-container"
          className="relative z-20 -mt-[41px] flex shrink-0 flex-col gap-[14px] rounded-[20px] bg-[#1A1A1A] p-6 md:mt-0 md:shrink md:w-full md:max-w-[791px] md:gap-[23px] md:rounded-[20px_0_80px_20px] md:p-[80px] laptop:w-[658px] laptop:gap-[20px] laptop:rounded-[20px_0_60px_20px] laptop:p-[60px] desktop:w-[791px] desktop:gap-[23px] desktop:rounded-[20px_0_80px_20px] desktop:p-[80px]"
        >
          {error && (
            <p className="text-sm text-red-400">
              Unable to load content. Please refresh.
            </p>
          )}
          <h1
            data-testid="security-hero-heading"
            className="font-[var(--font-urbanist)] text-[28px] font-medium leading-[130%] md:text-[48px] desktop:text-[58px]"
          >
            <span className="text-white">{data.headline} </span>
            <span className="text-[#CAFF33]">{data.headlineAccent}</span>
          </h1>
          <p
            data-testid="security-hero-paragraph"
            className="font-[var(--font-urbanist)] text-[14px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px] laptop:text-[16px] desktop:text-[18px]"
          >
            {data.body}
          </p>
        </div>

        {/* BC-186 — no negative offset in the unspecified 768-1439 band; Figma
            specifies the horizontal overlap only at 1440 (-174) and 1920 (-260).
            md:min-w-[260px] floors this flex-1 (basis 0) wrapper so the fluid
            md:w-full card cannot take the whole row and render the image 0px wide;
            md:shrink on the card is what keeps that floor from overflowing at 768. */}
        <div
          data-testid="security-hero-image-wrapper"
          className="relative z-10 flex-1 md:min-w-[260px] laptop:-ml-[174px] desktop:-ml-[260px]"
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
