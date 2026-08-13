"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = ["Online Banking", "Financial Tools", "Customer Support"] as const;
type Tab = (typeof TABS)[number];

interface Feature {
  id: number;
  title: string;
  icon: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    id: 1,
    title: "24/7 Account Access",
    icon: "/assets/icons/icon_feature_1.svg",
    description:
      "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    icon: "/assets/icons/icon_feature_2.svg",
    description:
      "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.",
  },
  {
    id: 3,
    title: "Secure Transactions",
    icon: "/assets/icons/icon_feature_3.svg",
    description:
      "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.",
  },
  {
    id: 4,
    title: "Bill Pay and Transfers",
    icon: "/assets/icons/icon_feature_4.svg",
    description:
      "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.",
  },
];

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Online Banking");

  return (
    <section
      data-testid="features-section"
      className="bg-[#1A1A1A] px-4 py-16 md:px-8 lg:px-12 laptop:px-20 desktop:px-[162px]"
    >
      <div className="mb-[50px] lg:pr-[300px]" data-testid="features-header">
        <h2
          data-testid="features-heading"
          className="mb-[14px] font-lexend text-[48px] font-medium leading-[150%] text-[#CAFF33]"
        >
          Our Features
        </h2>
        <p
          data-testid="features-subheading"
          className="text-lg font-light text-[#B3B3B3]"
        >
          Experience a host of powerful features that redefine the way you bank.
          From intuitive account management to seamless transactions, our
          platform offers a range of tools tailored to your financial needs.
        </p>
      </div>

      <div className="flex flex-col gap-[30px] lg:flex-row">
        <nav
          data-testid="features-tabs"
          aria-label="Feature categories"
          className="flex flex-row gap-3 overflow-x-auto lg:w-[308px] lg:flex-shrink-0 lg:flex-col lg:overflow-visible lg:rounded-[20px] lg:bg-[#1C1C1C] lg:p-[50px]"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                data-testid={`features-tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveTab(tab)}
                aria-pressed={isActive}
                className={`rounded-[10px] px-6 py-[18px] text-left text-lg font-normal transition-colors ${
                  isActive
                    ? "bg-[#1A1A1A] text-[#CAFF33]"
                    : "text-white hover:text-[#CAFF33]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        <div
          data-testid="features-cards-grid"
          className="flex flex-1 flex-col gap-[30px]"
        >
          <div className="flex flex-col gap-[30px] sm:flex-row">
            <FeatureCard feature={FEATURES[0]} />
            <FeatureCard feature={FEATURES[1]} />
          </div>
          <div className="flex flex-col gap-[30px] sm:flex-row">
            <FeatureCard feature={FEATURES[2]} />
            <FeatureCard feature={FEATURES[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article
      data-testid={`feature-card-${feature.id}`}
      className="flex flex-1 flex-col gap-[30px] rounded-[20px] bg-[#1C1C1C] p-[50px]"
    >
      <div className="flex items-start gap-[10px]">
        <h3
          data-testid={`feature-card-title-${feature.id}`}
          className="flex-1 text-[22px] font-medium leading-[150%] text-white"
        >
          {feature.title}
        </h3>
        <Image
          src={feature.icon}
          alt=""
          width={34}
          height={34}
          aria-hidden="true"
          data-testid={`feature-card-icon-${feature.id}`}
        />
      </div>
      <p
        data-testid={`feature-card-description-${feature.id}`}
        className="text-lg font-light text-[#B3B3B3]"
      >
        {feature.description}
      </p>
    </article>
  );
}
