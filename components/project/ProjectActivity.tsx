import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  GitCommitHorizontal,
  MessageSquare,
  Plus,
} from "lucide-react";

const activities = [
  {
    name: "Ritik Gupta",
    initials: "RG",
    color: "from-indigo-500 to-violet-500",
    action: "completed",
    target: "Organization permissions",
    time: "18 min ago",
    icon: CheckCircle2,
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-400/10",
  },
  {
    name: "Aarav Sharma",
    initials: "AS",
    color: "from-sky-500 to-cyan-500",
    action: "moved",
    target: "API integration to In progress",
    time: "42 min ago",
    icon: CircleDot,
    iconColor: "text-indigo-300",
    iconBg: "bg-indigo-400/10",
  },
  {
    name: "Priya Verma",
    initials: "PV",
    color: "from-pink-500 to-rose-500",
    action: "commented on",
    target: "Dashboard redesign",
    time: "1 hour ago",
    icon: MessageSquare,
    iconColor: "text-violet-300",
    iconBg: "bg-violet-400/10",
  },
  {
    name: "Karan Mehta",
    initials: "KM",
    color: "from-amber-500 to-orange-500",
    action: "created",
    target: "Design system components",
    time: "2 hours ago",
    icon: Plus,
    iconColor: "text-sky-300",
    iconBg: "bg-sky-400/10",
  },
];

interface Props {
  workspaceId: string;
  projectId: string;
}

const ProjectActivity = ({ workspaceId, projectId }: Props) => {
  return (
    <section className="rounded-2xl border border-white/7 bg-[#0c0f18] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <GitCommitHorizontal size={16} />
            </div>
            <h2 className="text-sm font-semibold text-white">
              Recent activity
            </h2>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            The latest updates from your project.
          </p>
        </div>

        <span className="rounded-lg border border-white/7 bg-white/2 px-2.5 py-1.5 text-[10px] text-slate-400">
          Today
        </span>
      </div>

      <div className="mt-5 space-y-0">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={`${activity.name}-${activity.target}`}
              className="flex gap-3"
            >
              <div className="relative flex w-10 shrink-0 justify-center">
                {index !== activities.length - 1 && (
                  <span className="absolute bottom-0 top-10 w-px bg-white/7" />
                )}

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br ${activity.color} text-[10px] font-semibold text-white`}
                >
                  {activity.initials}
                </div>
              </div>

              <div className="min-w-0 flex-1 border-b border-white/5 pb-4 pt-1.5 last:border-0">
                <p className="text-xs leading-5 text-slate-400">
                  <span className="font-medium text-slate-200">
                    {activity.name}
                  </span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium text-slate-300">
                    {activity.target}
                  </span>
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md ${activity.iconBg} ${activity.iconColor}`}
                  >
                    <Icon size={11} />
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href={`/workspace/${workspaceId}/projects/${projectId}/activity`}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
      >
        View all activity
        <ArrowRight size={13} />
      </Link>
    </section>
  );
};

export default ProjectActivity;
