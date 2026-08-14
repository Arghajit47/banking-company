import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { SecurityHeroSection } from "./SecurityHeroSection";

expect.extend(matchers);

const MOCK_DATA = {
  headline: "Your Security is Our",
  headlineAccent: "Top Priority",
  body: "At YourBank, we understand the importance of keeping your financial information secure.",
  imageUrl: "/assets/images/security_hero_image.png",
};

let mockState = { data: MOCK_DATA, error: undefined, isLoading: false };

vi.mock("@/lib/security-hero", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/security-hero")>();
  return {
    ...actual,
    useSecurityHeroData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  cleanup();
  mockState = { data: MOCK_DATA, error: undefined, isLoading: false };
});

describe("SecurityHeroSection", () => {
  it("renders the section", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-section")).toBeInTheDocument();
  });

  it("renders the text container", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-text-container")).toBeInTheDocument();
  });

  it("renders the heading with data from API", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-heading").textContent).toContain("Your Security is Our");
  });

  it("renders the heading accent 'Top Priority' from API", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-heading").textContent).toContain("Top Priority");
  });

  it("renders the body paragraph from API", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-paragraph").textContent).toContain("At YourBank");
  });

  it("renders the image wrapper", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-image-wrapper")).toBeInTheDocument();
  });

  it("renders the hero image", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-image")).toBeInTheDocument();
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<SecurityHeroSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  it("shows skeleton when not mounted", () => {
    mockState = { data: undefined as never, error: undefined, isLoading: true };
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-section")).toBeInTheDocument();
  });
});
