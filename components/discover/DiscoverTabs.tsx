"use client";

import { Building2, Compass, Users } from "lucide-react";
import type { DiscoverTab } from "./discover.data";

const tabs = [
  { id: "all", label: "Explore all", icon: Compass },
  { id: "people", label: "People", icon: Users },
  { id: "organizations", label: "Organizations", icon: Building2 },
] as const;

type DiscoverTabsProps = {
  activeTab: DiscoverTab;
  onChange: (tab: DiscoverTab) => void;
  peopleCount: number;
  organizationsCount: number;
};

export default function DiscoverTabs({
  activeTab,
  onChange,
  peopleCount,
  organizationsCount,
}: DiscoverTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-(--org-border)">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;

        const count =
          tab.id === "people"
            ? peopleCount
            : tab.id === "organizations"
              ? organizationsCount
              : undefined;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex shrink-0 items-center gap-2.5 px-4 py-4 text-sm transition-colors ${
              active
                ? "text-white"
                : "text-(--org-text-muted) hover:text-(--org-text-secondary)"
            }`}
          >
            <Icon
              size={17}
              className={active ? "text-(--org-primary-light)" : "opacity-70"}
            />

            <span>{tab.label}</span>

            {count !== undefined && (
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                  active
                    ? "bg-indigo-500/15 text-indigo-300"
                    : "bg-white/4 text-(--org-text-muted)"
                }`}
              >
                {count}
              </span>
            )}

            {active && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-linear-to-r from-indigo-500 to-violet-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
