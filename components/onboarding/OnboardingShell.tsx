"use client";

import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  { key: "BASIC_INFO", label: "Basics" },
  { key: "PROFESSIONAL", label: "Professional" },
  { key: "EXPERIENCE", label: "Experience" },
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
    <main className="relative min-h-screen text-credora-text">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-130 w-130 rounded-full bg-credora-violet/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] h-130 w-130 rounded-full bg-credora-blue/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <div className="pt-6 sm:pt-8">
          <div className="h-1 overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-linear-to-r from-credora-blue via-credora-indigo to-credora-violet transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 hidden items-center justify-between md:flex">
            {steps.map((step, index) => (
              <span
                key={step.key}
                className={`text-xs font-medium transition-colors ${
                  index <= currentIndex ? "text-white/65" : "text-white/20"
                }`}
              >
                {step.label}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between md:hidden">
            <span className="text-xs font-medium text-white/45">
              Step {currentIndex + 1} of {steps.length}
            </span>

            <span className="text-xs font-medium text-credora-blue">
              {steps[currentIndex]?.label}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-12 sm:py-16">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <p className="mb-3 text-[10px] uppercase font-semibold text-credora-blue">
                Build your professional identity
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
                {description}
              </p>
            </div>

            <div className="rounded-3xl border border-credora-border bg-credora-violet-dark p-6 shadow-3xl shadow-black/40 backdrop-blur-xl sm:p-8">
              {children}
            </div>

            {(onBack || onContinue) && (
              <div className="mt-6 flex items-center justify-between">
                {onBack ? (
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-white/35 transition hover:text-white"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {onContinue && (
                  <button
                    type="button"
                    onClick={onContinue}
                    disabled={loading}
                    className="group flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-white/90 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {loading ? "Saving..." : continueText}

                    {!loading && (
                      <ArrowRight
                        size={16}
                        className="transition-transform cursor-pointer group-hover:translate-x-0.5"
                      />
                    )}
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
