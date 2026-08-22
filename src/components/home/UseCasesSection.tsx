"use client";

import React from "react";
import Image from "next/image";
import { useUseCasesData } from "@/lib/use-cases";
import { useMounted } from "@/lib/use-mounted";
import type { UseCase } from "@/lib/use-cases";

const INDIVIDUALS_STATS = [
  { value: "78%", label: "Secure Retirement Planning" },
  { value: "63%", label: "Manageable Debt Consolidation" },
  { value: "91%", label: "Reducing financial burdens" },
] as const;

const BUSINESSES_STATS = [
  { value: "65%", label: "Cash Flow Management" },
  { value: "70%", label: "Drive Business Expansion" },
  { value: "45%", label: "Streamline payroll processing" },
] as const;

type Stat = { value: string; label: string };

function StatsRow({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="flex flex-wrap items-stretch gap-[20px] md:gap-[50px]">
      {stats.map((stat, i) => (
        <React.Fragment key={stat.value}>
          <div className="flex flex-col gap-[5px]">
            <span
              data-testid="use-cases-stat-value"
              className="text-[40px] font-medium leading-none text-[#CAFF33] desktop:text-[58px]"
            >
              {stat.value}
            </span>
            <span
              data-testid="use-cases-stat-label"
              className="text-[14px] font-light text-[#B3B3B3] md:text-[16px] desktop:text-[18px]"
            >
              {stat.label}
            </span>
          </div>
          {i < stats.length - 1 && (
            <div className="hidden w-px self-stretch bg-[#262626] md:block" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function TextPanel({
  audience,
  heading,
  paragraph,
  stats,
  btnTestId,
}: {
  audience: "individuals" | "businesses";
  heading: string;
  paragraph: string;
  stats: readonly Stat[];
  btnTestId: string;
}) {
  return (
    <div
      data-testid={`use-cases-text-${audience}`}
      className="flex w-full flex-col justify-center gap-[62px] lg:w-1/2"
    >
      <div className="flex flex-col gap-3.5">
        <h3
          data-testid={`use-cases-audience-heading-${audience}`}
          className="text-[20px] font-medium leading-[150%] text-white laptop:text-[26px] desktop:text-[30px]"
        >
          {heading}
        </h3>
        <p className="text-[14px] font-light text-[#B3B3B3] md:text-[16px] desktop:text-[18px]">
          {paragraph}
        </p>
      </div>
      <StatsRow stats={stats} />
      <button
        type="button"
        data-testid={btnTestId}
        className="w-fit rounded-[82px] border border-[#262626] bg-[#1C1C1C] px-[24px] py-[18px] text-[14px] font-normal text-white transition hover:bg-[#262626] desktop:text-[18px]"
      >
        Learn More
      </button>
    </div>
  );
}

function UseCaseCardSkeleton() {
  return (
    <article
      className="flex flex-col gap-6 rounded-2xl border border-[#262626] bg-[#1A1A1A] p-[30px]"
      aria-hidden="true"
    >
      <div className="h-[78px] w-[78px] animate-pulse rounded-full bg-[#262626]" />
      <div className="h-5 w-3/4 animate-pulse rounded bg-[#262626]" />
    </article>
  );
}

function UseCaseCard({ card }: { card: UseCase }) {
  return (
    <article
      data-testid={`use-case-card-${card.id}`}
      className="flex flex-col gap-6 rounded-2xl border border-[#262626] bg-[#1A1A1A] p-[30px]"
    >
      <Image
        src={card.icon}
        alt=""
        width={78}
        height={78}
        aria-hidden="true"
        data-testid={`use-case-icon-${card.id}`}
        unoptimized
      />
      <p
        data-testid={`use-case-title-${card.id}`}
        className="text-[14px] font-normal text-white md:text-[16px] desktop:text-[20px]"
      >
        {card.title}
      </p>
    </article>
  );
}

function CardsPanel({
  audience,
  cards,
  abstractSrc,
  abstractPosition,
  isLoading,
  hasError,
}: {
  audience: "individuals" | "businesses";
  cards: UseCase[];
  abstractSrc: string;
  abstractPosition: "top-left" | "bottom-right";
  isLoading: boolean;
  hasError: boolean;
}) {
  return (
    <div
      data-testid={`use-cases-cards-panel-${audience}`}
      className="relative w-full overflow-hidden rounded-[20px] bg-[#1C1C1C] p-[50px] lg:w-1/2"
    >
      <Image
        src={abstractSrc}
        alt=""
        width={224}
        height={213}
        aria-hidden="true"
        unoptimized
        className={`pointer-events-none absolute z-0 h-[112px] w-[118px] laptop:h-[213px] laptop:w-[224px] ${abstractPosition === "top-left" ? "left-0 top-0" : "bottom-0 right-0"}`}
      />
      <div className="relative z-10 grid grid-cols-2 gap-5">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <UseCaseCardSkeleton key={i} />
          ))
        ) : hasError ? (
          <div
            data-testid={`use-cases-cards-error-${audience}`}
            className="col-span-2 flex h-40 items-center justify-center"
          >
            <p className="text-[#B3B3B3]">Unable to load use cases. Please try again later.</p>
          </div>
        ) : (
          cards.map((card) => <UseCaseCard key={card.id} card={card} />)
        )}
      </div>
    </div>
  );
}

export function UseCasesSection() {
  const mounted = useMounted();
  const { data, error, isLoading } = useUseCasesData();

  const showSkeleton = !mounted || isLoading;
  const hasError = !showSkeleton && (!!error || !data);

  const individualCards = data?.useCases.filter((u) => u.audience === "individual") ?? [];
  const businessCards = data?.useCases.filter((u) => u.audience === "business") ?? [];

  return (
    <section
      data-testid="use-cases-section"
      className="w-full py-10 font-[var(--font-lexend)] laptop:py-[60px] desktop:py-[75px]"
    >
      <div className="mx-auto max-w-[1920px]">
        {/* Section header */}
        <div className="mb-20 flex flex-col gap-3.5">
          <h2
            data-testid="use-cases-heading"
            className="text-[28px] font-medium leading-[150%] text-[#CAFF33] md:text-[38px] desktop:text-[48px]"
          >
            Use Cases
          </h2>
          <p
            data-testid="use-cases-subheading"
            className="text-[14px] font-light text-[#B3B3B3] md:text-[16px] desktop:text-[18px]"
          >
            At YourBank, we cater to the diverse needs of individuals and businesses alike,
            offering a wide range of financial solutions
          </p>
        </div>

        {/* Two use-case rows */}
        <div className="flex flex-col gap-[60px]">
          {/* Row 1 — Individuals: cards left, text right */}
          <div
            data-testid="use-cases-row-individuals"
            className="flex flex-col gap-[60px] lg:flex-row lg:gap-[100px]"
          >
            <CardsPanel
              audience="individuals"
              cards={individualCards}
              abstractSrc="/assets/illustrations/abstract_design_left.svg"
              abstractPosition="top-left"
              isLoading={showSkeleton}
              hasError={hasError}
            />
            <TextPanel
              audience="individuals"
              heading="For Individuals"
              paragraph="For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers"
              stats={INDIVIDUALS_STATS}
              btnTestId="use-cases-btn-individuals"
            />
          </div>

          {/* Row 2 — Business: text left, cards right */}
          <div
            data-testid="use-cases-row-businesses"
            className="flex flex-col gap-[60px] lg:flex-row lg:gap-[100px]"
          >
            <TextPanel
              audience="businesses"
              heading="For Business"
              paragraph="For businesses, we empower growth with working capital solutions that optimize cash flow, and our tailored financing options fuel business expansion. Whatever your financial aspirations, YourBank is committed to providing the right tools and support to achieve them"
              stats={BUSINESSES_STATS}
              btnTestId="use-cases-btn-businesses"
            />
            <CardsPanel
              audience="businesses"
              cards={businessCards}
              abstractSrc="/assets/illustrations/abstract_design_right.svg"
              abstractPosition="bottom-right"
              isLoading={showSkeleton}
              hasError={hasError}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
