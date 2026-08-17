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

  // BC-167 — monotonic heading ladder. Figma has exactly three frames for this
  // heading: 390 = 28px, 1440 = 38px, 1920 = 48px, lineHeight 150% at all three.
  // Resolved: < 768 -> 28px, 768-1919 -> 38px, >= 1920 -> 48px. `lg` is 1024 while
  // `laptop` is 1440, so an lg/laptop pair made 1280 render larger (48) than 1440 (38).
  it("heading renders the Figma 28/38/48 ladder with 150% line-height", () => {
    render(<PressReleasesSection />);
    const heading = screen.getByTestId("press-releases-section-heading");
    expect(heading.className).toContain("text-[28px]");
    expect(heading.className).toContain("md:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
    expect(heading.className).not.toMatch(/(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|lg|xl|2xl|laptop):text-\[/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/);
    expect(heading.className).not.toMatch(/leading-\[\d+px\]/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-(?:tight|snug|normal|relaxed|loose)(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):leading-/);
  });

  // BC-164 — heading font-weight must be uniform across every breakpoint.
  // Figma "Press Releases": desktop 58:1314, laptop 113:10162, mobile 116:10563 — all fontWeight 400.
  // A `laptop:`/`desktop:` weight variant is a min-width override, so any such
  // class would split the weight at 1440 and diverge from the design.
  it("heading renders font-weight 400 at every breakpoint", () => {
    render(<PressReleasesSection />);
    const heading = screen.getByTestId("press-releases-section-heading");
    expect(heading.className).toMatch(/(?:^|\s)font-normal(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:^|\s)font-medium(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/);
  });
  // BC-178 — press release card title ladder. Figma has exactly three frames:
  // mobile 390 (116:10571) = 18px, laptop 1440 (113:10170) = 20px, desktop 1920
  // (62:1629) = 24px. Resolved: < 1440 -> 18px, 1440-1919 -> 20px, >= 1920 -> 24px.
  // The old ladder was `text-[20px] md:text-[24px] laptop:text-[20px]`, which hit
  // 24px at 768 and then dropped back to 20px at 1440, never recovering at 1920.
  it.each([1, 2, 3, 4])(
    "press-release-card-title-%i renders the Figma 18/20/24 ladder and a 150 percent line-height",
    (i) => {
      render(<PressReleasesSection />);
      const title = screen.getByTestId(`press-release-card-title-${i}`);
      expect(title.className).toContain("text-[18px]");
      expect(title.className).toContain("laptop:text-[20px]");
      expect(title.className).toContain("desktop:text-[24px]");
      expect(title.className).toContain("leading-[150%]");
      // No frame specifies a step at md; 20px must not be the base size.
      expect(title.className).not.toMatch(/(?:^|\s)text-\[20px\]/);
      expect(title.className).not.toMatch(/(?:sm|md|lg|xl|2xl):text-\[/);
      expect(title.className).not.toMatch(
        /(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/
      );
    }
  );
});
