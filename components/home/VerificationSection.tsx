"use client";

import { CheckCircle2, ShieldCheck, Users } from "lucide-react";

const VerificationSection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-300 px-4 pb-32 sm:px-8">
      <div className="relative overflow-hidden rounded-4xl border border-blue-500/20 bg-linear-to-br from-blue-500/8 via-indigo-500/4 to-transparent p-7 sm:p-12">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Make your professional history easier to trust.
            </h2>

            <p className="mt-5 leading-7 text-zinc-400">
              A resume tells people what you say you have done. Credora is
              designed to provide more context around the work behind those
              claims.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Verified professional experience",
              "Documented projects and contributions",
              "Skills connected to real work",
              "A professional identity that grows over time",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                <span className="text-sm text-zinc-300">{item}</span>
              </div>
            ))}

            <div className="flex items-center gap-3 px-5 pt-3 text-xs text-zinc-500">
              <Users className="h-4 w-4" />
              Built around professional connections and verifiable work.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
