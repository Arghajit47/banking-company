import { NextResponse } from "next/server";

export interface FooterConfig {
  navLinks: Array<{ label: string; href: string }>;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: Array<{ name: string; url: string }>;
  copyright: string;
}

const footerConfig: FooterConfig = {
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

export async function GET(): Promise<NextResponse<FooterConfig>> {
  return NextResponse.json(footerConfig);
}
