import { afterEach, describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
  cleanup,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import { SWRConfig } from "swr";
import { Navbar } from "./Navbar";

expect.extend(matchers);

const renderWithSWR = (ui: React.ReactNode) =>
  render(
    <SWRConfig value={{ provider: () => new Map(), suspense: false }}>{ui}</SWRConfig>
  );

const mockAuthLoggedOut: {
  data: { isLoggedIn: boolean; user: { name: string; avatarUrl: string | null } | null };
  error: undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: ReturnType<typeof vi.fn>;
} = {
  data: { isLoggedIn: false, user: null },
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: vi.fn(),
};

const mockAuthLoggedIn = {
  ...mockAuthLoggedOut,
  data: { isLoggedIn: true, user: { name: "Argha", avatarUrl: null } },
};

let currentMock = mockAuthLoggedOut;

vi.mock("@/lib/auth", () => ({
  useAuthStatus: () => currentMock,
}));

afterEach(() => {
  cleanup();
  currentMock = mockAuthLoggedOut;
});

const links = ["Home", "Careers", "About", "Security"];

describe("Navbar (desktop)", () => {
  it("renders all nav links on desktop", () => {
    renderWithSWR(<Navbar />);

    links.forEach((label) => {
      expect(
        screen.getByRole("link", {
          name: new RegExp(`^${label}$`, "i"),
        })
      ).toBeTruthy();
    });
  });

  it("renders Sign Up and Login buttons on desktop when logged out", () => {
    renderWithSWR(<Navbar />);

    expect(screen.getByTestId("nav-sign-up")).toBeTruthy();
    expect(screen.getByTestId("nav-login")).toBeTruthy();
  });

  it("renders user info when logged in", () => {
    currentMock = mockAuthLoggedIn;

    renderWithSWR(<Navbar />);

    expect(screen.getByTestId("nav-user")).toBeTruthy();
    expect(screen.getByText("Argha")).toBeTruthy();
  });

  it("Home link has active styling indicator", () => {
    const { container } = renderWithSWR(<Navbar />);
    const homeLink = container.querySelector('[data-testid="nav-link-home"]');

    expect(homeLink).toBeTruthy();
    expect(homeLink?.getAttribute("aria-current")).toBe("page");
    // BC-158: both Figma navbar frames specify cornerRadius 82 on the active
    // pill (laptop 104:610, desktop 5:27282). The previous "rounded-full"
    // assertion came from PR #124 without a Figma check and encoded the defect.
    expect(homeLink?.className).toContain("rounded-[82px]");
    expect(homeLink?.className).not.toContain("rounded-full");
    expect(homeLink?.className).toContain("bg-[#262626]");
  });

  it("active pill uses breakpoint-specific padding for the laptop and desktop frames", () => {
    const { container } = renderWithSWR(<Navbar />);
    const homeLink = container.querySelector('[data-testid="nav-link-home"]');

    // BC-158: the laptop pill (104:610) is 77x41 and the desktop pill
    // (5:27282) is 100x51 — deliberately BIGGER at >=1920. A single uniform
    // `px-6 py-3` cannot satisfy both frames.
    expect(homeLink?.className).toContain("px-5");
    expect(homeLink?.className).toContain("py-[10px]");
    expect(homeLink?.className).toContain("desktop:px-[26.5px]");
    expect(homeLink?.className).toContain("desktop:py-3");
  });

  it("desktop nav links step up to 18px/27px type at the desktop breakpoint", () => {
    const { container } = renderWithSWR(<Navbar />);
    const homeLink = container.querySelector('[data-testid="nav-link-home"]');

    // BC-158: Figma text node 5:27283 is 18px at 150% (=27px) on the desktop
    // frame vs 14px/21px on laptop (104:611). `desktop:leading-[27px]` was
    // missing, which is why the pill measured 45px tall instead of 51px at 1920.
    expect(homeLink?.className).toContain("text-sm");
    expect(homeLink?.className).toContain("leading-[21px]");
    expect(homeLink?.className).toContain("desktop:text-lg");
    expect(homeLink?.className).toContain("desktop:leading-[27px]");
  });
});

describe("Navbar (mobile)", () => {
  it("hides desktop nav links and shows hamburger on mobile", () => {
    renderWithSWR(<Navbar />);

    const desktopNav = screen.getByTestId("desktop-nav-links");
    expect(desktopNav.className).toContain("hidden");
    expect(desktopNav.className).toContain("md:flex");

    expect(screen.getByTestId("nav-mobile-toggle")).toBeTruthy();
  });

  it("clicking hamburger reveals menu with links, Sign Up and Login", async () => {
    renderWithSWR(<Navbar />);
    const user = userEvent.setup();

    const toggle = screen.getByTestId("nav-mobile-toggle");
    await user.click(toggle);

    const menu = screen.getByTestId("mobile-menu");
    expect(menu).toBeTruthy();
    expect(menu.getAttribute("role")).toBe("dialog");

    links.forEach((label) => {
      expect(
        within(menu).getByRole("link", {
          name: new RegExp(`^${label}$`, "i"),
        })
      ).toBeTruthy();
    });

    expect(within(menu).getByTestId("mobile-sign-up")).toBeTruthy();
    expect(within(menu).getByTestId("mobile-login")).toBeTruthy();
  });

  it("keyboard Escape closes mobile menu", async () => {
    renderWithSWR(<Navbar />);
    const user = userEvent.setup();

    const toggle = screen.getByTestId("nav-mobile-toggle");
    await user.click(toggle);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      const menu = screen.queryByTestId("mobile-menu");
      expect(menu).toBeNull();
    });
  });
});

describe("Navbar accessibility", () => {
  it("hamburger has aria-expanded, aria-controls and toggles label", async () => {
    renderWithSWR(<Navbar />);
    const user = userEvent.setup();

    const toggle = screen.getByTestId("nav-mobile-toggle");
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("aria-controls")).toBe("mobile-menu");
    expect(toggle.getAttribute("aria-label")).toBe("Open navigation menu");

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.getAttribute("aria-label")).toBe("Close navigation menu");
  });

  it("keyboard navigation focuses toggle and links", async () => {
    renderWithSWR(<Navbar />);
    const user = userEvent.setup();

    const expectedFocusOrder = [
      "navbar-logo",
      "nav-link-home",
      "nav-link-careers",
      "nav-link-about",
      "nav-link-security",
      "nav-sign-up",
      "nav-login",
    ];

    for (const testId of expectedFocusOrder) {
      await user.tab();
      const el = screen.getByTestId(testId);
      expect(document.activeElement).toBe(el);
    }

    await user.tab();
    const toggle = screen.getByTestId("nav-mobile-toggle");
    expect(document.activeElement).toBe(toggle);
  });
});
