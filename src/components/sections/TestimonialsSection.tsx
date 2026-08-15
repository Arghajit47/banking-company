"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import QuoteIcon from "@/components/icons/QuoteIcon";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import { useTestimonials, type Testimonial } from "@/lib/testimonials";
import { useMounted } from "@/lib/use-mounted";

type TabKey = "individuals" | "businesses";

/**
 * Stable ids wiring the tablist to its tabpanel.
 *
 * Both render branches (`!mounted || isLoading` and the loaded branch) reuse
 * these ids, which is safe because only one branch is ever mounted at a time —
 * the same reason `id="testimonials-heading"` can appear in both.
 */
const TAB_IDS: Record<TabKey, string> = {
  individuals: "testimonials-tab-individuals",
  businesses: "testimonials-tab-businesses",
};
const TAB_PANEL_ID = "testimonials-panel";
/** Visual left-to-right order of the pills, which is what the arrow keys follow. */
const TAB_ORDER: TabKey[] = ["individuals", "businesses"];

const FALLBACK_INDIVIDUALS: Testimonial[] = [
  {
    id: 1,
    name: "Sara T",
    role: "Individual Customer",
    quote:
      "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
    avatarUrl: null,
  },
  {
    id: 2,
    name: "Emily G",
    role: "Individual Customer",
    quote:
      "I love the convenience of YourBank banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
    avatarUrl: null,
  },
  {
    id: 3,
    name: "Michael B",
    role: "Individual Customer",
    quote:
      "Switching to YourBank was the best financial decision I ever made. Their zero-fee accounts and competitive interest rates have helped me save more and grow my personal wealth steadily.",
    avatarUrl: null,
  },
];

const FALLBACK_BUSINESSES: Testimonial[] = [
  {
    id: 4,
    name: "John D",
    role: "Business Owner",
    quote:
      "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
    avatarUrl: null,
  },
  {
    id: 5,
    name: "Alex P",
    role: "Business Director",
    quote:
      "YourBank's business banking suite is exactly what our growing company needed. From multi-user account access to seamless payroll integration, every feature is designed with businesses like ours in mind.",
    avatarUrl: null,
  },
  {
    id: 6,
    name: "Rachel M",
    role: "Business Manager",
    quote:
      "The dedicated relationship manager at YourBank truly understands our industry. They helped us restructure our credit lines and unlock better cash flow management — our business has never been more financially healthy.",
    avatarUrl: null,
  },
];

export function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("businesses");
  const [activeIndex, setActiveIndex] = useState(0);

  const mounted = useMounted();
  const { data, isLoading } = useTestimonials(activeTab);
  const testimonials = data?.testimonials ?? (activeTab === "businesses" ? FALLBACK_BUSINESSES : FALLBACK_INDIVIDUALS);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});

  /** Same effect as clicking a pill: switch tab and rewind the carousel. */
  const selectTab = (tab: TabKey) => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  /**
   * Horizontal arrow-key navigation across the tablist with automatic
   * activation — focus moves and the tab activates in one step, matching the
   * click behaviour. Wraps around at both ends.
   */
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    const nextTab =
      TAB_ORDER[(currentIndex + delta + TAB_ORDER.length) % TAB_ORDER.length];
    selectTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  if (!mounted || isLoading) {
    return (
      <section
        data-testid="testimonials-section"
        aria-labelledby="testimonials-heading"
        aria-busy="true"
        className="w-full bg-[#1A1A1A]"
      >
        <div className="mx-auto max-w-[1920px] px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20 xl:px-12">
          {/* Header row */}
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <h2
                id="testimonials-heading"
                data-testid="testimonials-heading"
                className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px] laptop:text-[38px] laptop:leading-[48px]"
              >
                Our{" "}
                <span className="text-[#CAFF33]">Testimonials</span>
              </h2>
              <p
                data-testid="testimonials-subheading"
                className="mt-3 text-sm leading-relaxed text-[#999999] sm:text-base"
              >
                Discover how YourBank has transformed lives with innovative digital
                solutions and personalized customer service. See why our clients
                trust us for a secure and prosperous financial journey
              </p>
            </div>

            {/* Tab pills */}
            <div
              data-testid="testimonials-tabs"
              role="tablist"
              aria-label="Testimonial audience"
              aria-orientation="horizontal"
              className="flex shrink-0 items-center rounded-[82px] border border-[#262626] bg-[#1C1C1C] p-[14px]"
            >
              <button
                data-testid="testimonials-tab-individuals"
                id={TAB_IDS.individuals}
                type="button"
                role="tab"
                aria-selected={activeTab === "individuals"}
                aria-controls={TAB_PANEL_ID}
                tabIndex={activeTab === "individuals" ? 0 : -1}
                ref={(el) => { tabRefs.current.individuals = el; }}
                onKeyDown={handleTabKeyDown}
                onClick={() => selectTab("individuals")}
                className={`rounded-[140px] px-6 py-[14px] text-[18px] font-normal transition-all focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1C1C1C] ${
                  activeTab === "individuals"
                    ? "bg-[#CAFF33] text-[#1C1C1C]"
                    : "bg-transparent text-white"
                }`}
              >
                For Individuals
              </button>
              <button
                data-testid="testimonials-tab-businesses"
                id={TAB_IDS.businesses}
                type="button"
                role="tab"
                aria-selected={activeTab === "businesses"}
                aria-controls={TAB_PANEL_ID}
                tabIndex={activeTab === "businesses" ? 0 : -1}
                ref={(el) => { tabRefs.current.businesses = el; }}
                onKeyDown={handleTabKeyDown}
                onClick={() => selectTab("businesses")}
                className={`rounded-[140px] px-6 py-[14px] text-[18px] font-normal transition-all focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1C1C1C] ${
                  activeTab === "businesses"
                    ? "bg-[#CAFF33] text-[#1C1C1C]"
                    : "bg-transparent text-white"
                }`}
              >
                For Businesses
              </button>
            </div>
          </div>

          {/* Skeleton cards */}
          <div
            id={TAB_PANEL_ID}
            data-testid="testimonials-panel"
            role="tabpanel"
            aria-labelledby={TAB_IDS[activeTab]}
            className="flex items-center gap-4"
          >
            <div className="flex flex-1 gap-4 overflow-x-auto pb-2 md:gap-6 md:overflow-x-visible md:pb-0">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="flex min-w-[260px] flex-1 flex-col rounded-2xl bg-[#262626] p-6 animate-pulse"
                >
                  <div className="h-[60px] w-[60px] rounded-full bg-[#333]" />
                  <div className="h-4 w-full rounded bg-[#333] mt-4" />
                  <div className="h-4 w-1/3 rounded bg-[#CAFF33]/20 mt-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      data-testid="testimonials-section"
      aria-labelledby="testimonials-heading"
      className="w-full bg-[#1A1A1A]"
    >
      <div className="mx-auto max-w-[1920px] px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20 xl:px-12">
        {/* Header row */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2
              id="testimonials-heading"
              data-testid="testimonials-heading"
              className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px] laptop:text-[38px] laptop:leading-[48px]"
            >
              Our{" "}
              <span className="text-[#CAFF33]">Testimonials</span>
            </h2>
            <p
              data-testid="testimonials-subheading"
              className="mt-3 text-sm leading-relaxed text-[#999999] sm:text-base"
            >
              Discover how YourBank has transformed lives with innovative digital
              solutions and personalized customer service. See why our clients
              trust us for a secure and prosperous financial journey
            </p>
          </div>

          {/* Tab pills */}
          <div
            data-testid="testimonials-tabs"
            role="tablist"
            aria-label="Testimonial audience"
            aria-orientation="horizontal"
            className="flex shrink-0 items-center rounded-[82px] border border-[#262626] bg-[#1C1C1C] p-[14px]"
          >
            <button
              data-testid="testimonials-tab-individuals"
              id={TAB_IDS.individuals}
              type="button"
              role="tab"
              aria-selected={activeTab === "individuals"}
              aria-controls={TAB_PANEL_ID}
              tabIndex={activeTab === "individuals" ? 0 : -1}
              ref={(el) => { tabRefs.current.individuals = el; }}
              onKeyDown={handleTabKeyDown}
              onClick={() => selectTab("individuals")}
              className={`rounded-[140px] px-6 py-[14px] text-[18px] font-normal transition-all focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1C1C1C] ${
                activeTab === "individuals"
                  ? "bg-[#CAFF33] text-[#1C1C1C]"
                  : "bg-transparent text-white"
              }`}
            >
              For Individuals
            </button>
            <button
              data-testid="testimonials-tab-businesses"
              id={TAB_IDS.businesses}
              type="button"
              role="tab"
              aria-selected={activeTab === "businesses"}
              aria-controls={TAB_PANEL_ID}
              tabIndex={activeTab === "businesses" ? 0 : -1}
              ref={(el) => { tabRefs.current.businesses = el; }}
              onKeyDown={handleTabKeyDown}
              onClick={() => selectTab("businesses")}
              className={`rounded-[140px] px-6 py-[14px] text-[18px] font-normal transition-all focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1C1C1C] ${
                activeTab === "businesses"
                  ? "bg-[#CAFF33] text-[#1C1C1C]"
                  : "bg-transparent text-white"
              }`}
            >
              For Businesses
            </button>
          </div>
        </div>

        {/* Cards row with chevrons */}
        <div
          id={TAB_PANEL_ID}
          data-testid="testimonials-panel"
          role="tabpanel"
          aria-labelledby={TAB_IDS[activeTab]}
          className="flex items-center gap-4"
        >
          {/* Left chevron */}
          <button
            data-testid="testimonials-prev"
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="shrink-0 rounded-full border border-[#CAFF33] p-2 transition-all hover:bg-[#CAFF33]/10 focus:outline-none focus:ring-2 focus:ring-[#CAFF33]"
          >
            <ChevronLeftIcon size={34} />
          </button>

          {/* Cards — visible window of 3: prev, active, next */}
          <div className="flex flex-1 gap-4 overflow-x-auto pb-2 md:gap-6 md:overflow-x-visible md:pb-0">
            {[
              testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length],
              testimonials[activeIndex],
              testimonials[(activeIndex + 1) % testimonials.length],
            ].map((testimonial, index) => {
              const isCenter = index === 1;
              return (
                <div
                  key={testimonial.id}
                  data-testid={`testimonials-card-${index}`}
                  className={`flex min-w-[260px] flex-1 flex-col rounded-2xl bg-[#262626] p-6 md:min-w-0 transition-opacity ${
                    isCenter ? "ring-1 ring-[#CAFF33]/20" : "opacity-40"
                  }`}
                >
                  <div className="mb-4">
                    <QuoteIcon size={60} />
                  </div>
                  <p
                    data-testid="testimonials-card-quote"
                    className={`flex-1 text-sm leading-relaxed md:text-base ${
                      isCenter ? "font-semibold text-white" : "text-[#999999]"
                    }`}
                  >
                    {testimonial.quote}
                  </p>
                  <p
                    data-testid="testimonials-card-name"
                    className="mt-6 text-sm font-medium text-[#CAFF33]"
                  >
                    {testimonial.name}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right chevron */}
          <button
            data-testid="testimonials-next"
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="shrink-0 rounded-full border border-[#CAFF33] p-2 transition-all hover:bg-[#CAFF33]/10 focus:outline-none focus:ring-2 focus:ring-[#CAFF33]"
          >
            <ChevronRightIcon size={34} />
          </button>
        </div>

        {/* Active index indicator — accessible, non-visual */}
        <p className="sr-only" aria-live="polite">
          Showing testimonial {activeIndex + 1} of {testimonials.length}
        </p>
      </div>
    </section>
  );
}
