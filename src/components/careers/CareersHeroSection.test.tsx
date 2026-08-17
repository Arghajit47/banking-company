import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import type { CareersHeroData } from "@/lib/careers-hero";
import { CareersHeroSection } from "./CareersHeroSection";

expect.extend(matchers);

interface CareersHeroHookState {
  data: CareersHeroData | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const MOCK_DATA: CareersHeroData = {
  headline: "Welcome to YourBank Careers!",
  body: "At YourBank, we believe in fostering a culture of excellence and innovation.",
  ctaLabel: "View Openings",
  imageUrl: "/assets/images/careers_hero_image.png",
};

let mockState: CareersHeroHookState = {
  data: MOCK_DATA,
  error: undefined,
  isLoading: false,
};

vi.mock("@/lib/careers-hero", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/careers-hero")>();
  return {
    ...actual,
    useCareersHeroData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  cleanup();
  mockState = { data: MOCK_DATA, error: undefined, isLoading: false };
});

describe("CareersHeroSection", () => {
  it("renders the heading with data from API", () => {
    render(<CareersHeroSection />);
    expect(screen.getByTestId("careers-hero-heading").textContent).toContain(
      "Welcome to",
    );
  });

  // Figma nodes 58:1545 (1920) / 113:7170 (1440) / 113:9567 (390) — 58 / 48 / 28, lineHeight 130%
  it("heading is 28px at 390 and stays 48px from 768 through 1439 and at 1440", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el).toHaveClass("text-[28px]");
    // md (768) carries 48px unbroken up to the desktop tier, so 1280 and 1440 both resolve to 48px
    expect(el).toHaveClass("md:text-[48px]");
  });

  it("heading is 58px at 1920", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el).toHaveClass("desktop:text-[58px]");
  });

  it("heading line height is 130% at every tier", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el).toHaveClass("leading-[130%]");
    expect(el.className).not.toContain("md:leading-");
    expect(el.className).not.toContain("desktop:leading-");
  });

  it("heading ladder is monotonic and carries no size Figma does not specify", () => {
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    // 32px appeared at no Figma frame — mobile (113:9567) is 28px
    expect(el.className).not.toContain("text-[32px]");
    // no Figma frame specifies a size at Tailwind's lg (1024); lg:text-[58px] made 1280 render larger than 1440
    expect(el.className).not.toContain("lg:text-[");
    expect(el.className).not.toContain("laptop:text-[");
    expect(el.className).not.toContain("sm:text-[");
  });

  // Figma: text container 113:7169 (1440) = 658 / gap 20 / radius 20-0-60-20 / pad 60
  //        58:1539 (1920) = 791 / gap 23 / radius 20-0-80-20 / pad 80
  // Mirrors AboutHeroSection + SecurityHeroSection (BC-165) — three heroes share one shape.
  describe.each([
    ["loaded", false],
    ["skeleton", true],
  ])("%s branch responsive tiers", (_label, skeleton) => {
    function renderBranch() {
      if (skeleton) {
        mockState = { data: undefined, error: undefined, isLoading: true };
      }
      render(<CareersHeroSection />);
    }

    it("text container carries the 1920 desktop tier: 791 / 23 / 20-0-80-20 / 80", () => {
      renderBranch();
      const el = screen.getByTestId("careers-hero-text-container");
      expect(el).toHaveClass("desktop:w-[791px]");
      expect(el).toHaveClass("desktop:gap-[23px]");
      expect(el).toHaveClass("desktop:rounded-[20px_0_80px_20px]");
      expect(el).toHaveClass("desktop:p-[80px]");
    });

    it("text container carries the 1440 laptop tier: 658 / 20 / 20-0-60-20 / 60", () => {
      renderBranch();
      const el = screen.getByTestId("careers-hero-text-container");
      expect(el).toHaveClass("laptop:w-[658px]");
      expect(el).toHaveClass("laptop:gap-[20px]");
      expect(el).toHaveClass("laptop:rounded-[20px_0_60px_20px]");
      expect(el).toHaveClass("laptop:p-[60px]");
    });

    // BC-181 — real horizontal overflow at 768 (clientWidth 768 / scrollWidth 841).
    // Figma has only 390 / 1440 / 1920 frames, so the 768-1439 band is unspecified.
    // A fixed md:w-[791px] plus shrink-0 could not shrink inside a 768px viewport,
    // so the card overflowed by construction. The md tier is now fluid, capped at 791.
    it("text container is fluid in the unspecified 768-1439 band, capped at 791", () => {
      renderBranch();
      const el = screen.getByTestId("careers-hero-text-container");
      expect(el).toHaveClass("md:w-full");
      expect(el).toHaveClass("md:max-w-[791px]");
      // the fixed md width is what overflowed at 768 — it must never come back
      expect(el.className).not.toContain("md:w-[791px]");
      // and the QA-passed laptop/desktop tiers stay pinned to their real frames
      expect(el).toHaveClass("laptop:w-[658px]");
      expect(el).toHaveClass("desktop:w-[791px]");
    });

    // BC-187 — the 390 base tier carried desktop-shaped values (gap 23 / radius
    // 20-0-80-20 / padding 32). Figma mobile card 113:9566 is 329x365 with gap 14,
    // padding 24 and a uniform 20 radius — identical to About 116:10300 and
    // Security 116:11071. The md tier keeps the QA-verified 768+ values.
    it("text container carries the 390 mobile tier: 14 / 20 uniform / 24", () => {
      renderBranch();
      const el = screen.getByTestId("careers-hero-text-container");
      expect(el).toHaveClass("gap-[14px]");
      expect(el).toHaveClass("rounded-[20px]");
      expect(el).toHaveClass("p-6");
      // the desktop-shaped mobile values must not come back
      expect(el).not.toHaveClass("gap-[23px]");
      expect(el).not.toHaveClass("rounded-[20px_0_80px_20px]");
      expect(el).not.toHaveClass("p-8");
    });

    it("md tier still pins the QA-verified 768+ values", () => {
      renderBranch();
      const el = screen.getByTestId("careers-hero-text-container");
      expect(el).toHaveClass("md:gap-[23px]");
      expect(el).toHaveClass("md:rounded-[20px_0_80px_20px]");
      expect(el).toHaveClass("md:p-[80px]");
    });

    // BC-186 — md:-ml-[260px] bound the 1920 offset at 768, where the image
    // wrapper is only 260px wide, so it sat exactly its own width behind the
    // text card and was 0px visible. Figma specifies the horizontal overlap
    // only at 1440 (-174) and 1920 (-260); the 768-1439 band has no frame.
    it("image wrapper overlaps -174 at 1440 and -260 at 1920, with no md offset", () => {
      renderBranch();
      const el = screen.getByTestId("careers-hero-image-wrapper");
      expect(el).not.toHaveClass("md:-ml-[260px]");
      expect(el.className).not.toContain("md:-ml-[");
      expect(el).toHaveClass("laptop:-ml-[174px]");
      expect(el).toHaveClass("desktop:-ml-[260px]");
    });

    // BC-186 — removing md:-ml-[260px] is necessary but not sufficient: BC-181 made
    // the card md:w-full, and a shrink-0 card at 100% consumed the whole row, so the
    // flex-1 (basis 0) image wrapper resolved to 0px wide from 768 to ~890 — still
    // invisible, just no longer occluded. md:min-w-[260px] floors the image column and
    // md:shrink lets the card give up that space instead of overflowing.
    // Measured after the fix: 768 -> card 408 / image 260 fully visible, 1024 -> 664 /
    // 260, and 1440 / 1920 unchanged at 658 / 876 and 791 / 968, no overflow anywhere.
    it("image column has a floor in the 768-1439 band and the card yields to it", () => {
      renderBranch();
      expect(screen.getByTestId("careers-hero-image-wrapper")).toHaveClass(
        "md:min-w-[260px]",
      );
      expect(screen.getByTestId("careers-hero-text-container")).toHaveClass(
        "md:shrink",
      );
    });

    // Figma: 113:7168 = 40 @1440, 58:1538 = 50 @1920
    it("section padding is 40 at 1440 and 50 at 1920", () => {
      renderBranch();
      const el = screen.getByTestId("careers-hero-section");
      expect(el).toHaveClass("laptop:p-[40px]");
      expect(el).toHaveClass("desktop:p-[50px]");
    });
  });

  it("skeleton branch renders no h1 ladder to drift from the loaded branch", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<CareersHeroSection />);
    const el = screen.getByTestId("careers-hero-heading");
    expect(el.tagName).toBe("DIV");
    expect(el.className).not.toContain("text-[");
  });
});
