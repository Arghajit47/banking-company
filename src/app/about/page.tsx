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
      <main className="px-4 py-8 md:py-12 lg:py-[80px] laptop:px-20 desktop:px-[162px]">
        <AboutHeroSection />
        <MissionVisionSection />
        <PressReleasesSection />
      </main>
    </div>
  );
}
