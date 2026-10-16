import { Activity, Clock3, ShieldCheck, Users } from "lucide-react";

interface Props {
  total: number;
  admins: number;
  active: number;
}

const MembersStats = ({ total, admins, active }: Props) => {
  const stats = [
    {
      label: "Total members",
      value: total,
      description: "Workspace team",
      icon: Users,
      color: "text-indigo-300",
      iconBg: "bg-indigo-400/10",
    },
    {
      label: "Admins & owners",
      value: admins,
      description: "Elevated access",
      icon: ShieldCheck,
      color: "text-violet-300",
      iconBg: "bg-violet-400/10",
    },
    {
      label: "Active members",
      value: active,
      description: "Currently active",
      icon: Activity,
      color: "text-emerald-300",
      iconBg: "bg-emerald-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group rounded-xl border border-white/[0.07] bg-[#0c0f18] p-5 transition duration-200 hover:border-indigo-400/20 hover:bg-[#101421]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg} ${stat.color}`}
              >
                <Icon size={19} />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">{stat.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MembersStats;
