import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-slate-900">
            Banking Company
          </h1>
          <p className="max-w-md text-lg leading-8 text-slate-600">
            A modern full-stack foundation for the Banking Company website.
            Built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Storybook.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button primary label="Get Started" />
          <Button label="Learn More" />
        </div>
      </main>
    </div>
  );
}
