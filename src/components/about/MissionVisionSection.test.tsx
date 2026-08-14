import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { MissionVisionSection } from "./MissionVisionSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
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

  it("renders mission card heading", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("mission-card-heading").textContent).toBe("Mission");
  });

  it("renders mission card body", () => {
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

  it("renders vision card heading", () => {
    render(<MissionVisionSection />);
    expect(screen.getByTestId("vision-card-heading").textContent).toBe("Vision");
  });

  it("renders vision card body", () => {
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
});
