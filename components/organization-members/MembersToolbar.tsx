"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export type MemberFilter = "ALL" | "ACTIVE" | "PENDING";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  filter: MemberFilter;
  onFilterChange: (value: MemberFilter) => void;
  counts: Record<MemberFilter, number>;
}

const MembersToolbar = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  counts,
}: Props) => {
  const filters: { label: string; value: MemberFilter }[] = [
    { label: "All members", value: "ALL" },
    { label: "Active", value: "ACTIVE" },
    { label: "Pending", value: "PENDING" },
  ];

  return (
    <div className="flex flex-col gap-4 border-b border-(--org-border) px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center gap-1 overflow-x-auto rounded-xl border border-(--org-border) bg-black/20 p-1 lg:w-fit">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onFilterChange(item.value)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                filter === item.value
                  ? "border border-indigo-400/15 bg-indigo-500/15 text-indigo-200"
                  : "text-(--org-text-muted) hover:bg-white/4 hover:text-white"
              }`}
            >
              {item.label}

              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                  filter === item.value
                    ? "bg-indigo-400/15 text-indigo-200"
                    : "bg-white/5 text-white/45"
                }`}
              >
                {counts[item.value]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1 lg:w-72 lg:flex-none">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search members..."
              className="h-10 w-full rounded-xl border border-(--org-border) bg-white/2.5 pl-10 pr-9 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-indigo-400/40 focus:bg-white/4"
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onFilterChange("ALL")}
            className="org-secondary-button flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-sm"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersToolbar;
