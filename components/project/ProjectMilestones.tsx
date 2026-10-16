import Link from "next/link";
import { ArrowRight, Check, Circle, Flag, MoreHorizontal } from "lucide-react";

const milestones = [
  {
    title: "Project foundation",
    description: "Architecture, authentication and initial setup",
    date: "Oct 05",
    status: "Completed",
    progress: 100,
  },
  {
    title: "Core platform",
    description: "Identity, organization and workspace modules",
    date: "Oct 24",
    status: "In progress",
    progress: 72,
  },
  {
    title: "Team collaboration",
    description: "Tasks, activity feeds and member permissions",
    date: "Nov 08",
    status: "Upcoming",
    progress: 0,
  },
  {
    title: "Release preparation",
    description: "Testing, performance and deployment",
    date: "Nov 20",
    status: "Upcoming",
    progress: 0,
  },
];

const ProjectMilestones = () => {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
              <Flag size={16} />
            </div>
            <h2 className="text-sm font-semibold text-white">Milestones</h2>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Key deliverables on your project timeline.
          </p>
        </div>

        <button
          type="button"
          aria-label="Milestone options"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mt-6 space-y-0">
        {milestones.map((milestone, index) => {
          const completed = milestone.status === "Completed";
          const active = milestone.status === "In progress";

          return (
            <div
              key={milestone.title}
              className="relative flex gap-3 pb-6 last:pb-0"
            >
              <div className="relative flex w-7 shrink-0 justify-center">
                {index !== milestones.length - 1 && (
                  <span
                    className={`absolute top-7 bottom-0 w-px ${
                      completed ? "bg-emerald-400/30" : "bg-white/8"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border ${
                    completed
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : active
                        ? "border-indigo-400/30 bg-indigo-400/10 text-indigo-300"
                        : "border-white/10 bg-[#10131d] text-slate-600"
                  }`}
                >
                  {completed ? (
                    <Check size={13} />
                  ) : active ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-300" />
                  ) : (
                    <Circle size={12} />
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-xs font-medium text-slate-200">
                    {milestone.title}
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {milestone.date}, 2026
                  </span>
                </div>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  {milestone.description}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 w-20 overflow-hidden rounded-full bg-white/6">
                    <div
                      className={`h-full rounded-full ${
                        completed ? "bg-emerald-400" : "bg-indigo-400"
                      }`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>

                  <span
                    className={`text-[10px] ${
                      completed
                        ? "text-emerald-300"
                        : active
                          ? "text-indigo-300"
                          : "text-slate-600"
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="#milestones"
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
      >
        View project timeline
        <ArrowRight size={13} />
      </Link>
    </section>
  );
};

export default ProjectMilestones;
