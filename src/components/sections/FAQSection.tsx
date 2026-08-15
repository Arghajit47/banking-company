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
            <hr data-testid="faq-separator" className="my-4 border-[#999999]/30" />
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
      <div className="mx-auto max-w-[1920px] px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20 xl:px-12">
        {showSkeleton ? (
          <FAQSkeleton />
        ) : isEmpty ? (
          <div className="flex h-64 items-center justify-center">
            <p data-testid="faq-empty-state" className="text-[#999999]">
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
                className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px] laptop:text-[38px] laptop:leading-[48px]"
              >
                <span className="text-[#CAFF33]">Frequently</span>
                {" Asked Questions"}
              </h2>
              <p
                data-testid="faq-subheading"
                className="mt-3 text-sm leading-relaxed text-[#999999] sm:text-base"
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
                      className="text-base font-medium text-white"
                    >
                      {faq.question}
                    </p>
                    <hr
                      data-testid="faq-separator"
                      className="my-4 border-[#999999]/30"
                    />
                    <p
                      data-testid="faq-answer"
                      className="text-sm leading-relaxed text-[#999999]"
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
                className="flex items-center gap-2 rounded-[82px] border border-[#CAFF33] px-8 py-4 text-sm font-medium text-[#CAFF33] transition-all hover:bg-[#CAFF33]/10 focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
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
