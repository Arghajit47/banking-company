"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/components/LogoIcon";
import { useAuthStatus } from "@/lib/auth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Security", href: "/security" },
];

/**
 * Strips any trailing slash(es) so `/careers` and `/careers/` compare equal.
 * Returns `null` for a missing/empty pathname so callers can decide what to do
 * rather than silently falling back to `/`.
 */
function normalizePathname(pathname: string | null | undefined): string | null {
  if (!pathname) return null;

  const withoutTrailingSlash = pathname.replace(/\/+$/, "");
  return withoutTrailingSlash === "" ? "/" : withoutTrailingSlash;
}

/**
 * BC-166: active state must come from the current route, never from the link
 * index. Rules:
 *  - `/` matches ONLY the exact root pathname — a `startsWith` test would light
 *    up Home on every page, which is the defect this fixes.
 *  - every other link matches its exact path and its sub-paths, so a future
 *    `/careers/engineer` still highlights Careers.
 *  - a route with no matching nav link (`/login`, `/privacy-policy`, ...) leaves
 *    every link inactive — there is no Home fallback.
 *  - a `null` pathname (possible in some rendering contexts) yields no active
 *    link instead of crashing.
 */
export function isNavLinkActive(
  href: string,
  pathname: string | null | undefined
): boolean {
  const currentPath = normalizePathname(pathname);
  if (!currentPath) return false;

  const linkPath = normalizePathname(href);
  if (!linkPath) return false;

  if (linkPath === "/") return currentPath === "/";

  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 2h24M2 10h24M2 18h24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavbarLink({
  label,
  href,
  active,
  onClick,
  desktop,
}: {
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
  desktop?: boolean;
}) {
  return (
    <Link
      href={href}
      data-testid={`nav-link-${label.toLowerCase()}`}
      onClick={onClick}
      className={`
        text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33]
        ${
          desktop
            ? "text-sm leading-[21px] desktop:text-lg desktop:leading-[27px]"
            : "text-base leading-6"
        }
        ${
          active
            ? "rounded-[82px] bg-[#262626] px-5 py-[10px] desktop:px-[26.5px] desktop:py-3"
            : "rounded-md px-2 py-1"
        }
      `}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: auth } = useAuthStatus();

  const isLoggedIn = auth?.isLoggedIn ?? false;

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className="relative w-full bg-transparent px-4 pt-6 font-[var(--font-lexend)] laptop:px-20 desktop:px-[162px]"
      data-testid="navbar"
    >
      <Image
        src="/assets/illustrations/abstract_design_navbar_topleft.svg"
        alt=""
        aria-hidden="true"
        data-testid="navbar-abstract-topleft"
        width={497}
        height={353}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden laptop:block"
      />
      {/*
        BC-179: horizontal padding is per-frame, not a shared value. Figma
        laptop navbar 104:600 has paddingLeft/Right 24; desktop navbar
        5:27272 has 34. The previous `laptop:px-10 desktop:px-10` was a
        well-formed counterpart pair whose BOTH values were wrong (40px), so a
        "does a counterpart exist?" audit passed it. Compare values against the
        node, never just the presence of a counterpart.

        BC-183: the MOBILE tier is the only asymmetric one. Figma mobile navbar
        108:2748 (and all five sibling mobile page frames) specifies padding
        {top:14, right:14, bottom:14, left:24} — so the base tier CANNOT be a
        single `px-*` utility and uses `pl-6 pr-[14px]` instead. Laptop
        (104:600 -> 24/24) and desktop (5:27272 -> 34/34) ARE symmetric and
        deliberately keep BC-179's `px-*` shorthand.

        Why mixing base `pl-`/`pr-` with `laptop:px-`/`desktop:px-` is safe in
        Tailwind v4: within the base layer `padding-left`/`padding-right`
        (pl/pr) are emitted AFTER `padding-inline` (px), but every responsive
        variant is emitted in an `@media` block after ALL base utilities. So
        `laptop:px-6` still overrides the base `pr-[14px]` at >=90rem and
        BC-179's 24px/34px are preserved. Verified against the generated
        stylesheet, not assumed — do not "tidy" this into base `px-*`.

        Vertical: Figma is 14/14 at mobile and laptop, 20/20 at desktop, which
        is exactly (fixed height - tallest child) / 2 for each tier
        (40+28=68, 45+28=73, 55+40=95). The `h-*` values own the rendered
        height; the `py-*` values state Figma's padding explicitly and are a
        visual no-op because the content stays centered either way.
      */}
      <nav
        aria-label="Primary navigation"
        className="relative z-10 mx-auto flex h-[68px] max-w-[1596px] items-center justify-between rounded-[100px] border border-[#262626] bg-[#1C1C1C] py-[14px] pl-6 pr-[14px] laptop:h-[73px] laptop:px-6 desktop:h-[95px] desktop:px-[34px] desktop:py-5"
      >
        {/* Logo */}
        <Link
          href="/"
          data-testid="navbar-logo"
          className="flex items-center gap-[5.17px]"
          aria-label="YourBanK home"
        >
          <LogoIcon size={34} />
          <span className="text-xl font-medium tracking-tight text-white">
            YourBanK
          </span>
        </Link>

        {/* Desktop / Laptop Nav Links */}
        <div
          className="hidden items-center gap-1 md:flex"
          data-testid="desktop-nav-links"
        >
          {navLinks.map((link) => (
            <NavbarLink
              key={link.label}
              label={link.label}
              href={link.href}
              active={isNavLinkActive(link.href, pathname)}
              desktop
            />
          ))}
        </div>

        {/* Auth Buttons — Desktop / Laptop */}
        <div
          className="hidden items-center gap-6 md:flex"
          data-testid="desktop-auth"
        >
          {isLoggedIn ? (
            <div className="flex items-center gap-3" data-testid="nav-user">
              {auth?.user?.avatarUrl && (
                <Image
                  src={auth.user.avatarUrl}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              )}
              <span className="text-sm font-medium text-white desktop:text-lg">
                {auth?.user?.name ?? "User"}
              </span>
              <button
                type="button"
                data-testid="nav-logout"
                className="text-sm font-medium text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33] desktop:text-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/signup"
                data-testid="nav-sign-up"
                className="text-sm leading-[21px] font-medium text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33] desktop:text-lg"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                data-testid="nav-login"
                className="rounded-[82px] bg-[#CAFF33] px-6 py-3 text-sm font-semibold text-[#1E1E1E] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] desktop:px-[30px] desktop:py-[14px] desktop:text-lg"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          data-testid="nav-mobile-toggle"
          onClick={toggleMenu}
          className="inline-flex h-10 w-14 items-center justify-center rounded-[100px] bg-[#CAFF33] text-[#1A1A1A] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33] md:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          data-testid="mobile-menu"
          className="fixed inset-x-0 top-[68px] z-50 flex flex-col gap-6 border-t border-[#262626] bg-[#1A1A1A] px-4 py-6 shadow-lg md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavbarLink
                key={link.label}
                label={link.label}
                href={link.href}
                active={isNavLinkActive(link.href, pathname)}
                onClick={closeMenu}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-3" data-testid="mobile-user">
                {auth?.user?.avatarUrl && (
                  <Image
                    src={auth.user.avatarUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                )}
                <span className="text-base font-medium text-white">{auth?.user?.name ?? "User"}</span>
                <button
                  type="button"
                  data-testid="mobile-logout"
                  className="w-full rounded-md py-2 text-center text-base font-medium text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signup"
                  data-testid="mobile-sign-up"
                  onClick={closeMenu}
                  className="w-full rounded-md py-2 text-center text-base font-medium text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33]"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  data-testid="mobile-login"
                  onClick={closeMenu}
                  className="w-full rounded-[82px] bg-[#CAFF33] py-3 text-center text-base font-semibold text-[#1E1E1E] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
