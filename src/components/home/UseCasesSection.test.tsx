import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { UseCasesSection } from "./UseCasesSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("UseCasesSection", () => {
  it("renders section heading and subheading", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-heading")).toHaveTextContent("Use Cases");
    expect(screen.getByTestId("use-cases-subheading")).toHaveTextContent(
      "At YourBank, we cater to the diverse needs of individuals and businesses alike",
    );
  });

  it("renders both row wrappers", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-row-individuals")).toBeInTheDocument();
    expect(screen.getByTestId("use-cases-row-businesses")).toBeInTheDocument();
  });

  it("renders 4 individuals cards with correct titles", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-case-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("use-case-title-1")).toHaveTextContent(
      "Managing Personal Finances",
    );
    expect(screen.getByTestId("use-case-title-2")).toHaveTextContent("Saving for the Future");
    expect(screen.getByTestId("use-case-title-3")).toHaveTextContent("Homeownership");
    expect(screen.getByTestId("use-case-title-4")).toHaveTextContent("Education Funding");
  });

  it("renders 4 businesses cards with correct titles", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-case-card-5")).toBeInTheDocument();
    expect(screen.getByTestId("use-case-title-5")).toHaveTextContent(
      "Startups and Entrepreneurs",
    );
    expect(screen.getByTestId("use-case-title-6")).toHaveTextContent("Cash Flow Management");
    expect(screen.getByTestId("use-case-title-7")).toHaveTextContent("Business Expansion");
    expect(screen.getByTestId("use-case-title-8")).toHaveTextContent("Payment Solutions");
  });

  it("renders all 8 use case icons", () => {
    render(<UseCasesSection />);
    for (let i = 1; i <= 8; i++) {
      expect(screen.getByTestId(`use-case-icon-${i}`)).toBeInTheDocument();
    }
  });

  it("renders individuals text panel with heading and paragraph", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-individuals");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveTextContent("For Individuals");
    expect(panel).toHaveTextContent("mortgage services pave the way to homeownership");
  });

  it("renders businesses text panel with heading and paragraph", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-businesses");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveTextContent("For Business");
    expect(panel).toHaveTextContent("working capital solutions that optimize cash flow");
  });

  it("renders individuals stats correctly", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-individuals");
    expect(panel).toHaveTextContent("78%");
    expect(panel).toHaveTextContent("Secure Retirement Planning");
    expect(panel).toHaveTextContent("63%");
    expect(panel).toHaveTextContent("Manageable Debt Consolidation");
    expect(panel).toHaveTextContent("91%");
    expect(panel).toHaveTextContent("Reducing financial burdens");
  });

  it("renders businesses stats correctly", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-text-businesses");
    expect(panel).toHaveTextContent("65%");
    expect(panel).toHaveTextContent("Cash Flow Management");
    expect(panel).toHaveTextContent("70%");
    expect(panel).toHaveTextContent("Drive Business Expansion");
    expect(panel).toHaveTextContent("45%");
    expect(panel).toHaveTextContent("Streamline payroll processing");
  });

  it("renders Learn More buttons for both rows", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-btn-individuals")).toHaveTextContent("Learn More");
    expect(screen.getByTestId("use-cases-btn-businesses")).toHaveTextContent("Learn More");
  });

  it("renders card panels for both audiences", () => {
    render(<UseCasesSection />);
    expect(screen.getByTestId("use-cases-cards-panel-individuals")).toBeInTheDocument();
    expect(screen.getByTestId("use-cases-cards-panel-businesses")).toBeInTheDocument();
  });

  it("heading has lime green color class", () => {
    render(<UseCasesSection />);
    const heading = screen.getByTestId("use-cases-heading");
    expect(heading.className).toContain("text-[#CAFF33]");
  });

  it("card panels have correct dark background", () => {
    render(<UseCasesSection />);
    const panel = screen.getByTestId("use-cases-cards-panel-individuals");
    expect(panel.className).toContain("bg-[#1C1C1C]");
    expect(panel.className).toContain("rounded-[20px]");
  });

  it("individual cards have correct dark background and border", () => {
    render(<UseCasesSection />);
    const card = screen.getByTestId("use-case-card-1");
    expect(card.className).toContain("bg-[#1A1A1A]");
    expect(card.className).toContain("border-[#262626]");
    expect(card.className).toContain("rounded-2xl");
  });
});
