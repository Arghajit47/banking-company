"use client";

import { useState } from "react";
import QuoteIcon from "@/components/icons/QuoteIcon";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

type TabKey = "individuals" | "businesses";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sara T",
    role: "Individual Customer",
    quote:
      "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
  },
  {
    name: "John D",
    role: "Business Owner",
    quote:
      "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
  },
  {
    name: "Emily G",
    role: "Individual Customer",
    quote:
      "I love the convenience of YourBank banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure, giving me peace of mind.",
  },
];

export function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("individuals");
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

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
              className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px]"
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
          <div className="flex shrink-0 items-center gap-3">
            <button
              data-testid="testimonials-tab-individuals"
              type="button"
              onClick={() => setActiveTab("individuals")}
              className={`rounded-[82px] px-5 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] ${
                activeTab === "individuals"
                  ? "bg-[#CAFF33] text-[#1A1A1A]"
                  : "border border-[#CAFF33] bg-transparent text-white"
              }`}
            >
              For Individuals
            </button>
            <button
              data-testid="testimonials-tab-businesses"
              type="button"
              onClick={() => setActiveTab("businesses")}
              className={`rounded-[82px] px-5 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] ${
                activeTab === "businesses"
                  ? "bg-[#CAFF33] text-[#1A1A1A]"
                  : "border border-[#CAFF33] bg-transparent text-white"
              }`}
            >
              For Businesses
            </button>
          </div>
        </div>

        {/* Cards row with chevrons */}
        <div className="flex items-center gap-4">
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

          {/* Cards — horizontally scrollable on mobile */}
          <div className="flex flex-1 gap-4 overflow-x-auto pb-2 md:gap-6 md:overflow-x-visible md:pb-0">
            {TESTIMONIALS.map((testimonial, index) => {
              const isCenter = index === 1;
              return (
                <div
                  key={testimonial.name}
                  data-testid={`testimonials-card-${index}`}
                  className={`flex min-w-[260px] flex-1 flex-col rounded-2xl bg-[#262626] p-6 md:min-w-0 ${
                    isCenter ? "ring-1 ring-[#CAFF33]/20" : ""
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
          Showing testimonial {activeIndex + 1} of {TESTIMONIALS.length}
        </p>
      </div>
    </section>
  );
}
