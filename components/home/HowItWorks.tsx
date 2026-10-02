"use client";

import { UserRound, Verified, Wrench } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: UserRound,
      title: "Create your identity",
      description:
        "Set up your professional profile with your experience, skills, education, and areas of expertise.",
    },
    {
      number: "02",
      icon: Wrench,
      title: "Add your work",
      description:
        "Document the projects you have worked on, what you contributed, the technologies you used, and the impact you made.",
    },
    {
      number: "03",
      icon: Verified,
      title: "Build verification",
      description:
        "Connect your professional history with verifiable organizations, projects, and contributions.",
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-300 px-4 pb-32 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            How it works
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
            Turn your work
            <span className="text-blue-500"> into your identity.</span>
          </h2>

          <p className="mt-6 max-w-lg leading-7 text-zinc-400">
            Credora gives you a structured way to present your professional
            journey instead of relying only on a traditional resume.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group flex gap-5 rounded-3xl border border-white/10 p-6 backdrop-blur-xl transition-all hover:border-blue-500/40"
              >
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="mt-3 text-[10px] font-bold tracking-widest text-zinc-600">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
