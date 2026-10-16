import { ArrowUpRight, Clock3, Users, UserRoundSearch } from "lucide-react";

interface Props {
  connections: number;
  requests: number;
  suggestions: number;
}

const ConnectionsStats = ({ connections, requests, suggestions }: Props) => {
  const stats = [
    {
      label: "My connections",
      value: connections,
      caption: "Your professional network",
      icon: Users,
      color: "text-indigo-300",
      surface: "bg-indigo-500/10",
    },
    {
      label: "Pending requests",
      value: requests,
      caption: "Waiting for a response",
      icon: Clock3,
      color: "text-violet-300",
      surface: "bg-violet-500/10",
    },
    {
      label: "People to discover",
      value: suggestions,
      caption: "Potential connections",
      icon: UserRoundSearch,
      color: "text-emerald-300",
      surface: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/7 p-5 transition hover:border-white/1.2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.surface} ${stat.color}`}
              >
                <Icon size={19} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">{stat.caption}</p>
              <ArrowUpRight size={15} className="text-gray-600" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionsStats;
