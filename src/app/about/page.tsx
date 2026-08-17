import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";
import { PressReleasesSection } from "@/components/about/PressReleasesSection";
import { Navbar } from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-urbanist)]">
      <Navbar />
      {/*
        BC-185: page-level container margins come straight from the Figma page
        frames — mobile 116:10211 = 16, laptop 113:9801 = 80, desktop 58:1223 = 162.
        `laptop:` is 1440 and `desktop:` is 1920, so the desktop margin no longer
        leaks down into the 1024-1439 band the way `lg:px-[162px]` did. There is
        no tablet frame, so no intermediate step is invented between 16 and 80.
      */}
      {/*
        BC-188: vertical padding, measured in the same three frames. Top gap =
        navbar bottom edge -> hero top edge; bottom gap = last section bottom
        edge -> footer top edge (the Footer lives in the root layout).
          390  116:10211 — navbar 40+68=108, hero y=138  -> 30; last 5287, footer 5367 ->  80
          1440 113:9801  — navbar 30+73=103, hero y=153  -> 50; last 3637, footer 3757 -> 120
          1920 58:1223   — navbar 50+95=145, hero y=198  -> 53; last 4495, footer 4645 -> 150
        The old `py-8 md:py-12 lg:py-[80px]` was wrong three ways: it was
        symmetric where Figma is not, its 32/48/80 values match no frame, and
        `md:`/`lg:` (768/1024) are bands with no frame behind them — the 1024
        leak. The navbar's own 40/30/50 top inset is the page inset and stays
        out of <main>.
      */}
      <main className="px-4 pt-[30px] pb-20 laptop:px-20 laptop:pt-[50px] laptop:pb-[120px] desktop:px-[162px] desktop:pt-[53px] desktop:pb-[150px]">
        <AboutHeroSection />
        <MissionVisionSection />
        <PressReleasesSection />
      </main>
    </div>
  );
}
