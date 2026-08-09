import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach } from "vitest";
import { FAQSection } from "./FAQSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("FAQSection", () => {
  it("renders the FAQ section", () => {
    render(<FAQSection />);
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
  });

  it("displays FAQ heading with Frequently and Asked Questions", () => {
    render(<FAQSection />);
    const heading = screen.getByTestId("faq-heading");
    expect(heading).toHaveTextContent("Frequently");
    expect(heading).toHaveTextContent("Asked Questions");
  });

  it("displays FAQ subheading", () => {
    render(<FAQSection />);
    expect(screen.getByTestId("faq-subheading")).toHaveTextContent("Still you have any questions");
  });

  it("shows 4 items initially", () => {
    render(<FAQSection />);
    const items = screen.getAllByTestId(/^faq-item-/);
    expect(items).toHaveLength(4);
  });

  it("all 4 initial items show answers immediately", () => {
    render(<FAQSection />);
    const answers = screen.getAllByTestId("faq-answer");
    expect(answers).toHaveLength(4);
  });

  it("faq-fade-overlay is present when not all shown", () => {
    render(<FAQSection />);
    expect(screen.getByTestId("faq-fade-overlay")).toBeInTheDocument();
  });

  it("faq-fade-overlay is absent after Load All click", () => {
    render(<FAQSection />);
    fireEvent.click(screen.getByTestId("faq-load-all"));
    expect(screen.queryByTestId("faq-fade-overlay")).not.toBeInTheDocument();
  });

  it("Load All FAQ button is visible", () => {
    render(<FAQSection />);
    expect(screen.getByTestId("faq-load-all")).toBeInTheDocument();
  });

  it("Load All button shows all FAQs", () => {
    render(<FAQSection />);
    fireEvent.click(screen.getByTestId("faq-load-all"));
    const items = screen.getAllByTestId(/^faq-item-/);
    expect(items.length).toBeGreaterThan(4);
  });
});
