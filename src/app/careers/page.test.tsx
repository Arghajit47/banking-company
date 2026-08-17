import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import CareersPage from "./page";

vi.mock("@/components/careers/CareersHeroSection", () => ({
  CareersHeroSection: () => <div data-testid="careers-hero-section" />,
}));
vi.mock("@/components/careers/ValuesSection", () => ({
  ValuesSection: () => <div data-testid="values-section" />,
}));
vi.mock("@/components/careers/BenefitsSection", () => ({
  BenefitsSection: () => <div data-testid="benefits-section" />,
}));
vi.mock("@/components/careers/JobOpeningsSection", () => ({
  JobOpeningsSection: () => <div data-testid="job-openings-section" />,
}));
vi.mock("@/components/layout/Navbar", () => ({
  Navbar: () => <div data-testid="navbar" />,
}));

describe("Careers page container margins", () => {
  it("carries a container margin at every tier", () => {
    const { container } = render(<CareersPage />);
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
    // Figma: mobile 113:7470 = 16, laptop 113:5043 = 80, desktop 49:25 = 162.
    expect(main!.className).toContain("px-4");
    expect(main!.className).toContain("laptop:px-20");
    expect(main!.className).toContain("desktop:px-[162px]");
  });

  it("invents no intermediate horizontal step — there is no tablet frame", () => {
    const { container } = render(<CareersPage />);
    const main = container.querySelector("main");
    expect(main!.className).not.toContain("md:px-8");
    expect(main!.className).not.toContain("lg:px-12");
    expect(main!.className).not.toContain("lg:px-[162px]");
  });
});
