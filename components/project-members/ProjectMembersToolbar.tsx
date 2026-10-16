"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export type MemberRoleFilter = "All roles" | any;

interface Props {
  search: string;
  roleFilter: MemberRoleFilter;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: MemberRoleFilter) => void;
}

const roles: MemberRoleFilter[] = [
  "All roles",
  "Project Lead",
  "Developer",
  "Designer",
  "QA",
];

const ProjectMembersToolbar = ({
  search,
  roleFilter,
  onSearchChange,
  onRoleFilterChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search members by name or email..."
          className="h-11 w-full rounded-xl border border-white/8 bg-[#0c0e14] pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/8 bg-[#0c0e14] px-3 text-gray-500">
          <SlidersHorizontal size={15} />
          <span className="text-xs">Role</span>
        </div>

        <select
          value={roleFilter}
          onChange={(event) =>
            onRoleFilterChange(event.target.value as MemberRoleFilter)
          }
          className="h-11 min-w-0 flex-1 rounded-xl border border-white/8 bg-[#0c0e14] px-3 text-sm text-gray-200 outline-none focus:border-indigo-400/40 sm:min-w-40"
        >
          {roles.map((role) => (
            <option key={role} value={role} className="bg-[#0c0e14]">
              {role}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProjectMembersToolbar;
