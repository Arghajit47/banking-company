import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import { FeaturesSection } from "./FeaturesSection";
import type { FeaturesResponse } from "@/lib/features";

expect.extend(matchers);

const apiFeaturesData: FeaturesResponse = {
  features: [
    {
      id: 1,
      icon: "/assets/icons/icon_feature_1.svg",
      title: "24/7 Account Access",
      tab: "online-banking",
      description:
        "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform.",
    },
    {
      id: 2,
      icon: "/assets/icons/icon_feature_2.svg",
      title: "Mobile Banking App",
      tab: "online-banking",
      description:
        "Stay connected to your finances on the go with our user-friendly mobile banking app.",
    },
    {
      id: 3,
      icon: "/assets/icons/icon_feature_3.svg",
      title: "Secure Transactions",
      tab: "online-banking",
      description:
        "Rest assured knowing that your transactions are protected by industry-leading security measures.",
    },
    {
      id: 4,
      icon: "/assets/icons/icon_feature_4.svg",
      title: "Bill Pay and Transfers",
      tab: "online-banking",
      description:
        "Save time and avoid late fees with our convenient bill pay service.",
    },
    {
      id: 5,
      icon: "/assets/icons/icon_feature_1.svg",
      title: "Smart Budget Planner",
      tab: "financial-tools",
      description:
        "Automatically categorize your spending, set monthly limits, and track savings goals.",
    },
    {
      id: 6,
      icon: "/assets/icons/icon_feature_2.svg",
      title: "Investment & Portfolio Tracker",
      tab: "financial-tools",
      description:
        "Monitor your investments, review asset allocations, and track market performance.",
    },
    {
      id: 7,
      icon: "/assets/icons/icon_feature_3.svg",
      title: "Loan & Mortgage Calculator",
      tab: "financial-tools",
      description:
        "Estimate monthly payments, analyze amortization schedules, and evaluate extra payments.",
    },
    {
      id: 8,
      icon: "/assets/icons/icon_feature_4.svg",
      title: "Credit Health Monitoring",
      tab: "financial-tools",
      description:
        "Access your credit score updates and view key credit factors.",
    },
    {
      id: 9,
      icon: "/assets/icons/icon_feature_1.svg",
      title: "Live Concierge Chat",
      tab: "customer-support",
      description:
        "Connect directly with dedicated banking specialists within seconds.",
    },
    {
      id: 10,
      icon: "/assets/icons/icon_feature_2.svg",
      title: "Appointment Scheduling",
      tab: "customer-support",
      description:
        "Book one-on-one virtual or in-branch consultations with financial advisors.",
    },
    {
      id: 11,
      icon: "/assets/icons/icon_feature_3.svg",
      title: "Dedicated Dispute Center",
      tab: "customer-support",
      description:
        "Easily flag unauthorized charges and submit transaction disputes.",
    },
    {
      id: 12,
      icon: "/assets/icons/icon_feature_4.svg",
      title: "Personalized Financial Advisory",
      tab: "customer-support",
      description:
        "Receive tailored financial reviews and expert recommendations.",
    },
  ],
};

type FeaturesHookState = {
  data: FeaturesResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: FeaturesHookState = {
  data: apiFeaturesData,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let mockState: FeaturesHookState = { ...baseMock };

vi.mock("@/lib/features", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/features")>();
  return { ...actual, useFeaturesData: () => mockState };
});

vi.mock("@/lib/use-mounted", () => ({ useMounted: () => true }));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("FeaturesSection (SWR integration)", () => {
  it("renders section heading and subheading", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("features-section")).toBeDefined();
    // Heading is split into "Our " + <span>Features</span> (BC-155), so assert on
    // the heading's combined textContent rather than a single text node.
    expect(screen.getByTestId("features-heading").textContent).toBe(
      "Our Features",
    );
    expect(
      screen.getByText(/Experience a host of powerful features/)
    ).toBeDefined();
  });

  // BC-167 — monotonic heading ladder. Figma has exactly three frames for this
  // heading: 390 = 28px, 1440 = 38px, 1920 = 48px, lineHeight 150% at all three.
  // Resolved: < 768 -> 28px, 768-1919 -> 38px, >= 1920 -> 48px. `lg` is 1024 while
  // `laptop` is 1440, so an lg/laptop pair made 1280 render larger (48) than 1440 (38).
  it("heading renders the Figma 28/38/48 ladder with 150% line-height", () => {
    render(<FeaturesSection />);
    const heading = screen.getByTestId("features-heading");
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

  it("renders 3 tab buttons", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("features-tab-online-banking")).toBeDefined();
    expect(screen.getByTestId("features-tab-financial-tools")).toBeDefined();
    expect(screen.getByTestId("features-tab-customer-support")).toBeDefined();
  });

  it("Online Banking tab is active by default", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByTestId("features-tab-online-banking").getAttribute("aria-pressed")
    ).toBe("true");
  });

  it("switches active tab on click", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    await user.click(screen.getByTestId("features-tab-financial-tools"));
    expect(
      screen.getByTestId("features-tab-financial-tools").getAttribute("aria-pressed")
    ).toBe("true");
    expect(
      screen.getByTestId("features-tab-online-banking").getAttribute("aria-pressed")
    ).toBe("false");
  });

  it("renders 4 feature cards from API data", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("feature-card-1")).toBeDefined();
    expect(screen.getByTestId("feature-card-2")).toBeDefined();
    expect(screen.getByTestId("feature-card-3")).toBeDefined();
    expect(screen.getByTestId("feature-card-4")).toBeDefined();
  });

  it("renders API-driven card titles", () => {
    render(<FeaturesSection />);
    expect(screen.getByText("24/7 Account Access")).toBeDefined();
    expect(screen.getByText("Mobile Banking App")).toBeDefined();
    expect(screen.getByText("Secure Transactions")).toBeDefined();
    expect(screen.getByText("Bill Pay and Transfers")).toBeDefined();
  });

  it("renders API-driven card descriptions", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByText(/Enjoy the convenience of accessing your accounts/)
    ).toBeDefined();
    expect(
      screen.getByText(/Stay connected to your finances on the go/)
    ).toBeDefined();
  });

  it("shows loading skeleton when isLoading=true", () => {
    mockState = { ...baseMock, data: undefined, isLoading: true };
    render(<FeaturesSection />);
    const skeletons = document.querySelectorAll('[aria-hidden="true"]');
    expect(skeletons.length).toBeGreaterThan(0);
    expect(screen.queryByTestId("feature-card-1")).toBeNull();
  });

  it("shows error state when API fails", () => {
    mockState = {
      ...baseMock,
      data: undefined,
      error: new Error("Failed"),
      isLoading: false,
    };
    render(<FeaturesSection />);
    expect(screen.getByTestId("features-cards-error")).toBeDefined();
    expect(screen.queryByTestId("feature-card-1")).toBeNull();
  });

  it("renders cards grid container", () => {
    render(<FeaturesSection />);
    expect(screen.getByTestId("features-cards-grid")).toBeDefined();
  });

  it("renders only the Online Banking cards by default", () => {
    render(<FeaturesSection />);
    expect(
      document.querySelectorAll('[data-testid^="feature-card-title-"]').length
    ).toBe(4);
    for (const id of [1, 2, 3, 4]) {
      expect(screen.getByTestId(`feature-card-${id}`)).toBeDefined();
    }
    for (const id of [5, 6, 7, 8, 9, 10, 11, 12]) {
      expect(screen.queryByTestId(`feature-card-${id}`)).toBeNull();
    }
  });

  it("swaps the rendered cards when the Financial Tools tab is clicked", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    await user.click(screen.getByTestId("features-tab-financial-tools"));

    expect(
      document.querySelectorAll('[data-testid^="feature-card-title-"]').length
    ).toBe(4);
    for (const id of [5, 6, 7, 8]) {
      expect(screen.getByTestId(`feature-card-${id}`)).toBeDefined();
    }
    for (const id of [1, 2, 3, 4, 9, 10, 11, 12]) {
      expect(screen.queryByTestId(`feature-card-${id}`)).toBeNull();
    }
    expect(screen.getByText("Smart Budget Planner")).toBeDefined();
    expect(screen.queryByText("24/7 Account Access")).toBeNull();
  });

  it("swaps the rendered cards when the Customer Support tab is clicked", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    await user.click(screen.getByTestId("features-tab-customer-support"));

    expect(
      document.querySelectorAll('[data-testid^="feature-card-title-"]').length
    ).toBe(4);
    for (const id of [9, 10, 11, 12]) {
      expect(screen.getByTestId(`feature-card-${id}`)).toBeDefined();
    }
    for (const id of [1, 2, 3, 4, 5, 6, 7, 8]) {
      expect(screen.queryByTestId(`feature-card-${id}`)).toBeNull();
    }
    expect(screen.getByText("Live Concierge Chat")).toBeDefined();
  });

  it("returns to the Online Banking cards when that tab is re-selected", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    await user.click(screen.getByTestId("features-tab-customer-support"));
    await user.click(screen.getByTestId("features-tab-online-banking"));
    expect(screen.getByTestId("feature-card-1")).toBeDefined();
    expect(screen.queryByTestId("feature-card-9")).toBeNull();
  });

  it("keeps a 2-row grid of 2 cards per row on every tab", async () => {
    const user = userEvent.setup();
    render(<FeaturesSection />);
    for (const tab of [
      "features-tab-online-banking",
      "features-tab-financial-tools",
      "features-tab-customer-support",
    ]) {
      await user.click(screen.getByTestId(tab));
      const rows = Array.from(
        screen.getByTestId("features-cards-grid").children
      );
      expect(rows.length).toBe(2);
      for (const row of rows) {
        expect(row.children.length).toBe(2);
      }
    }
  });

  it("nav has accessible label", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByRole("navigation", { name: "Feature categories" })
    ).toBeDefined();
  });
  // BC-178 — feature card title ladder. Figma has exactly three frames: mobile 390
  // (112:4861) = 18px, laptop 1440 (108:2571) = 18px, desktop 1920 (41:130) = 22px.
  // Mobile and laptop are identical, so the ladder has only one step: base 18px,
  // desktop (1920) 22px. Resolved: < 1920 -> 18px, >= 1920 -> 22px.
  // The old ladder was `text-[22px] laptop:text-[18px]`, which started at 22px and
  // shrank to 18px at 1440, so 1920 rendered 18px instead of 22px.
  it("feature card titles render the Figma 18/18/22 ladder with 150% line-height", () => {
    render(<FeaturesSection />);
    const titles = Array.from(
      document.querySelectorAll('[data-testid^="feature-card-title-"]')
    );
    expect(titles.length).toBeGreaterThan(0);
    for (const title of titles) {
      expect(title.className).toContain("text-[18px]");
      expect(title.className).toContain("desktop:text-[22px]");
      expect(title.className).toContain("leading-[150%]");
      // 22px must not be the base size, and no frame introduces a laptop step.
      expect(title.className).not.toMatch(/(?:^|\s)text-\[22px\]/);
      expect(title.className).not.toMatch(/laptop:text-\[/);
      expect(title.className).not.toMatch(/(?:sm|md|lg|xl|2xl):text-\[/);
      expect(title.className).not.toMatch(
        /(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/
      );
    }
  });

  // BC-184 — feature card <h3> font-weight must be uniform across every breakpoint.
  // Confirmed from the feature card's OWN Figma nodes, not by extending BC-164/BC-168:
  // desktop 1920 41:130 / 41:133 / 41:141 / 41:148,
  // laptop 1440 108:2571 / 108:2578 / 108:2586 / 108:2593,
  // mobile 390  112:4861 / 112:4868 / 112:4876 / 112:4883
  // — all twelve are fontWeight 400 (Lexend Regular).
  // The old `font-medium laptop:font-normal` rendered 500 below 1440 and 400 at/above it.
  // A breakpoint-prefixed weight variant is a min-width override, so any such class
  // would re-split the weight at some viewport and diverge from the design.
  it("feature card titles render font-weight 400 at every breakpoint", () => {
    render(<FeaturesSection />);
    const titles = Array.from(
      document.querySelectorAll('[data-testid^="feature-card-title-"]')
    );
    expect(titles.length).toBe(4);
    for (const title of titles) {
      expect(title.className).toMatch(/(?:^|\s)font-normal(?:\s|$)/);
      expect(title.className).not.toMatch(/(?:^|\s)font-medium(?:\s|$)/);
      expect(title.className).not.toMatch(
        /(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/
      );
    }
  });

  // BC-189: the feature TAB ladder is 14/14/18 @400. Per-node reads:
  //   390  112:4852 / 112:4854 / 112:4856 = 14/400
  //   1440 108:2562 / 108:2564 / 108:2566 = 14/400   <- 14, NOT 16
  //   1920 41:80    / 41:127   / 41:129   = 18/400
  // Because 390 and 1440 agree there is no `md:` tier. `text-lg` previously pinned
  // every width to 18px, the 1920 value.
  it("gives the feature tabs the full 14/14/18 ladder and no invented md tier", () => {
    render(<FeaturesSection />);
    const tabs = Array.from(
      document.querySelectorAll('[data-testid^="features-tab-"]')
    );
    expect(tabs.length).toBe(3);
    for (const tab of tabs) {
      expect(tab.className).toContain("text-[14px]");
      expect(tab.className).toContain("desktop:text-[18px]");
      expect(tab.className).not.toContain("text-lg");
      expect(tab.className).not.toContain("md:text-[");
      expect(tab.className).not.toContain("laptop:text-[");
    }
  });

  // The feature CARD heading is a different node from the tab and legitimately reaches
  // 22px at 1920 (41:130 / 41:141 = 22/400), matching 18/18/22. Guard it so the tab fix
  // above is never "tidied" into it.
  it("keeps the 18/18/22 card-heading ladder distinct from the tab ladder", () => {
    render(<FeaturesSection />);
    for (const title of Array.from(
      document.querySelectorAll('[data-testid^="feature-card-title-"]')
    )) {
      expect(title.className).toContain("text-[18px]");
      expect(title.className).toContain("desktop:text-[22px]");
    }
  });

  // The skeleton card renders no title element, so the weight is declared in exactly
  // one place. If a second title class string appears, this stops the guard above
  // from silently passing on only some of the rendered titles.
  it("declares the feature card title classes exactly once", () => {
    render(<FeaturesSection />);
    const titles = Array.from(
      document.querySelectorAll('[data-testid^="feature-card-title-"]')
    );
    expect(new Set(titles.map((title) => title.className)).size).toBe(1);
  });
});
