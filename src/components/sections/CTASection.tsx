"use client";

import { useCTAConfig, type CTAConfig, type CTAPage } from "@/lib/cta";
import { useMounted } from "@/lib/use-mounted";

export interface CTASectionProps {
  headlineStart?: string;
  headlineAccent?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
  /** API page key — defaults to "home" */
  page?: CTAPage;
}

const defaultConfig: CTAConfig = {
  headline: "Start your financial journey with YourBank today!",
  body: "Ready to take control of your finances? Join YourBank now, and let us help you achieve your financial goals with our tailored solutions and exceptional customer service",
  buttonLabel: "Open Account",
};

function splitHeadline(headline: string): { start: string; accent: string } {
  const idx = headline.indexOf("YourBank");
  if (idx === -1) return { start: headline, accent: "" };
  return {
    start: headline.slice(0, idx),
    accent: headline.slice(idx),
  };
}

export function CTASection({
  headlineStart: propHeadlineStart,
  headlineAccent: propHeadlineAccent,
  body: propBody,
  buttonLabel: propButtonLabel,
  buttonHref = "/",
  page = "home",
}: CTASectionProps) {
  const mounted = useMounted();
  const { data, error, isLoading } = useCTAConfig(page);

  // If explicit props are passed, use them (bypass API)
  const hasExplicitProps =
    propHeadlineStart !== undefined ||
    propHeadlineAccent !== undefined ||
    propBody !== undefined ||
    propButtonLabel !== undefined;

  const config: CTAConfig = hasExplicitProps
    ? {
        headline: `${propHeadlineStart ?? defaultConfig.headline}${propHeadlineAccent ?? ""}`,
        body: propBody ?? defaultConfig.body,
        buttonLabel: propButtonLabel ?? defaultConfig.buttonLabel,
      }
    : error || !data
      ? defaultConfig
      : data;

  const { start: headlineStart, accent: headlineAccent } = splitHeadline(
    config.headline,
  );

  const showSkeleton = !mounted || isLoading;

  return (
    <section
      data-testid="cta-section"
      aria-labelledby="cta-heading"
      className="w-full bg-[#1A1A1A]"
    >
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="relative flex min-h-[288px] flex-col items-center gap-8 overflow-hidden rounded-[20px] bg-[#1C1C1C] px-5 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-0 lg:px-16">
          {/*
            TODO: Replace this CSS placeholder with the exported Figma SVG once the
            Local AI Bridge plugin is synced to the correct page.
            curl "http://localhost:47291/api/node/11:89115/svg" --output public/assets/illustrations/abstract_design.svg
            Abstract Design node 11:89115 (desktop 298x283) / 108:2699 (laptop 202x192) / 113:4994 (mobile 151x143)
          */}
          <div
            data-testid="cta-abstract-decoration"
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 opacity-30 md:-left-12 md:-top-12 md:h-80 md:w-80 lg:h-96 lg:w-96"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #CAFF33 2px, transparent 2.5px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative z-10 w-full text-center md:text-left">
            {showSkeleton ? (
              <>
                <div
                  data-testid="cta-heading"
                  className="mb-2 h-8 w-3/4 animate-pulse rounded bg-[#333333] sm:h-10 md:h-12"
                  aria-hidden="true"
                />
                <div
                  data-testid="cta-body"
                  className="mt-3 h-4 w-full animate-pulse rounded bg-[#333333] sm:h-5"
                  aria-hidden="true"
                />
              </>
            ) : (
              <>
                <h2
                  id="cta-heading"
                  data-testid="cta-heading"
                  className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[48px] laptop:text-[38px] laptop:leading-[48px]"
                >
                  {headlineStart}
                  <span className="text-[#CAFF33]">{headlineAccent}</span>
                </h2>
                <p
                  data-testid="cta-body"
                  className="mt-3 text-sm leading-relaxed text-[#999999] sm:text-base"
                >
                  {config.body}
                </p>
              </>
            )}
          </div>

          {showSkeleton ? (
            <div
              data-testid="cta-button"
              className="relative z-10 h-12 w-36 animate-pulse rounded-[82px] bg-[#333333] md:h-[52px] md:w-40"
              aria-hidden="true"
            />
          ) : (
            <a
              href={buttonHref}
              data-testid="cta-button"
              className="relative z-10 inline-flex shrink-0 items-center justify-center rounded-[82px] bg-[#CAFF33] px-8 py-3.5 text-sm font-medium text-[#1A1A1A] transition-all hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#CAFF33] focus:ring-offset-2 focus:ring-offset-[#262626] md:px-10 md:py-4"
            >
              {config.buttonLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
