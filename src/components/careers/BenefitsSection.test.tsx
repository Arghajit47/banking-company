import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { BenefitsSection } from "./BenefitsSection";
import type { CareersBenefitsResponse } from "@/lib/careers-benefits";

expect.extend(matchers);

interface BenefitsHookState {
  data: CareersBenefitsResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const apiData: CareersBenefitsResponse = {
  benefits: [
    { id: 1, icon: "/assets/icons/icon_benefit_1.svg", title: "Competitive Compensation", description: "We provide a competitive salary package." },
    { id: 2, icon: "/assets/icons/icon_benefit_2.svg", title: "Health and Wellness", description: "We prioritize health and well-being." },
    { id: 3, icon: "/assets/icons/icon_benefit_3.svg", title: "Retirement Planning", description: "We offer a retirement savings plan." },
    { id: 4, icon: "/assets/icons/icon_benefit_4.svg", title: "Work-Life Balance", description: "We support work-life balance." },
  ],
};

const baseMock: BenefitsHookState = {
  data: apiData,
  error: undefined,
  isLoading: false,
};

let mockState: BenefitsHookState = { ...baseMock };

vi.mock("@/lib/careers-benefits", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/careers-benefits")>();
  return { ...actual, useCareersBenefitsData: () => mockState };
});

vi.mock("@/lib/use-mounted", () => ({ useMounted: () => true }));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("BenefitsSection (SWR integration)", () => {
  it("renders the section", () => {
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefits-section")).toBeInTheDocument();
  });

  it("renders the section header", () => {
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefits-section-header")).toBeInTheDocument();
  });

  it("renders heading with correct text", () => {
    render(<BenefitsSection />);
    const heading = screen.getByTestId("benefits-section-heading");
    expect(heading.textContent).toContain("Our");
    expect(heading.textContent).toContain("Benefits");
  });

  it("renders paragraph text", () => {
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefits-section-paragraph").textContent).toContain("At YourBank");
  });

  it("renders 4 benefit cards from API data", () => {
    render(<BenefitsSection />);
    [0, 1, 2, 3].forEach((i) => {
      expect(screen.getByTestId(`benefit-card-${i}`)).toBeInTheDocument();
    });
  });

  it("renders icon, title, and body for each card", () => {
    render(<BenefitsSection />);
    [0, 1, 2, 3].forEach((i) => {
      expect(screen.getByTestId(`benefit-card-icon-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`benefit-card-title-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`benefit-card-body-${i}`)).toBeInTheDocument();
    });
  });

  it("renders correct card titles from API data", () => {
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefit-card-title-0").textContent).toBe("Competitive Compensation");
    expect(screen.getByTestId("benefit-card-title-1").textContent).toBe("Health and Wellness");
    expect(screen.getByTestId("benefit-card-title-2").textContent).toBe("Retirement Planning");
    expect(screen.getByTestId("benefit-card-title-3").textContent).toBe("Work-Life Balance");
  });

  it("shows loading skeleton when isLoading=true", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefit-card-0")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<BenefitsSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  // BC-162 — `laptop` is a min-width variant, so the 38px laptop override kept
  // applying at 1920. Figma "Our Benefits": desktop 53:585 = 48px, laptop 113:7195 = 38px,
  // mobile 113:9592 = 28px, lineHeight 150% at every breakpoint.
  it("heading carries a desktop 48px override above the laptop 38px one", () => {
    render(<BenefitsSection />);
    const heading = screen.getByTestId("benefits-section-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
  });

  // Line height must stay derived from `leading-[150%]`; a hardcoded per-breakpoint
  // pixel leading would desync from the font size and reintroduce BC-162.
  it("heading has no hardcoded per-breakpoint pixel line-height", () => {
    render(<BenefitsSection />);
    const heading = screen.getByTestId("benefits-section-heading");
    expect(heading.className).not.toMatch(/laptop:leading-\[/);
    expect(heading.className).not.toMatch(/desktop:leading-\[/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-\[\d+px\]/);
  });
});
