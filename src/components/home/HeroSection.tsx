"use client";

import Image from "next/image";
import { useHeroData, type HeroResponse, type HeroStats } from "@/lib/hero";
import { useMounted } from "@/lib/use-mounted";

function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div
      data-testid="transaction-avatar"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CAFF33] text-xs font-semibold text-[#1E1E1E]"
    >
      {initials}
    </div>
  );
}

function HeroSkeleton() {
  return (
    <>
      {/* Left text column skeleton */}
      <div className="z-10 flex w-full max-w-[826px] flex-col items-center text-center md:items-start md:text-left">
        <div
          data-testid="hero-badge"
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#262626] bg-[#1E1E1E] px-4 py-2.5"
        >
          <div
            data-testid="hero-badge-icon"
            className="h-6 w-6 animate-pulse rounded-full bg-[#333333]"
            aria-hidden="true"
          />
          <div className="h-4 w-48 animate-pulse rounded bg-[#333333]" aria-hidden="true" />
        </div>

        <div data-testid="hero-heading" className="mb-6 w-full" aria-hidden="true">
          <div className="mb-2 h-9 w-3/4 animate-pulse rounded bg-[#333333] sm:h-11 md:h-[48px] lg:h-[58px] desktop:h-[68px]" />
          <div className="mb-2 h-9 w-2/3 animate-pulse rounded bg-[#333333] sm:h-11 md:h-[48px] lg:h-[58px] desktop:h-[68px]" />
          <div className="h-9 w-1/2 animate-pulse rounded bg-[#333333] sm:h-11 md:h-[48px] lg:h-[58px] desktop:h-[68px]" />
        </div>

        <div
          data-testid="hero-paragraph"
          className="mb-8 h-16 w-full max-w-[600px] animate-pulse rounded bg-[#333333]"
          aria-hidden="true"
        />

        <div
          data-testid="hero-open-account"
          className="h-12 w-40 animate-pulse rounded-[82px] bg-[#333333]"
          aria-hidden="true"
        />
      </div>

      {/* Right mockup column skeleton */}
      <div
        data-testid="hero-mockup"
        className="relative z-10 mt-12 w-full max-w-[700px] md:mt-0 lg:max-w-[780px]"
      >
        <div className="relative flex flex-col gap-4">
          <div
            data-testid="hero-monthly-income"
            className="absolute -top-6 left-4 z-20 flex items-center gap-3 rounded-xl bg-[#1E1E1E] px-4 py-3 shadow-lg md:left-0"
            aria-hidden="true"
          >
            <div className="h-8 w-8 animate-pulse rounded-full bg-[#333333]" />
            <div className="space-y-1">
              <div className="h-4 w-24 animate-pulse rounded bg-[#333333]" />
              <div className="h-3 w-20 animate-pulse rounded bg-[#333333]" />
            </div>
          </div>

          <div
            data-testid="hero-transactions-card"
            className="rounded-2xl border border-[#262626] bg-[#1E1E1E] p-5 pt-14 shadow-xl sm:p-6 sm:pt-16"
            aria-hidden="true"
          >
            <div
              data-testid="hero-transactions-heading"
              className="mb-4 h-5 w-40 animate-pulse rounded bg-[#333333]"
            />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  data-testid={`hero-transaction-${index + 1}`}
                  className="flex items-center justify-between rounded-xl bg-[#262626]/50 px-3 py-2.5 sm:px-4 sm:py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-[#333333]" />
                    <div className="space-y-1">
                      <div className="h-3 w-20 animate-pulse rounded bg-[#333333]" />
                      <div className="h-4 w-24 animate-pulse rounded bg-[#333333]" />
                    </div>
                  </div>
                  <div className="h-4 w-12 animate-pulse rounded bg-[#333333]" />
                </div>
              ))}
            </div>

            <div
              data-testid="hero-exchange-card"
              className="mt-4 rounded-xl border border-[#262626] bg-[#1A1A1A] p-4"
            >
              <div
                data-testid="hero-exchange-heading"
                className="mb-3 h-4 w-32 animate-pulse rounded bg-[#333333]"
              />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    data-testid={`hero-exchange-${index + 1}`}
                    className="rounded-lg bg-[#262626]/40 p-3"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <div className="h-[34px] w-[34px] animate-pulse rounded-full bg-[#333333]" />
                      <div className="h-4 w-10 animate-pulse rounded bg-[#333333]" />
                    </div>
                    <div className="mb-2 h-3 w-24 animate-pulse rounded bg-[#333333]" />
                    <div className="h-5 w-16 animate-pulse rounded bg-[#333333]" />
                  </div>
                ))}
              </div>
              <div
                data-testid="hero-exchange-button"
                className="mt-3 h-10 w-full animate-pulse rounded-full bg-[#333333]"
              />
            </div>
          </div>

          <div
            data-testid="hero-supported-currency"
            className="mx-auto flex items-center gap-3 self-center rounded-full border border-[#262626] bg-[#1E1E1E] px-4 py-2.5 shadow-lg"
            aria-hidden="true"
          >
            <div className="h-4 w-32 animate-pulse rounded bg-[#333333]" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  data-testid={`hero-supported-currency-icon-${index + 1}`}
                  className="h-[34px] w-[34px] animate-pulse rounded-full bg-[#333333]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HeroErrorFallback() {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <p data-testid="hero-error-state" className="text-[#999999]">
        Unable to load hero content. Please try again later.
      </p>
    </div>
  );
}

export function HeroSection() {
  const mounted = useMounted();
  const { data, error, isLoading } = useHeroData();

  const showSkeleton = !mounted || isLoading;
  const hasError = !showSkeleton && (error || !data);

  if (hasError) {
    return (
      <section
        data-testid="hero-section"
        className="relative w-full overflow-hidden bg-[#1A1A1A] font-[var(--font-lexend)]"
      >
        <div className="relative mx-auto flex min-h-[824px] max-w-[1920px] flex-col items-center justify-center px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12 laptop:px-20 desktop:px-[162px]">
          <HeroErrorFallback />
        </div>
      </section>
    );
  }

  const hero: HeroResponse = data as HeroResponse;
  const stats: HeroStats | undefined = hero?.stats;

  return (
    <section
      data-testid="hero-section"
      className="relative w-full overflow-hidden bg-[#1A1A1A] font-[var(--font-lexend)]"
    >
      <div className="relative mx-auto flex min-h-[824px] max-w-[1920px] flex-col items-center justify-center px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12 laptop:px-20 desktop:px-[162px]">
        {showSkeleton ? (
          <HeroSkeleton />
        ) : (
          <>
            {/* Left text column */}
            <div className="z-10 flex w-full max-w-[826px] flex-col items-center text-center md:items-start md:text-left">
              {/* Trust badge */}
              <div
                data-testid="hero-badge"
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#262626] bg-[#1E1E1E] px-4 py-2.5"
              >
                <Image
                  src="/assets/icons/icon_hero_badge.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  data-testid="hero-badge-icon"
                />
                <span className="text-sm text-white sm:text-base">
                  No LLC Required, No Credit Check.
                </span>
              </div>

              {/* Heading */}
              <h1
                data-testid="hero-heading"
                className="mb-6 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[48px] md:leading-[58px] lg:text-[58px] lg:leading-[68px] desktop:text-[68px] desktop:leading-[78px]"
              >
                <span className="block" data-testid="hero-line-welcome">
                  {hero.headline}
                </span>
                <span className="block" data-testid="hero-line-empowering">
                  Empowering Your{" "}
                  <span className="text-[#CAFF33]">Financial</span>
                </span>
                <span
                  className="block text-[#CAFF33]"
                  data-testid="hero-line-journey"
                >
                  Journey
                </span>
              </h1>

              {/* Subtext */}
              <p
                data-testid="hero-paragraph"
                className="mb-8 max-w-[600px] text-sm leading-relaxed text-[#999999] sm:text-base md:text-lg"
              >
                {hero.subtext}
              </p>

              {/* CTA */}
              <button
                type="button"
                data-testid="hero-open-account"
                className="rounded-[82px] bg-[#CAFF33] px-8 py-4 text-base font-semibold text-[#1E1E1E] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
              >
                {hero.ctaLabel}
              </button>
            </div>

            {/* Right mockup column */}
            <div
              data-testid="hero-mockup"
              className="relative z-10 mt-12 w-full max-w-[700px] md:mt-0 lg:max-w-[780px]"
            >
              {/* Decorative abstract illustration behind cards */}
              <Image
                src="/assets/illustrations/abstract_design_hero_illustration.svg"
                alt=""
                width={418}
                height={383}
                aria-hidden="true"
                data-testid="hero-abstract-illustration"
                className="pointer-events-none absolute -left-8 top-16 w-64 opacity-60 [mix-blend-mode:screen] sm:w-80 md:w-96"
              />

              <div className="relative flex flex-col gap-4">
                {/* Monthly Income floating badge */}
                <div
                  data-testid="hero-monthly-income"
                  className="absolute -top-6 left-4 z-20 flex items-center gap-3 rounded-xl bg-[#1E1E1E] px-4 py-3 shadow-lg md:left-0"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CAFF33]">
                    <Image
                      src={stats?.monthlyIncome.icon ?? "/assets/icons/icon_stat_1.svg"}
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden="true"
                      data-testid="hero-monthly-income-icon"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      {stats?.monthlyIncome.value ?? ""}
                    </p>
                    <p className="text-xs text-[#999999]">
                      {stats?.monthlyIncome.label ?? ""}
                    </p>
                  </div>
                </div>

                {/* Your Transactions card */}
                <div
                  data-testid="hero-transactions-card"
                  className="rounded-2xl border border-[#262626] bg-[#1E1E1E] p-5 pt-14 shadow-xl sm:p-6 sm:pt-16"
                >
                  <h3
                    data-testid="hero-transactions-heading"
                    className="mb-4 text-base font-medium text-white sm:text-lg"
                  >
                    Your Transactions
                  </h3>
                  <div className="flex flex-col gap-3">
                    {stats?.transactions.map((tx) => (
                      <div
                        key={tx.id}
                        data-testid={`hero-transaction-${tx.id}`}
                        className="flex items-center justify-between rounded-xl bg-[#262626]/50 px-3 py-2.5 sm:px-4 sm:py-3"
                      >
                        <div className="flex items-center gap-3">
                          <AvatarPlaceholder
                            initials={tx.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          />
                          <div className="text-left">
                            <p
                              data-testid={`hero-transaction-label-${tx.id}`}
                              className="text-xs text-[#999999]"
                            >
                              Transaction
                            </p>
                            <p
                              data-testid={`hero-transaction-name-${tx.id}`}
                              className="text-sm font-medium text-white"
                            >
                              {tx.name}
                            </p>
                          </div>
                        </div>
                        <p
                          data-testid={`hero-transaction-amount-${tx.id}`}
                          className="text-sm font-medium text-white"
                        >
                          {tx.amount}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Money Exchange nested card */}
                  <div
                    data-testid="hero-exchange-card"
                    className="mt-4 rounded-xl border border-[#262626] bg-[#1A1A1A] p-4"
                  >
                    <h4
                      data-testid="hero-exchange-heading"
                      className="mb-3 text-sm font-medium text-white"
                    >
                      Money Exchange
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {stats?.exchangeRates.map((currency) => (
                        <div
                          key={currency.id}
                          data-testid={`hero-exchange-${currency.code}`}
                          className="rounded-lg bg-[#262626]/40 p-3"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <Image
                              src={currency.icon}
                              alt=""
                              width={34}
                              height={34}
                              aria-hidden="true"
                              data-testid={`hero-exchange-icon-${currency.code}`}
                            />
                            <span
                              data-testid={`hero-exchange-code-${currency.code}`}
                              className="text-sm font-medium text-white"
                            >
                              {currency.code}
                            </span>
                          </div>
                          <p
                            data-testid={`hero-exchange-name-${currency.code}`}
                            className="mb-2 text-xs text-[#999999]"
                          >
                            {currency.name}
                          </p>
                          <p
                            data-testid={`hero-exchange-value-${currency.code}`}
                            className="text-base font-semibold text-white"
                          >
                            {currency.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      data-testid="hero-exchange-button"
                      className="mt-3 w-full rounded-full bg-[#262626] py-2.5 text-sm font-medium text-[#CAFF33] transition hover:bg-[#333333]"
                    >
                      Exchange
                    </button>
                  </div>
                </div>

                {/* Supported Currency pill */}
                <div
                  data-testid="hero-supported-currency"
                  className="mx-auto flex items-center gap-3 self-center rounded-full border border-[#262626] bg-[#1E1E1E] px-4 py-2.5 shadow-lg"
                >
                  <span
                    data-testid="hero-supported-currency-text"
                    className="text-sm text-white"
                  >
                    Supported Currency
                  </span>
                  <div className="flex items-center gap-1">
                    {stats?.currencies.map((currency, idx) => (
                      <Image
                        key={idx}
                        src={currency.icon}
                        alt=""
                        width={34}
                        height={34}
                        aria-hidden="true"
                        data-testid={`hero-supported-currency-icon-${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Far-right background arrows */}
            <Image
              src="/assets/illustrations/abstract_design_background_group.svg"
              alt=""
              width={660}
              height={499}
              aria-hidden="true"
              data-testid="hero-background-arrows"
              className="pointer-events-none absolute -right-24 bottom-0 hidden w-[420px] opacity-80 [mix-blend-mode:color-dodge] md:block lg:w-[540px] desktop:w-[660px]"
            />
          </>
        )}
      </div>
    </section>
  );
}
