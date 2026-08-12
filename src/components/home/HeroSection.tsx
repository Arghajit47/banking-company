"use client";

import Image from "next/image";
import { useHeroData, type HeroResponse, type HeroStats } from "@/lib/hero";
import { useMounted } from "@/lib/use-mounted";

const ROW_OPACITY = ["", "opacity-50", "opacity-20"] as const;
const ROW_HORIZ_PADDING = ["px-0", "px-[17px]", "px-[35px]"] as const;
const ROW_MARGIN_TOP = ["", "-mt-[24px]", "-mt-[24px]"] as const;
const ROW_Z = ["z-[2]", "z-[1]", "z-0"] as const;

function HeroSkeleton() {
  return (
    <>
      {/* Left text column skeleton */}
      <div className="z-10 flex w-full max-w-[826px] flex-col items-center text-center md:items-start md:text-left">
        <div
          data-testid="hero-badge"
          className="mb-6 inline-flex h-11 items-center gap-1.5 rounded-full bg-[#262626] pl-3 pr-5 py-2.5"
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
            className="absolute -top-[43px] left-0 z-20 flex items-center gap-[9px] rounded-[10px] bg-[#22251B] py-[9px] pr-[9px] pl-[21px] shadow-lg md:-left-[61px]"
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
            className="rounded-[10px] bg-[#1A1A1A] p-[35px] pt-[60px] shadow-xl"
            aria-hidden="true"
          >
            <div
              data-testid="hero-transactions-heading"
              className="mb-4 h-5 w-40 animate-pulse rounded bg-[#333333]"
            />
            <div className="isolate flex flex-col">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className={`relative ${ROW_HORIZ_PADDING[index] ?? "px-0"} ${ROW_MARGIN_TOP[index] ?? ""} ${ROW_OPACITY[index] ?? ""} ${ROW_Z[index] ?? "z-0"}`}
                >
                  <div
                    data-testid={`hero-transaction-${index + 1}`}
                    className="flex items-center justify-between rounded-[10px] border border-[#262626] bg-[#1C1C1C] px-[21px] py-[14px]"
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
                </div>
              ))}
            </div>

            <div
              data-testid="hero-exchange-card"
              className="mt-[26px] overflow-hidden rounded-[10px] border border-[#262626]"
            >
              <div
                data-testid="hero-exchange-heading"
                className="mb-3 h-4 w-32 animate-pulse rounded bg-[#333333]"
              />
              <div className="grid grid-cols-2 divide-x divide-[#262626]">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    data-testid={`hero-exchange-${index + 1}`}
                    className="bg-[#1C1C1C]"
                  >
                    <div className="mb-1 flex items-center gap-2 border-b border-[#262626] p-[17px]">
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
            className="mx-auto flex items-center gap-[9px] self-center rounded-[69px] bg-[#22251B] py-[9px] pr-[9px] pl-[21px] shadow-lg"
            aria-hidden="true"
          >
            <div className="h-4 w-32 animate-pulse rounded bg-[#333333]" />
            <div className="flex items-center gap-[7px] rounded-[48px] border border-[#262626] bg-[#1A1A1A] p-[9px]">
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
                className="mb-6 inline-flex h-11 items-center gap-1.5 rounded-full bg-[#262626] pl-3 pr-5 py-2.5"
              >
                <Image
                  src="/assets/icons/icon_hero_badge.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  data-testid="hero-badge-icon"
                />
                <span className="text-[18px] font-light leading-6 text-white">
                  No LLC Required, No Credit Check.
                </span>
              </div>

              {/* Heading */}
              <h1
                data-testid="hero-heading"
                className="mb-6 text-[28px] font-medium leading-[42px] text-white sm:text-[34px] sm:leading-[51px] md:text-[40px] md:leading-[60px] lg:text-[44px] lg:leading-[66px] desktop:text-[48px] desktop:leading-[72px]"
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
                className="mb-8 max-w-[600px] font-light text-[14px] leading-[150%] text-[#E4E4E7] sm:text-[16px] md:text-[18px]"
              >
                {hero.subtext}
              </p>

              {/* CTA */}
              <button
                type="button"
                data-testid="hero-open-account"
                className="rounded-[82px] bg-[#CAFF33] px-[30px] py-[18px] text-[18px] font-normal leading-[150%] text-[#1C1C1C] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
              >
                {hero.ctaLabel}
              </button>
            </div>

            {/* Lime arrows illustration — far-right of hero, placed before mockup so mockup (z-10) paints on top */}
            <Image
              src="/assets/illustrations/abstract_design_hero_illustration.svg"
              alt=""
              width={418}
              height={383}
              aria-hidden="true"
              data-testid="hero-abstract-illustration"
              className="pointer-events-none absolute right-0 top-16 hidden w-[280px] [mix-blend-mode:screen] md:block lg:w-[340px] xl:w-[418px]"
            />

            {/* Right mockup column */}
            <div
              data-testid="hero-mockup"
              className="relative z-10 mt-12 w-full max-w-[700px] md:mt-0 lg:max-w-[780px]"
            >
              <div className="relative flex flex-col gap-4">
                {/* Monthly Income floating badge */}
                <div
                  data-testid="hero-monthly-income"
                  className="absolute -top-[43px] left-0 z-20 flex items-center gap-[9px] rounded-[10px] bg-[#22251B] py-[9px] pr-[9px] pl-[21px] shadow-lg md:-left-[61px]"
                >
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#CAFF33] p-[9px]">
                    <Image
                      src={stats?.monthlyIncome.icon ?? "/assets/icons/icon_stat_1.svg"}
                      alt=""
                      width={21}
                      height={21}
                      aria-hidden="true"
                      data-testid="hero-monthly-income-icon"
                    />
                  </div>
                  <div className="flex flex-col gap-[1px] text-left">
                    <p className="text-[17px] font-normal leading-[150%] text-white">
                      {stats?.monthlyIncome.value ?? ""}
                    </p>
                    <p className="text-[14px] font-light leading-[150%] text-[#E4E4E7]">
                      {stats?.monthlyIncome.label ?? ""}
                    </p>
                  </div>
                </div>

                {/* Your Transactions card */}
                <div
                  data-testid="hero-transactions-card"
                  className="rounded-[10px] bg-[#1A1A1A] p-[35px] pt-[60px] shadow-xl"
                >
                  <h3
                    data-testid="hero-transactions-heading"
                    className="mb-[17px] text-[17px] font-medium leading-[150%] text-white"
                  >
                    Your Transactions
                  </h3>
                  <div className="isolate flex flex-col">
                    {stats?.transactions.map((tx, idx) => (
                      <div
                        key={tx.id}
                        className={`relative ${ROW_HORIZ_PADDING[idx] ?? "px-0"} ${ROW_MARGIN_TOP[idx] ?? ""} ${ROW_OPACITY[idx] ?? ""} ${ROW_Z[idx] ?? "z-0"}`}
                      >
                        <div
                          data-testid={`hero-transaction-${tx.id}`}
                          className="flex items-end justify-between rounded-[10px] border border-[#262626] bg-[#1C1C1C] px-[21px] py-[14px]"
                        >
                          <div className="flex items-center gap-[9px]">
                            <Image
                              src="/assets/icons/icon_transaction.svg"
                              alt=""
                              width={38}
                              height={38}
                              aria-hidden="true"
                              data-testid={`hero-transaction-icon-${tx.id}`}
                            />
                            <div className="text-left">
                              <p
                                data-testid={`hero-transaction-label-${tx.id}`}
                                className="text-[15.6px] font-light leading-[150%] text-white"
                              >
                                Transaction
                              </p>
                              <p
                                data-testid={`hero-transaction-name-${tx.id}`}
                                className="text-[17.34px] font-normal leading-[150%] text-white"
                              >
                                {tx.name}
                              </p>
                            </div>
                          </div>
                          <p
                            data-testid={`hero-transaction-amount-${tx.id}`}
                            className="text-[20.81px] font-medium leading-[150%] text-white"
                          >
                            {tx.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Money Exchange nested card */}
                  <div
                    data-testid="hero-exchange-card"
                    className="mt-[26px] overflow-hidden rounded-[10px] border border-[#262626]"
                  >
                    <h4
                      data-testid="hero-exchange-heading"
                      className="px-[17px] pt-[17px] pb-[9px] text-[17px] font-medium leading-[150%] text-white"
                    >
                      Money Exchange
                    </h4>
                    <div className="grid grid-cols-2 divide-x divide-[#262626]">
                      {stats?.exchangeRates.map((currency) => (
                        <div key={currency.id} data-testid={`hero-exchange-${currency.code}`} className="bg-[#1C1C1C]">
                          <div className="flex items-center gap-[9px] border-b border-[#262626] p-[17px]">
                            <Image
                              src={currency.icon}
                              alt=""
                              width={34}
                              height={34}
                              aria-hidden="true"
                              data-testid={`hero-exchange-icon-${currency.code}`}
                            />
                            <div>
                              <p data-testid={`hero-exchange-code-${currency.code}`} className="text-[16px] font-normal leading-[150%] text-white">{currency.code}</p>
                              <p data-testid={`hero-exchange-name-${currency.code}`} className="text-[14px] font-light leading-[150%] text-[#E4E4E7]">{currency.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center px-[17px] py-[26px]">
                            <p data-testid={`hero-exchange-value-${currency.code}`} className="text-[17px] font-medium leading-[150%] text-white">{currency.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      data-testid="hero-exchange-button"
                      className="w-full rounded-b-[10px] border-t border-[#262626] bg-[#22251B] px-[26px] py-[14px] text-[16px] font-normal leading-[150%] text-[#D1FF4D] transition hover:bg-[#2a2e22]"
                    >
                      Exchange
                    </button>
                  </div>
                </div>

                {/* Supported Currency pill */}
                <div
                  data-testid="hero-supported-currency"
                  className="mx-auto flex items-center gap-[9px] self-center rounded-[69px] bg-[#22251B] py-[9px] pr-[9px] pl-[21px] shadow-lg"
                >
                  <span
                    data-testid="hero-supported-currency-text"
                    className="text-[16px] font-normal leading-[150%] text-white"
                  >
                    Supported Currency
                  </span>
                  <div className="flex items-center gap-[7px] rounded-[48px] border border-[#262626] bg-[#1A1A1A] p-[9px]">
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
