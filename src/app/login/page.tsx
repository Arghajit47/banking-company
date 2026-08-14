import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main
      data-testid="login-page"
      className="flex min-h-screen items-center justify-center bg-[#1E1E1E] px-4 py-12 md:px-8 desktop:px-[297px]"
    >
      <div className="w-full max-w-[1326px]">
        <LoginForm />
      </div>
    </main>
  );
}
