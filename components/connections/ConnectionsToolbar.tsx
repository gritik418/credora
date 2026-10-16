"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

interface Props {
  search: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const ConnectionsToolbar = ({
  search,
  location,
  onSearchChange,
  onLocationChange,
}: Props) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="relative min-w-0 flex-1">
      <Search
        size={17}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name, role, or skill..."
        className="h-11 w-full rounded-xl border border-white/8 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
      />

      {search && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          <X size={15} />
        </button>
      )}
    </div>

    <div className="flex h-11 items-center gap-2 rounded-xl border border-white/8  px-3">
      <SlidersHorizontal size={15} className="shrink-0 text-gray-500" />
      <select
        value={location}
        onChange={(event) => onLocationChange(event.target.value)}
        aria-label="Filter by location"
        className="min-w-0 flex-1 gap-2 pr-5 bg-transparent text-sm text-gray-300 outline-none"
      >
        <option value="all" className="">
          All locations
        </option>
        <option value="Delhi" className="">
          Delhi NCR
        </option>
        <option value="Bengaluru" className="">
          Bengaluru
        </option>
        <option value="Chandigarh" className="">
          Chandigarh
        </option>
        <option value="Pune" className="">
          Pune
        </option>
        <option value="Mumbai" className="">
          Mumbai
        </option>
      </select>
    </div>
  </div>
);

export default ConnectionsToolbar;
