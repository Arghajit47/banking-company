"use client";

import { useState } from "react";
import Image from "next/image";
import { useProductsData, getProductIconPath } from "@/lib/products";
import { useMounted } from "@/lib/use-mounted";

const SKELETON_COUNT = 3;

function ProductsSkeleton() {
  return (
    <div
      data-testid="products-grid"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
        <div
          key={idx}
          data-testid={`product-card-skeleton-${idx + 1}`}
          className="flex flex-col rounded-2xl border border-[#262626] bg-[#1E1E1E] p-6 sm:p-8"
          aria-hidden="true"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[98px] w-[98px] shrink-0 animate-pulse rounded-[70px] bg-[#262626]" />
            <div className="h-6 w-36 animate-pulse rounded bg-[#262626]" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-[#262626]" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-[#262626]" />
            <div className="h-3 w-4/6 animate-pulse rounded bg-[#262626]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductsErrorFallback() {
  return (
    <div
      data-testid="products-error-state"
      className="flex h-64 w-full items-center justify-center"
    >
      <p className="text-[#999999]">
        Unable to load products. Please try again later.
      </p>
    </div>
  );
}

export function ProductsSection() {
  const mounted = useMounted();
  const { data, error, isLoading } = useProductsData();
  const [activeTab, setActiveTab] = useState<"individuals" | "businesses">(
    "individuals"
  );

  const showSkeleton = !mounted || isLoading;
  const hasError = !showSkeleton && (error || !data);

  const visibleProducts = data?.products.filter((p) => p.tab === activeTab) ?? [];

  return (
    <section
      data-testid="products-section"
      className="w-full bg-[#1E1E1E] px-4 py-16 font-[var(--font-lexend)] md:px-8 lg:px-12 laptop:px-20 desktop:px-[162px]"
    >
      <div className="mx-auto max-w-[1920px]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[800px]">
            <h2
              data-testid="products-heading"
              className="mb-4 text-[28px] font-medium leading-[150%] text-white md:text-[38px] desktop:text-[48px]"
            >
              Our <span className="text-[#CAFF33]">Products</span>
            </h2>
            <p
              data-testid="products-subheading"
              className="text-sm leading-relaxed text-[#999999] sm:text-base"
            >
              Discover a range of comprehensive and customizable banking products
              at YourBank, designed to suit your unique financial needs and
              aspirations
            </p>
          </div>

          {/* Tabs */}
          <div
            data-testid="products-tabs"
            className="inline-flex rounded-full border border-[#262626] bg-[#1A1A1A] p-[14px]"
          >
            <button
              type="button"
              data-testid="products-tab-individuals"
              onClick={() => setActiveTab("individuals")}
              className={
                activeTab === "individuals"
                  ? "rounded-full bg-[#CAFF33] px-5 py-2 text-sm font-medium text-[#1E1E1E] transition hover:brightness-110"
                  : "rounded-full px-5 py-2 text-sm font-medium text-[#999999] transition hover:text-white"
              }
            >
              For Individuals
            </button>
            <button
              type="button"
              data-testid="products-tab-businesses"
              onClick={() => setActiveTab("businesses")}
              className={
                activeTab === "businesses"
                  ? "rounded-full bg-[#CAFF33] px-5 py-2 text-sm font-medium text-[#1E1E1E] transition hover:brightness-110"
                  : "rounded-full px-5 py-2 text-sm font-medium text-[#999999] transition hover:text-white"
              }
            >
              For Businesses
            </button>
          </div>
        </div>

        {/* Product cards */}
        {showSkeleton ? (
          <ProductsSkeleton />
        ) : hasError ? (
          <ProductsErrorFallback />
        ) : (
          <div
            data-testid="products-grid"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 laptop:grid-cols-3 laptop:gap-0 laptop:overflow-hidden laptop:rounded-2xl laptop:border laptop:border-[#262626]"
          >
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                data-testid={`product-card-${product.id}`}
                className="flex flex-col rounded-2xl border border-[#262626] bg-[#1E1E1E] p-6 transition hover:border-[#333333] sm:p-8 laptop:rounded-none laptop:border-y-0 laptop:border-r-0 laptop:border-l laptop:border-l-[#262626] laptop:px-10 laptop:first:border-l-0 desktop:px-[50px]"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div
                    data-testid={`product-icon-wrapper-${product.id}`}
                    className="flex h-[98px] w-[98px] shrink-0 items-center justify-center rounded-[70px] bg-gradient-to-b from-[rgba(202,255,51,0.05)] to-transparent p-3"
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-[50px] border border-[#CAFF33]/20 bg-gradient-to-b from-[rgba(202,255,51,0.1)] to-transparent">
                      <Image
                        src={getProductIconPath(product.icon)}
                        alt=""
                        width={34}
                        height={34}
                        aria-hidden="true"
                        data-testid={`product-icon-${product.id}`}
                      />
                    </div>
                  </div>
                  <h3
                    data-testid={`product-title-${product.id}`}
                    className="text-lg font-medium text-white sm:text-xl"
                  >
                    {product.title}
                  </h3>
                </div>
                <p
                  data-testid={`product-description-${product.id}`}
                  className="text-sm leading-relaxed text-[#999999]"
                >
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
