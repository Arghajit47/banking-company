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

  // BC-167 — monotonic heading ladder. The CTA heading is NOT a 28/38/48 heading;
  // Figma sizes it 390 = 24px, 1440 = 30px, 1920 = 40px, lineHeight 150% at all three.
  // Resolved: < 768 -> 24px, 768-1919 -> 30px, >= 1920 -> 40px. Never apply the common
  // section ladder here (the BC-160 trap).
  it("heading renders the CTA-specific 24/30/40 ladder with 150% line-height", () => {
    render(<CTASection />);
    const heading = screen.getByTestId("cta-heading");
    expect(heading.className).toContain("text-[24px]");
    expect(heading.className).toContain("md:text-[30px]");
    expect(heading.className).toContain("desktop:text-[40px]");
    expect(heading.className).toContain("leading-[150%]");
    expect(heading.className).not.toContain("text-[28px]");
    expect(heading.className).not.toContain("md:text-[38px]");
    expect(heading.className).not.toContain("desktop:text-[48px]");
    expect(heading.className).not.toMatch(/(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|lg|xl|2xl|laptop):text-\[/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/leading-\[\d+px\]/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-(?:tight|snug|normal|relaxed|loose)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):leading-/);
  });

  // BC-170 — heading font-weight must be uniform across every breakpoint.
  // Figma "Start your financial journey with YourBank today!": desktop 11:89110,
  // laptop 108:2701, mobile 113:4996 — all fontWeight 400 (Regular). This is NOT
  // the 500 used by the other section headings; it was flagged in BC-160, BC-162
  // and BC-167 QA and never fixed because those tickets were scoped to size.
  // A `laptop:`/`desktop:` weight variant is a min-width override, so any such
  // class would split the weight at 1440 and diverge from the design.
  it("heading renders font-weight 400 at every breakpoint", () => {
    render(<CTASection />);
    const heading = screen.getByTestId("cta-heading");
    expect(heading.className).toMatch(/(?:^|\s)font-normal(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:^|\s)font-semibold(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/);
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
    // BC-147 changed the card radius from rounded-2xl to rounded-[20px].
    const card = section.querySelector('[class*="rounded-[20px]"]');
    expect(card).not.toBeNull();
    expect(card?.className).toContain("min-h-[288px]");
  });

  it("text container has no max-w-3xl constraint", () => {
    render(<CTASection />);
    const heading = screen.getByTestId("cta-heading");
    const textContainer = heading.closest("[class*='w-full']");
    expect(textContainer?.className).not.toContain("max-w-3xl");
  });

  // BC-189 AC4 — 14px body copy line-height. Figma specifies 150% at all three
  // frames (390, 1440, 1920) for CTA body copy, so this is a single value and
  // NOT a ladder. `leading-relaxed` (1.625 -> 22.75px on 14px) was the defect.
  it("body copy renders 150% line-height, not leading-relaxed", () => {
    render(<CTASection />);
    const el = screen.getByTestId("cta-body");
    expect(el.className).toContain("leading-[150%]");
    expect(el.className).not.toMatch(/(?:^|\s)leading-(?:tight|snug|normal|relaxed|loose)(?:\s|$)/);
    expect(el.className).not.toMatch(/leading-\[\d+px\]/);
    expect(el.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):leading-/);
  });
});
