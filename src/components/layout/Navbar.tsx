"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Security", href: "/security" },
];

function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect width="36" height="36" rx="8" fill="#CAFF33" />
      <path
        d="M10 18h16M18 10v16"
        stroke="#1E1E1E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="5" stroke="#1E1E1E" strokeWidth="2" />
    </svg>
  );
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
        rounded-md text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33]
        ${
          desktop
            ? "text-sm leading-[21px] xl:text-lg"
            : "text-base leading-6"
        }
        ${active ? "px-5 py-2.5 bg-[#1A1A1A] border border-[#262626] rounded-full xl:px-6 xl:py-3" : "px-2 py-1"}
      `}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        className="mx-auto flex h-[68px] max-w-[1920px] items-center justify-between px-4 lg:h-[73px] lg:px-20 xl:h-[95px] xl:px-[162px]"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33]"
          data-testid="navbar-logo"
          aria-label="YourBanK home"
        >
          <LogoIcon className="h-8 w-8 lg:h-9 lg:w-9" />
          <span className="text-lg font-medium text-white lg:text-xl">
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
          <button
            type="button"
            data-testid="nav-sign-up"
            className="text-sm leading-[21px] font-medium text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33] xl:text-lg"
          >
            Sign Up
          </button>
          <button
            type="button"
            data-testid="nav-login"
            className="rounded-[82px] bg-[#CAFF33] px-6 py-3 text-sm font-semibold text-[#1E1E1E] transition hover:brightness-110 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] xl:px-[30px] xl:py-[14px] xl:text-lg"
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          data-testid="nav-mobile-toggle"
          onClick={toggleMenu}
          className="inline-flex h-10 w-14 items-center justify-center rounded-lg text-white transition hover:text-[#CAFF33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CAFF33] md:hidden"
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
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
