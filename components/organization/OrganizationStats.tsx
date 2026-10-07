"use client";

import { CheckSquare2, FolderKanban, LayoutGrid, Users } from "lucide-react";

const stats = [
  {
    label: "Members",
    value: "24",
    description: "Active members",
    icon: Users,
  },
  {
    label: "Workspaces",
    value: "4",
    description: "Team workspaces",
    icon: LayoutGrid,
  },
  {
    label: "Projects",
    value: "12",
    description: "Active projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    value: "148",
    description: "Across projects",
    icon: CheckSquare2,
  },
];

const OrganizationStats = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5 transition hover:border-white/12 hover:bg-white/4"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/8 blur-2xl transition group-hover:bg-indigo-500/15" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.035] text-white/45">
                  <Icon size={17} />
                </div>

                <span className="text-xs text-emerald-400/70">+12%</span>
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>

              <p className="mt-1 text-sm font-medium text-white/65">
                {stat.label}
              </p>

              <p className="mt-0.5 text-xs text-white/30">{stat.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrganizationStats;
