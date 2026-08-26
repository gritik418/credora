"use client";

import { Logo } from "@/components/logo/Logo";
import Feature from "@/components/onboarding/Feature";
import ProfileStep from "@/components/onboarding/ProfileStep";
import StartStep from "@/components/onboarding/StartStep";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import { Sparkles, UserRound } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Welcome",
    description: "Let's get your professional identity ready.",
  },
  {
    id: 2,
    title: "Your Profile",
    description: "Tell us how you want to be represented.",
  },
  {
    id: 3,
    title: "Get Started",
    description: "Choose how you want to begin with Credora.",
  },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(1);

  const progress = (step / steps.length) * 100;

  const nextStep = () => {
    if (step < steps.length) {
      setStep((current) => current + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((current) => current - 1);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Panel */}
        <aside className="relative hidden overflow-hidden bg-secondary lg:flex lg:flex-col lg:justify-between lg:p-12">
          {/* Decorative gradients */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

          {/* Logo */}
          <Logo />

          {/* Main Content */}
          <div className="relative max-w-lg">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <UserRound className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-secondary-foreground xl:text-5xl">
              Your work tells your
              <span className="block text-primary"> real story.</span>
            </h1>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Credora helps you build a verified record of the work,
              contributions, and experiences that define your professional
              journey.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 space-y-4">
              <Feature
                number="01"
                title="Real work"
                description="Track projects, tasks, and meaningful contributions."
              />

              <Feature
                number="02"
                title="Verified experience"
                description="Build a professional record backed by real organizations."
              />

              <Feature
                number="03"
                title="Your identity"
                description="Own a professional profile that grows with your work."
              />
            </div>
          </div>

          <p className="relative text-sm text-muted-foreground">
            © {new Date().getFullYear()} Credora. Your work. Your story.
          </p>
        </aside>

        {/* Right Panel */}
        <section className="flex min-h-screen items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="w-full max-w-xl">
            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>

              <span className="text-xl font-semibold">Credora</span>
            </div>

            {/* Progress */}
            <div className="mb-10">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {step} of {steps.length}
                </span>

                <span className="text-sm font-medium text-primary">
                  {Math.round(progress)}% complete
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            {step === 1 && <WelcomeStep onNext={nextStep} />}

            {step === 2 && (
              <ProfileStep onNext={nextStep} onBack={previousStep} />
            )}

            {step === 3 && <StartStep onBack={previousStep} />}
          </div>
        </section>
      </div>
    </main>
  );
};

export default OnboardingPage;
