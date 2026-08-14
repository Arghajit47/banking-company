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
});
