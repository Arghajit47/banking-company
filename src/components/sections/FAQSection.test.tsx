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

  it("toggles accordion open on click", () => {
    render(<FAQSection />);
    const toggle = screen.getByTestId("faq-toggle-1");
    fireEvent.click(toggle);
    expect(screen.getByTestId("faq-answer")).toBeInTheDocument();
  });

  it("closes accordion on second click", () => {
    render(<FAQSection />);
    const toggle = screen.getByTestId("faq-toggle-1");
    fireEvent.click(toggle);
    expect(screen.getByTestId("faq-answer")).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByTestId("faq-answer")).not.toBeInTheDocument();
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

  it("expand/collapse icon is rendered", () => {
    render(<FAQSection />);
    // Chevron icons are rendered (at least the Load All button has one)
    const images = document.querySelectorAll('img[src="/assets/icons/icon_expand_collapse.svg"]');
    expect(images.length).toBeGreaterThan(0);
  });
});
