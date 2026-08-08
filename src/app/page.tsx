import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1A1A1A] font-[var(--font-lexend)]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 lg:px-20 xl:px-[162px]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">Banking Company</h1>
          <p className="mt-4 max-w-md text-lg text-white/70">
            A modern full-stack foundation for the Banking Company website.
          </p>
        </div>
      </main>
    </div>
  );
}
