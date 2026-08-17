import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { JobOpeningsSection } from "./JobOpeningsSection";
import type { JobsResponse } from "@/lib/careers-jobs";

expect.extend(matchers);

interface JobsHookState {
  data: JobsResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const apiData: JobsResponse = {
  jobs: [
    {
      id: 1,
      title: "Relationship Manager",
      department: "Retail Banking",
      location: "India",
      type: "Full-Time",
      description: "As a Relationship Manager at YourBank...",
    },
    {
      id: 2,
      title: "Risk Analyst",
      department: "Risk Management",
      location: "India",
      type: "Full-Time",
      description: "As a Risk Analyst at YourBank...",
    },
    {
      id: 3,
      title: "IT Security Specialist",
      department: "Information Technology",
      location: "India",
      type: "Full-Time",
      description: "As an IT Security Specialist at YourBank...",
    },
  ],
};

const baseMock: JobsHookState = {
  data: apiData,
  error: undefined,
  isLoading: false,
};

let mockState: JobsHookState = { ...baseMock };

vi.mock("@/lib/careers-jobs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/careers-jobs")>();
  return { ...actual, useCareersJobsData: () => mockState };
});

vi.mock("@/lib/use-mounted", () => ({ useMounted: () => true }));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("JobOpeningsSection (SWR integration)", () => {
  it("renders the section", () => {
    render(<JobOpeningsSection />);
    expect(screen.getByTestId("job-openings-section")).toBeInTheDocument();
  });

  it("renders the section header", () => {
    render(<JobOpeningsSection />);
    expect(screen.getByTestId("job-openings-section-header")).toBeInTheDocument();
  });

  it("renders heading with correct text", () => {
    render(<JobOpeningsSection />);
    expect(screen.getByTestId("job-openings-section-heading").textContent).toBe("Job Openings");
  });

  it("renders paragraph containing 'Explore'", () => {
    render(<JobOpeningsSection />);
    expect(screen.getByTestId("job-openings-section-paragraph").textContent).toContain("Explore");
  });

  it("renders 3 job cards from API data", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      expect(screen.getByTestId(`job-card-${i}`)).toBeInTheDocument();
    });
  });

  it("renders correct job titles from API data", () => {
    render(<JobOpeningsSection />);
    expect(screen.getByTestId("job-card-title-0").textContent).toBe("Relationship Manager");
    expect(screen.getByTestId("job-card-title-1").textContent).toBe("Risk Analyst");
    expect(screen.getByTestId("job-card-title-2").textContent).toBe("IT Security Specialist");
  });

  it("renders location and department for each card", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      expect(screen.getByTestId(`job-card-location-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`job-card-department-${i}`)).toBeInTheDocument();
    });
  });

  it("renders About This Job section for each card", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      expect(screen.getByTestId(`job-card-about-heading-${i}`).textContent).toBe("About This Job");
      expect(screen.getByTestId(`job-card-about-body-${i}`)).toBeInTheDocument();
    });
  });

  it("renders Apply Now button for each card", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      expect(screen.getByTestId(`job-card-apply-btn-${i}`).textContent).toBe("Apply Now");
    });
  });

  it("shows loading skeleton when isLoading=true", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<JobOpeningsSection />);
    expect(screen.getByTestId("job-card-0")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<JobOpeningsSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  // BC-167 — monotonic heading ladder. Figma has exactly three frames for this
  // heading: 390 = 28px, 1440 = 38px, 1920 = 48px, lineHeight 150% at all three.
  // Resolved: < 768 -> 28px, 768-1919 -> 38px, >= 1920 -> 48px. `lg` is 1024 while
  // `laptop` is 1440, so an lg/laptop pair made 1280 render larger (48) than 1440 (38).
  it("heading renders the Figma 28/38/48 ladder with 150% line-height", () => {
    render(<JobOpeningsSection />);
    const heading = screen.getByTestId("job-openings-section-heading");
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
  // Figma "Job Openings": desktop 55:792, laptop 113:7237, mobile 113:9634 — all fontWeight 500.
  // A `laptop:`/`desktop:` weight variant is a min-width override, so any such
  // class would split the weight at 1440 and diverge from the design.
  it("heading renders font-weight 500 at every breakpoint", () => {
    render(<JobOpeningsSection />);
    const heading = screen.getByTestId("job-openings-section-heading");
    expect(heading.className).toMatch(/(?:^|\s)font-medium(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:^|\s)font-normal(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/);
  });
  // BC-178 — job card title ladder. Figma has exactly three frames: mobile 390
  // (113:9641) = 20px, laptop 1440 (113:7244) = 24px, desktop 1920 (55:847) = 30px.
  // Resolved: < 1440 -> 20px, 1440-1919 -> 24px, >= 1920 -> 30px.
  // The old ladder was `text-[24px] md:text-[30px] laptop:text-[24px]`, which hit
  // 30px at 768 and then dropped back to 24px at 1440, never recovering at 1920.
  it.each([0, 1, 2])(
    "job-card-title-%i renders the Figma 20/24/30 ladder and a 150 percent line-height",
    (i) => {
      render(<JobOpeningsSection />);
      const title = screen.getByTestId(`job-card-title-${i}`);
      expect(title.className).toContain("text-[20px]");
      expect(title.className).toContain("laptop:text-[24px]");
      expect(title.className).toContain("desktop:text-[30px]");
      expect(title.className).toContain("leading-[150%]");
      // No frame specifies a step at md; 24px must not be the base size.
      expect(title.className).not.toMatch(/(?:^|\s)text-\[24px\]/);
      expect(title.className).not.toMatch(/(?:sm|md|lg|xl|2xl):text-\[/);
      expect(title.className).not.toMatch(
        /(?:^|\s)text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)(?:\s|$)/
      );
    }
  );
});
