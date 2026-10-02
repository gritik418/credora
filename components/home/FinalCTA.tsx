"use client";

import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-4 pb-32 text-center">
      <div className="rounded-4xl border border-white/10 bg-white/2.5 px-6 py-14 sm:px-12 sm:py-20">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
          Start building
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Your next opportunity should see more than your resume.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-400">
          Build a professional identity that captures the work you have done,
          the skills you have developed, and the journey behind them.
        </p>

        <button className="group cursor-pointer mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]">
          Create your Credora profile
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
