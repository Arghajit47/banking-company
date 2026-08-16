import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { SecurityHeroSection } from "./SecurityHeroSection";

expect.extend(matchers);

const MOCK_DATA = {
  headline: "Your Security is Our",
  headlineAccent: "Top Priority",
  body: "At YourBank, we understand the importance of keeping your financial information secure.",
  imageUrl: "/assets/images/security_hero_image.png",
};

let mockState = { data: MOCK_DATA, error: undefined, isLoading: false };

vi.mock("@/lib/security-hero", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/security-hero")>();
  return {
    ...actual,
    useSecurityHeroData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  cleanup();
  mockState = { data: MOCK_DATA, error: undefined, isLoading: false };
});

describe("SecurityHeroSection", () => {
  it("renders the section", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-section")).toBeInTheDocument();
  });

  it("renders the text container", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-text-container")).toBeInTheDocument();
  });

  it("renders the heading with data from API", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-heading").textContent).toContain("Your Security is Our");
  });

  it("renders the heading accent 'Top Priority' from API", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-heading").textContent).toContain("Top Priority");
  });

  it("renders the body paragraph from API", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-paragraph").textContent).toContain("At YourBank");
  });

  it("renders the image wrapper", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-image-wrapper")).toBeInTheDocument();
  });

  it("renders the hero image", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-image")).toBeInTheDocument();
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<SecurityHeroSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  it("shows skeleton when not mounted", () => {
    mockState = { data: undefined as never, error: undefined, isLoading: true };
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-section")).toBeInTheDocument();
  });

  // BC-165 — Figma parity for the Security hero at 1440 (laptop 116:10706/116:10707)
  // and 390 (mobile 116:11068/116:11071).
  it("text container carries the 390 mobile tokens (gap 14, radius 20, pad 24, -41 overlap)", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-text-container");
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("rounded-[20px]");
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("-mt-[41px]");
    expect(el).toHaveClass("md:mt-0");
  });

  it("text container carries the 1440 laptop tokens (width 658, gap 20, radius 20/0/60/20, pad 60)", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-text-container");
    expect(el).toHaveClass("laptop:w-[658px]");
    expect(el).toHaveClass("laptop:gap-[20px]");
    expect(el).toHaveClass("laptop:rounded-[20px_0_60px_20px]");
    expect(el).toHaveClass("laptop:p-[60px]");
  });

  it("stacks image above text at 390 via flex-col-reverse, keeping the laptop row order", () => {
    render(<SecurityHeroSection />);
    const row = screen.getByTestId("security-hero-text-container").parentElement;
    expect(row).toHaveClass("flex-col-reverse");
    expect(row).toHaveClass("md:flex-row");
    expect(row).not.toHaveClass("flex-col");
  });

  it("image wrapper overlaps by 174px at 1440 and has no positive mobile top margin", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-image-wrapper");
    expect(el).toHaveClass("laptop:-ml-[174px]");
    expect(el).not.toHaveClass("mt-6");
  });


  it("heading is 28px at 390 and stays 48px at 1440", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-heading");
    expect(el).toHaveClass("text-[28px]");
    expect(el).toHaveClass("laptop:text-[48px]");
  });

  it("paragraph is 14px at 390 and 16px at 1440", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-paragraph");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[16px]");
  });

  it("skeleton branch carries the same layout tokens as the loaded branch", () => {
    mockState = { data: undefined as never, error: undefined, isLoading: true };
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-text-container");
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("-mt-[41px]");
    expect(el).toHaveClass("laptop:w-[658px]");
    expect(el).toHaveClass("laptop:p-[60px]");
    expect(el).toHaveClass("desktop:w-[791px]");
    expect(el).toHaveClass("desktop:p-[80px]");
    expect(el).toHaveClass("desktop:rounded-[20px_0_80px_20px]");
    expect(el.parentElement).toHaveClass("flex-col-reverse");
    expect(screen.getByTestId("security-hero-image-wrapper")).toHaveClass(
      "laptop:-ml-[174px]",
    );
    expect(screen.getByTestId("security-hero-image-wrapper")).toHaveClass(
      "desktop:-ml-[260px]",
    );
  });

  // BC-165 — `laptop:` is a min-width variant, so the 1440 overrides above would
  // otherwise cascade into 1920 and clobber the desktop frame (About Container
  // 58:1537 / Sub Container 58:1535, Security Container 62:1742 / Text Container
  // 62:1743: width 791, gap 23, padding 80, radius 20/0/80/20, overlap -260).
  // These `desktop:` counterparts pin the verified 1920 values back.
  it("text container restores the 1920 desktop tokens over the laptop overrides", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-text-container");
    expect(el).toHaveClass("desktop:w-[791px]");
    expect(el).toHaveClass("desktop:gap-[23px]");
    expect(el).toHaveClass("desktop:rounded-[20px_0_80px_20px]");
    expect(el).toHaveClass("desktop:p-[80px]");
  });

  it("image wrapper restores the 1920 desktop -260 overlap over the laptop override", () => {
    render(<SecurityHeroSection />);
    expect(screen.getByTestId("security-hero-image-wrapper")).toHaveClass(
      "desktop:-ml-[260px]",
    );
  });

  it("keeps all four breakpoint tiers on the text container (390 / md / laptop / desktop)", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-text-container");
    // 390 tier
    expect(el).toHaveClass("gap-[14px]");
    expect(el).toHaveClass("p-6");
    // 768-1439 tier (unchanged legacy values)
    expect(el).toHaveClass("md:gap-[23px]");
    expect(el).toHaveClass("md:p-[80px]");
    expect(el).toHaveClass("md:w-[791px]");
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
  // padding also cascaded into 1920. Figma desktop (Security Heading 62:1823 =
  // 58px/130%, Paragraph 62:1747 = 18px/150%, Container 62:1742 padding 50) needs
  // explicit `desktop:` counterparts. The 1440 and 390 values asserted above must
  // stay exactly as BC-165 QA verified them.
  it("heading is 58px at 1920 while 390/1440 stay 28px/48px", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-heading");
    expect(el).toHaveClass("desktop:text-[58px]");
    expect(el).toHaveClass("text-[28px]");
    expect(el).toHaveClass("laptop:text-[48px]");
    // line-height matches Figma 130% at every tier — single unprefixed class
    expect(el).toHaveClass("leading-[130%]");
  });

  it("paragraph is 18px at 1920 while 390/1440 stay 14px/16px", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-paragraph");
    expect(el).toHaveClass("desktop:text-[18px]");
    expect(el).toHaveClass("text-[14px]");
    expect(el).toHaveClass("laptop:text-[16px]");
    expect(el).toHaveClass("leading-[150%]");
  });

  it("section padding is 50px at 1920 while 390/1440 stay 14px/40px", () => {
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-section");
    expect(el).toHaveClass("desktop:p-[50px]");
    expect(el).toHaveClass("p-[14px]");
    expect(el).toHaveClass("sm:p-[50px]");
    expect(el).toHaveClass("laptop:p-[40px]");
  });

  it("skeleton branch carries the same section padding tiers as the loaded branch", () => {
    mockState = { data: undefined as never, error: undefined, isLoading: true };
    render(<SecurityHeroSection />);
    const el = screen.getByTestId("security-hero-section");
    expect(el).toHaveClass("p-[14px]");
    expect(el).toHaveClass("sm:p-[50px]");
    expect(el).toHaveClass("laptop:p-[40px]");
    expect(el).toHaveClass("desktop:p-[50px]");
  });
});
