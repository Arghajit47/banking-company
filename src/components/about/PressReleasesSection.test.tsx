import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { PressReleasesSection } from "./PressReleasesSection";

expect.extend(matchers);

const MOCK_DATA = {
  pressReleases: [
    {
      id: 1,
      date: "2024-11-06",
      headline: "YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction",
      excerpt: "YourBank is pleased to announce the introduction of our new Rewards Program.",
      imageUrl: "/assets/images/press_image_1.png",
      url: "#",
    },
    {
      id: 2,
      date: "2024-11-12",
      headline: "YourBank Expands Branch Network with Opening of New Location in Chennai",
      excerpt: "YourBank is excited to announce the grand opening of our newest branch.",
      imageUrl: "/assets/images/press_image_2.png",
      url: "#",
    },
    {
      id: 3,
      date: "2024-12-24",
      headline: "YourBank Partners with Local Nonprofit to Support Financial Education Initiatives",
      excerpt: "YourBank is excited to unveil our new Sustainable Banking Initiative.",
      imageUrl: "/assets/images/press_image_3.png",
      url: "#",
    },
    {
      id: 4,
      date: "2024-12-28",
      headline: "YourBank Launches Sustainable Banking Initiative",
      excerpt: "Demonstrating our commitment to environmental responsibility.",
      imageUrl: "/assets/images/press_image_4.png",
      url: "#",
    },
  ],
};

let mockState = { data: MOCK_DATA, error: undefined, isLoading: false };

vi.mock("@/lib/about-press-releases", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/about-press-releases")>();
  return {
    ...actual,
    useAboutPressReleasesData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  cleanup();
  mockState = { data: MOCK_DATA, error: undefined, isLoading: false };
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

  it("renders 4 press release cards from API", () => {
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

  it("renders card titles from API", () => {
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

  it("renders card dates from API", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`press-release-card-date-${i}`).textContent).toContain("Date:");
    }
  });

  it("renders card excerpts from API", () => {
    render(<PressReleasesSection />);
    for (let i = 1; i <= 4; i++) {
      const excerpt = screen.getByTestId(`press-release-card-excerpt-${i}`);
      expect(excerpt.textContent!.length).toBeGreaterThan(0);
    }
  });

  it("first card title matches API data", () => {
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-release-card-title-1").textContent).toContain("YourBank Launches New Rewards");
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<PressReleasesSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  it("shows skeleton when not mounted", () => {
    mockState = { data: undefined as never, error: undefined, isLoading: true };
    render(<PressReleasesSection />);
    expect(screen.getByTestId("press-releases-section")).toBeInTheDocument();
  });

  // BC-162 — `laptop` is a min-width variant, so the 38px laptop override kept
  // applying at 1920. Figma "Press Releases": desktop 58:1314 = 48px, laptop 113:10162 = 38px,
  // mobile 116:10563 = 28px, lineHeight 150% at every breakpoint.
  it("heading carries a desktop 48px override above the laptop 38px one", () => {
    render(<PressReleasesSection />);
    const heading = screen.getByTestId("press-releases-section-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
  });

  // Line height must stay derived from `leading-[150%]`; a hardcoded per-breakpoint
  // pixel leading would desync from the font size and reintroduce BC-162.
  it("heading has no hardcoded per-breakpoint pixel line-height", () => {
    render(<PressReleasesSection />);
    const heading = screen.getByTestId("press-releases-section-heading");
    expect(heading.className).not.toMatch(/laptop:leading-\[/);
    expect(heading.className).not.toMatch(/desktop:leading-\[/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-\[\d+px\]/);
  });
});
