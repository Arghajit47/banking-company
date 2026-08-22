import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { Footer } from "./Footer";
import type { FooterConfig } from "@/lib/footer";

expect.extend(matchers);

const defaultConfig: FooterConfig = {
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers" },
    { label: "About", href: "/about" },
    { label: "Security", href: "/security" },
  ],
  contact: {
    email: "hello@skillbridge.com",
    phone: "+91 91813 23 2309",
    location: "Somewhere in the World",
  },
  social: [
    { name: "facebook", url: "#" },
    { name: "twitter", url: "#" },
    { name: "linkedin", url: "#" },
  ],
  copyright: "YourBank All Rights Reserved",
};

const apiConfig: FooterConfig = {
  ...defaultConfig,
  contact: {
    ...defaultConfig.contact,
    email: "support@yourbank.example",
  },
  copyright: "YourBank 2026 All Rights Reserved",
};

type FooterHookState = {
  data: FooterConfig | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
};

const baseMock: FooterHookState = {
  data: apiConfig,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

let footerMock: FooterHookState = { ...baseMock };
let mountedMock = true;

vi.mock("@/lib/footer", () => ({
  useFooterConfig: () => footerMock,
}));

vi.mock("@/lib/use-mounted", () => ({
  useMounted: () => mountedMock,
}));

afterEach(() => {
  cleanup();
  footerMock = { ...baseMock };
  mountedMock = true;
});

describe("Footer", () => {
  it("renders logo and navigation links from API", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-logo")).toBeInTheDocument();
    expect(screen.getByTestId("footer-nav-home")).toHaveTextContent("Home");
    expect(screen.getByTestId("footer-nav-careers")).toHaveTextContent("Careers");
    expect(screen.getByTestId("footer-nav-about")).toHaveTextContent("About");
    expect(screen.getByTestId("footer-nav-security")).toHaveTextContent("Security");
  });

  it("renders contact information from API", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-email")).toHaveTextContent("support@yourbank.example");
    expect(screen.getByTestId("footer-phone")).toHaveTextContent("+91 91813 23 2309");
    expect(screen.getByTestId("footer-location")).toHaveTextContent("Somewhere in the World");
  });

  it("renders the email and phone icons from the exported Figma vectors", () => {
    render(<Footer />);

    // Figma 11:89129 / 11:89133 — 24x24 frames with a transparent fill and a
    // SOLID #CAFF33 glyph. The phone glyph 11:89134 is named "Vector (Stroke)"
    // but is already an outline converted to a filled path, so it is rendered
    // with fill, never stroke.
    const mail = screen.getByTestId("footer-email-icon");
    const phone = screen.getByTestId("footer-phone-icon");

    expect(mail.getAttribute("src")).toContain("/assets/footer/icon-email.svg");
    expect(phone.getAttribute("src")).toContain("/assets/footer/icon-phone.svg");

    [mail, phone].forEach((icon) => {
      expect(icon.className).toContain("h-6");
      expect(icon.className).toContain("w-6");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    expect(screen.getByTestId("footer-email")).toContainElement(mail);
    expect(screen.getByTestId("footer-phone")).toContainElement(phone);
  });

  it("spaces every contact icon 6px from its label", () => {
    render(<Footer />);

    // The contact row 11:89127 has three "Button" children, all HORIZONTAL
    // auto-layout with itemSpacing: 6 — 11:89128 (email), 11:89132 (phone) and
    // 11:89136 (location). Guards against the gap-[18px] regression.
    ["footer-email", "footer-phone", "footer-location"].forEach((testId) => {
      const item = screen.getByTestId(testId);
      expect(item.className).toContain("gap-[6px]");
      expect(item.className).not.toContain("gap-[18px]");
    });
  });

  it("renders social links, copyright, and legal links", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-socials")).toBeInTheDocument();
    expect(screen.getByTestId("footer-social-facebook")).toHaveAttribute("href", "#");
    expect(screen.getByTestId("footer-social-twitter")).toHaveAttribute("href", "#");
    expect(screen.getByTestId("footer-social-linkedin")).toHaveAttribute("href", "#");
    expect(screen.getByTestId("footer-copyright")).toHaveTextContent("YourBank 2026 All Rights Reserved");
    expect(screen.getByTestId("footer-privacy")).toHaveTextContent("Privacy Policy");
    expect(screen.getByTestId("footer-terms")).toHaveTextContent("Terms of Service");
  });

  it("renders loading skeleton when data is loading", () => {
    footerMock = { ...baseMock, data: undefined, isLoading: true };
    render(<Footer />);

    const email = screen.getByTestId("footer-email");
    expect(email).toBeInTheDocument();
    expect(email.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("falls back to defaults on API error", () => {
    footerMock = { ...baseMock, data: undefined, error: new Error("Network error") };
    render(<Footer />);

    expect(screen.getByTestId("footer-email")).toHaveTextContent("hello@skillbridge.com");
    expect(screen.getByTestId("footer-copyright")).toHaveTextContent("YourBank All Rights Reserved");
  });

  it("falls back to defaults when API returns empty navLinks", () => {
    footerMock = { ...baseMock, data: { ...apiConfig, navLinks: [] } };
    render(<Footer />);

    expect(screen.getByTestId("footer-nav-home")).toHaveTextContent("Home");
    expect(screen.getByTestId("footer-email")).toHaveTextContent("hello@skillbridge.com");
  });

  // BC-189: footer nav links are 14/16/18 @400 #E4E4E7. Per-node reads:
  //   390  113:5007-5010 = 14/400 #E4E4E7
  //   1440 108:2712-2715 = 16/400 #E4E4E7   <- 16, NOT 14
  //   1920 11:89123-89126 = 18/400 #E4E4E7
  // The 14/14/18 #FFFFFF variant belongs to the NAVBAR (104:611-614, 5:27283-27286),
  // which is a different component and is not touched by this ticket.
  it("gives footer nav links the full 14/16/18 ladder", () => {
    render(<Footer />);
    const link = screen.getByTestId("footer-nav-home");
    expect(link.className).toContain("text-[14px]");
    expect(link.className).toContain("md:text-[16px]");
    expect(link.className).toContain("desktop:text-[18px]");
    expect(link.className).not.toContain("text-base");
  });

  // Footer legal/copyright are 14/14/18 @300 #B3B3B3 — a different ladder and colour
  // from the nav links above (they were @400 #E4E4E7).
  it("gives footer legal copy the 14/14/18 @300 #B3B3B3 ladder", () => {
    render(<Footer />);
    for (const id of ["footer-copyright", "footer-legal"]) {
      const el = screen.getByTestId(id);
      expect(el.className).toContain("text-[14px]");
      expect(el.className).toContain("desktop:text-[18px]");
      expect(el.className).toContain("font-light");
      expect(el.className).toContain("text-[#B3B3B3]");
      expect(el.className).not.toContain("md:text-[");
    }
  });

  it("renders fallback during initial hydration guard when unmounted", () => {
    mountedMock = false;
    render(<Footer />);

    const email = screen.getByTestId("footer-email");
    expect(email).toBeInTheDocument();
    expect(email.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  // BC-189 AC4 — footer internal gap. Figma footer 113:5000 itemSpacing is
  // 30 / 40 / 50 at 390 / 1440 / 1920. The defect was a flat `gap-[50px]` at
  // base: the 1920 value bound at base, so 390 and 1440 were both wrong and
  // only 1920 was (coincidentally) right. Same defect family as text-[58px].
  it("logo/nav column renders the Figma 30/40/50 gap ladder", () => {
    render(<Footer />);
    const column = screen.getByTestId("footer-logo").parentElement;
    expect(column).not.toBeNull();
    expect(column?.className).toContain("gap-[30px]");
    expect(column?.className).toContain("laptop:gap-[40px]");
    expect(column?.className).toContain("desktop:gap-[50px]");
    // The 1920 value must never be bound at base again.
    expect(column?.className).not.toMatch(/(?:^|\s)gap-\[50px\](?:\s|$)/);
    expect(column?.className).not.toMatch(/(?:^|\s)gap-\[40px\](?:\s|$)/);
  });

  // Guard the values QA already passed — footer padding is CORRECT and must not
  // be collateral damage of the gap fix.
  it("footer padding-top 50 / padding-bottom 30 at base is preserved", () => {
    render(<Footer />);
    const inner = screen.getByTestId("footer").firstElementChild;
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain("pt-[50px]");
    expect(inner?.className).toContain("pb-[30px]");
    expect(inner?.className).toContain("laptop:pt-[60px]");
    expect(inner?.className).toContain("desktop:pt-[100px]");
    expect(inner?.className).toContain("desktop:pb-[50px]");
  });
});
