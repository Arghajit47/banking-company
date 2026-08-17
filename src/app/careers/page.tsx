import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { ValuesSection } from "@/components/careers/ValuesSection";
import { BenefitsSection } from "@/components/careers/BenefitsSection";
import { JobOpeningsSection } from "@/components/careers/JobOpeningsSection";
import { Navbar } from "@/components/layout/Navbar";

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-urbanist)]">
      <Navbar />
      {/*
        BC-185: the careers page carried no container margin at all — a missing
        tier rather than a wrong one. Values come straight from the Figma page
        frames — mobile 113:7470 = 16, laptop 113:5043 = 80, desktop 49:25 = 162 —
        matching /about and /security. Vertical rhythm stays with the sections.
      */}
      <main className="px-4 laptop:px-20 desktop:px-[162px]">
        <CareersHeroSection />
        <ValuesSection />
        <BenefitsSection />
        <JobOpeningsSection />
      </main>
    </div>
  );
}
