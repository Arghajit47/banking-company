import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import SecurityPage from "./page";

vi.mock("@/components/security/SecurityHeroSection", () => ({
  SecurityHeroSection: () => <div data-testid="security-hero-section" />,
}));
vi.mock("@/components/security/ProtectionSection", () => ({
  ProtectionSection: () => <div data-testid="protection-section" />,
}));
vi.mock("@/components/sections/FAQSection", () => ({
  FAQSection: () => <div data-testid="faq-section" />,
}));
vi.mock("@/components/layout/Navbar", () => ({
  Navbar: () => <div data-testid="navbar" />,
}));

describe("Security page container margins", () => {
  it("resolves to 80 at laptop and 162 at desktop", () => {
    const { container } = render(<SecurityPage />);
    const main = container.querySelector("main");
    expect(main).not.toBeNull();
    // Figma: mobile 116:10982 = 16, laptop 116:10612 = 80, desktop 62:1684 = 162.
    expect(main!.className).toContain("px-4");
    expect(main!.className).toContain("laptop:px-20");
    expect(main!.className).toContain("desktop:px-[162px]");
  });

  it("does not leak the desktop margin down into the laptop band", () => {
    const { container } = render(<SecurityPage />);
    const main = container.querySelector("main");
    expect(main!.className).not.toContain("lg:px-[162px]");
  });

  it("invents no intermediate horizontal step — there is no tablet frame", () => {
    const { container } = render(<SecurityPage />);
    const main = container.querySelector("main");
    expect(main!.className).not.toContain("md:px-8");
    expect(main!.className).not.toContain("lg:px-12");
  });
});

describe("Security page vertical padding", () => {
  const mainOf = () => {
    const { container } = render(<SecurityPage />);
    return container.querySelector("main")!;
  };

  it("expresses the navbar-to-hero gap from Figma: 30 / 50 / 53", () => {
    // 390  116:10982 — hero y=138 - navbar bottom 108 = 30
    // 1440 116:10612 — hero y=153 - navbar bottom 103 = 50
    // 1920 62:1684   — hero y=198 - navbar bottom 145 = 53
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
