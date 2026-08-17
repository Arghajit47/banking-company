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
import { Navbar, isNavLinkActive } from "./Navbar";

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

// BC-166: the navbar derives its active pill from the current route, so every
// render has to declare which route it is pretending to be on.
let currentPathname: string | null = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
}));

afterEach(() => {
  cleanup();
  currentMock = mockAuthLoggedOut;
  currentPathname = "/";
});

const links = ["Home", "Careers", "About", "Security"];

const activeTestIds = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[aria-current="page"]')).map((el) =>
    el.getAttribute("data-testid")
  );

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

  it("Home link has active styling indicator on the home route", () => {
    currentPathname = "/";
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
    currentPathname = "/";
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

  it("navbar horizontal padding is 24px at laptop and 34px at desktop (BC-179)", () => {
    const { container } = renderWithSWR(<Navbar />);
    const nav = container.querySelector('nav[aria-label="Primary navigation"]');

    expect(nav).toBeTruthy();

    // BC-179: Figma laptop navbar 104:600 -> paddingLeft/Right 24; desktop
    // navbar 5:27272 -> paddingLeft/Right 34. The defect shipped
    // `laptop:px-10 desktop:px-10` (40px at BOTH tiers) — a well-formed
    // counterpart pair whose two values were simply wrong, which is why a
    // "does a counterpart exist?" audit did not catch it. Assert the VALUES.
    expect(nav?.className).toContain("laptop:px-6");
    expect(nav?.className).toContain("desktop:px-[34px]");
    expect(nav?.className).not.toContain("laptop:px-10");
    expect(nav?.className).not.toContain("desktop:px-10");
  });

  it("navbar height stays 73px at laptop and 95px at desktop (BC-179 guard)", () => {
    const { container } = renderWithSWR(<Navbar />);
    const nav = container.querySelector('nav[aria-label="Primary navigation"]');

    // Already correct before BC-179 and must survive the padding fix:
    // Figma 104:600 height 73, 5:27272 height 95.
    expect(nav?.className).toContain("laptop:h-[73px]");
    expect(nav?.className).toContain("desktop:h-[95px]");
  });

  it("BC-179 padding fix leaves the BC-158 active pill classes untouched", () => {
    currentPathname = "/";
    const { container } = renderWithSWR(<Navbar />);
    const homeLink = container.querySelector('[data-testid="nav-link-home"]');

    // Regression guard: the navbar's own padding and the pill's padding live on
    // different elements. Changing the nav must not perturb the pill geometry
    // QA measured in BC-158 (76.63x41 @1440, 100.09x51 @1920, radius 82,
    // background rgb(38,38,38)).
    expect(homeLink?.className).toContain("rounded-[82px]");
    expect(homeLink?.className).toContain("bg-[#262626]");
    expect(homeLink?.className).toContain("px-5");
    expect(homeLink?.className).toContain("py-[10px]");
    expect(homeLink?.className).toContain("desktop:px-[26.5px]");
    expect(homeLink?.className).toContain("desktop:py-3");
    expect(homeLink?.className).toContain("text-sm");
    expect(homeLink?.className).toContain("leading-[21px]");
    expect(homeLink?.className).toContain("desktop:text-lg");
    expect(homeLink?.className).toContain("desktop:leading-[27px]");
  });

  it("desktop nav links step up to 18px/27px type at the desktop breakpoint", () => {
    currentPathname = "/";
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

describe("isNavLinkActive (BC-166 matching rules)", () => {
  it("matches / only on the exact root pathname", () => {
    expect(isNavLinkActive("/", "/")).toBe(true);
    expect(isNavLinkActive("/", "/careers")).toBe(false);
    expect(isNavLinkActive("/", "/about")).toBe(false);
    expect(isNavLinkActive("/", "/security")).toBe(false);
    expect(isNavLinkActive("/", "/login")).toBe(false);
  });

  it("matches non-root links on their exact path", () => {
    expect(isNavLinkActive("/careers", "/careers")).toBe(true);
    expect(isNavLinkActive("/about", "/about")).toBe(true);
    expect(isNavLinkActive("/security", "/security")).toBe(true);
    expect(isNavLinkActive("/careers", "/about")).toBe(false);
  });

  it("matches non-root links on their sub-paths", () => {
    expect(isNavLinkActive("/careers", "/careers/engineer")).toBe(true);
    expect(isNavLinkActive("/careers", "/careers/engineer/apply")).toBe(true);
    expect(isNavLinkActive("/about", "/about/team")).toBe(true);
  });

  it("does not treat a shared prefix as a sub-path", () => {
    expect(isNavLinkActive("/about", "/aboutus")).toBe(false);
    expect(isNavLinkActive("/security", "/security-policy")).toBe(false);
  });

  it("normalises trailing slashes on both sides", () => {
    expect(isNavLinkActive("/", "//")).toBe(true);
    expect(isNavLinkActive("/careers", "/careers/")).toBe(true);
    expect(isNavLinkActive("/careers", "/careers/engineer/")).toBe(true);
    expect(isNavLinkActive("/", "/careers/")).toBe(false);
  });

  it("returns false for a null or empty pathname instead of defaulting to Home", () => {
    expect(isNavLinkActive("/", null)).toBe(false);
    expect(isNavLinkActive("/", undefined)).toBe(false);
    expect(isNavLinkActive("/", "")).toBe(false);
    expect(isNavLinkActive("/careers", null)).toBe(false);
  });
});

describe("Navbar active link follows the current route", () => {
  it.each([
    ["/", "nav-link-home"],
    ["/careers", "nav-link-careers"],
    ["/about", "nav-link-about"],
    ["/security", "nav-link-security"],
    ["/careers/engineer", "nav-link-careers"],
    ["/about/", "nav-link-about"],
  ])("marks exactly one link active on %s", (pathname, expectedTestId) => {
    currentPathname = pathname;
    const { container } = renderWithSWR(<Navbar />);

    expect(activeTestIds(container)).toEqual([expectedTestId]);

    const activeLink = container.querySelector(`[data-testid="${expectedTestId}"]`);
    expect(activeLink?.className).toContain("rounded-[82px]");
    expect(activeLink?.className).toContain("bg-[#262626]");
  });

  it.each(["/login", "/signup", "/privacy-policy", "/terms-of-service"])(
    "marks no link active on %s — no Home fallback",
    (pathname) => {
      currentPathname = pathname;
      const { container } = renderWithSWR(<Navbar />);

      expect(activeTestIds(container)).toEqual([]);

      const homeLink = container.querySelector('[data-testid="nav-link-home"]');
      expect(homeLink?.getAttribute("aria-current")).toBeNull();
      expect(homeLink?.className).toContain("rounded-md");
      expect(homeLink?.className).not.toContain("bg-[#262626]");
    }
  );

  it("marks no link active when usePathname returns null", () => {
    currentPathname = null;
    const { container } = renderWithSWR(<Navbar />);

    expect(activeTestIds(container)).toEqual([]);
  });

  it("keeps inactive links on the compact inactive classes", () => {
    currentPathname = "/careers";
    const { container } = renderWithSWR(<Navbar />);

    const homeLink = container.querySelector('[data-testid="nav-link-home"]');
    expect(homeLink?.className).toContain("rounded-md");
    expect(homeLink?.className).toContain("px-2");
    expect(homeLink?.className).toContain("py-1");
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

  it("mobile drawer highlights the current route, not Home", async () => {
    currentPathname = "/security";
    renderWithSWR(<Navbar />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId("nav-mobile-toggle"));
    const menu = screen.getByTestId("mobile-menu");

    const drawerSecurity = within(menu).getByTestId("nav-link-security");
    const drawerHome = within(menu).getByTestId("nav-link-home");

    expect(drawerSecurity.getAttribute("aria-current")).toBe("page");
    expect(drawerSecurity.className).toContain("rounded-[82px]");
    expect(drawerHome.getAttribute("aria-current")).toBeNull();
    expect(drawerHome.className).toContain("rounded-md");
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
