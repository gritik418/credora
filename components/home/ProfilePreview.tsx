"use client";

import { CheckCircle2, ExternalLink, MapPin } from "lucide-react";

const ProfilePreview = () => {
  return (
    <section className="relative z-10 mx-auto max-w-300 px-4 pb-32 sm:px-8">
      <div className="overflow-hidden rounded-4xl border border-blue-500/20 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute" />

        <div className="border-b border-white/10 px-6 py-5 sm:px-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                A Credora Profile
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Professional identity
              </p>
            </div>

            <ExternalLink className="h-4 w-4 text-zinc-500" />
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-400 to-violet-500 text-2xl font-bold text-white shadow-lg shadow-blue-500/20">
              AD
            </div>

            <h3 className="mt-5 text-2xl font-bold text-white">
              Alex Developer
            </h3>

            <p className="mt-1 text-blue-300/80">Full Stack Developer</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="h-4 w-4" />
              Bengaluru, India
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Verified professional
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">
                Professional experience
              </h4>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Verified
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h5 className="font-semibold text-white">
                    Full Stack Developer
                  </h5>
                  <p className="mt-1 text-sm text-zinc-500">Company A</p>
                </div>

                <span className="text-xs text-zinc-600">2024 — Present</span>
              </div>

              <p className="mt-5 text-sm leading-6 text-zinc-400">
                Built and maintained production applications across the frontend
                and backend, working with React, Node.js and PostgreSQL.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["React", "Node.js", "PostgreSQL", "TypeScript"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-zinc-400"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Projects", "8"],
                ["Skills", "14"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/3 p-5"
                >
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-zinc-600">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePreview;
