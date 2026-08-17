import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { AboutHeroSection } from "./AboutHeroSection";
import type { AboutHeroData } from "@/lib/about-hero";

expect.extend(matchers);

interface AboutHeroHookState {
  data: AboutHeroData | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const apiData: AboutHeroData = {
  headline: "Where Banking Meets ",
  subheadline: "Excellence!",
  body: "At YourBank, we believe that banking should be more than just transactions.",
  imageUrl: "/assets/images/about_hero_image.png",
};

const baseMock: AboutHeroHookState = {
  data: apiData,
  error: undefined,
  isLoading: false,
};

let mockState: AboutHeroHookState = { ...baseMock };

vi.mock("@/lib/about-hero", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/about-hero")>();
  return { ...actual, useAboutHeroData: () => mockState };
});

vi.mock("@/lib/use-mounted", () => ({ useMounted: () => true }));

afterEach(() => {
  mockState = { ...baseMock };
  cleanup();
});

describe("AboutHeroSection (SWR integration)", () => {
  it("renders the section", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-section")).toBeInTheDocument();
  });

  it("renders the text container", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-text-container")).toBeInTheDocument();
  });

  it("renders label with 'Welcome to YourBank'", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-label").textContent).toBe(
      "Welcome to YourBank",
    );
  });

  it("renders heading with API headline", () => {
    render(<AboutHeroSection />);
    const heading = screen.getByTestId("about-hero-heading");
    expect(heading.textContent).toContain("Where Banking Meets");
  });

  it("renders heading with API subheadline", () => {
    render(<AboutHeroSection />);
    const heading = screen.getByTestId("about-hero-heading");
    expect(heading.textContent).toContain("Excellence!");
  });

  it("renders paragraph containing API body", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-paragraph").textContent).toContain(
      "At YourBank",
    );
  });

  it("renders the image wrapper", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-image-wrapper")).toBeInTheDocument();
  });

  it("renders the hero image", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-image")).toBeInTheDocument();
  });

  it("shows loading skeleton when isLoading=true", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-heading")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<AboutHeroSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  // BC-165 — Figma parity for the About hero at 1440 (laptop 113:9895/113:9896)
  // and 390 (mobile 116:10297/116:10300).
  it("text container carries the 390 mobile tokens (gap 14, radius 20, pad 24, -41 overlap)", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("rounded-[20px]");
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("-mt-[41px]");
    expect(el).toHaveClass("md:mt-0");
  });

  it("text container carries the 1440 laptop tokens (width 658, gap 20, radius 20/0/60/20, pad 60)", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("laptop:w-[658px]");
    expect(el).toHaveClass("laptop:gap-[20px]");
    expect(el).toHaveClass("laptop:rounded-[20px_0_60px_20px]");
    expect(el).toHaveClass("laptop:p-[60px]");
  });

  // BC-181 — real horizontal overflow at 768 (clientWidth 768 / scrollWidth 873).
  // Figma has only 390 / 1440 / 1920 frames, so the 768-1439 band is unspecified.
  // A fixed md:w-[791px] plus shrink-0 could not shrink inside a 768px viewport,
  // so the card overflowed by construction. The md tier is now fluid, capped at 791.
  it("text container is fluid in the unspecified 768-1439 band, capped at 791", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("md:w-full");
    expect(el).toHaveClass("md:max-w-[791px]");
    // the fixed md width is what overflowed at 768 — it must never come back
    expect(el.className).not.toContain("md:w-[791px]");
    // and the QA-passed laptop/desktop tiers stay pinned to their real frames
    expect(el).toHaveClass("laptop:w-[658px]");
    expect(el).toHaveClass("desktop:w-[791px]");
  });

  it("stacks image above text at 390 via flex-col-reverse, keeping the laptop row order", () => {
    render(<AboutHeroSection />);
    const row = screen.getByTestId("about-hero-text-container").parentElement;
    expect(row).toHaveClass("flex-col-reverse");
    expect(row).toHaveClass("md:flex-row");
    expect(row).not.toHaveClass("flex-col");
  });

  it("image wrapper overlaps by 174px at 1440 and has no positive mobile top margin", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-image-wrapper");
    expect(el).toHaveClass("laptop:-ml-[174px]");
    expect(el).not.toHaveClass("mt-6");
  });

  // BC-186 — md:-ml-[260px] bound the 1920 offset at 768, where the image wrapper
  // is only 260px wide, so it sat exactly its own width behind the 636px text card
  // and rendered 0px visible. Figma specifies the horizontal overlap only at 1440
  // (itemSpacing -174, 113:9895) and 1920 (-260, 58:1537) — there is no frame
  // between 390 and 1440, so nothing replaces it in the 768-1439 band.
  it("image wrapper carries no negative offset in the unspecified 768-1439 band", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-image-wrapper");
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
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-image-wrapper")).toHaveClass(
      "md:min-w-[260px]",
    );
    expect(screen.getByTestId("about-hero-text-container")).toHaveClass(
      "md:shrink",
    );
  });

  it("label is 14px at 390 and 18px at 1440", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-label");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[18px]");
  });

  it("heading is 28px at 390 and stays 48px from 768 through 1439 and at 1440", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-heading");
    expect(el).toHaveClass("text-[28px]");
    // md (768) carries 48px unbroken up to the desktop tier, so 1280 and 1440 both resolve to 48px
    expect(el).toHaveClass("md:text-[48px]");
  });

  it("heading ladder is monotonic — no lg tier and no laptop step-down", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-heading");
    // no Figma frame specifies a size at Tailwind's lg (1024); lg:text-[58px] made 1280 render larger than 1440
    expect(el.className).not.toContain("lg:text-[");
    expect(el.className).not.toContain("laptop:text-[");
    expect(el.className).not.toContain("sm:text-[");
  });

  it("paragraph is 14px at 390 and 16px at 1440", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-paragraph");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[16px]");
  });

  it("skeleton branch carries the same layout tokens as the loaded branch", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("-mt-[41px]");
    expect(el).toHaveClass("laptop:w-[658px]");
    expect(el).toHaveClass("laptop:p-[60px]");
    expect(el).toHaveClass("desktop:w-[791px]");
    expect(el).toHaveClass("desktop:p-[80px]");
    expect(el).toHaveClass("desktop:rounded-[20px_0_80px_20px]");
    expect(el.parentElement).toHaveClass("flex-col-reverse");
    expect(screen.getByTestId("about-hero-image-wrapper")).toHaveClass(
      "laptop:-ml-[174px]",
    );
    expect(screen.getByTestId("about-hero-image-wrapper")).toHaveClass(
      "desktop:-ml-[260px]",
    );
  });

  // BC-165 — `laptop:` is a min-width variant, so the 1440 overrides above would
  // otherwise cascade into 1920 and clobber the desktop frame (About Container
  // 58:1537 / Sub Container 58:1535, Security Container 62:1742 / Text Container
  // 62:1743: width 791, gap 23, padding 80, radius 20/0/80/20, overlap -260).
  // These `desktop:` counterparts pin the verified 1920 values back.
  it("text container restores the 1920 desktop tokens over the laptop overrides", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    expect(el).toHaveClass("desktop:w-[791px]");
    expect(el).toHaveClass("desktop:gap-[23px]");
    expect(el).toHaveClass("desktop:rounded-[20px_0_80px_20px]");
    expect(el).toHaveClass("desktop:p-[80px]");
  });

  it("image wrapper restores the 1920 desktop -260 overlap over the laptop override", () => {
    render(<AboutHeroSection />);
    expect(screen.getByTestId("about-hero-image-wrapper")).toHaveClass(
      "desktop:-ml-[260px]",
    );
  });

  it("keeps all four breakpoint tiers on the text container (390 / md / laptop / desktop)", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-text-container");
    // 390 tier
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("p-6");
    // 768-1439 tier — band unspecified by Figma, so width is fluid capped at 791 (BC-181)
    expect(el).toHaveClass("md:gap-[23px]");
    expect(el).toHaveClass("md:p-[80px]");
    expect(el).toHaveClass("md:w-full");
    expect(el).toHaveClass("md:max-w-[791px]");
    expect(el.className).not.toContain("md:w-[791px]");
    // 1440-1919 tier
    expect(el).toHaveClass("laptop:gap-[20px]");
    expect(el).toHaveClass("laptop:p-[60px]");
    expect(el).toHaveClass("laptop:w-[658px]");
    // >=1920 tier
    expect(el).toHaveClass("desktop:gap-[23px]");
    expect(el).toHaveClass("desktop:p-[80px]");
    expect(el).toHaveClass("desktop:w-[791px]");
  });

  // BC-169 — `laptop:` is min-width, so the 1440 type scale and the 1440 section
  // padding also cascaded into 1920. Figma desktop (About Heading 58:1532 = 58px/130%,
  // Text 58:1309 = 20px/150%, Paragraph 58:1533 = 18px/150%, Container 58:1537
  // padding 50) needs explicit `desktop:` counterparts. The 1440 and 390 values
  // asserted above must stay exactly as BC-165 QA verified them.
  it("label is 20px at 1920 while 390/1440 stay 14px/18px", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-label");
    expect(el).toHaveClass("desktop:text-[20px]");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[18px]");
    // line-height matches Figma 150% at every tier — single unprefixed class
    expect(el).toHaveClass("leading-[150%]");
  });

  it("heading is 58px at 1920 while 390/1440 stay 28px/48px", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-heading");
    expect(el).toHaveClass("desktop:text-[58px]");
    expect(el).toHaveClass("text-[28px]");
    expect(el).toHaveClass("md:text-[48px]");
    // line-height matches Figma 130% at every tier
    expect(el).toHaveClass("leading-[130%]");
  });

  it("paragraph is 18px at 1920 while 390/1440 stay 14px/16px", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-paragraph");
    expect(el).toHaveClass("desktop:text-[18px]");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[16px]");
    expect(el).toHaveClass("leading-[150%]");
  });

  it("section padding is 50px at 1920 while 390/1440 stay 14px/40px", () => {
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-section");
    expect(el).toHaveClass("desktop:p-[50px]");
    expect(el).toHaveClass("p-[14px]");
    expect(el).toHaveClass("sm:p-[50px]");
    expect(el).toHaveClass("laptop:p-[40px]");
  });

  it("skeleton branch carries the same section padding tiers as the loaded branch", () => {
    mockState = { data: undefined, error: undefined, isLoading: true };
    render(<AboutHeroSection />);
    const el = screen.getByTestId("about-hero-section");
    expect(el).toHaveClass("p-[14px]");
    expect(el).toHaveClass("sm:p-[50px]");
    expect(el).toHaveClass("laptop:p-[40px]");
    expect(el).toHaveClass("desktop:p-[50px]");
  });
});
