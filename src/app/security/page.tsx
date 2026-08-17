import { SecurityHeroSection } from "@/components/security/SecurityHeroSection";
import { ProtectionSection } from "@/components/security/ProtectionSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Navbar } from "@/components/layout/Navbar";

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-urbanist)]">
      <Navbar />
      {/*
        BC-185: page-level container margins come straight from the Figma page
        frames — mobile 116:10982 = 16, laptop 116:10612 = 80, desktop 62:1684 = 162.
        `laptop:` is 1440 and `desktop:` is 1920, so the desktop margin no longer
        leaks down into the 1024-1439 band the way `lg:px-[162px]` did. There is
        no tablet frame, so no intermediate step is invented between 16 and 80.
      */}
      <main className="px-4 py-8 md:py-12 lg:py-[80px] laptop:px-20 desktop:px-[162px]">
        <SecurityHeroSection />
        <ProtectionSection />
        <FAQSection />
      </main>
    </div>
  );
}
