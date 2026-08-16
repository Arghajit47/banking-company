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

  // BC-162 — `laptop` is a min-width variant, so the 38px laptop override kept
  // applying at 1920. Figma "Job Openings": desktop 55:792 = 48px, laptop 113:7237 = 38px,
  // mobile 113:9634 = 28px, lineHeight 150% at every breakpoint.
  it("heading carries a desktop 48px override above the laptop 38px one", () => {
    render(<JobOpeningsSection />);
    const heading = screen.getByTestId("job-openings-section-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
  });

  // Line height must stay derived from `leading-[150%]`; a hardcoded per-breakpoint
  // pixel leading would desync from the font size and reintroduce BC-162.
  it("heading has no hardcoded per-breakpoint pixel line-height", () => {
    render(<JobOpeningsSection />);
    const heading = screen.getByTestId("job-openings-section-heading");
    expect(heading.className).not.toMatch(/laptop:leading-\[/);
    expect(heading.className).not.toMatch(/desktop:leading-\[/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-\[\d+px\]/);
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
});
