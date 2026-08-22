import { CareersHeroSection } from "@/components/careers/CareersHeroSection";
import { ValuesSection } from "@/components/careers/ValuesSection";
import { BenefitsSection } from "@/components/careers/BenefitsSection";
import { JobOpeningsSection } from "@/components/careers/JobOpeningsSection";
import { Navbar } from "@/components/layout/Navbar";

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-lexend)]">
      <Navbar />
      {/*
        BC-185: the careers page carried no container margin at all — a missing
        tier rather than a wrong one. Values come straight from the Figma page
        frames — mobile 113:7470 = 16, laptop 113:5043 = 80, desktop 49:25 = 162 —
        matching /about and /security. Vertical rhythm stays with the sections.
      */}
      {/*
        BC-188: vertical padding, measured in the same three frames. Top gap =
        navbar bottom edge -> hero top edge; bottom gap = last section bottom
        edge -> footer top edge (the Footer lives in the root layout).
          390  113:7470 — navbar 40+68=108, hero y=138  -> 30; CTA ends 8236, footer 8316 ->  80
          1440 113:5043 — navbar 30+73=103, hero y=153  -> 50; CTA ends 5529, footer 5649 -> 120
          1920 49:25    — navbar 50+95=145, hero y=198  -> 53; CTA ends 6750, footer 6900 -> 150
        Identical to /about and /security, so this page was missing the whole
        ladder rather than carrying a wrong one.
      */}
      <main className="px-4 pt-[30px] pb-20 laptop:px-20 laptop:pt-[50px] laptop:pb-[120px] desktop:px-[162px] desktop:pt-[53px] desktop:pb-[150px]">
        <CareersHeroSection />
        <ValuesSection />
        <BenefitsSection />
        <JobOpeningsSection />
      </main>
    </div>
  );
}
