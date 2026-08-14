import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main
      data-testid="signup-page"
      className="flex min-h-screen items-center justify-center bg-[#1E1E1E] px-4 py-12 md:px-8 desktop:px-[297px]"
    >
      <div className="w-full max-w-[1326px]">
        <SignUpForm />
      </div>
    </main>
  );
}
