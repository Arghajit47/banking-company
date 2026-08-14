import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { PressReleasesSection } from "./PressReleasesSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("PressReleasesSection", () => {
  it("renders the section", () => {
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-releases-section")).toBeInTheDocument();
  });

  it("renders the section header", () => {
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-releases-section-header")).toBeInTheDocument();
  });

  it("renders heading 'Press Releases'", () => {
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-releases-section-heading").textContent).toBe("Press Releases");
  });

  it("renders intro paragraph mentioning YourBank", () => {
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-releases-section-paragraph").textContent).toContain("YourBank");
  });

  it("renders the cards grid", () => {
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-releases-grid")).toBeInTheDocument();
  });

  it("renders 4 press release cards", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`press-release-card-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card images", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`press-release-card-image-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card titles", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      const title = screen.getByTestId(`press-release-card-title-${i}`);
      expect(title.textContent!.length).toBeGreaterThan(0);
    }
  });

  it("renders card locations", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`press-release-card-location-${i}`).textContent).toContain("Location:");
    }
  });

  it("renders card dates", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`press-release-card-date-${i}`).textContent).toContain("Date:");
    }
  });

  it("renders card excerpts", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      const excerpt = screen.getByTestId(`press-release-card-excerpt-${i}`);
      expect(excerpt.textContent!.length).toBeGreaterThan(0);
    }
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<PressReleasesSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  it("first card contains YourBank Launches New Rewards", () => {
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-release-card-title-1").textContent).toContain("YourBank Launches New Rewards");
  });
});
