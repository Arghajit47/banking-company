import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { AboutHeroSection } from "./AboutHeroSection";
import type { AboutHeroData } from "@/lib/about-hero";

expect.extend(matchers);

interface AboutHeroHookState {
  data: AboutHeroData | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const apiData: AboutHeroData = {
  headline: "Where Banking Meets ",
  subheadline: "Excellence!",
  body: "At YourBank, we believe that banking should be more than just transactions.",
  imageUrl: "/assets/images/about_hero_image.png",
};

const baseMock: AboutHeroHookState = {
  data: apiData,
  error: undefined,
  isLoading: false,
};

let mockState: AboutHeroHookState = { ...baseMock };

vi.mock("@/lib/about-hero", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/about-hero")>();
  return { ...actual, useAboutHeroData: () => mockState };
});

vi.mock("@/lib/use-mounted", () => ({ useMounted: () => true }));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("AboutHeroSection (SWR integration)", () => {
  it("renders the section", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-section")).toBeInTheDocument();
  });

  it("renders the text container", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-text-container")).toBeInTheDocument();
  });

  it("renders label with 'Welcome to YourBank'", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-label").textContent).toBe("Welcome to YourBank");
  });

  it("renders heading with API headline", () => {
    render(<AboutHeroSection />);
    const heading = screen.getByTestId("about-hero-heading");
    expect(heading.textContent).toContain("Where Banking Meets");
  });

  it("renders heading with API subheadline", () => {
    render(<AboutHeroSection />);
    const heading = screen.getByTestId("about-hero-heading");
    expect(heading.textContent).toContain("Excellence!");
  });

  it("renders paragraph containing API body", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-paragraph").textContent).toContain("At YourBank");
  });

  it("renders the image wrapper", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-image-wrapper")).toBeInTheDocument();
  });

  it("renders the hero image", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-image")).toBeInTheDocument();
  });

  it("shows loading skeleton when isLoading=true", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-heading")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<AboutHeroSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  // BC-165 — Figma parity for the About hero at 1440 (laptop 113:9895/113:9896)
  // and 390 (mobile 116:10297/116:10300).
  it("text container carries the 390 mobile tokens (gap 14, radius 20, pad 24, -41 overlap)", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("rounded-[20px]");
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("-mt-[41px]");
    expect(el).toHaveClass("md:mt-0");
  });

  it("text container carries the 1440 laptop tokens (width 658, gap 20, radius 20/0/60/20, pad 60)", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("laptop:w-[658px]");
    expect(el).toHaveClass("laptop:gap-[20px]");
    expect(el).toHaveClass("laptop:rounded-[20px_0_60px_20px]");
    expect(el).toHaveClass("laptop:p-[60px]");
  });

  it("stacks image above text at 390 via flex-col-reverse, keeping the laptop row order", () => {
    render(<AboutHeroSection />);
    const row = screen.getByTestId("about-hero-text-container").parentElement;
    expect(row).toHaveClass("flex-col-reverse");
    expect(row).toHaveClass("md:flex-row");
    expect(row).not.toHaveClass("flex-col");
  });

  it("image wrapper overlaps by 174px at 1440 and has no positive mobile top margin", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-image-wrapper");
    expect(el).toHaveClass("laptop:-ml-[174px]");
    expect(el).not.toHaveClass("mt-6");
  });

  it("label is 14px at 390 and 18px at 1440", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-label");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[18px]");
  });

  it("heading is 28px at 390 and stays 48px at 1440", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-heading");
    expect(el).toHaveClass("text-[28px]");
    expect(el).toHaveClass("laptop:text-[48px]");
  });

  it("paragraph is 14px at 390 and 16px at 1440", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-paragraph");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[16px]");
  });

  it("skeleton branch carries the same layout tokens as the loaded branch", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("-mt-[41px]");
    expect(el).toHaveClass("laptop:w-[658px]");
    expect(el).toHaveClass("laptop:p-[60px]");
    expect(el.parentElement).toHaveClass("flex-col-reverse");
    expect(screen.getByTestId("about-hero-image-wrapper")).toHaveClass(
      "laptop:-ml-[174px]",
    );
  });
});
