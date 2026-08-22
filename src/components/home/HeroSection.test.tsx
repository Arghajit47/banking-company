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

  it("heading is 28px at 390 and stays 38px from 768 through 1439 and at 1440", () => {
    render(<HeroSection />);
    const el = screen.getByTestId("hero-heading");
    // Figma 108:2795 (Mobile 390) = 28px
    expect(el).toHaveClass("text-[28px]");
    // Figma 104:636 (Laptop 1440) = 38px; md (768) carries it unbroken up to the
    // desktop tier, so 1024, 1280 and 1440 all resolve to 38px
    expect(el).toHaveClass("md:text-[38px]");
    // Figma 5:52369 (Desktop 1920) = 48px
    expect(el).toHaveClass("desktop:text-[48px]");
  });

  it("heading ladder is monotonic — no sm/lg tier and no laptop step-down", () => {
    render(<HeroSection />);
    const el = screen.getByTestId("hero-heading");
    // no Figma frame specifies a size at Tailwind's sm (640), md-as-40 (768) or lg (1024);
    // lg:text-[44px] made 1280 render larger than the 38px at 1440
    expect(el.className).not.toContain("sm:text-[");
    expect(el.className).not.toContain("lg:text-[");
    expect(el.className).not.toContain("laptop:text-[");
    // and no per-tier pixel line-heights that could drift from the 150% ratio
    expect(el.className).not.toContain("sm:leading-[");
    expect(el.className).not.toContain("md:leading-[");
    expect(el.className).not.toContain("lg:leading-[");
    expect(el.className).not.toContain("laptop:leading-[");
    expect(el.className).not.toContain("desktop:leading-[");
  });

  it("heading line-height is a single unprefixed 150% at every tier", () => {
    render(<HeroSection />);
    // 28→42, 38→57, 48→72 all derive from one ratio, matching Figma's 150%
    expect(screen.getByTestId("hero-heading")).toHaveClass("leading-[150%]");
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

  // BC-175 — three breakpoint ladders that stopped at `laptop:` and therefore leaked
  // the 1440 value into the 1920 tier, plus a mockup width step with no Figma frame.
  describe("1920 vertical and type ladders (BC-175)", () => {
    function getContainer() {
      return screen.getByTestId("hero-badge").parentElement!.parentElement!;
    }

    it("gives the hero wrapper the Figma 824.48px min-height at 1920", () => {
      render(<HeroSection />);
      const container = getContainer();

      // Figma 5:86791 height 824.4847 — without a desktop override the laptop
      // 621px min-height leaked all the way to 1920.
      expect(container.className).toContain("desktop:min-h-[824.48px]");
      // Figma 104:615 height 621.2744 — the 1440 tier is unchanged.
      expect(container.className).toContain("laptop:min-h-[621px]");
      expect(container.className).toContain("min-h-[824px]");
    });

    it("applies the same wrapper min-height ladder to the loading skeleton", () => {
      heroMock = { ...baseMock, data: undefined, isLoading: true };
      render(<HeroSection />);
      const container = getContainer();

      expect(container.className).toContain("desktop:min-h-[824.48px]");
      expect(container.className).toContain("laptop:min-h-[621px]");
    });

    it("carries the full 14/14/18 CTA label ladder with no 1920 value at base", () => {
      render(<HeroSection />);
      const cta = screen.getByTestId("hero-open-account");

      // BC-189: re-read per node. 108:2798 = 14/400 @390, 104:639 = 14/400 @1440,
      // 5:86788 = 18/400 @1920. The previous ladder asserted an unprefixed 18px,
      // which is the 1920 value bound at base — it made 390 and 768-1439 render
      // 18px. Because 390 and 1440 agree, `laptop:` is not a tier here.
      expect(cta.className).toContain("text-[14px]");
      expect(cta.className).toContain("desktop:text-[18px]");
      expect(cta.className).not.toContain("laptop:text-[");
      expect(cta.className).not.toMatch(/(?:^|\s)text-\[18px\](?:\s|$)/);
      // Figma weight is 400, not the semibold it was rendering.
      expect(cta.className).toContain("font-normal");
    });

    it("keeps the mockup width ladder monotonic with no unfounded 1024–1439 step", () => {
      render(<HeroSection />);
      const mockup = screen.getByTestId("hero-mockup");

      // Figma 108:2799 = 305.45 @390, 104:640 = 410.19 @1440, 5:83437 = 515.02 @1920.
      expect(mockup.className).toContain("max-w-[305.45px]");
      // md carries the 1440 value from 768 up — the BC-167/BC-173/BC-174 idiom —
      // so 768, 1024 and 1280 resolve to 410px, not to the 390 mobile width.
      expect(mockup.className).toContain("md:max-w-[410px]");
      expect(mockup.className).toContain("laptop:max-w-[410px]");
      expect(mockup.className).toContain("desktop:max-w-[515px]");
      // 700px and 780px have no Figma frame and made 1024–1439 wider than 1440.
      expect(mockup.className).not.toContain("max-w-[700px]");
      expect(mockup.className).not.toContain("lg:max-w-[");
    });

    it("applies the same mockup width ladder to the loading skeleton", () => {
      heroMock = { ...baseMock, data: undefined, isLoading: true };
      render(<HeroSection />);
      const mockup = screen.getByTestId("hero-mockup");

      expect(mockup.className).toContain("max-w-[305.45px]");
      expect(mockup.className).toContain("md:max-w-[410px]");
      expect(mockup.className).toContain("laptop:max-w-[410px]");
      expect(mockup.className).toContain("desktop:max-w-[515px]");
      expect(mockup.className).not.toContain("max-w-[700px]");
      expect(mockup.className).not.toContain("lg:max-w-[");
    });
  });

  // BC-172 — the hero horizontal chain at 1920 (children of Figma hero frame 5:86791):
  //   5:52362 left column   pageX  80.53, width 825.98
  //   5:83437 exchange card pageX 906.51, width 515.02
  //   5:86805 arrows        pageX 1421.53, width 417.95  (zero gap after the card)
  // 80.53 + 825.98 = 906.51 -> + 515.02 = 1421.53 -> + 417.95 = 1839.48, and
  // 1920 - 1839.48 = 80.52, the already-shipped arrows right offset.
  describe("1920 horizontal chain (BC-172)", () => {
    function getColumnAndContainer() {
      const column = screen.getByTestId("hero-badge").parentElement!;
      return { column, container: column.parentElement! };
    }

    it("uses the Figma 80.53px desktop container padding without moving 1440 or 390", () => {
      render(<HeroSection />);
      const { container } = getColumnAndContainer();

      // Figma 5:52362 starts at pageX 80.53 -> the container's desktop padding.
      expect(container.className).toContain("desktop:px-[80.53px]");
      expect(container.className).not.toContain("desktop:px-[162px]");

      // 1440 (laptop) and 390 (base) tiers are untouched.
      expect(container.className).toContain("laptop:px-20");
      expect(container.className).toContain("px-4");
      expect(container.className).toContain("md:px-8");
      expect(container.className).toContain("lg:px-12");
      expect(container.className).toContain("laptop:min-h-[621px]");
    });

    it("gives the left text column the Figma 825.98px desktop max-width", () => {
      render(<HeroSection />);
      const { column } = getColumnAndContainer();

      // Figma 5:52362 width 825.98 — without this the laptop 650px leaks to 1920.
      expect(column.className).toContain("desktop:max-w-[825.98px]");

      // 1440 (laptop) and 390 (base) tiers are untouched.
      expect(column.className).toContain("laptop:max-w-[650px]");
      expect(column.className).toContain("max-w-[826px]");
    });

    it("keeps the mockup and arrows geometry unchanged so the card meets the arrows", () => {
      render(<HeroSection />);

      // Figma 5:83437 width 515.02 — already correct, must not drift.
      const mockup = screen.getByTestId("hero-mockup");
      expect(mockup.className).toContain("desktop:max-w-[515px]");
      expect(mockup.className).toContain("laptop:max-w-[410px]");

      // Figma 5:86805 — QA-verified, must not move.
      const arrows = screen.getByTestId("hero-abstract-illustration");
      expect(arrows.className).toContain("desktop:right-[80.55px]");
      expect(arrows.className).toContain("desktop:w-[417.95px]");
      expect(arrows.className).toContain("desktop:h-[382.73px]");
    });

    it("applies the same 1920 chain to the loading skeleton", () => {
      heroMock = { ...baseMock, data: undefined, isLoading: true };
      render(<HeroSection />);

      const { column, container } = getColumnAndContainer();
      expect(container.className).toContain("desktop:px-[80.53px]");
      expect(container.className).toContain("laptop:px-20");
      expect(column.className).toContain("desktop:max-w-[825.98px]");
      expect(column.className).toContain("laptop:max-w-[650px]");
      expect(screen.getByTestId("hero-mockup").className).toContain(
        "desktop:max-w-[515px]",
      );
    });
  });
});
