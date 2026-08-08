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
    expect(homeLink?.className).toContain("rounded-full");
    expect(homeLink?.className).toContain("bg-[#1A1A1A]");
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
