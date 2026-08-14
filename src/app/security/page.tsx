import { SecurityHeroSection } from "@/components/security/SecurityHeroSection";
import { ProtectionSection } from "@/components/security/ProtectionSection";
import { Navbar } from "@/components/layout/Navbar";

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-lexend)]">
      <Navbar />
      <main className="px-4 py-8 md:px-8 md:py-12 lg:px-[162px] lg:py-[80px]">
        <SecurityHeroSection />
        <ProtectionSection />
      </main>
    </div>
  );
}
