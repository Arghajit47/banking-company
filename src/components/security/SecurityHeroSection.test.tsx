import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { SecurityHeroSection } from "./SecurityHeroSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
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

  it("renders the heading with 'Your Security is Our'", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-heading").textContent).toContain("Your Security is Our");
  });

  it("renders the heading accent 'Top Priority'", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-heading").textContent).toContain("Top Priority");
  });

  it("renders the body paragraph", () => {
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
});
