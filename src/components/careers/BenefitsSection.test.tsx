import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { BenefitsSection } from "./BenefitsSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("BenefitsSection", () => {
  it("renders the section", () => {
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefits-section")).toBeInTheDocument();
  });

  it("renders the section header", () => {
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefits-section-header")).toBeInTheDocument();
  });

  it("renders the heading with correct text", () => {
    render(<BenefitsSection />);
    const heading = screen.getByTestId("benefits-section-heading");
    expect(heading.textContent).toContain("Our");
    expect(heading.textContent).toContain("Benefits");
  });

  it("renders the paragraph text", () => {
    render(<BenefitsSection />);
    const paragraph = screen.getByTestId("benefits-section-paragraph");
    expect(paragraph.textContent).toContain("At YourBank");
  });

  it("renders the grid container", () => {
    render(<BenefitsSection />);
    expect(screen.getByTestId("benefits-section-grid")).toBeInTheDocument();
  });

  it("renders 4 benefit cards", () => {
    render(<BenefitsSection />);
    const cards = [0, 1, 2, 3].map((i) =>
      screen.getByTestId(`benefit-card-${i}`)
    );
    expect(cards).toHaveLength(4);
  });

  it("renders icon, title, and body for each card", () => {
    render(<BenefitsSection />);
    [0, 1, 2, 3].forEach((i) => {
      expect(screen.getByTestId(`benefit-card-icon-${i}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`benefit-card-title-${i}`)
      ).toBeInTheDocument();
      expect(screen.getByTestId(`benefit-card-body-${i}`)).toBeInTheDocument();
    });
  });

  it("renders correct card titles", () => {
    render(<BenefitsSection />);
    const expectedTitles = [
      "Competitive Compensation",
      "Health and Wellness",
      "Retirement Planning",
      "Work-Life Balance",
    ];
    expectedTitles.forEach((title, i) => {
      expect(screen.getByTestId(`benefit-card-title-${i}`).textContent).toBe(
        title
      );
    });
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<BenefitsSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
    expect(container.innerHTML).not.toContain("text-black");
  });
});
