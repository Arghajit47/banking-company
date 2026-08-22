import { SecurityHeroSection } from "@/components/security/SecurityHeroSection";
import { ProtectionSection } from "@/components/security/ProtectionSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Navbar } from "@/components/layout/Navbar";

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-lexend)]">
      <Navbar />
      {/*
        BC-185: page-level container margins come straight from the Figma page
        frames — mobile 116:10982 = 16, laptop 116:10612 = 80, desktop 62:1684 = 162.
        `laptop:` is 1440 and `desktop:` is 1920, so the desktop margin no longer
        leaks down into the 1024-1439 band the way `lg:px-[162px]` did. There is
        no tablet frame, so no intermediate step is invented between 16 and 80.
      */}
      {/*
        BC-188: vertical padding, measured in the same three frames. Top gap =
        navbar bottom edge -> hero top edge; bottom gap = last section bottom
        edge -> footer top edge (the Footer lives in the root layout).
          390  116:10982 — navbar 40+68=108, hero y=138  -> 30; last 3814, footer 3894 ->  80
          1440 116:10612 — navbar 30+73=103, hero y=153  -> 50; last 2698, footer 2818 -> 120
          1920 62:1684   — navbar 50+95=145, hero y=198  -> 53; last 3297, footer 3447 -> 150
        Identical to /about and /careers. The old `py-8 md:py-12 lg:py-[80px]`
        was symmetric where Figma is not, matched no frame value, and hung off
        `md:`/`lg:` (768/1024) — bands with no frame behind them.
      */}
      <main className="px-4 pt-[30px] pb-20 laptop:px-20 laptop:pt-[50px] laptop:pb-[120px] desktop:px-[162px] desktop:pt-[53px] desktop:pb-[150px]">
        <SecurityHeroSection />
        <ProtectionSection />
        <FAQSection />
      </main>
    </div>
  );
}
