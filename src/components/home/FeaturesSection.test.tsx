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
      description:
        "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform.",
    },
    {
      id: 2,
      icon: "/assets/icons/icon_feature_2.svg",
      title: "Mobile Banking App",
      description:
        "Stay connected to your finances on the go with our user-friendly mobile banking app.",
    },
    {
      id: 3,
      icon: "/assets/icons/icon_feature_3.svg",
      title: "Secure Transactions",
      description:
        "Rest assured knowing that your transactions are protected by industry-leading security measures.",
    },
    {
      id: 4,
      icon: "/assets/icons/icon_feature_4.svg",
      title: "Bill Pay and Transfers",
      description:
        "Save time and avoid late fees with our convenient bill pay service.",
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

  // BC-160 — `laptop` is a min-width variant, so the 38px laptop override kept
  // applying at 1920. Figma desktop (41:76) is 48px; `leading-[150%]` derives the
  // 72px / 57px line boxes on its own.
  it("heading carries a desktop 48px override above the laptop 38px one", () => {
    render(<FeaturesSection />);
    const heading = screen.getByTestId("features-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
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

  it("nav has accessible label", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByRole("navigation", { name: "Feature categories" })
    ).toBeDefined();
  });
});
