import { ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "WhatBytes",
    role: "Frontend Developer Intern",
    period: "Jul 2025 — Jan 2026",
    duration: "6 months",
    verified: true,
    description:
      "Worked on production web applications across frontend development and full-stack features.",
    stats: ["4 Projects", "32 Tasks", "6 Contributions"],
    technologies: ["Next.js", "React", "TypeScript", "Node.js"],
  },
];

const ExperienceSection = () => {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Professional history
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Verified experience
          </h2>
        </div>

        <span className="hidden text-xs text-muted-foreground sm:block">
          1 verified record
        </span>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <article
            key={experience.company}
            className="group rounded-2xl border border-border bg-card/70 p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-muted text-sm font-bold">
                WB
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{experience.company}</h3>

                      {experience.verified && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {experience.role}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium">{experience.period}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {experience.duration}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {experience.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-4">
                  {experience.stats.map((stat) => (
                    <span
                      key={stat}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      {stat}
                    </span>
                  ))}

                  <button className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary opacity-80 transition group-hover:opacity-100">
                    View record
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
