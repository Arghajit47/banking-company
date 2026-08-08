"use client";

import Link from "next/link";
import { useFooterConfig, type FooterConfig } from "@/lib/footer";
import { useMounted } from "@/lib/use-mounted";

const defaultConfig: FooterConfig = {
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers" },
    { label: "About", href: "/about" },
    { label: "Security", href: "/security" },
  ],
  contact: {
    email: "hello@skillbirdge.com",
    phone: "+91 91813 23 2309",
    location: "Somewhere in the World",
  },
  social: [
    { name: "facebook", url: "#" },
    { name: "x", url: "#" },
    { name: "linkedin", url: "#" },
  ],
  copyright: "YourBank All Rights Reserved",
};

function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="36" height="36" rx="8" fill="#CAFF33" />
      <path
        d="M18 8C13.58 8 10 11.58 10 16V26H14V16C14 13.79 15.79 12 18 12C20.21 12 22 13.79 22 16V26H26V16C26 11.58 22.42 8 18 8Z"
        fill="#1A1A1A"
      />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#262626" />
      <path
        d="M4 6H20V18H4V6ZM12 12L4 6V18H20V6L12 12ZM12 12L20 6H4L12 12Z"
        fill="#CAFF33"
      />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#262626" />
      <path
        d="M6.5 4C6.5 4 8.5 4 9.5 5C10.5 6 10.5 8 10.5 8C10.5 8 10 9.5 8.5 10C8.5 10 9 11 10 12C11 13 12 13.5 12 13.5C12.5 12 14 11.5 14 11.5C14 11.5 16 11.5 17 12.5C18 13.5 18 15.5 18 15.5C18 15.5 17.5 17.5 15.5 18.5C13.5 19.5 10.5 18.5 8 16C5.5 13.5 4.5 10.5 5.5 8.5C6.5 6.5 8.5 6 8.5 6L6.5 4Z"
        fill="#CAFF33"
      />
    </svg>
  );
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#262626" />
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5.13 15.87 2 12 2ZM12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5Z"
        fill="#CAFF33"
      />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  x: TwitterIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
};

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.12 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26L23.35 21.75h-6.42l-5.03-6.59-5.76 6.59H2.83l7.73-8.83L.67 2.25h6.58l4.55 6.02 5.44-6.02Zm-1.16 17.47h1.84L7.08 4.18H5.12l11.96 15.54Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.05 8.05h4.9v15.4H.05V8.05ZM7.35 8.05h4.7v2.1h.07c.65-1.23 2.25-2.53 4.63-2.53 4.95 0 5.86 3.25 5.86 7.48v8.35h-4.9v-7.4c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.91v7.52H7.35V8.05Z" />
    </svg>
  );
}

function SkeletonText({
  children,
  isLoading,
  className = "",
}: {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}) {
  if (!isLoading) return <>{children}</>;
  return (
    <span
      className={`inline-block animate-pulse rounded bg-[#262626] text-transparent ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function Footer() {
  const mounted = useMounted();
  const { data, error, isLoading } = useFooterConfig();

  const config =
    error || !data || data.navLinks.length === 0 ? defaultConfig : data;
  const showSkeleton = !mounted || isLoading;

  return (
    <footer
      data-testid="footer"
      className="w-full bg-[#1A1A1A] font-[var(--font-lexend)]"
    >
      <div className="mx-auto max-w-[1596px] px-4 py-[50px] md:px-6 xl:px-0">
        {/* Top: logo + nav */}
        <div className="flex flex-col items-center gap-[50px]">
          <Link
            href="/"
            data-testid="footer-logo"
            className="flex items-center gap-[5.17px]"
          >
            <LogoIcon className="h-10 w-10" />
            <span className="text-xl font-medium tracking-tight text-white">
              YourBanK
            </span>
          </Link>

          <nav
            data-testid="footer-nav"
            className="flex flex-wrap items-center justify-center gap-8 md:gap-[78px]"
          >
            {config.navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                data-testid={`footer-nav-${link.label.toLowerCase()}`}
                className="text-lg font-normal text-white transition-opacity hover:opacity-70"
              >
                <SkeletonText isLoading={showSkeleton} className="min-w-[60px]">
                  {link.label}
                </SkeletonText>
              </Link>
            ))}
          </nav>
        </div>

        <hr className="my-[50px] border-[#262626]" />

        {/* Contact row */}
        <div
          data-testid="footer-contact"
          className="flex flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-10 xl:gap-[60px]"
        >
          <Link
            href={`mailto:${config.contact.email}`}
            data-testid="footer-email"
            className="flex items-center gap-[18px] text-lg text-white transition-opacity hover:opacity-70"
          >
            <MailIcon />
            <SkeletonText isLoading={showSkeleton} className="min-w-[180px]">
              {config.contact.email}
            </SkeletonText>
          </Link>
          <Link
            href={`tel:${config.contact.phone.replace(/\s/g, "")}`}
            data-testid="footer-phone"
            className="flex items-center gap-[18px] text-lg text-white transition-opacity hover:opacity-70"
          >
            <PhoneIcon />
            <SkeletonText isLoading={showSkeleton} className="min-w-[160px]">
              {config.contact.phone}
            </SkeletonText>
          </Link>
          <span
            data-testid="footer-location"
            className="flex items-center gap-[18px] text-lg text-white"
          >
            <LocationIcon />
            <SkeletonText isLoading={showSkeleton} className="min-w-[180px]">
              {config.contact.location}
            </SkeletonText>
          </span>
        </div>

        <hr className="my-[50px] border-[#262626]" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-8 xl:flex-row">
          <div
            data-testid="footer-socials"
            className="flex items-center gap-3"
          >
            {config.social.map((social) => {
              const Icon = socialIconMap[social.name] ?? FacebookIcon;
              return (
                <Link
                  key={social.name}
                  href={social.url}
                  data-testid={`footer-social-${social.name}`}
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#262626] bg-[#1A1A1A] text-[#CAFF33] transition-colors hover:border-[#CAFF33]"
                  aria-label={social.name}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              );
            })}
          </div>

          <p
            data-testid="footer-copyright"
            className="text-center text-lg text-white"
          >
            <SkeletonText isLoading={showSkeleton} className="min-w-[220px]">
              {config.copyright}
            </SkeletonText>
          </p>

          <div
            data-testid="footer-legal"
            className="flex items-center gap-[10px] text-lg text-white"
          >
            <Link
              href="/privacy-policy"
              data-testid="footer-privacy"
              className="transition-opacity hover:opacity-70"
            >
              Privacy Policy
            </Link>
            <span className="h-4 w-[1px] bg-[#262626]" />
            <Link
              href="/terms-of-service"
              data-testid="footer-terms"
              className="transition-opacity hover:opacity-70"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
