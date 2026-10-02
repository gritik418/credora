"use client";

import { BriefcaseBusiness, Fingerprint, Sparkles } from "lucide-react";

const CredoraIntro = () => {
  const features = [
    {
      icon: Fingerprint,
      title: "One professional identity",
      description:
        "Keep your experience, projects, skills, and professional journey together in one place.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Show real work",
      description:
        "Go beyond job titles and describe the projects, responsibilities, and contributions behind your experience.",
    },
    {
      icon: Sparkles,
      title: "Build professional trust",
      description:
        "Give people a clearer picture of what you have actually worked on and what you can do.",
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-300 px-4 pb-32 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
          What is Credora?
        </span>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Your professional story,
          <span className="text-blue-500"> in one place.</span>
        </h2>

        <p className="mt-6 text-base leading-8 text-zinc-400 sm:text-lg">
          Credora is a professional identity platform designed to help people
          document and showcase their real-world work. Build a profile that
          represents more than a resume — your experience, projects, skills,
          contributions, and professional journey.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-white/4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CredoraIntro;
