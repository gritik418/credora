import { CheckCircle2, CircleDashed, UserRound, Users } from "lucide-react";

interface Props {
  totalMembers: number;
  activeTasks: number;
  completedTasks: number;
  departments: number;
}

const ProjectMembersStats = ({
  totalMembers,
  activeTasks,
  completedTasks,
  departments,
}: Props) => {
  const stats = [
    {
      label: "Team members",
      value: totalMembers,
      description: "Assigned to this project",
      icon: Users,
      color: "text-indigo-300",
      background: "bg-indigo-500/10",
    },
    {
      label: "Active tasks",
      value: activeTasks,
      description: "Across the entire team",
      icon: CircleDashed,
      color: "text-sky-300",
      background: "bg-sky-500/10",
    },
    {
      label: "Completed tasks",
      value: completedTasks,
      description: "Total team contributions",
      icon: CheckCircle2,
      color: "text-emerald-300",
      background: "bg-emerald-500/10",
    },
    {
      label: "Departments",
      value: departments,
      description: "Collaborating on this project",
      icon: UserRound,
      color: "text-amber-300",
      background: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.07] bg-[#0c0e14] p-5 transition hover:border-white/12"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.background} ${stat.color}`}
              >
                <Icon size={19} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">{stat.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectMembersStats;
