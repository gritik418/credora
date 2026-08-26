import { CheckCircle2 } from "lucide-react";

const timeline = [
  {
    year: "2026",
    title: "Full Stack Development",
    description:
      "Expanded into backend architecture, AI integrations, databases, and SaaS development.",
    verified: true,
  },
  {
    year: "2025",
    title: "Frontend Developer Intern",
    description:
      "Worked on production applications and contributed to multiple product initiatives.",
    verified: true,
  },
  {
    year: "2024",
    title: "Started building full-stack projects",
    description:
      "Built independent applications across React, Node.js, databases, and APIs.",
    verified: false,
  },
];

const CareerTimeline = () => {
  return (
    <section className="rounded-2xl border border-border bg-card/70 p-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Career journey
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight">
          Professional timeline
        </h2>
      </div>

      <div className="relative ml-2 border-l border-border pl-8">
        {timeline.map((item, index) => (
          <div
            key={item.year}
            className={`relative ${
              index !== timeline.length - 1 ? "pb-10" : ""
            }`}
          >
            <div className="absolute -left-10.25 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-primary">
                {item.year}
              </span>

              {item.verified && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>

            <h3 className="mt-2 text-base font-semibold">{item.title}</h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerTimeline;
