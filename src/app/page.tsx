import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { UseCasesSection } from "@/components/home/UseCasesSection";
import { Navbar } from "@/components/layout/Navbar";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-lexend)]">
      <Navbar />
      {/*
        BC-189: the home page carried three competing vertical-rhythm systems
        (py-16 on the home sections, py-12/md:py-16/lg:py-20 on the shared ones,
        none on CTA, py-[50px] on the footer), and FAQ/Testimonials/CTA sat
        outside <main> so no single container could set the rhythm.

        Figma models the rhythm as a GAP BETWEEN sections with zero vertical
        padding on the section frames themselves, uniform per frame:
          gap between adjacent sections   80 @390   120 @1440   150 @1920
          navbar bottom -> hero top       50 @390    30 @1440    53 @1920
        (Measured on 108:2747 / 104:599 / 5:26176: seven of the eight section
        boundaries are exactly 80/120/150 in all three frames.)

        Mechanism: every section carries HALF the gap as its own py
        (40/60/75), so any two adjacent sections sum to 80/120/150 without a
        container needing to know its children. Boundary sections take the full
        value on their outer edge — the hero's pt is the navbar gap, and CTA's
        pb is the full gap to the root-layout Footer. This also keeps the
        shared FAQ/Testimonials sections self-spacing on /security, /login and
        /signup, whose page files are out of scope for this ticket.

        BC-185 put the page gutter on <main> (16/80/162). The home sections were
        each carrying their own copy of it; FAQ/Testimonials/CTA carried a
        different and wrong one (xl:px-12 = 48 at both 1440 and 1920). It now
        lives here once. Removing it from FAQSection also fixes the double
        padding it was inflicting on /security, whose <main> already supplies it.

        The hero is deliberately OUTSIDE the gutter container: it is inset 16 at
        390 but full-bleed at 1440 (x=0, w=1440) and wider than the viewport at
        1920 (x=-29.47, w=1978.95), so it keeps its own horizontal ladder.
      */}
      <main>
        <HeroSection />
        <div className="px-4 laptop:px-20 desktop:px-[162px]">
          <ProductsSection />
          <UseCasesSection />
          <FeaturesSection />
          <FAQSection />
          <TestimonialsSection />
          <CTASection />
        </div>
      </main>
    </div>
  );
}
