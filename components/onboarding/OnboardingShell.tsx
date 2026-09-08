"use client";

import { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  { key: "BASIC_INFO", label: "Basics" },
  { key: "PROFESSIONAL", label: "Professional" },
  { key: "SUMMARY", label: "Summary" },
  { key: "LOCATION", label: "Location" },
  { key: "SKILLS", label: "Skills" },
  { key: "EDUCATION", label: "Education" },
  { key: "AVAILABILITY", label: "Availability" },
];

interface Props {
  currentStep: string;
  title: string;
  description: string;
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  continueText?: string;
  loading?: boolean;
}

const OnboardingShell = ({
  currentStep,
  title,
  description,
  children,
  onBack,
  onContinue,
  continueText = "Continue",
  loading,
}: Props) => {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <main className="min-h-screen bg-[#080b14] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500">
              <Sparkles size={18} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Credora
            </span>
          </div>

          <div className="text-sm text-white/40">
            Step {currentIndex + 1} of {steps.length}
          </div>
        </header>

        {/* Progress */}
        <div className="mt-8">
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 hidden justify-between md:flex">
            {steps.map((step, index) => (
              <span
                key={step.key}
                className={`text-xs ${
                  index <= currentIndex ? "text-white/70" : "text-white/20"
                }`}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-indigo-400">
                Build your professional identity
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
                {description}
              </p>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {children}
            </div>

            {/* Footer */}
            {(onBack || onContinue) && (
              <div className="mt-6 flex items-center justify-between">
                {onBack ? (
                  <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {onContinue && (
                  <button
                    onClick={onContinue}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : continueText}
                    {!loading && <ArrowRight size={16} />}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OnboardingShell;
