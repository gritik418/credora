"use client";

import { Clock3, Compass, Users } from "lucide-react";

export type ConnectionsTab = "connections" | "requests" | "discover";

interface Props {
  activeTab: ConnectionsTab;
  requestCount: number;
  onTabChange: (tab: ConnectionsTab) => void;
}

const ConnectionsTabs = ({ activeTab, requestCount, onTabChange }: Props) => {
  const tabs = [
    { id: "connections" as const, label: "My connections", icon: Users },
    { id: "requests" as const, label: "Requests", icon: Clock3 },
    { id: "discover" as const, label: "Discover people", icon: Compass },
  ];

  return (
    <div className="flex gap-1 overflow-x-auto border-b border-white/7">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative flex shrink-0 items-center gap-2 px-3 py-3.5 text-sm transition sm:px-4 ${
              active ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Icon size={16} />
            <span>{tab.label}</span>

            {tab.id === "requests" && requestCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/15 px-1.5 text-[10px] font-semibold text-indigo-300">
                {requestCount}
              </span>
            )}

            {active && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-indigo-400 sm:inset-x-4" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ConnectionsTabs;
