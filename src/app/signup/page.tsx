import { SignUpForm } from "@/components/auth/SignUpForm";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function SignUpPage() {
  return (
    <main
      data-testid="signup-page"
      className="min-h-screen bg-[#1A1A1A]"
    >
      <div className="flex items-center justify-center px-4 py-12 md:px-8 desktop:px-[297px]">
        <div className="w-full max-w-[1326px]">
          <SignUpForm />
        </div>
      </div>
      <div className="px-4 py-16 md:px-8 lg:px-[162px]">
        <TestimonialsSection />
      </div>
    </main>
  );
}
