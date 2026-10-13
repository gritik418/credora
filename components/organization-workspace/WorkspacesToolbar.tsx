"use client";

import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";

export type WorkspaceFilter = "ALL" | "ACTIVE" | "ARCHIVED";
export type WorkspaceView = "GRID" | "LIST";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  filter: WorkspaceFilter;
  onFilterChange: (value: WorkspaceFilter) => void;
  view: WorkspaceView;
  onViewChange: (value: WorkspaceView) => void;
  counts: Record<WorkspaceFilter, number>;
}

const WorkspacesToolbar = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  view,
  onViewChange,
  counts,
}: Props) => {
  const filters: { value: WorkspaceFilter; label: string }[] = [
    { value: "ALL", label: "All spaces" },
    { value: "ACTIVE", label: "Active" },
    { value: "ARCHIVED", label: "Archived" },
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-1.5">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onFilterChange(item.value)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition ${
              filter === item.value
                ? "border border-indigo-400/20 bg-indigo-500/10 text-indigo-200"
                : "border border-transparent text-white/40 hover:bg-white/[0.035] hover:text-white/75"
            }`}
          >
            {item.label}
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                filter === item.value
                  ? "bg-indigo-400/10 text-indigo-200"
                  : "bg-white/5 text-white/35"
              }`}
            >
              {counts[item.value]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-10 min-w-0 items-center gap-2.5 rounded-xl border border-(--org-border) bg-white/2.5 px-3 transition focus-within:border-indigo-400/30 sm:w-72">
          <Search size={15} className="shrink-0 text-white/30" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search workspaces..."
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/25"
          />
          <SlidersHorizontal size={14} className="shrink-0 text-white/25" />
        </label>

        <div className="flex h-10 items-center gap-1 self-end rounded-xl border border-(--org-border) bg-white/2.5 p-1 sm:self-auto">
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => onViewChange("GRID")}
            className={`flex h-7 w-8 items-center justify-center rounded-lg transition ${
              view === "GRID"
                ? "bg-indigo-500/15 text-indigo-300"
                : "text-white/35 hover:text-white/75"
            }`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            aria-label="List view"
            onClick={() => onViewChange("LIST")}
            className={`flex h-7 w-8 items-center justify-center rounded-lg transition ${
              view === "LIST"
                ? "bg-indigo-500/15 text-indigo-300"
                : "text-white/35 hover:text-white/75"
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspacesToolbar;
