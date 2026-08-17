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

describe("Careers page vertical padding", () => {
  const mainOf = () => {
    const { container } = render(<CareersPage />);
    return container.querySelector("main")!;
  };

  it("expresses the navbar-to-hero gap from Figma: 30 / 50 / 53", () => {
    // 390  113:7470 — hero y=138 - navbar bottom 108 = 30
    // 1440 113:5043 — hero y=153 - navbar bottom 103 = 50
    // 1920 49:25    — hero y=198 - navbar bottom 145 = 53
    const className = mainOf().className;
    expect(className).toContain("pt-[30px]");
    expect(className).toContain("laptop:pt-[50px]");
    expect(className).toContain("desktop:pt-[53px]");
  });

  it("expresses the last-section-to-footer gap from Figma: 80 / 120 / 150", () => {
    const className = mainOf().className;
    expect(className).toContain("pb-20");
    expect(className).toContain("laptop:pb-[120px]");
    expect(className).toContain("desktop:pb-[150px]");
  });

  it("no longer renders <main> with zero vertical padding", () => {
    const className = mainOf().className;
    expect(/(^|\s)p[tby]-/.test(className)).toBe(true);
  });

  it("keeps every vertical step on a real frame breakpoint", () => {
    const prefixes = mainOf()
      .className.split(/\s+/)
      .filter((c) => /(^|:)p[tby]-/.test(c))
      .map((c) => (c.includes(":") ? c.slice(0, c.indexOf(":")) : ""));
    expect(new Set(prefixes)).toEqual(new Set(["", "laptop", "desktop"]));
  });

  it("leaves BC-185's horizontal ladder untouched", () => {
    const className = mainOf().className;
    expect(className).toContain("px-4");
    expect(className).toContain("laptop:px-20");
    expect(className).toContain("desktop:px-[162px]");
  });
});
