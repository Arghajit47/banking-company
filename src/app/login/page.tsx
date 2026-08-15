import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/auth/LoginForm";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function LoginPage() {
  return (
    <div
      data-testid="login-page"
      className="min-h-screen bg-[#1A1A1A]"
    >
      <Navbar />
      <main className="px-4 py-12 md:px-8 desktop:px-[297px]">
        <div className="mx-auto w-full max-w-[1326px]">
          <LoginForm />
        </div>
      </main>
      <div className="px-4 py-16 md:px-8 lg:px-[162px]">
        <TestimonialsSection />
      </div>
    </div>
  );
}
