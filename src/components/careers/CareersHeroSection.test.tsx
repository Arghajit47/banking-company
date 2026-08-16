import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import type { CareersHeroData } from "@/lib/careers-hero";
import { CareersHeroSection } from "./CareersHeroSection";

expect.extend(matchers);

interface CareersHeroHookState {
  data: CareersHeroData | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const MOCK_DATA: CareersHeroData = {
  headline: "Welcome to YourBank Careers!",
  body: "At YourBank, we believe in fostering a culture of excellence and innovation.",
  ctaLabel: "View Openings",
  imageUrl: "/assets/images/careers_hero_image.png",
};

let mockState: CareersHeroHookState = {
  data: MOCK_DATA,
  error: undefined,
  isLoading: false,
};

vi.mock("@/lib/careers-hero", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/careers-hero")>();
  return {
    ...actual,
    useCareersHeroData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  cleanup();
  mockState = { data: MOCK_DATA, error: undefined, isLoading: false };
});

describe("CareersHeroSection", () => {
  it("renders the heading with data from API", () => {
    render(<CareersHeroSection />);
    expect(screen.getByTestId("careers-hero-heading").textContent).toContain(
      "Welcome to",
    );
  });

  // Figma nodes 58:1545 (1920) / 113:7170 (1440) / 113:9567 (390) — 58 / 48 / 28, lineHeight 130%
  it("heading is 28px at 390 and stays 48px from 768 through 1439 and at 1440", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el).toHaveClass("text-[28px]");
    // md (768) carries 48px unbroken up to the desktop tier, so 1280 and 1440 both resolve to 48px
    expect(el).toHaveClass("md:text-[48px]");
  });

  it("heading is 58px at 1920", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el).toHaveClass("desktop:text-[58px]");
  });

  it("heading line height is 130% at every tier", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el).toHaveClass("leading-[130%]");
    expect(el.className).not.toContain("md:leading-");
    expect(el.className).not.toContain("desktop:leading-");
  });

  it("heading ladder is monotonic and carries no size Figma does not specify", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    // 32px appeared at no Figma frame — mobile (113:9567) is 28px
    expect(el.className).not.toContain("text-[32px]");
    // no Figma frame specifies a size at Tailwind's lg (1024); lg:text-[58px] made 1280 render larger than 1440
    expect(el.className).not.toContain("lg:text-[");
    expect(el.className).not.toContain("laptop:text-[");
    expect(el.className).not.toContain("sm:text-[");
  });

  it("skeleton branch renders no h1 ladder to drift from the loaded branch", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el.tagName).toBe("DIV");
    expect(el.className).not.toContain("text-[");
  });
});
