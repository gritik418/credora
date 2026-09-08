import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function CompletedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b14] px-6 text-white">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="relative w-full max-w-xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-indigo-500/20 bg-indigo-500/10">
          <Check size={36} className="text-indigo-400" />
        </div>

        <div className="mb-3 flex items-center justify-center gap-2 text-sm text-indigo-400">
          <Sparkles size={15} />
          You're all set
        </div>

        <h1 className="text-4xl font-semibold tracking-tight">
          Your Credora identity is ready.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/40">
          Your professional information is now organized into one identity you
          can build on, share, and grow.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/username"
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            View your identity
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
