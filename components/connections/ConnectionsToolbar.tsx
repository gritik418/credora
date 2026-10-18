"use client";

import { Search, X } from "lucide-react";

interface ConnectionsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const ConnectionsToolbar = ({
  search,
  onSearchChange,
}: ConnectionsToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="group relative flex-1">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-violet-300"
        />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search people, skills, companies..."
          className="h-12 w-full rounded-xl border border-white/8 bg-white/2.5 pl-11 pr-10 text-sm text-white outline-none transition-all placeholder:text-gray-600 hover:border-white/13 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/7"
        />

        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:text-white"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionsToolbar;
