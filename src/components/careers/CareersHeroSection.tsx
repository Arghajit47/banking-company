"use client";

import Image from "next/image";
import { useCareersHeroData } from "@/lib/careers-hero";
import { useMounted } from "@/lib/use-mounted";

function CareersHeroSkeleton() {
  return (
    <section
      data-testid="careers-hero-section"
      className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px] desktop:p-[50px]"
    >
      <div className="flex flex-col items-start md:flex-row">
        <div
          data-testid="careers-hero-text-container"
          className="relative z-20 flex shrink-0 flex-col gap-[23px] rounded-[20px_0_80px_20px] bg-[#1A1A1A] p-8 md:p-[80px] md:w-full md:max-w-[791px] laptop:w-[658px] laptop:gap-[20px] laptop:rounded-[20px_0_60px_20px] laptop:p-[60px] desktop:w-[791px] desktop:gap-[23px] desktop:rounded-[20px_0_80px_20px] desktop:p-[80px]"
        >
          <div
            data-testid="careers-hero-heading"
            aria-hidden="true"
            className="flex flex-col gap-2"
          >
            <div className="h-10 w-3/4 animate-pulse rounded bg-[#333333]" />
            <div className="h-10 w-1/2 animate-pulse rounded bg-[#333333]" />
          </div>
          <div
            data-testid="careers-hero-paragraph"
            aria-hidden="true"
            className="h-24 w-full animate-pulse rounded bg-[#333333]"
          />
        </div>
        <div
          data-testid="careers-hero-image-wrapper"
          className="mt-6 flex-1 md:mt-0 md:-ml-[260px] laptop:-ml-[174px] desktop:-ml-[260px]"
        >
          <div className="h-[400px] w-full animate-pulse rounded-[16px] bg-[#333333]" />
        </div>
      </div>
    </section>
  );
}

export function CareersHeroSection() {
  const mounted = useMounted();
  const { data, error, isLoading } = useCareersHeroData();

  if (!mounted || isLoading || !data) {
    return <CareersHeroSkeleton />;
  }

  return (
    <section
      data-testid="careers-hero-section"
      className="relative mx-auto w-full max-w-[1599px] rounded-[20px] bg-[#1C1C1C] p-[14px] sm:p-[50px] laptop:p-[40px] desktop:p-[50px]"
    >
      {/* Careers abstract design — Figma node 659:2, desktop only — z-0 keeps it behind the hero image */}
      <Image
        data-testid="careers-hero-abstract-design"
        src="/assets/illustrations/careers_abstract_design.svg"
        alt=""
        width={480}
        height={505}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden md:block"
        aria-hidden="true"
      />

      {/* Horizontal flex container */}
      <div className="flex flex-col items-start md:flex-row">
        {/* Text card — z-20 keeps it above the hero image in the overlap zone */}
        <div
          data-testid="careers-hero-text-container"
          className="relative z-20 flex shrink-0 flex-col gap-[23px] rounded-[20px_0_80px_20px] bg-[#1A1A1A] p-8 md:p-[80px] md:w-full md:max-w-[791px] laptop:w-[658px] laptop:gap-[20px] laptop:rounded-[20px_0_60px_20px] laptop:p-[60px] desktop:w-[791px] desktop:gap-[23px] desktop:rounded-[20px_0_80px_20px] desktop:p-[80px]"
        >
          {error && (
            <p className="text-sm text-red-400">
              Unable to load content. Please refresh.
            </p>
          )}
          <h1
            data-testid="careers-hero-heading"
            className="font-[var(--font-urbanist)] text-[28px] font-medium leading-[130%] text-white md:text-[48px] desktop:text-[58px]"
          >
            {data.headline.split("YourBank").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-[#CAFF33]">YourBank</span>
                )}
              </span>
            ))}
          </h1>
          <p
            data-testid="careers-hero-paragraph"
            className="font-[var(--font-urbanist)] text-[18px] font-light leading-[150%] text-[#B3B3B3]"
          >
            {data.body}
          </p>
        </div>

        {/* Hero image — z-10 keeps it above the abstract design (z-0) */}
        <div
          data-testid="careers-hero-image-wrapper"
          className="relative z-10 mt-6 flex-1 md:mt-0 md:-ml-[260px] laptop:-ml-[174px] desktop:-ml-[260px]"
        >
          <Image
            data-testid="careers-hero-image"
            src={data.imageUrl}
            alt="Careers at YourBank"
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
