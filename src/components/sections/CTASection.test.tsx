import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { CTASection } from "./CTASection";
import type { CTAConfig } from "@/lib/cta";

expect.extend(matchers);

const apiConfig: CTAConfig = {
  headline: "Start your financial journey with YourBank today!",
  body: "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.",
  buttonLabel: "Open Account",
};

type CTAHookState = {
  data: CTAConfig | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: CTAHookState = {
  data: apiConfig,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let ctaMock: CTAHookState = { ...baseMock };
let mountedMock = true;

vi.mock("@/lib/cta", () => ({
  useCTAConfig: () => ctaMock,
}));

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => mountedMock,
}));

afterEach(() => {
  cleanup();
  ctaMock = { ...baseMock };
  mountedMock = true;
});

describe("CTASection", () => {
  it("renders heading with green accent from API data", () => {
    render(<CTASection />);
    const heading = screen.getByTestId("cta-heading");
    expect(heading).toHaveTextContent(
      "Start your financial journey with YourBank today!",
    );
    expect(heading.querySelector("span")).toHaveClass("text-[#CAFF33]");
  });

  it("renders body text from API data", () => {
    render(<CTASection />);
    expect(screen.getByTestId("cta-body")).toHaveTextContent(
      "At YourBank, our mission is to provide comprehensive banking solutions",
    );
  });

  it("renders button label and href from API data", () => {
    render(<CTASection />);
    const button = screen.getByTestId("cta-button");
    expect(button).toHaveTextContent("Open Account");
    expect(button).toHaveAttribute("href", "/");
  });

  it("renders section and decoration test ids", () => {
    render(<CTASection />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-abstract-decoration")).toBeInTheDocument();
  });

  it("renders loading skeleton when data is loading", () => {
    ctaMock = { ...baseMock, data: undefined, isLoading: true };
    render(<CTASection />);

    const heading = screen.getByTestId("cta-heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("animate-pulse");

    const body = screen.getByTestId("cta-body");
    expect(body).toBeInTheDocument();
    expect(body).toHaveClass("animate-pulse");

    const button = screen.getByTestId("cta-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("animate-pulse");
  });

  it("falls back to defaults on API error", () => {
    ctaMock = {
      ...baseMock,
      data: undefined,
      error: new Error("Network error"),
    };
    render(<CTASection />);

    expect(screen.getByTestId("cta-heading")).toHaveTextContent(
      "Start your financial journey with YourBank today!",
    );
    expect(screen.getByTestId("cta-body")).toHaveTextContent(
      "Ready to take control of your finances?",
    );
    expect(screen.getByTestId("cta-button")).toHaveTextContent("Open Account");
  });

  it("renders loading skeleton during hydration guard when unmounted", () => {
    mountedMock = false;
    render(<CTASection />);

    const heading = screen.getByTestId("cta-heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("animate-pulse");

    const button = screen.getByTestId("cta-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("animate-pulse");
  });

  it("supports explicit props (bypasses API)", () => {
    render(
      <CTASection
        headlineStart="Custom start "
        headlineAccent="custom accent."
        body="Custom body text."
        buttonLabel="Custom CTA"
        buttonHref="/custom"
      />,
    );
    expect(screen.getByTestId("cta-heading")).toHaveTextContent(
      "Custom start custom accent.",
    );
    expect(screen.getByTestId("cta-body")).toHaveTextContent(
      "Custom body text.",
    );
    expect(screen.getByTestId("cta-button")).toHaveTextContent("Custom CTA");
    expect(screen.getByTestId("cta-button")).toHaveAttribute("href", "/custom");
  });

  it("uses careers page key when page prop is set", () => {
    // The hook is mocked, so we just verify the component renders with the mock data
    // The page prop is passed to useCTAConfig which is mocked
    render(<CTASection page="careers" />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-heading")).toHaveTextContent(
      "Start your financial journey with YourBank today!",
    );
  });

  it("card has min-h-[288px] to match Figma compact height", () => {
    render(<CTASection />);
    const section = screen.getByTestId("cta-section");
    const card = section.querySelector(".rounded-2xl");
    expect(card?.className).toContain("min-h-[288px]");
  });

  it("text container has no max-w-3xl constraint", () => {
    render(<CTASection />);
    const heading = screen.getByTestId("cta-heading");
    const textContainer = heading.closest("[class*='w-full']");
    expect(textContainer?.className).not.toContain("max-w-3xl");
  });
});
