"use client";

import { MapPin, Search, SlidersHorizontal, X } from "lucide-react";

interface ConnectionsToolbarProps {
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
          className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-10 text-sm text-white outline-none transition-all placeholder:text-gray-600 hover:border-white/[0.13] focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/[0.07]"
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

      <label className="flex h-12 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 transition-colors hover:border-white/[0.13] sm:w-52">
        <MapPin size={16} className="shrink-0 text-gray-500" />

        <select
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          className="w-full bg-transparent text-sm text-gray-300 outline-none"
        >
          <option value="all" className="bg-[#11121b]">
            All locations
          </option>
          <option value="india" className="bg-[#11121b]">
            India
          </option>
          <option value="delhi" className="bg-[#11121b]">
            Delhi
          </option>
          <option value="bengaluru" className="bg-[#11121b]">
            Bengaluru
          </option>
          <option value="gurugram" className="bg-[#11121b]">
            Gurugram
          </option>
          <option value="remote" className="bg-[#11121b]">
            Remote
          </option>
        </select>

        <SlidersHorizontal size={14} className="shrink-0 text-gray-600" />
      </label>
    </div>
  );
};

export default ConnectionsToolbar;
