import { Clock3, ShieldCheck, UserCheck, Users } from "lucide-react";

interface Props {
  total: number;
  active: number;
  pending: number;
  admins: number;
}

const MembersStats = ({ total, active, pending, admins }: Props) => {
  const stats = [
    {
      label: "Total members",
      value: total,
      detail: "Across your organization",
      icon: Users,
      color: "text-indigo-300",
      glow: "bg-indigo-500/10",
    },
    {
      label: "Active members",
      value: active,
      detail: "With workspace access",
      icon: UserCheck,
      color: "text-emerald-300",
      glow: "bg-emerald-500/10",
    },
    {
      label: "Pending invitations",
      value: pending,
      detail: "Awaiting acceptance",
      icon: Clock3,
      color: "text-amber-300",
      glow: "bg-amber-500/10",
    },
    {
      label: "Privileged members",
      value: admins,
      detail: "Owners and administrators",
      icon: ShieldCheck,
      color: "text-violet-300",
      glow: "bg-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="org-card-gradient group p-5 transition duration-200 hover:border-white/12"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-(--org-text-secondary)">
                  {stat.label}
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value.toString().padStart(2, "0")}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/6 ${stat.glow} ${stat.color}`}
              >
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-4 text-xs text-(--org-text-muted)">
              {stat.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MembersStats;
