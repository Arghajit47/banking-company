import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { JobOpeningsSection } from "./JobOpeningsSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("JobOpeningsSection", () => {
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

  it("renders paragraph text starting with 'Explore'", () => {
    render(<JobOpeningsSection />);
    expect(screen.getByTestId("job-openings-section-paragraph").textContent).toContain("Explore");
  });

  it("renders 3 job cards", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      expect(screen.getByTestId(`job-card-${i}`)).toBeInTheDocument();
    });
  });

  it("renders correct titles for all 3 job cards", () => {
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

  it("renders Requirements section for each card", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      expect(screen.getByTestId(`job-card-req-heading-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`job-card-req-list-${i}`)).toBeInTheDocument();
    });
  });

  it("renders 5 requirements for each card", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      [0, 1, 2, 3, 4].forEach((j) => {
        expect(screen.getByTestId(`job-card-req-item-${i}-${j}`)).toBeInTheDocument();
      });
    });
  });

  it("renders Apply Now button for each card", () => {
    render(<JobOpeningsSection />);
    [0, 1, 2].forEach((i) => {
      const btn = screen.getByTestId(`job-card-apply-btn-${i}`);
      expect(btn).toBeInTheDocument();
      expect(btn.textContent).toBe("Apply Now");
    });
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<JobOpeningsSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });
});
