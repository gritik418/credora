"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

type DiscoverSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onFiltersClick: () => void;
};

export default function DiscoverSearch({
  value,
  onChange,
  onFiltersClick,
}: DiscoverSearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="group flex h-13 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-(--org-border) bg-(--org-surface) px-4 transition-all focus-within:border-(--org-border-active) focus-within:ring-4 focus-within:ring-indigo-500/5">
        <Search
          size={19}
          className="shrink-0 text-(--org-text-muted) transition-colors group-focus-within:text-(--org-primary-light)"
        />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search people, organizations, skills..."
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-(--org-text) outline-none placeholder:text-(--org-text-faint)"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="rounded-lg p-1 text-(--org-text-muted) transition hover:bg-white/5 hover:text-white"
          >
            <X size={16} />
          </button>
        )}

        <kbd className="hidden rounded-md border border-(--org-border) bg-white/3 px-2 py-1 text-[10px] text-(--org-text-muted) md:block">
          Search
        </kbd>
      </div>

      <button
        type="button"
        onClick={onFiltersClick}
        className="org-secondary-button flex h-13 items-center justify-center gap-2 rounded-2xl px-4 text-sm"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>
    </div>
  );
}
