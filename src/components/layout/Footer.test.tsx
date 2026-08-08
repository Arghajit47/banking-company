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

  it("renders fallback during initial hydration guard when unmounted", () => {
    mountedMock = false;
    render(<Footer />);

    const email = screen.getByTestId("footer-email");
    expect(email).toBeInTheDocument();
    expect(email.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
