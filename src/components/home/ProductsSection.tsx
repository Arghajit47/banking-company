"use client";

import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Checking Accounts",
    description:
      "Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.",
    icon: "/assets/icons/icon_product_1.svg",
  },
  {
    id: 2,
    title: "Savings Accounts",
    description:
      "Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.",
    icon: "/assets/icons/icon_product_2.svg",
  },
  {
    id: 3,
    title: "Loans and Mortgages",
    description:
      "Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.",
    icon: "/assets/icons/icon_product_3.svg",
  },
];

export function ProductsSection() {
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
              className="mb-4 text-2xl font-semibold text-[#CAFF33] sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[50px]"
            >
              Our Products
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
              className="rounded-full bg-[#CAFF33] px-5 py-2 text-sm font-medium text-[#1E1E1E] transition hover:brightness-110"
            >
              For Individuals
            </button>
            <button
              type="button"
              data-testid="products-tab-businesses"
              className="rounded-full px-5 py-2 text-sm font-medium text-[#999999] transition hover:text-white"
            >
              For Businesses
            </button>
          </div>
        </div>

        {/* Product cards */}
        <div
          data-testid="products-grid"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <article
              key={product.id}
              data-testid={`product-card-${product.id}`}
              className="flex flex-col rounded-2xl border border-[#262626] bg-[#1E1E1E] p-6 transition hover:border-[#333333] sm:p-8"
            >
              <div className="mb-6 flex items-center gap-4">
                {/* Icon wrapper: double-ring structure matching Figma node 11:86875 */}
                <div
                  data-testid={`product-icon-wrapper-${product.id}`}
                  className="flex h-[98px] w-[98px] shrink-0 items-center justify-center rounded-[70px] bg-gradient-to-b from-[rgba(202,255,51,0.05)] to-transparent p-3"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[50px] border border-[#CAFF33]/20 bg-gradient-to-b from-[rgba(202,255,51,0.1)] to-transparent">
                    <Image
                      src={product.icon}
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
      </div>
    </section>
  );
}
