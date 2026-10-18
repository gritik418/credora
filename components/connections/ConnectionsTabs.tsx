"use client";

import { Inbox, Network, Sparkles } from "lucide-react";

interface ConnectionsTabsProps {
  activeTab: ConnectionTab;
  onChange: (tab: ConnectionTab) => void;
  connectionCount: number;
  requestCount: number;
}

export type ConnectionTab = "connections" | "requests" | "discover";

const ConnectionsTabs = ({
  activeTab,
  onChange,
  connectionCount,
  requestCount,
}: ConnectionsTabsProps) => {
  const tabs = [
    {
      id: "connections" as const,
      label: "Connections",
      count: connectionCount,
      icon: Network,
    },
    {
      id: "requests" as const,
      label: "Requests",
      count: requestCount,
      icon: Inbox,
    },
    {
      id: "discover" as const,
      label: "Discover",
      icon: Sparkles,
    },
  ];

  return (
    <div className="flex gap-1 overflow-x-auto border-b border-white/8">
      {tabs.map(({ id, label, count, icon: Icon }) => {
        const active = activeTab === id;

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`relative flex shrink-0 items-center gap-2.5 px-4 py-3.5 text-sm transition-colors ${
              active ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Icon size={16} className={active ? "text-violet-300" : ""} />

            <span className="font-medium">{label}</span>

            {count !== undefined && (
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                  active
                    ? "bg-violet-400/15 text-violet-200"
                    : "bg-white/5 text-gray-500"
                }`}
              >
                {count}
              </span>
            )}

            {active && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-linear-to-r from-violet-400 to-blue-400" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ConnectionsTabs;
