import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { ProtectionSection } from "./ProtectionSection";

expect.extend(matchers);

const MOCK_DATA = {
  protections: [
    {
      id: 1,
      icon: "/assets/icons/icon_protection_1.svg",
      badgeIcon: "/assets/icons/icon_protection_badge_1.svg",
      title: "Secure Online Banking Platform",
      description: "Our online banking platform is built with multiple layers of security.",
    },
    {
      id: 2,
      icon: "/assets/icons/icon_protection_2.svg",
      badgeIcon: "/assets/icons/icon_protection_badge_2.svg",
      title: "Multi-Factor Authentication",
      description: "We employ multi-factor authentication for additional security.",
    },
    {
      id: 3,
      icon: "/assets/icons/icon_protection_3.svg",
      badgeIcon: "/assets/icons/icon_protection_badge_3.svg",
      title: "Fraud Monitoring",
      description: "We have sophisticated fraud detection systems in place.",
    },
    {
      id: 4,
      icon: "/assets/icons/icon_protection_4.svg",
      badgeIcon: "/assets/icons/icon_protection_badge_4.svg",
      title: "Secure Mobile Banking",
      description: "Our mobile banking app is designed with the same level of security.",
    },
  ],
};

let mockState = { data: MOCK_DATA, error: undefined, isLoading: false };

vi.mock("@/lib/security-protections", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/security-protections")>();
  return {
    ...actual,
    useSecurityProtectionsData: () => mockState,
  };
});

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => true,
}));

afterEach(() => {
  cleanup();
  mockState = { data: MOCK_DATA, error: undefined, isLoading: false };
});

describe("ProtectionSection", () => {
  it("renders the section", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-section")).toBeInTheDocument();
  });

  it("renders the section header", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-section-header")).toBeInTheDocument();
  });

  it("renders heading with 'How We' and 'Protect You'", () => {
    render(<ProtectionSection />);
    const heading = screen.getByTestId("protection-section-heading");
    expect(heading.textContent).toContain("How We");
    expect(heading.textContent).toContain("Protect You");
  });

  it("renders intro paragraph mentioning YourBank", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-section-paragraph").textContent).toContain("At YourBank");
  });

  it("renders protection cards container", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-cards-container")).toBeInTheDocument();
  });

  it("renders 4 protection cards from API", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`protection-card-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card icons from API", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`protection-card-icon-${i}`)).toBeInTheDocument();
    }
  });

  it("renders card titles from API", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      const title = screen.getByTestId(`protection-card-title-${i}`);
      expect(title.textContent!.length).toBeGreaterThan(0);
    }
  });

  it("first card title matches API data", () => {
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-card-title-1").textContent).toBe("Secure Online Banking Platform");
  });

  it("uses no light-theme classes", () => {
    const { container } = render(<ProtectionSection />);
    expect(container.innerHTML).not.toContain("bg-white");
    expect(container.innerHTML).not.toContain("text-zinc-900");
  });

  it("shows skeleton when not mounted", () => {
    mockState = { data: undefined as never, error: undefined, isLoading: true };
    render(<ProtectionSection />);
    expect(screen.getByTestId("protection-section")).toBeInTheDocument();
  });

  // BC-162 — `laptop` is a min-width variant, so the 38px laptop override kept
  // applying at 1920. Figma "How We Protect You": desktop 64:2100 = 48px, laptop 116:10944 = 38px,
  // mobile 116:11297 = 28px, lineHeight 150% at every breakpoint.
  it("heading carries a desktop 48px override above the laptop 38px one", () => {
    render(<ProtectionSection />);
    const heading = screen.getByTestId("protection-section-heading");
    expect(heading.className).toContain("laptop:text-[38px]");
    expect(heading.className).toContain("desktop:text-[48px]");
    expect(heading.className).toContain("leading-[150%]");
  });

  // Line height must stay derived from `leading-[150%]`; a hardcoded per-breakpoint
  // pixel leading would desync from the font size and reintroduce BC-162.
  it("heading has no hardcoded per-breakpoint pixel line-height", () => {
    render(<ProtectionSection />);
    const heading = screen.getByTestId("protection-section-heading");
    expect(heading.className).not.toMatch(/laptop:leading-\[/);
    expect(heading.className).not.toMatch(/desktop:leading-\[/);
    expect(heading.className).not.toMatch(/(?:^|\s)leading-\[\d+px\]/);
  });
  // BC-164 — heading font-weight must be uniform across every breakpoint.
  // Figma "How We Protect You": desktop 64:2100, laptop 116:10944, mobile 116:11297 — all fontWeight 500.
  // A `laptop:`/`desktop:` weight variant is a min-width override, so any such
  // class would split the weight at 1440 and diverge from the design.
  it("heading renders font-weight 500 at every breakpoint", () => {
    render(<ProtectionSection />);
    const heading = screen.getByTestId("protection-section-heading");
    expect(heading.className).toMatch(/(?:^|\s)font-medium(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:^|\s)font-normal(?:\s|$)/);
    expect(heading.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/);
  });

  // BC-168 — card <h3> font-weight must be uniform across every breakpoint.
  // Figma card headings: desktop 64:2039 / 64:2061 / 64:2073 / 64:2084,
  // laptop 116:10955 / 116:10963 / 116:10972 / 116:10980,
  // mobile 116:11308 / 116:11316 / 116:11325 / 116:11333 — all twelve are fontWeight 400.
  // A `laptop:`/`desktop:` weight variant is a min-width override, so any such
  // class would split the weight at 1440 and diverge from the design.
  it("card titles render font-weight 400 at every breakpoint", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      const title = screen.getByTestId(`protection-card-title-${i}`);
      expect(title.className).toMatch(/(?:^|\s)font-normal(?:\s|$)/);
      expect(title.className).not.toMatch(/(?:^|\s)font-medium(?:\s|$)/);
      expect(title.className).not.toMatch(/(?:sm|md|lg|xl|2xl|laptop|desktop):font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/);
    }
  });

  // BC-168 — card <h3> sizes step UP with the viewport: mobile 18px, laptop 20px, desktop 24px.
  // The old `md:text-[22px]` made the size DROP at 1440 (22 -> 20) and no Figma frame specifies 22px;
  // the missing `desktop:` override also left 1920 on the laptop 20px (same class of bug as BC-162).
  it("card titles step 18px -> laptop 20px -> desktop 24px with no 22px tablet size", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      const title = screen.getByTestId(`protection-card-title-${i}`);
      expect(title.className).toMatch(/(?:^|\s)text-\[18px\](?:\s|$)/);
      expect(title.className).toContain("laptop:text-[20px]");
      expect(title.className).toContain("desktop:text-[24px]");
      expect(title.className).not.toContain("text-[22px]");
      expect(title.className).toContain("leading-[150%]");
    }
  });

  // Line height must stay derived from `leading-[150%]` so it tracks each breakpoint's font size.
  it("card titles have no hardcoded per-breakpoint pixel line-height", () => {
    render(<ProtectionSection />);
    for (let i = 1; i <= 4; i++) {
      const title = screen.getByTestId(`protection-card-title-${i}`);
      expect(title.className).not.toMatch(/laptop:leading-\[/);
      expect(title.className).not.toMatch(/desktop:leading-\[/);
      expect(title.className).not.toMatch(/(?:^|\s)leading-\[\d+px\]/);
    }
  });
});
