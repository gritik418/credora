"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-24 text-center sm:pt-32">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-400">
        <CheckCircle2 className="h-3.5 w-3.5" />
        The professional identity platform
      </div>

      <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-7xl">
        Your work deserves to be
        <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
          {" "}
          seen and verified.
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
        Credora helps you build a professional identity around the work you have
        actually done, the skills you have built, and the contributions you have
        made.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button className="cursor-pointer group flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]">
          Build Your Profile
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button className="rounded-full cursor-pointer border border-white/10 bg-white/3 px-7 py-3.5 font-semibold text-white transition-all hover:border-white/20 hover:bg-white/6">
          Explore Credora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
