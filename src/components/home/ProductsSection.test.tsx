import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { ProductsSection } from "./ProductsSection";
import type { ProductsResponse } from "@/lib/products";

expect.extend(matchers);

const apiProductsData: ProductsResponse = {
  products: [
    {
      id: 1,
      icon: "checking",
      title: "Checking Accounts",
      tab: "individuals",
      description:
        "Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.",
    },
    {
      id: 2,
      icon: "savings",
      title: "Savings Accounts",
      tab: "individuals",
      description:
        "Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.",
    },
    {
      id: 3,
      icon: "loans",
      title: "Loans and Mortgages",
      tab: "individuals",
      description:
        "Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.",
    },
    {
      id: 4,
      icon: "insurance",
      title: "Business Accounts",
      tab: "businesses",
      description:
        "Efficiently manage your business finances with our tailored business account options, designed to help your business grow and succeed with seamless banking solutions.",
    },
    {
      id: 5,
      icon: "investing",
      title: "Business Loans",
      tab: "businesses",
      description:
        "Power your business ambitions with our flexible business loan solutions. Whether you need working capital or funds for expansion, our dedicated team is ready to support your growth.",
    },
    {
      id: 6,
      icon: "credit",
      title: "Cash Management",
      tab: "businesses",
      description:
        "Optimize your business cash flow with our comprehensive cash management services, giving you greater control and visibility over your business finances.",
    },
  ],
};

type ProductsHookState = {
  data: ProductsResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: ProductsHookState = {
  data: apiProductsData,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let mockState: ProductsHookState = { ...baseMock };

vi.mock("@/lib/products", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/products")>();
  return {
    ...actual,
    useProductsData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("ProductsSection", () => {
  it("renders the section heading and subheading", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("products-heading")).toHaveTextContent(
      "Our Products",
    );
    expect(screen.getByTestId("products-subheading")).toHaveTextContent(
      "Discover a range of comprehensive and customizable banking products",
    );
  });

  it("renders the individual and business tabs", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("products-tab-individuals")).toHaveTextContent(
      "For Individuals",
    );
    expect(screen.getByTestId("products-tab-businesses")).toHaveTextContent(
      "For Businesses",
    );
  });

  it("renders 3 individuals cards by default with Figma-correct titles", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("products-grid")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-1")).toHaveTextContent(
      "Checking Accounts",
    );
    expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-2")).toHaveTextContent(
      "Savings Accounts",
    );
    expect(screen.getByTestId("product-card-3")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-3")).toHaveTextContent(
      "Loans and Mortgages",
    );
    // businesses cards not rendered by default
    expect(screen.queryByTestId("product-card-4")).not.toBeInTheDocument();
  });

  it("renders all 3 individuals product cards with correct Figma descriptions", () => {
    render(<ProductsSection />);
    const individuals = apiProductsData.products.filter(
      (p) => p.tab === "individuals",
    );
    individuals.forEach((product) => {
      expect(
        screen.getByTestId(`product-card-${product.id}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`product-title-${product.id}`),
      ).toHaveTextContent(product.title);
      expect(
        screen.getByTestId(`product-description-${product.id}`),
      ).toHaveTextContent(product.description);
      expect(
        screen.getByTestId(`product-icon-${product.id}`),
      ).toBeInTheDocument();
    });
  });

  it("switches to businesses cards when For Businesses tab is clicked", () => {
    render(<ProductsSection />);
    const businessesTab = screen.getByTestId("products-tab-businesses");
    fireEvent.click(businessesTab);

    expect(screen.getByTestId("product-card-4")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-4")).toHaveTextContent(
      "Business Accounts",
    );
    expect(screen.getByTestId("product-card-5")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-5")).toHaveTextContent(
      "Business Loans",
    );
    expect(screen.getByTestId("product-card-6")).toBeInTheDocument();
    expect(screen.getByTestId("product-title-6")).toHaveTextContent(
      "Cash Management",
    );
    // individuals cards not visible after switching
    expect(screen.queryByTestId("product-card-1")).not.toBeInTheDocument();
  });

  it("switches back to individuals when For Individuals tab is clicked", () => {
    render(<ProductsSection />);
    fireEvent.click(screen.getByTestId("products-tab-businesses"));
    fireEvent.click(screen.getByTestId("products-tab-individuals"));
    expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-4")).not.toBeInTheDocument();
  });

  it("renders loading skeleton when isLoading is true", () => {
    mockState = { ...baseMock, data: undefined, isLoading: true };
    render(<ProductsSection />);
    expect(screen.getByTestId("product-card-skeleton-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-skeleton-2")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-1")).not.toBeInTheDocument();
  });

  it("renders error fallback when API fails", () => {
    mockState = {
      ...baseMock,
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    };
    render(<ProductsSection />);
    expect(screen.getByTestId("products-error-state")).toBeInTheDocument();
    expect(screen.queryByTestId("product-card-1")).not.toBeInTheDocument();
  });

  it("product icon wrapper has Figma double-ring gradient structure", () => {
    render(<ProductsSection />);
    const wrapper = screen.getByTestId("product-icon-wrapper-1");
    expect(wrapper.className).toContain("rounded-[70px]");
    expect(wrapper.className).toContain("from-[rgba(202,255,51,0.05)]");
  });

  it("product cards have correct dark background color", () => {
    render(<ProductsSection />);
    const card = screen.getByTestId("product-card-1");
    expect(card.className).toContain("bg-[#1E1E1E]");
    expect(card.className).not.toContain("bg-[#1A1A2E]");
  });

  it("heading renders 'Our' in white and 'Products' in lime green", () => {
    render(<ProductsSection />);
    const heading = screen.getByTestId("products-heading");
    expect(heading.className).toContain("text-white");
    expect(heading.textContent).toBe("Our Products");

    const accent = heading.querySelector("span");
    expect(accent?.textContent).toBe("Products");
    expect(accent?.className).toContain("text-[#CAFF33]");
  });

  // BC-167 — monotonic heading ladder. Figma has exactly three frames for this
  // heading: 390 = 28px, 1440 = 38px, 1920 = 48px, lineHeight 150% at all three.
  // Resolved: < 768 -> 28px, 768-1919 -> 38px, >= 1920 -> 48px. `lg` is 1024 while
  // `laptop` is 1440, so an lg/laptop pair made 1280 render larger (48) than 1440 (38).
  it("heading renders the Figma 28/38/48 ladder with 150% line-height", () => {
    render(<ProductsSection />);
    const heading = screen.getByTestId("products-heading");
    expect(heading.className).toContain("text-[28px]");
    expect(heading.className).toContain("md:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
    expect(heading.className).not.toMatch(/(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|lg|xl|2xl|laptop):text-\[/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/leading-\[\d+px\]/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-(?:tight|snug|normal|relaxed|loose)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):leading-/);
  });

  it("tab container has correct padding class", () => {
    render(<ProductsSection />);
    const tabs = screen.getByTestId("products-tabs");
    expect(tabs.className).toContain("p-[14px]");
  });

  it("active tab has lime green background, inactive tab is white not grey", () => {
    render(<ProductsSection />);
    const individualsTab = screen.getByTestId("products-tab-individuals");
    const businessesTab = screen.getByTestId("products-tab-businesses");
    expect(individualsTab.className).toContain("bg-[#CAFF33]");
    expect(businessesTab.className).not.toContain("bg-[#CAFF33]");
    // BC-189: the inactive tab is #FFFFFF in all three frames (108:4573 @390,
    // 104:2413 @1440, 11:86824 @1920) — #999999 appears nowhere in the design.
    expect(businessesTab.className).toContain("text-white");
    expect(businessesTab.className).not.toContain("text-[#999999]");
    // 14/14/18 @400 ladder on both tabs.
    for (const tab of [individualsTab, businessesTab]) {
      expect(tab.className).toContain("text-[14px]");
      expect(tab.className).toContain("desktop:text-[18px]");
      expect(tab.className).toContain("font-normal");
    }
  });

  // BC-155 QA remediation — BUG A: vertical dividers between product cards
  it("product cards draw a 1px left divider at the laptop breakpoint", () => {
    render(<ProductsSection />);
    const card = screen.getByTestId("product-card-2");
    expect(card.className).toContain("laptop:border-l");
    expect(card.className).toContain("laptop:border-l-[#262626]");
  });

  it("the first product card suppresses its left divider so the container edge is not doubled", () => {
    render(<ProductsSection />);
    expect(screen.getByTestId("product-card-1").className).toContain("laptop:first:border-l-0");
  });

  it("product cards no longer zero every border at laptop (laptop:border-0 clobbered the divider)", () => {
    render(<ProductsSection />);
    const card = screen.getByTestId("product-card-1");
    expect(card.className).not.toContain("laptop:border-0");
    expect(card.className).toContain("laptop:border-y-0");
    expect(card.className).toContain("laptop:border-r-0");
  });

  it("grid keeps a single container border with no gap and drops the wrong-direction divide-x", () => {
    render(<ProductsSection />);
    const grid = screen.getByTestId("products-grid");
    expect(grid.className).toContain("laptop:gap-0");
    expect(grid.className).toContain("laptop:border");
    expect(grid.className).toContain("laptop:border-[#262626]");
    expect(grid.className).toContain("laptop:rounded-2xl");
    expect(grid.className).not.toContain("laptop:divide-x");
  });

  // BC-180 — inter-column spacing.
  //
  // Figma renders each column separation as a zero-width LINE node sitting as its
  // own auto-layout item inside the grid frame, so the frame's itemSpacing lands in
  // full on BOTH sides of the divider:
  //   1440 (104:2415) w=1280, itemSpacing 40 — card1 ends x=373.33, LINE x=413.33,
  //                    card2 starts x=453.33  => 40px text-edge -> divider
  //   1920 (11:86933) w=1596, itemSpacing 50 — card1 ends x=465.33, LINE x=515.33,
  //                    card2 starts x=565.33  => 50px text-edge -> divider
  // The Figma card frames themselves carry padding 0/0/0/0, so that breathing room
  // is spacing, not padding, in the design. Code implements the separation as
  // gap-0 + `border-l` dividers (BC-155, QA-passed), which means the equivalent
  // distance has to live in each card's horizontal padding. A fixed `sm:p-8` (32px)
  // matched neither width and had no responsive step at all, so 1440 and 1920
  // rendered identically where Figma steps 40 -> 50.
  it("card horizontal padding steps 40px at laptop and 50px at desktop to match Figma divider spacing", () => {
    render(<ProductsSection />);
    for (const id of [1, 2, 3]) {
      const card = screen.getByTestId(`product-card-${id}`);
      expect(card.className).toContain("laptop:px-10");
      expect(card.className).toContain("desktop:px-[50px]");
    }
  });

  it("card padding below laptop is unchanged and no gap is reintroduced to carry the spacing", () => {
    render(<ProductsSection />);
    const card = screen.getByTestId("product-card-1");
    // vertical inset stays on the BC-155 container value - Figma cards have no
    // vertical padding, so only the horizontal axis is Figma-derivable here.
    expect(card.className).toContain("p-6");
    expect(card.className).toContain("sm:p-8");

    // The spacing must NOT be delivered as a grid gap - that would break the
    // unified bordered container BC-155 established.
    const grid = screen.getByTestId("products-grid");
    expect(grid.className).toContain("laptop:gap-0");
    expect(grid.className).not.toMatch(/laptop:gap-(?!0\b)/);
    expect(grid.className).not.toMatch(/desktop:gap-/);
  });

  // BC-155 regression guard - the container/divider contract QA measured must
  // survive any future spacing change.
  it("keeps the BC-155 unified container and border dividers intact", () => {
    render(<ProductsSection />);
    const grid = screen.getByTestId("products-grid");
    expect(grid.className).toContain("laptop:border");
    expect(grid.className).toContain("laptop:border-[#262626]");
    expect(grid.className).toContain("laptop:rounded-2xl");
    expect(grid.className).toContain("laptop:overflow-hidden");
    expect(grid.className).toContain("laptop:gap-0");

    // card 1 suppresses its divider; cards 2 and 3 draw a 1px #262626 left border
    expect(screen.getByTestId("product-card-1").className).toContain(
      "laptop:first:border-l-0",
    );
    for (const id of [2, 3]) {
      const card = screen.getByTestId(`product-card-${id}`);
      expect(card.className).toContain("laptop:border-l");
      expect(card.className).toContain("laptop:border-l-[#262626]");
      expect(card.className).toContain("laptop:border-y-0");
      expect(card.className).toContain("laptop:border-r-0");
    }
  });
});
