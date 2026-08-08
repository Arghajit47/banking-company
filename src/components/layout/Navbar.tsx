"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "@/components/LogoIcon";
import { useAuthStatus } from "@/lib/auth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Security", href: "/security" },
];

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
            ? "text-sm leading-[21px] desktop:text-lg"
            : "text-base leading-6"
        }
        ${active ? "rounded-[10px] bg-[#262626] px-6 py-3" : "rounded-md px-2 py-1"}
      `}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      className="w-full bg-transparent font-[var(--font-lexend)]"
      data-testid="navbar"
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[68px] max-w-[1920px] items-center justify-between px-4 laptop:h-[73px] laptop:px-20 desktop:h-[95px] desktop:px-[162px]"
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
          {navLinks.map((link, idx) => (
            <NavbarLink
              key={link.label}
              label={link.label}
              href={link.href}
              active={idx === 0}
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
              <button
                type="button"
                data-testid="nav-sign-up"
                className="text-sm leading-[21px] font-medium text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33] desktop:text-lg"
              >
                Sign Up
              </button>
              <button
                type="button"
                data-testid="nav-login"
                className="rounded-[82px] bg-[#CAFF33] px-6 py-3 text-sm font-semibold text-[#1E1E1E] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] desktop:px-[30px] desktop:py-[14px] desktop:text-lg"
              >
                Login
              </button>
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
            {navLinks.map((link, idx) => (
              <NavbarLink
                key={link.label}
                label={link.label}
                href={link.href}
                active={idx === 0}
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
                <button
                  type="button"
                  data-testid="mobile-sign-up"
                  className="w-full rounded-md py-2 text-center text-base font-medium text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33]"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  data-testid="mobile-login"
                  className="w-full rounded-[82px] bg-[#CAFF33] py-3 text-center text-base font-semibold text-[#1E1E1E] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
