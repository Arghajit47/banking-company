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
