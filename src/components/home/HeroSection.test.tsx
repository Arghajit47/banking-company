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
        icon: "/assets/hero/flag-inr.png",
      },
      {
        id: 2,
        code: "USD",
        name: "United States Dollar",
        value: "12.00",
        icon: "/assets/hero/flag-usd.png",
      },
    ],
    currencies: [
      { icon: "/assets/hero/currency-dollar.svg" },
      { icon: "/assets/hero/currency-euro.svg" },
      { icon: "/assets/hero/currency-bitcoin.svg" },
      { icon: "/assets/hero/currency-ethereum.svg" },
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

  it("keeps trust badge and renders exactly one arrows illustration", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("hero-badge")).toHaveTextContent(
      "No LLC Required, No Credit Check.",
    );

    // Figma 5:86805 is the only arrows node inside hero frame 5:86791.
    const arrows = screen.getAllByTestId("hero-abstract-illustration");
    expect(arrows).toHaveLength(1);
    expect(arrows[0].getAttribute("src")).toContain(
      "abstract_design_hero_arrows.svg",
    );

    // The duplicate background arrows element had no Figma node and was removed.
    expect(screen.queryByTestId("hero-background-arrows")).toBeNull();
  });

  it("positions the arrows illustration at the 1920 Figma coordinates", () => {
    render(<HeroSection />);
    const arrows = screen.getByTestId("hero-abstract-illustration");

    // Page (1421.5, 298): 80.55px from the 1920 right edge, 100px below the hero top.
    expect(arrows.className).toContain("desktop:right-[80.55px]");
    expect(arrows.className).toContain("desktop:top-[100px]");
    expect(arrows.className).toContain("desktop:w-[417.95px]");
    expect(arrows.className).toContain("desktop:h-[382.73px]");
  });

  it("renders the money exchange amounts left-aligned", () => {
    render(<HeroSection />);

    apiHeroData.stats.exchangeRates.forEach((currency) => {
      const amount = screen.getByTestId(`hero-exchange-value-${currency.code}`);
      // Figma 5:83431 / 5:83433 are FILL width with textAlignHorizontal LEFT,
      // which makes the cell's primaryAxisAlign CENTER a no-op.
      expect(amount.className).toContain("text-left");
      expect(amount.className).toContain("w-full");
      expect(amount.parentElement?.className).toContain("justify-start");
      expect(amount.parentElement?.className).not.toContain("justify-center");
    });
  });

  it("renders the exchange flags as circular raster images", () => {
    render(<HeroSection />);

    const inr = screen.getByTestId("hero-exchange-icon-INR");
    const usd = screen.getByTestId("hero-exchange-icon-USD");
    expect(inr.getAttribute("src")).toContain("flag-inr.png");
    expect(usd.getAttribute("src")).toContain("flag-usd.png");
    [inr, usd].forEach((flag) => {
      expect(flag.className).toContain("rounded-full");
      expect(flag.className).toContain("object-cover");
    });
  });

  it("renders the four real currency glyphs in the supported currency pill", () => {
    render(<HeroSection />);

    [
      "currency-dollar",
      "currency-euro",
      "currency-bitcoin",
      "currency-ethereum",
    ].forEach((name, idx) => {
      expect(
        screen
          .getByTestId(`hero-supported-currency-icon-${idx + 1}`)
          .getAttribute("src"),
      ).toContain(`${name}.svg`);
    });
  });

  it("keeps the absolutely positioned figma containers overhanging the card at 1920", () => {
    render(<HeroSection />);

    // Figma 5:86738 — ABSOLUTE at card-relative (-60.69, -43.35).
    const income = screen.getByTestId("hero-monthly-income");
    expect(income.className).toContain("desktop:-left-[60.69px]");
    expect(income.className).toContain("desktop:-top-[43.35px]");

    // Figma 5:86745 — ABSOLUTE at card-relative (196.82, 637.01), 370.22x69.36.
    const pill = screen.getByTestId("hero-supported-currency");
    expect(pill.className).toContain("desktop:absolute");
    expect(pill.className).toContain("desktop:left-[196.82px]");
    expect(pill.className).toContain("desktop:top-[637.01px]");
    expect(pill.className).toContain("desktop:w-[370.22px]");
  });
});
