import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { ValuesSection } from "./ValuesSection";

expect.extend(matchers);

afterEach(() => cleanup());

describe("ValuesSection", () => {
  it("renders the section with correct testid", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-section")).toBeInTheDocument();
  });

  it("renders the header area", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-section-header")).toBeInTheDocument();
  });

  it("renders heading with 'Our' and 'Values' text", () => {
    render(<ValuesSection />);
    const heading = screen.getByTestId("values-section-heading");
    expect(heading).toHaveTextContent("Our");
    expect(heading).toHaveTextContent("Values");
  });

  it("renders the section paragraph", () => {
    render(<ValuesSection />);
    const para = screen.getByTestId("values-section-paragraph");
    expect(para).toHaveTextContent("At YourBank");
  });

  it("renders the card grid", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-section-grid")).toBeInTheDocument();
  });

  it("renders 4 value cards", () => {
    render(<ValuesSection />);
    for (let i = 0; i < 4; i++) {
      expect(screen.getByTestId(`values-card-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card titles for all 4 values", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-card-title-0")).toHaveTextContent("Integrity");
    expect(screen.getByTestId("values-card-title-1")).toHaveTextContent("Customer Centricity");
    expect(screen.getByTestId("values-card-title-2")).toHaveTextContent("Collaboration");
    expect(screen.getByTestId("values-card-title-3")).toHaveTextContent("Innovation");
  });

  it("renders card body text for all 4 values", () => {
    render(<ValuesSection />);
    expect(screen.getByTestId("values-card-body-0")).toHaveTextContent("honesty");
    expect(screen.getByTestId("values-card-body-1")).toHaveTextContent("customers are at the heart");
    expect(screen.getByTestId("values-card-body-2")).toHaveTextContent("collaborative");
    expect(screen.getByTestId("values-card-body-3")).toHaveTextContent("innovative solutions");
  });

  it("contains no light-theme class names", () => {
    const { container } = render(<ValuesSection />);
    const html = container.innerHTML;
    expect(html).not.toMatch(/\bbg-white\b/);
    expect(html).not.toMatch(/\btext-zinc-/);
    expect(html).not.toMatch(/\btext-gray-/);
    expect(html).not.toMatch(/\btext-slate-/);
  });
});
