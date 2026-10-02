"use client";

import { ArrowRight, Check, CircleCheckBigIcon, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const OnboardingCompletedPage = () => {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden text-credora-text">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-130 w-130 rounded-full bg-credora-violet/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-130 w-130 rounded-full bg-credora-blue/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white">
              <CircleCheckBigIcon size={48} strokeWidth={2.5} />
            </div>
          </div>

          <div className="mb-4 inline-flex uppercase items-center gap-2 rounded-full border border-blue-500/15 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-credora-blue">
            <Sparkles size={13} />
            Profile setup complete
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Your Credora profile
            <span className="block bg-linear-to-r from-credora-blue via-credora-indigo to-credora-violet bg-clip-text text-transparent">
              is ready.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/40 sm:text-base">
            You’ve completed your professional profile. Your experience, skills,
            education, and availability are now part of your Credora identity.
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-credora-border bg-credora-surface/70 p-5 text-left shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-credora-blue to-credora-violet text-lg font-semibold text-white">
                R
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  Professional identity
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Your profile is ready to be viewed and shared.
                </p>
              </div>

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <Check size={14} />
              </div>
            </div>

            <div className="mt-5 h-px bg-white/6" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-white/30">Profile completion</span>

              <span className="text-xs font-medium text-emerald-400">100%</span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/6">
              <div className="h-full w-full rounded-full bg-linear-to-r from-credora-blue via-credora-indigo to-credora-violet" />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
            >
              View my profile
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="w-full cursor-pointer rounded-xl border border-white/10 bg-white/3 px-6 py-3 text-sm font-medium text-white/60 transition hover:border-white/15 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              Go to dashboard
            </button>
          </div>

          <p className="mt-8 text-xs text-white/50">
            You can update your professional information anytime.
          </p>
        </div>
      </div>
    </main>
  );
};

export default OnboardingCompletedPage;
