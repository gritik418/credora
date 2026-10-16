import {
  CheckCircle2,
  CircleDashed,
  FolderKanban,
  ListTodo,
} from "lucide-react";

interface Props {
  total: number;
  active: number;
  completed: number;
  completedTasks: number;
  totalTasks: number;
}

const ProjectsStats = ({
  total,
  active,
  completed,
  completedTasks,
  totalTasks,
}: Props) => {
  const stats = [
    {
      label: "Total projects",
      value: total,
      detail: "Across this workspace",
      icon: FolderKanban,
      iconColor: "text-indigo-300",
      iconBg: "bg-indigo-400/10",
    },
    {
      label: "In progress",
      value: active,
      detail: "Currently being worked on",
      icon: CircleDashed,
      iconColor: "text-blue-300",
      iconBg: "bg-blue-400/10",
    },
    {
      label: "Completed",
      value: completed,
      detail: "Successfully delivered",
      icon: CheckCircle2,
      iconColor: "text-emerald-300",
      iconBg: "bg-emerald-400/10",
    },
    {
      label: "Tasks completed",
      value: `${completedTasks}/${totalTasks}`,
      detail: totalTasks
        ? `${Math.round((completedTasks / totalTasks) * 100)}% completion rate`
        : "No tasks added yet",
      icon: ListTodo,
      iconColor: "text-violet-300",
      iconBg: "bg-violet-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-white/7 bg-[#0c0f18] p-5 transition hover:border-indigo-400/20 hover:bg-[#101421]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
              >
                <Icon size={19} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">{stat.detail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsStats;
