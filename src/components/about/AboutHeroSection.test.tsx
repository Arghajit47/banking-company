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
});
