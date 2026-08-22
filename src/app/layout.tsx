import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// BC-189: Figma specifies Lexend across every frame (335 of 338 text nodes on the
// home page frames report fontFamily "Lexend"). This supersedes BC-161, which had
// accepted Urbanist. Loaded through next/font/google exactly as Urbanist was, so
// the webfont is self-hosted and preloaded rather than silently falling back.
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "YourBank — Empowering Your Financial Journey",
  description: "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      { rel: "mask-icon", url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}