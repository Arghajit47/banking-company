"use client";

import Image from "next/image";
import Link from "next/link";
import LogoIcon from "@/components/LogoIcon";
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
/**
 * Figma 11:89129 — a 24x24 frame with no fill of its own; the glyph 11:89130 ("Subtract") is a
 * SOLID #CAFF33 envelope. The previous hand-drawn icon inverted this (lime rounded square with a
 * dark glyph), which is why the icon read as "not visible" against the footer.
 */
function MailIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/assets/footer/icon-email.svg"
      alt=""
      width={24}
      height={24}
      aria-hidden="true"
      data-testid="footer-email-icon"
      className={`h-6 w-6 shrink-0 ${className}`.trim()}
    />
  );
}

/**
 * Figma 11:89133 — glyph 11:89134 is named "Vector (Stroke)" but the outline has already been
 * converted to a filled path, so it must be rendered with `fill` (#CAFF33) and no stroke; stroking
 * it is what made the handset render incorrectly.
 */
function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/assets/footer/icon-phone.svg"
      alt=""
      width={24}
      height={24}
      aria-hidden="true"
      data-testid="footer-phone-icon"
      className={`h-6 w-6 shrink-0 ${className}`.trim()}
    />
  );
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#CAFF33" />
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5.13 15.87 2 12 2ZM12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5Z"
        fill="#1A1A1A"
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
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
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
      className="w-full bg-[#1C1C1C] font-[var(--font-lexend)]"
    >
      <div className="mx-auto max-w-[1596px] px-4 pt-[50px] pb-[30px] laptop:px-20 laptop:pt-[60px] desktop:px-[162px] desktop:pt-[100px] desktop:pb-[50px]">
        {/* Top: logo + nav */}
        <div className="flex flex-col items-center gap-[24px] laptop:gap-[40px] desktop:gap-[50px]">
          <Link
            href="/"
            data-testid="footer-logo"
            className="flex items-center gap-[5.17px] text-white"
          >
            <LogoIcon size={34} />
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
                className="text-[14px] font-normal text-[#E4E4E7] transition-opacity hover:opacity-70 md:text-[16px] desktop:text-[18px]"
              >
                <SkeletonText isLoading={showSkeleton} className="min-w-[60px]">
                  {link.label}
                </SkeletonText>
              </Link>
            ))}
          </nav>
        </div>

        <hr className="my-[30px] border-[#262626] laptop:my-[40px] desktop:my-[50px]" />

        {/* Contact row */}
        <div
          data-testid="footer-contact"
          className="flex flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-10 xl:gap-[60px]"
        >
          <Link
            href={`mailto:${config.contact.email}`}
            data-testid="footer-email"
            className="flex items-center gap-[6px] text-[14px] font-normal text-[#E4E4E7] transition-opacity hover:opacity-70 md:text-[16px] desktop:text-[18px]"
          >
            <MailIcon />
            <SkeletonText isLoading={showSkeleton} className="min-w-[180px]">
              {config.contact.email}
            </SkeletonText>
          </Link>
          <Link
            href={`tel:${config.contact.phone.replace(/\s/g, "")}`}
            data-testid="footer-phone"
            className="flex items-center gap-[6px] text-[14px] font-normal text-[#E4E4E7] transition-opacity hover:opacity-70 md:text-[16px] desktop:text-[18px]"
          >
            <PhoneIcon />
            <SkeletonText isLoading={showSkeleton} className="min-w-[160px]">
              {config.contact.phone}
            </SkeletonText>
          </Link>
          <span
            data-testid="footer-location"
            className="flex items-center gap-[6px] text-[14px] font-normal text-[#E4E4E7] md:text-[16px] desktop:text-[18px]"
          >
            <LocationIcon />
            <SkeletonText isLoading={showSkeleton} className="min-w-[180px]">
              {config.contact.location}
            </SkeletonText>
          </span>
        </div>

        <hr className="my-[30px] border-[#262626] laptop:my-[40px] desktop:my-[50px]" />

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
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#262626] text-[#CAFF33] transition-opacity hover:opacity-80"
                  aria-label={social.name}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              );
            })}
          </div>

          <p
            data-testid="footer-copyright"
            className="text-center text-[14px] font-light text-[#B3B3B3] desktop:text-[18px]"
          >
            <SkeletonText isLoading={showSkeleton} className="min-w-[220px]">
              {config.copyright}
            </SkeletonText>
          </p>

          <div
            data-testid="footer-legal"
            className="flex items-center gap-[10px] text-[14px] font-light text-[#B3B3B3] desktop:text-[18px]"
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
