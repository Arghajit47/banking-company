import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { MissionVisionSection } from "./MissionVisionSection";

expect.extend(matchers);

const MOCK_DATA = {
  mission: {
    title: "Mission",
    description:
      "At YourBank, our mission is to empower our customers to achieve financial success.",
  },
  vision: {
    title: "Vision",
    description:
      "Our vision at YourBank is to redefine banking by creating a seamless and personalized experience.",
  },
};

let mockState = { data: MOCK_DATA, error: undefined, isLoading: false };

vi.mock("@/lib/about-mission-vision", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/about-mission-vision")>();
  return {
    ...actual,
    useAboutMissionVisionData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  cleanup();
  mockState = { data: MOCK_DATA, error: undefined, isLoading: false };
});

describe("MissionVisionSection", () => {
  it("renders the section", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-vision-section")).toBeInTheDocument();
  });

  it("renders the section header", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-vision-section-header")).toBeInTheDocument();
  });

  it("renders heading 'Mission & Vision'", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-vision-section-heading").textContent).toBe("Mission & Vision");
  });

  it("renders intro paragraph", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-vision-section-paragraph").textContent).toContain("We envision");
  });

  it("renders mission card", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-card")).toBeInTheDocument();
  });

  it("renders mission card heading from API", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-card-heading").textContent).toBe("Mission");
  });

  it("renders mission card body from API", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-card-body").textContent).toContain("At YourBank");
  });

  it("renders mission card image", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-card-image")).toBeInTheDocument();
  });

  it("renders vision card", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("vision-card")).toBeInTheDocument();
  });

  it("renders vision card heading from API", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("vision-card-heading").textContent).toBe("Vision");
  });

  it("renders vision card body from API", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("vision-card-body").textContent).toContain("Our vision at YourBank");
  });

  it("renders vision card image", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("vision-card-image")).toBeInTheDocument();
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<MissionVisionSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  it("shows skeleton when not mounted", () => {
    mockState = { data: undefined as never, error: undefined, isLoading: true };
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-vision-section")).toBeInTheDocument();
  });

  // BC-167 — monotonic heading ladder. Figma has exactly three frames for this
  // heading: 390 = 28px, 1440 = 38px, 1920 = 48px, lineHeight 150% at all three.
  // Resolved: < 768 -> 28px, 768-1919 -> 38px, >= 1920 -> 48px. `lg` is 1024 while
  // `laptop` is 1440, so an lg/laptop pair made 1280 render larger (48) than 1440 (38).
  it("heading renders the Figma 28/38/48 ladder with 150% line-height", () => {
    render(<MissionVisionSection />);
    const heading = screen.getByTestId("mission-vision-section-heading");
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
  // Figma "Mission & Vision": desktop 62:1560, laptop 113:10137, mobile 116:10529 — all fontWeight 400.
  // A `laptop:`/`desktop:` weight variant is a min-width override, so any such
  // class would split the weight at 1440 and diverge from the design.
  it("heading renders font-weight 400 at every breakpoint", () => {
    render(<MissionVisionSection />);
    const heading = screen.getByTestId("mission-vision-section-heading");
    expect(heading.className).toMatch(/(?:^|\s)font-normal(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:^|\s)font-medium(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/);
  });
});
