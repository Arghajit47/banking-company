import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { HeroSection } from "./HeroSection";
import type { HeroResponse } from "@/lib/hero";

expect.extend(matchers);

const apiHeroData: HeroResponse = {
  headline: "Welcome to YourBank",
  subtext:
    "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.",
  ctaLabel: "Open Account",
  stats: {
    transactions: [
      { id: 1, name: "Joel Kenley", amount: "-$68.00" },
      { id: 2, name: "Mark Smith", amount: "-$68.00" },
      { id: 3, name: "Lenen Roy", amount: "-$68.00" },
    ],
    exchangeRates: [
      {
        id: 1,
        code: "INR",
        name: "Indian Rupees",
        value: "5,0000",
        icon: "/assets/icons/icon_feature_1.svg",
      },
      {
        id: 2,
        code: "USD",
        name: "United States Dollar",
        value: "12.00",
        icon: "/assets/icons/icon_feature_2.svg",
      },
    ],
    currencies: [
      { icon: "/assets/icons/icon_feature_1.svg" },
      { icon: "/assets/icons/icon_feature_2.svg" },
      { icon: "/assets/icons/icon_feature_3.svg" },
      { icon: "/assets/icons/icon_feature_4.svg" },
    ],
    monthlyIncome: {
      icon: "/assets/icons/icon_stat_1.svg",
      value: "+$5000,00",
      label: "Monthly Income",
    },
  },
};

type HeroHookState = {
  data: HeroResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: HeroHookState = {
  data: apiHeroData,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let heroMock: HeroHookState = { ...baseMock };
let mountedMock = true;

vi.mock("@/lib/hero", () => ({
  useHeroData: () => heroMock,
}));

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => mountedMock,
}));

afterEach(() => {
  cleanup();
  heroMock = { ...baseMock };
  mountedMock = true;
});

describe("HeroSection", () => {
  it("renders loading skeleton when data is loading", () => {
    heroMock = { ...baseMock, data: undefined, isLoading: true };
    render(<HeroSection />);

    expect(screen.getByTestId("hero-heading")).toBeInTheDocument();
    expect(screen.getByTestId("hero-paragraph")).toBeInTheDocument();
    expect(screen.getByTestId("hero-open-account")).toBeInTheDocument();
    expect(screen.getByTestId("hero-transactions-card")).toBeInTheDocument();
    expect(screen.getByTestId("hero-exchange-card")).toBeInTheDocument();
    expect(screen.getByTestId("hero-supported-currency")).toBeInTheDocument();
  });

  it("renders loading skeleton during hydration guard when unmounted", () => {
    mountedMock = false;
    render(<HeroSection />);

    expect(screen.getByTestId("hero-heading")).toBeInTheDocument();
    expect(screen.getByTestId("hero-open-account")).toBeInTheDocument();
    expect(screen.getByTestId("hero-mockup")).toBeInTheDocument();
  });

  it("renders heading from API data", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-line-welcome")).toHaveTextContent(
      "Welcome to YourBank",
    );
    expect(screen.getByTestId("hero-line-empowering")).toHaveTextContent(
      "Empowering Your",
    );
    expect(screen.getByTestId("hero-line-journey")).toHaveTextContent("Journey");
  });

  it("renders subtext and CTA from API data", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-paragraph")).toHaveTextContent(
      "At YourBank, our mission is to provide comprehensive banking solutions",
    );
    expect(screen.getByTestId("hero-open-account")).toHaveTextContent(
      "Open Account",
    );
  });

  it("renders transactions from API data", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-transactions-card")).toBeInTheDocument();
    expect(screen.getByTestId("hero-transactions-heading")).toHaveTextContent(
      "Your Transactions",
    );

    apiHeroData.stats.transactions.forEach((tx) => {
      expect(
        screen.getByTestId(`hero-transaction-${tx.id}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`hero-transaction-name-${tx.id}`),
      ).toHaveTextContent(tx.name);
      expect(
        screen.getByTestId(`hero-transaction-amount-${tx.id}`),
      ).toHaveTextContent(tx.amount);
    });
  });

  it("renders exchange rates from API data", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-exchange-card")).toBeInTheDocument();
    expect(screen.getByTestId("hero-exchange-heading")).toHaveTextContent(
      "Money Exchange",
    );

    apiHeroData.stats.exchangeRates.forEach((currency) => {
      expect(
        screen.getByTestId(`hero-exchange-${currency.code}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`hero-exchange-code-${currency.code}`),
      ).toHaveTextContent(currency.code);
      expect(
        screen.getByTestId(`hero-exchange-name-${currency.code}`),
      ).toHaveTextContent(currency.name);
      expect(
        screen.getByTestId(`hero-exchange-value-${currency.code}`),
      ).toHaveTextContent(currency.value);
    });

    expect(screen.getByTestId("hero-exchange-button")).toHaveTextContent(
      "Exchange",
    );
  });

  it("renders supported currencies from API data", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-supported-currency")).toBeInTheDocument();
    expect(
      screen.getByTestId("hero-supported-currency-text"),
    ).toHaveTextContent("Supported Currency");

    apiHeroData.stats.currencies.forEach((_, idx) => {
      expect(
        screen.getByTestId(`hero-supported-currency-icon-${idx + 1}`),
      ).toBeInTheDocument();
    });
  });

  it("renders monthly income from API data", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-monthly-income")).toBeInTheDocument();
    expect(screen.getByText("+$5000,00")).toBeInTheDocument();
    expect(screen.getByText("Monthly Income")).toBeInTheDocument();
  });

  it("renders error fallback when API request fails", () => {
    heroMock = { ...baseMock, data: undefined, error: new Error("Network error") };
    render(<HeroSection />);

    expect(screen.getByTestId("hero-error-state")).toBeInTheDocument();
    expect(screen.getByTestId("hero-error-state")).toHaveTextContent(
      "Unable to load hero content",
    );
  });

  it("renders error fallback when data is missing", () => {
    heroMock = { ...baseMock, data: undefined };
    render(<HeroSection />);

    expect(screen.getByTestId("hero-error-state")).toBeInTheDocument();
  });

  it("keeps trust badge and decorative images unchanged", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-badge")).toHaveTextContent(
      "No LLC Required, No Credit Check.",
    );
    expect(screen.getByTestId("hero-abstract-illustration")).toBeInTheDocument();
    expect(screen.getByTestId("hero-background-arrows")).toBeInTheDocument();
  });
});
