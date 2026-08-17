import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import AboutPage from "./page";

vi.mock("@/components/about/AboutHeroSection", () => ({
  AboutHeroSection: () => <div data-testid="about-hero-section" />,
}));
vi.mock("@/components/about/MissionVisionSection", () => ({
  MissionVisionSection: () => <div data-testid="mission-vision-section" />,
}));
vi.mock("@/components/about/PressReleasesSection", () => ({
  PressReleasesSection: () => <div data-testid="press-releases-section" />,
}));
vi.mock("@/components/layout/Navbar", () => ({
  Navbar: () => <div data-testid="navbar" />,
}));

describe("About page container margins", () => {
  it("resolves to 80 at laptop and 162 at desktop", () => {
    const { container } = render(<AboutPage />);
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
    // Figma: mobile 116:10211 = 16, laptop 113:9801 = 80, desktop 58:1223 = 162.
    expect(main!.className).toContain("px-4");
    expect(main!.className).toContain("laptop:px-20");
    expect(main!.className).toContain("desktop:px-[162px]");
  });

  it("does not leak the desktop margin down into the laptop band", () => {
    const { container } = render(<AboutPage />);
    const main = container.querySelector("main");
    // `lg:` is min-width 1024, so a 162px margin there is wrong at 1440.
    expect(main!.className).not.toContain("lg:px-[162px]");
  });

  it("invents no intermediate horizontal step — there is no tablet frame", () => {
    const { container } = render(<AboutPage />);
    const main = container.querySelector("main");
    expect(main!.className).not.toContain("md:px-8");
    expect(main!.className).not.toContain("lg:px-12");
  });
});

describe("About page vertical padding", () => {
  const mainOf = () => {
    const { container } = render(<AboutPage />);
    return container.querySelector("main")!;
  };

  it("expresses the navbar-to-hero gap from Figma: 30 / 50 / 53", () => {
    // 390  116:10211 — hero y=138 - navbar bottom 108 = 30
    // 1440 113:9801  — hero y=153 - navbar bottom 103 = 50
    // 1920 58:1223   — hero y=198 - navbar bottom 145 = 53
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

  it("drops the symmetric py ladder that leaked at md and lg", () => {
    // `md:` is 768 and `lg:` is 1024 — neither band has a Figma frame behind it.
    const className = mainOf().className;
    expect(className).not.toContain("py-8");
    expect(className).not.toContain("md:py-12");
    expect(className).not.toContain("lg:py-[80px]");
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
