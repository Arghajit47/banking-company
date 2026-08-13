"use client";

import React from "react";
import Image from "next/image";

const INDIVIDUALS_CARDS = [
  { id: 1, icon: "/assets/icons/icon_use_case_1.svg", title: "Managing Personal Finances" },
  { id: 2, icon: "/assets/icons/icon_use_case_2.svg", title: "Saving for the Future" },
  { id: 3, icon: "/assets/icons/icon_use_case_3.svg", title: "Homeownership" },
  { id: 4, icon: "/assets/icons/icon_use_case_4.svg", title: "Education Funding" },
] as const;

const BUSINESSES_CARDS = [
  { id: 5, icon: "/assets/icons/icon_use_case_5.svg", title: "Startups and Entrepreneurs" },
  { id: 6, icon: "/assets/icons/icon_use_case_6.svg", title: "Cash Flow Management" },
  { id: 7, icon: "/assets/icons/icon_use_case_7.svg", title: "Business Expansion" },
  { id: 8, icon: "/assets/icons/icon_use_case_8.svg", title: "Payment Solutions" },
] as const;

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
type Card = { id: number; icon: string; title: string };

function UseCaseCard({ card }: { card: Card }) {
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
        className="text-xl font-normal text-white"
      >
        {card.title}
      </p>
    </article>
  );
}

function StatsRow({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="flex items-stretch gap-[50px]">
      {stats.map((stat, i) => (
        <React.Fragment key={stat.value}>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[58px] font-medium leading-none text-[#CAFF33]">
              {stat.value}
            </span>
            <span className="text-lg font-light text-[#B3B3B3]">{stat.label}</span>
          </div>
          {i < stats.length - 1 && (
            <div className="w-px self-stretch bg-[#262626]" />
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
        <h3 className="text-[30px] font-medium leading-[150%] text-white">{heading}</h3>
        <p className="text-lg font-light text-[#B3B3B3]">{paragraph}</p>
      </div>
      <StatsRow stats={stats} />
      <button
        type="button"
        data-testid={btnTestId}
        className="w-fit rounded-[82px] border border-[#262626] bg-[#1C1C1C] px-[24px] py-[18px] text-[18px] font-normal text-white transition hover:bg-[#262626]"
      >
        Learn More
      </button>
    </div>
  );
}

function CardsPanel({
  audience,
  cards,
  abstractSrc,
  abstractPosition,
}: {
  audience: "individuals" | "businesses";
  cards: readonly Card[];
  abstractSrc: string;
  abstractPosition: "top-left" | "bottom-right";
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
        className={`pointer-events-none absolute z-0 ${abstractPosition === "top-left" ? "left-0 top-0" : "bottom-0 right-0"}`}
      />
      <div className="relative z-10 grid grid-cols-2 gap-5">
        {cards.map((card) => (
          <UseCaseCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export function UseCasesSection() {
  return (
    <section
      data-testid="use-cases-section"
      className="w-full bg-[#1E1E1E] px-4 py-16 font-[var(--font-lexend)] md:px-8 lg:px-12 laptop:px-20 desktop:px-[162px]"
    >
      <div className="mx-auto max-w-[1920px]">
        {/* Section header */}
        <div className="mb-20 flex flex-col gap-3.5">
          <h2
            data-testid="use-cases-heading"
            className="text-[48px] font-medium leading-[150%] text-[#CAFF33]"
          >
            Use Cases
          </h2>
          <p data-testid="use-cases-subheading" className="text-lg font-light text-[#B3B3B3]">
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
              cards={INDIVIDUALS_CARDS}
              abstractSrc="/assets/illustrations/abstract_design_left.svg"
              abstractPosition="top-left"
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
              cards={BUSINESSES_CARDS}
              abstractSrc="/assets/illustrations/abstract_design_right.svg"
              abstractPosition="bottom-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
