"use client";

import { Building2, Code2, GraduationCap, UserRoundCheck } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: Code2,
      title: "For professionals",
      description:
        "Showcase your experience, projects, skills, and contributions in a profile that grows with your career.",
    },
    {
      icon: Building2,
      title: "For organizations",
      description:
        "Create a clearer picture of the people who have worked with your organization and the work they contributed to.",
    },
    {
      icon: GraduationCap,
      title: "For early careers",
      description:
        "Turn projects, internships, freelance work, and practical experience into a professional identity.",
    },
    {
      icon: UserRoundCheck,
      title: "For your network",
      description:
        "Give recruiters, collaborators, and professional connections a richer way to understand your background.",
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-300 px-4 pb-32 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
          Built for professional growth
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
          More than a profile.
        </h2>

        <p className="mt-5 leading-7 text-zinc-400">
          Credora connects different parts of your professional journey into one
          identity.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {useCases.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 p-7 transition-all hover:border-blue-500/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-blue-400">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UseCases;
