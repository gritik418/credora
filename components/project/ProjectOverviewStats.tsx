import {
  CheckCheck,
  CircleDashed,
  Clock3,
  ListTodo,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Total tasks",
    value: "50",
    detail: "Across all statuses",
    icon: ListTodo,
    color: "text-indigo-300",
    background: "bg-indigo-400/10",
  },
  {
    label: "Completed",
    value: "34",
    detail: "68% of all tasks",
    icon: CheckCheck,
    color: "text-emerald-300",
    background: "bg-emerald-400/10",
  },
  {
    label: "In progress",
    value: "9",
    detail: "2 need attention",
    icon: CircleDashed,
    color: "text-sky-300",
    background: "bg-sky-400/10",
  },
  {
    label: "Days remaining",
    value: "35",
    detail: "Due Nov 20, 2026",
    icon: Clock3,
    color: "text-amber-300",
    background: "bg-amber-400/10",
  },
];

const ProjectOverviewStats = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-4 transition hover:border-indigo-400/20 hover:bg-[#0e1220] sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">{stat.detail}</p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.background} ${stat.color}`}
              >
                <Icon size={19} />
              </div>
            </div>

            {stat.label === "Completed" && (
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/6">
                <div className="h-full w-[68%] rounded-full bg-linear-to-r from-emerald-400 to-teal-300" />
              </div>
            )}

            {stat.label === "In progress" && (
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-sky-300">
                <TrendingUp size={12} />
                Active development
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectOverviewStats;
