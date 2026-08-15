import { LoginForm } from "@/components/auth/LoginForm";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function LoginPage() {
  return (
    <main
      data-testid="login-page"
      className="min-h-screen bg-[#1A1A1A]"
    >
      <div className="flex items-center justify-center px-4 py-12 md:px-8 desktop:px-[297px]">
        <div className="w-full max-w-[1326px]">
          <LoginForm />
        </div>
      </div>
      <div className="px-4 py-16 md:px-8 lg:px-[162px]">
        <TestimonialsSection />
      </div>
    </main>
  );
}
