import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { ValuesSection } from "@/components/careers/ValuesSection";
import { BenefitsSection } from "@/components/careers/BenefitsSection";
import { JobOpeningsSection } from "@/components/careers/JobOpeningsSection";
import { Navbar } from "@/components/layout/Navbar";

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-urbanist)]">
      <Navbar />
      <main>
        <CareersHeroSection />
        <ValuesSection />
        <BenefitsSection />
        <JobOpeningsSection />
      </main>
    </div>
  );
}
