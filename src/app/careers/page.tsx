import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { Navbar } from "@/components/layout/Navbar";

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-lexend)]">
      <Navbar />
      <main>
        <CareersHeroSection />
      </main>
    </div>
  );
}
