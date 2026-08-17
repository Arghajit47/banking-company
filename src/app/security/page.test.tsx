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
