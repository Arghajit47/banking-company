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
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-urbanist)]">
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection />
        <UseCasesSection />
        <FeaturesSection />
      </main>
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
