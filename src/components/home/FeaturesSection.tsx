"use client";

import { useState } from "react";
import Image from "next/image";
import { useFeaturesData } from "@/lib/features";
import { useMounted } from "@/lib/use-mounted";
import type { Feature } from "@/lib/features";

const TABS = ["Online Banking", "Financial Tools", "Customer Support"] as const;
type Tab = (typeof TABS)[number];

function FeatureCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="flex flex-1 animate-pulse flex-col gap-[30px] rounded-[20px] bg-[#1C1C1C] p-[50px]"
    >
      <div className="flex items-start gap-[10px]">
        <div className="h-6 flex-1 rounded bg-[#262626]" />
        <div className="h-[34px] w-[34px] rounded bg-[#262626]" />
      </div>
      <div className="space-y-2">
        <div className="h-4 rounded bg-[#262626]" />
        <div className="h-4 w-3/4 rounded bg-[#262626]" />
      </div>
    </article>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article
      data-testid={`feature-card-${feature.id}`}
      className="flex flex-1 flex-col gap-[30px] rounded-[20px] bg-[#1C1C1C] p-[50px]"
    >
      <div className="flex items-start gap-[10px]">
        <h3
          data-testid={`feature-card-title-${feature.id}`}
          className="flex-1 text-[22px] font-medium leading-[150%] text-white laptop:text-[18px] laptop:font-normal"
        >
          {feature.title}
        </h3>
        <Image
          src={feature.icon}
          alt=""
          width={34}
          height={34}
          aria-hidden="true"
          data-testid={`feature-card-icon-${feature.id}`}
        />
      </div>
      <p
        data-testid={`feature-card-description-${feature.id}`}
        className="text-lg font-light text-[#B3B3B3]"
      >
        {feature.description}
      </p>
    </article>
  );
}

function CardsGrid({
  features,
  showSkeleton,
  hasError,
}: {
  features: Feature[];
  showSkeleton: boolean;
  hasError: boolean;
}) {
  const rows = showSkeleton
    ? [
        [null, null],
        [null, null],
      ]
    : [features.slice(0, 2), features.slice(2, 4)];

  if (hasError) {
    return (
      <div
        data-testid="features-cards-error"
        className="flex flex-1 items-center justify-center rounded-[20px] bg-[#1C1C1C] p-[50px] text-[#B3B3B3]"
      >
        <p>Failed to load features. Please try again later.</p>
      </div>
    );
  }

  return (
    <div
      data-testid="features-cards-grid"
      className="flex flex-1 flex-col gap-[30px]"
    >
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-col gap-[30px] sm:flex-row">
          {row.map((feature, colIdx) =>
            showSkeleton || !feature ? (
              <FeatureCardSkeleton key={colIdx} />
            ) : (
              <FeatureCard key={feature.id} feature={feature} />
            )
          )}
        </div>
      ))}
    </div>
  );
}

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Online Banking");
  const { data, error, isLoading } = useFeaturesData();
  const mounted = useMounted();

  const showSkeleton = !mounted || isLoading;
  const hasError = !showSkeleton && (!!error || !data);
  const features = data?.features ?? [];

  return (
    <section
      data-testid="features-section"
      className="bg-[#1A1A1A] px-4 py-16 md:px-8 lg:px-12 laptop:px-20 desktop:px-[162px]"
    >
      <div className="mb-[50px] lg:pr-[300px]" data-testid="features-header">
        <h2
          data-testid="features-heading"
          className="mb-[14px] font-urbanist text-2xl font-medium leading-[150%] text-[#CAFF33] sm:text-[48px] laptop:text-[38px]"
        >
          Our Features
        </h2>
        <p
          data-testid="features-subheading"
          className="text-lg font-light text-[#B3B3B3]"
        >
          Experience a host of powerful features that redefine the way you bank.
          From intuitive account management to seamless transactions, our
          platform offers a range of tools tailored to your financial needs.
        </p>
      </div>

      <div className="flex flex-col gap-[30px] lg:flex-row">
        <nav
          data-testid="features-tabs"
          aria-label="Feature categories"
          className="flex flex-row gap-3 overflow-x-auto lg:w-[308px] lg:flex-shrink-0 lg:flex-col lg:overflow-visible lg:rounded-[20px] lg:bg-[#1C1C1C] lg:p-[50px]"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                data-testid={`features-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveTab(tab)}
                aria-pressed={isActive}
                className={`rounded-[10px] px-6 py-[18px] text-left text-lg font-normal transition-colors ${
                  isActive
                    ? "bg-[#1A1A1A] text-[#CAFF33]"
                    : "text-white hover:text-[#CAFF33]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        <CardsGrid
          features={features}
          showSkeleton={showSkeleton}
          hasError={hasError}
        />
      </div>
    </section>
  );
}
