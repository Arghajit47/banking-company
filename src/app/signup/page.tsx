import { Navbar } from "@/components/layout/Navbar";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function SignUpPage() {
  return (
    <div
      data-testid="signup-page"
      className="min-h-screen bg-[#1A1A1A]"
    >
      <Navbar />
      <main className="px-4 py-12 md:px-8 desktop:px-[297px]">
        <div className="mx-auto w-full max-w-[1326px]">
          <SignUpForm />
        </div>
      </main>
      <div className="px-4 py-16 md:px-8 lg:px-[162px]">
        <TestimonialsSection />
      </div>
    </div>
  );
}
