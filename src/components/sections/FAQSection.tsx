"use client";

import { useState } from "react";
import Image from "next/image";
import { useFAQConfig, type FAQ, type FAQPage } from "@/lib/faq";
import { useMounted } from "@/lib/use-mounted";

export interface FAQSectionProps {
  /** API page key — defaults to "home" */
  page?: FAQPage;
}

const INITIAL_VISIBLE_COUNT = 4;

function FAQSkeleton() {
  return (
    <>
      <div className="mb-10 max-w-2xl">
        <div
          data-testid="faq-heading"
          className="h-8 w-3/4 animate-pulse rounded bg-[#333333] sm:h-10 md:h-12"
          aria-hidden="true"
        />
        <div
          data-testid="faq-subheading"
          className="mt-3 h-4 w-full animate-pulse rounded bg-[#333333] sm:h-5"
          aria-hidden="true"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {Array.from({ length: INITIAL_VISIBLE_COUNT }).map((_, index) => (
          <div
            key={index}
            data-testid={`faq-item-${index + 1}`}
            className="rounded-2xl border border-[#262626] bg-[#1E1E1E] p-6"
            aria-hidden="true"
          >
            <div
              data-testid="faq-question"
              className="h-4 w-3/4 animate-pulse rounded bg-[#333333]"
            />
            <hr data-testid="faq-separator" className="my-4 border-[#B3B3B3]/30" />
            <div
              data-testid="faq-answer"
              className="h-20 w-full animate-pulse rounded bg-[#333333]"
            />
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <div
          data-testid="faq-load-all"
          className="h-12 w-40 animate-pulse rounded-[82px] bg-[#333333]"
          aria-hidden="true"
        />
      </div>
    </>
  );
}

export function FAQSection({ page = "home" }: FAQSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const mounted = useMounted();
  const { data, isLoading } = useFAQConfig(page);

  const faqs: FAQ[] = data?.faqs ?? [];
  const hasMore = data?.hasMore ?? faqs.length > INITIAL_VISIBLE_COUNT;
  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE_COUNT);
  const showSkeleton = !mounted || isLoading;
  const isEmpty = !showSkeleton && faqs.length === 0;

  return (
    <section
      data-testid="faq-section"
      aria-labelledby="faq-heading"
      className="w-full bg-[#1A1A1A]"
    >
      <div className="mx-auto max-w-[1920px] py-10 laptop:py-[60px] desktop:py-[75px]">
        {showSkeleton ? (
          <FAQSkeleton />
        ) : isEmpty ? (
          <div className="flex h-64 items-center justify-center">
            <p data-testid="faq-empty-state" className="text-[#B3B3B3]">
              No FAQs available at the moment.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-10 max-w-2xl">
              <h2
                id="faq-heading"
                data-testid="faq-heading"
                className="text-[28px] font-medium leading-[150%] text-white md:text-[38px] desktop:text-[48px]"
              >
                <span className="text-[#CAFF33]">Frequently</span>
                {" Asked Questions"}
              </h2>
              <p
                data-testid="faq-subheading"
                className="mt-3 text-[14px] font-light leading-relaxed text-[#B3B3B3] md:text-[16px] desktop:text-[18px]"
              >
                Still you have any questions? Contact our Team via{" "}
                <a
                  href="mailto:support@yourbank.com"
                  className="text-[#CAFF33] underline-offset-2 hover:underline"
                >
                  support@yourbank.com
                </a>
              </p>
            </div>

            {/* FAQ Grid — 2 columns on desktop, 1 on mobile */}
            <div className="relative">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                {visibleFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    data-testid={`faq-item-${faq.id}`}
                    className="rounded-2xl border border-[#262626] bg-[#1E1E1E] p-6"
                  >
                    <p
                      data-testid="faq-question"
                      className="text-[18px] font-medium text-white desktop:text-[20px]"
                    >
                      {faq.question}
                    </p>
                    <hr
                      data-testid="faq-separator"
                      className="my-4 border-[#B3B3B3]/30"
                    />
                    <p
                      data-testid="faq-answer"
                      className="text-[14px] font-light leading-relaxed text-[#B3B3B3] md:text-[16px] desktop:text-[18px]"
                    >
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              {hasMore && !showAll && (
                <div
                  data-testid="faq-fade-overlay"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1A1A1A] to-transparent"
                />
              )}
            </div>

            {/* Load All button */}
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                data-testid="faq-load-all"
                onClick={() => setShowAll((prev) => !prev)}
                className="flex items-center gap-2 rounded-[82px] border border-[#CAFF33] px-8 py-4 text-[14px] font-normal text-white transition-all hover:bg-[#CAFF33]/10 focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] desktop:text-[18px]"
              >
                {showAll ? "Show Less" : "Load All FAQ's"}
                <Image
                  src="/assets/icons/icon_expand_collapse.svg"
                  alt=""
                  width={22}
                  height={22}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
