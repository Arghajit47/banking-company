"use client";

import Image from "next/image";
import { useCareersBenefitsData, type CareersBenefitItem } from "@/lib/careers-benefits";
import { useMounted } from "@/lib/use-mounted";

const SECTION_HEADING_PREFIX = "Our ";
const SECTION_HEADING_ACCENT = "Benefits";
const SECTION_BODY =
  "At YourBank, we value our employees and are dedicated to their well-being and success. We offer a comprehensive range of benefits designed to support their personal and professional growth.";

const CORNER_RADII = [
  "rounded-tl-[50px] rounded-tr-[20px] rounded-br-[50px] rounded-bl-[20px]",
  "rounded-tl-[20px] rounded-tr-[50px] rounded-br-[20px] rounded-bl-[50px]",
  "rounded-tl-[20px] rounded-tr-[50px] rounded-br-[20px] rounded-bl-[50px]",
  "rounded-tl-[50px] rounded-tr-[20px] rounded-br-[50px] rounded-bl-[20px]",
];

function BenefitsSkeleton() {
  return (
    <section
      data-testid="benefits-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div
        data-testid="benefits-section-header"
        className="mb-[60px] flex flex-col gap-[14px] md:mb-[80px] lg:pr-[300px]"
      >
        <div
          data-testid="benefits-section-heading"
          aria-hidden="true"
          className="h-12 w-1/3 animate-pulse rounded bg-[#333333]"
        />
        <div
          data-testid="benefits-section-paragraph"
          aria-hidden="true"
          className="h-20 w-full animate-pulse rounded bg-[#333333]"
        />
      </div>
      <div
        data-testid="benefits-section-grid"
        className="flex flex-col gap-[50px]"
      >
        {[0, 1].map((rowIdx) => (
          <div key={rowIdx} className="flex flex-col gap-[40px] md:flex-row md:gap-0">
            {[0, 1].map((colIdx) => (
              <div
                key={colIdx}
                data-testid={`benefit-card-${rowIdx * 2 + colIdx}`}
                aria-hidden="true"
                className="flex flex-1 flex-col gap-[30px] rounded-[20px] bg-[#1C1C1C] p-[30px] md:p-[50px]"
              >
                <div className="flex gap-[20px]">
                  <div className="h-[98px] w-[98px] animate-pulse rounded-full bg-[#262626]" />
                  <div className="h-9 flex-1 animate-pulse rounded bg-[#262626]" />
                </div>
                <div className="h-20 animate-pulse rounded bg-[#262626]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function BenefitCard({ benefit, index }: { benefit: CareersBenefitItem; index: number }) {
  return (
    <article
      data-testid={`benefit-card-${index}`}
      className={`relative flex flex-1 flex-col gap-[30px] overflow-hidden border border-[#CAFF33]/10 bg-[#1C1C1C] p-[30px] md:p-[50px] ${CORNER_RADII[index % 4]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#CAFF33]/5 to-transparent" />
      <div className="flex flex-row items-center gap-[20px]">
        <div
          data-testid={`benefit-card-icon-container-${index}`}
          className="flex h-[98px] w-[98px] shrink-0 items-center justify-center rounded-[70px] bg-gradient-to-b from-[#CAFF33]/5 to-transparent p-[12px]"
        >
          <div className="flex h-[74px] w-[74px] items-center justify-center rounded-[50px] border border-[#CAFF33]/20 bg-gradient-to-b from-[#CAFF33]/10 to-transparent p-[20px]">
            <Image
              src={benefit.icon}
              alt=""
              width={34}
              height={34}
              aria-hidden="true"
              data-testid={`benefit-card-icon-${index}`}
            />
          </div>
        </div>
        <h3
          data-testid={`benefit-card-title-${index}`}
          className="text-[20px] font-normal leading-[150%] text-white md:text-[24px]"
        >
          {benefit.title}
        </h3>
      </div>
      <p
        data-testid={`benefit-card-body-${index}`}
        className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
      >
        {benefit.description}
      </p>
    </article>
  );
}

export function BenefitsSection() {
  const mounted = useMounted();
  const { data, error, isLoading } = useCareersBenefitsData();

  if (!mounted || isLoading || !data) {
    return <BenefitsSkeleton />;
  }

  const benefits = data.benefits;
  const rows: [CareersBenefitItem, CareersBenefitItem][] = [
    [benefits[0], benefits[1]],
    [benefits[2], benefits[3]],
  ];

  return (
    <section
      data-testid="benefits-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div
        data-testid="benefits-section-header"
        className="mb-[60px] flex flex-col gap-[14px] md:mb-[80px] lg:pr-[300px]"
      >
        <h2
          data-testid="benefits-section-heading"
          className="text-[36px] font-medium leading-[150%] text-white md:text-[42px] lg:text-[48px] laptop:text-[38px]"
        >
          <span className="text-white">{SECTION_HEADING_PREFIX}</span>
          <span className="text-[#CAFF33]">{SECTION_HEADING_ACCENT}</span>
        </h2>
        <p
          data-testid="benefits-section-paragraph"
          className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
        >
          {SECTION_BODY}
        </p>
      </div>

      {error && (
        <p className="mb-6 text-sm text-red-400">
          Unable to load benefits. Please refresh.
        </p>
      )}

      <div
        data-testid="benefits-section-grid"
        className="flex flex-col gap-[50px]"
      >
        {rows.map((row, rowIdx) => (
          <div key={rowIdx}>
            {rowIdx > 0 && (
              <hr
                data-testid={`benefits-row-divider-${rowIdx}`}
                className="mb-[50px] border-t border-dashed border-[#262626]"
              />
            )}
            <div className="flex flex-col gap-[40px] md:flex-row md:gap-0">
              <BenefitCard benefit={row[0]} index={rowIdx * 2} />
              <div className="hidden w-[50px] shrink-0 md:block">
                <div className="mx-auto h-full w-px border-r border-dashed border-[#262626]" />
              </div>
              <BenefitCard benefit={row[1]} index={rowIdx * 2 + 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
