import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { AboutHeroSection } from "./AboutHeroSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("AboutHeroSection", () => {
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

  it("renders heading with 'Where Banking Meets'", () => {
    render(<AboutHeroSection />);
    const heading = screen.getByTestId("about-hero-heading");
    expect(heading.textContent).toContain("Where Banking Meets");
  });

  it("renders heading with 'Excellence!'", () => {
    render(<AboutHeroSection />);
    const heading = screen.getByTestId("about-hero-heading");
    expect(heading.textContent).toContain("Excellence!");
  });

  it("renders paragraph containing 'At YourBank'", () => {
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

  it("uses no light-theme classes", () => {
    const { container } = render(<AboutHeroSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });
});
