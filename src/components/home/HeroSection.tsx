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
      <div className="relative z-10 flex w-full max-w-[826px] laptop:max-w-[650px] desktop:max-w-[825.98px] flex-col items-center text-center md:items-start md:text-left">
        <div
          data-testid="hero-badge"
          className="mb-6 inline-flex h-11 items-center gap-1.5 rounded-[61px] bg-[#262626] pl-3 pr-5 py-2.5"
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
        className="relative z-10 mt-12 w-full max-w-[700px] md:mt-0 lg:max-w-[780px] laptop:max-w-[410px] desktop:max-w-[515px]"
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
        className="relative w-full overflow-hidden bg-[#1A1A1A] font-[var(--font-urbanist)]"
      >
        <div className="relative mx-auto flex min-h-[824px] max-w-[1920px] flex-col items-center justify-center px-4 py-16 md:flex-row md:items-center md:justify-start md:px-8 lg:px-12 laptop:min-h-[621px] laptop:px-20 desktop:px-[80.53px]">
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
      className="relative w-full overflow-hidden bg-[#1A1A1A] font-[var(--font-urbanist)]"
    >
      <div className="relative mx-auto flex min-h-[824px] max-w-[1920px] flex-col items-center justify-center px-4 py-16 md:flex-row md:items-center md:justify-start md:px-8 lg:px-12 laptop:min-h-[621px] laptop:px-20 desktop:px-[80.53px]">
        {showSkeleton ? (
          <HeroSkeleton />
        ) : (
          <>
            {/* Left text column */}
            <div className="relative z-10 flex w-full max-w-[826px] laptop:max-w-[650px] desktop:max-w-[825.98px] flex-col items-center text-center md:items-start md:text-left">
              {/* Trust badge */}
              <div
                data-testid="hero-badge"
                className="mb-6 inline-flex h-11 items-center gap-1.5 rounded-[61px] bg-[#262626] pl-3 pr-5 py-2.5"
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
                className="mb-6 w-full text-[28px] font-medium leading-[150%] text-white md:text-[38px] desktop:text-[48px]"
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
                className="rounded-[82px] bg-[#CAFF33] px-[30px] py-[18px] text-[18px] font-semibold leading-[150%] text-[#1C1C1C] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] laptop:text-[14px]"
              >
                {hero.ctaLabel}
              </button>
            </div>

            {/* Lime arrows illustration — far-right of hero, placed before mockup so mockup (z-10) paints on top.
                At 1920 (desktop) Figma node 5:86805 sits at page (1421.5, 298): flush with the
                Money Exchange card's right edge, 80.55px from the viewport right edge.
                Chain (children of hero frame 5:86791): 80.53 padding + 825.98 text column
                = 906.51 card left, + 515.02 card = 1421.53 arrows left (zero gap),
                + 417.95 arrows = 1839.48, and 1920 - 1839.48 = 80.52. */}
            <Image
              src="/assets/illustrations/abstract_design_hero_arrows.svg"
              alt=""
              width={300}
              height={275}
              aria-hidden="true"
              data-testid="hero-abstract-illustration"
              className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[200px] laptop:w-[300px] md:block desktop:right-[80.55px] desktop:top-[100px] desktop:h-[382.73px] desktop:w-[417.95px]"
            />

            {/* Right mockup column */}
            <div
              data-testid="hero-mockup"
              className="relative z-10 mt-12 w-full max-w-[700px] md:mt-0 lg:max-w-[780px] laptop:max-w-[410px] desktop:max-w-[515px]"
            >
              <div className="relative flex flex-col gap-4">
                {/* Monthly Income floating badge — Figma 5:86738 is layoutPositioning ABSOLUTE at
                    card-relative (-60.69, -43.35); overhanging the card's top-left corner is the
                    intended design, not a bug. 188.5x75.61, padding 13.87/17.34, radius 10.40. */}
                <div
                  data-testid="hero-monthly-income"
                  className="absolute -top-[43px] left-0 z-20 flex items-center gap-[9px] rounded-[10px] bg-[#22251B] py-[9px] pr-[9px] pl-[21px] shadow-lg md:-left-[61px] desktop:-top-[43.35px] desktop:-left-[60.69px] desktop:gap-[8.67px] desktop:rounded-[10.4px] desktop:px-[17.34px] desktop:py-[13.87px]"
                >
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#CAFF33] p-[9px] desktop:h-[38.34px] desktop:w-[38.34px] desktop:p-[8.67px]">
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
                            {/* Raster flags (Figma 5:83402 / 5:83409 are ELLIPSE nodes with an
                                IMAGE fill, scaleMode FILL) — circular-cropped 34.68px discs. */}
                            <Image
                              src={currency.icon}
                              alt=""
                              width={34}
                              height={34}
                              aria-hidden="true"
                              data-testid={`hero-exchange-icon-${currency.code}`}
                              className="h-[34px] w-[34px] shrink-0 rounded-full object-cover desktop:h-[34.68px] desktop:w-[34.68px]"
                            />
                            <div>
                              <p data-testid={`hero-exchange-code-${currency.code}`} className="text-[16px] font-normal leading-[150%] text-white">{currency.code}</p>
                              <p data-testid={`hero-exchange-name-${currency.code}`} className="text-[14px] font-light leading-[150%] text-[#E4E4E7]">{currency.name}</p>
                            </div>
                          </div>
                          {/* Amount cell (Figma 5:83430 / 5:83432): the text child is FILL width
                              with textAlignHorizontal LEFT, so the cell's primaryAxisAlign CENTER is
                              a no-op. The amount starts at the same left x as the flag/label row
                              above it — 17.34px in from the half-column edge. */}
                          <div className="flex items-center justify-start px-[17px] py-[26px]">
                            <p data-testid={`hero-exchange-value-${currency.code}`} className="w-full text-left text-[17px] font-medium leading-[150%] text-white">{currency.value}</p>
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

                {/* Supported Currency pill — Figma 5:86745 is layoutPositioning ABSOLUTE at
                    card-relative (196.82, 637.01), i.e. it deliberately overhangs the card's bottom
                    and right edges. 370.22x69.36, SPACE_BETWEEN, radius 69.36. */}
                <div
                  data-testid="hero-supported-currency"
                  className="mx-auto flex items-center gap-[9px] self-center rounded-[69px] bg-[#22251B] py-[9px] pr-[9px] pl-[21px] shadow-lg desktop:absolute desktop:left-[196.82px] desktop:top-[637.01px] desktop:mx-0 desktop:h-[69.36px] desktop:w-[370.22px] desktop:justify-between desktop:gap-[8.67px] desktop:self-auto desktop:rounded-[69.36px] desktop:py-[8.67px] desktop:pr-[8.67px] desktop:pl-[20.81px]"
                >
                  <span
                    data-testid="hero-supported-currency-text"
                    className="text-[16px] font-normal leading-[150%] text-white desktop:whitespace-nowrap"
                  >
                    Supported Currency
                  </span>
                  <div className="flex items-center gap-[7px] rounded-[48px] border border-[#262626] bg-[#1A1A1A] p-[9px] desktop:gap-[6.94px] desktop:rounded-[47.69px] desktop:p-[8.67px]">
                    {stats?.currencies.map((currency, idx) => (
                      <Image
                        key={idx}
                        src={currency.icon}
                        alt=""
                        width={34}
                        height={34}
                        aria-hidden="true"
                        data-testid={`hero-supported-currency-icon-${idx + 1}`}
                        className="h-[34px] w-[34px] shrink-0 desktop:h-[34.68px] desktop:w-[34.68px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* NOTE: no second arrows element. A depth-14 walk of hero frame 5:86791 returns only
                four children (text column, Money Exchange card, arrows 5:86805, dot mesh 71:1910),
                so the former `hero-background-arrows` was a duplicate of `hero-abstract-illustration`
                (5:86805) with no Figma node behind it and has been removed. */}
          </>
        )}
      </div>
    </section>
  );
}
