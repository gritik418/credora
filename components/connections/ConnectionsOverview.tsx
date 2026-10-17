import { ArrowUpRight, Check, Network, UserRoundPlus } from "lucide-react";

interface ConnectionsOverviewProps {
  connections: number;
  requests: number;
  suggestions: number;
}

const ConnectionsOverview = ({
  connections,
  requests,
  suggestions,
}: ConnectionsOverviewProps) => {
  const stats = [
    {
      label: "Connections",
      value: connections,
      description: "Your trusted network",
      icon: Network,
    },
    {
      label: "Pending requests",
      value: requests,
      description: "People waiting to connect",
      icon: UserRoundPlus,
    },
    {
      label: "Discover people",
      value: suggestions,
      description: "Potential new connections",
      icon: ArrowUpRight,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, description, icon: Icon }, index) => (
        <div
          key={label}
          className="group rounded-2xl border border-white/[0.075] bg-white/[0.025] p-5 transition-all duration-300 hover:border-violet-400/20 hover:bg-white/[0.04]"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] transition-colors group-hover:border-violet-400/20">
              <Icon
                size={18}
                className="text-gray-400 transition-colors group-hover:text-violet-300"
              />
            </div>

            {index === 1 && value > 0 && (
              <span className="flex items-center gap-1 rounded-full border border-amber-400/15 px-2 py-1 text-[10px] text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                Action needed
              </span>
            )}

            {index !== 1 && (
              <span className="text-xs text-gray-600">0{index + 1}</span>
            )}
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-white">
                {value.toLocaleString()}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-300">{label}</p>
              <p className="mt-1.5 text-xs text-gray-500">{description}</p>
            </div>

            <Check
              size={15}
              className="mb-1 text-gray-700 transition-colors group-hover:text-violet-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionsOverview;
