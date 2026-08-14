import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { ProtectionSection } from "./ProtectionSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("ProtectionSection", () => {
  it("renders the section", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-section")).toBeInTheDocument();
  });

  it("renders the section header", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-section-header")).toBeInTheDocument();
  });

  it("renders heading with 'How We' and 'Protect You'", () => {
    render(<ProtectionSection />);
    const heading = screen.getByTestId("protection-section-heading");
    expect(heading.textContent).toContain("How We");
    expect(heading.textContent).toContain("Protect You");
  });

  it("renders intro paragraph mentioning YourBank", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-section-paragraph").textContent).toContain("At YourBank");
  });

  it("renders protection cards container", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-cards-container")).toBeInTheDocument();
  });

  it("renders 4 protection cards", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`protection-card-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card icons", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`protection-card-icon-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card titles", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      const title = screen.getByTestId(`protection-card-title-${i}`);
      expect(title.textContent!.length).toBeGreaterThan(0);
    }
  });

  it("renders card descriptions", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      const desc = screen.getByTestId(`protection-card-description-${i}`);
      expect(desc.textContent!.length).toBeGreaterThan(0);
    }
  });

  it("first card title is 'Secure Online Banking Platform'", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-card-title-1").textContent).toBe("Secure Online Banking Platform");
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<ProtectionSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });
});
