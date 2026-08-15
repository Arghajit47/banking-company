"use client";

import { useCareersValuesData, type CareersValueItem } from "@/lib/careers-values";
import { useMounted } from "@/lib/use-mounted";

const SECTION_HEADING_PREFIX = "Our ";
const SECTION_HEADING_ACCENT = "Values";
const SECTION_BODY =
  "At YourBank, our values form the foundation of our organization and guide our actions. We believe in upholding the highest standards of integrity, delivering exceptional service, and embracing innovation. These values define our culture and shape the way we work together to achieve our goals.";

function ValuesSkeleton() {
  return (
    <section
      data-testid="values-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div
        data-testid="values-section-header"
        className="mb-[60px] flex flex-col gap-[14px] md:mb-[80px] lg:pr-[300px]"
      >
        <div
          data-testid="values-section-heading"
          aria-hidden="true"
          className="h-12 w-1/3 animate-pulse rounded bg-[#333333]"
        />
        <div
          data-testid="values-section-paragraph"
          aria-hidden="true"
          className="h-20 w-full animate-pulse rounded bg-[#333333]"
        />
      </div>
      <div
        data-testid="values-section-grid"
        className="flex flex-col gap-[50px] md:gap-[80px]"
      >
        {[0, 1].map((rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-col gap-[40px] md:flex-row md:gap-[80px]"
          >
            {[0, 1].map((colIdx) => (
              <div
                key={colIdx}
                data-testid={`values-card-${rowIdx * 2 + colIdx}`}
                aria-hidden="true"
                className="flex flex-1 flex-col gap-[20px] border-l border-[#CAFF33] pl-[30px] md:gap-[30px]"
              >
                <div className="h-14 w-2/3 animate-pulse rounded bg-[#333333]" />
                <div className="h-20 w-full animate-pulse rounded bg-[#333333]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ValueCardItem({
  card,
  index,
}: {
  card: CareersValueItem;
  index: number;
}) {
  return (
    <article
      data-testid={`values-card-${index}`}
      className="flex flex-1 flex-col gap-[20px] border-l border-[#CAFF33] pl-[30px] md:gap-[30px]"
    >
      <h3
        data-testid={`values-card-title-${index}`}
        className="font-[var(--font-urbanist)] text-[36px] font-medium leading-[150%] text-[#4C4C4D] md:text-[48px] lg:text-[58px]"
      >
        {card.title}
      </h3>
      <p
        data-testid={`values-card-body-${index}`}
        className="font-[var(--font-urbanist)] text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
      >
        {card.description}
      </p>
    </article>
  );
}

export function ValuesSection() {
  const mounted = useMounted();
  const { data, error, isLoading } = useCareersValuesData();

  if (!mounted || isLoading || !data) {
    return <ValuesSkeleton />;
  }

  const values = data.values;
  const rows: [CareersValueItem, CareersValueItem][] = [
    [values[0], values[1]],
    [values[2], values[3]],
  ];

  return (
    <section
      data-testid="values-section"
      className="px-4 py-12 font-[var(--font-urbanist)] md:px-8 md:py-16 lg:px-12 lg:py-20 desktop:px-[162px]"
    >
      <div
        data-testid="values-section-header"
        className="mb-[60px] flex flex-col gap-[14px] md:mb-[80px] lg:pr-[300px]"
      >
        <h2
          data-testid="values-section-heading"
          className="text-[36px] font-medium leading-[150%] md:text-[42px] lg:text-[48px]"
        >
          <span className="text-white">{SECTION_HEADING_PREFIX}</span>
          <span className="text-[#CAFF33]">{SECTION_HEADING_ACCENT}</span>
        </h2>
        <p
          data-testid="values-section-paragraph"
          className="text-[16px] font-light leading-[150%] text-[#B3B3B3] md:text-[18px]"
        >
          {SECTION_BODY}
        </p>
      </div>

      {error && (
        <p className="mb-6 text-sm text-red-400">
          Unable to load values. Please refresh.
        </p>
      )}

      <div
        data-testid="values-section-grid"
        className="flex flex-col gap-[50px] md:gap-[80px]"
      >
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-col gap-[40px] md:flex-row md:gap-[80px]"
          >
            {row.map((card, colIdx) => (
              <ValueCardItem
                key={card.id}
                card={card}
                index={rowIdx * 2 + colIdx}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
