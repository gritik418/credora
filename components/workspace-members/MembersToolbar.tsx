import { Search, SlidersHorizontal, X } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  resultCount: number;
}

const selectClass =
  "h-10 rounded-lg border border-white/[0.08] bg-[#10131d] px-3 text-xs text-slate-300 outline-none transition focus:border-indigo-400/40";

const MembersToolbar = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
  resultCount,
}: Props) => {
  const hasFilters =
    search.length > 0 ||
    roleFilter !== "All roles" ||
    statusFilter !== "All statuses";

  const clearFilters = () => {
    onSearchChange("");
    onRoleChange("All roles");
    onStatusChange("All statuses");
  };

  return (
    <div className="space-y-4 border-b border-white/6 px-5 py-4 sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or email..."
            className="h-11 w-full rounded-xl border border-white/8 bg-[#080b13] pl-10 pr-10 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 hidden items-center gap-1.5 text-xs text-slate-500 xl:inline-flex">
            <SlidersHorizontal size={14} />
            Filters
          </span>

          <select
            value={roleFilter}
            onChange={(event) => onRoleChange(event.target.value)}
            className={selectClass}
            aria-label="Filter by role"
          >
            <option>All roles</option>
            <option>Owner</option>
            <option>Admin</option>
            <option>Member</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value)}
            className={selectClass}
            aria-label="Filter by status"
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-10 items-center gap-1 rounded-lg px-2 text-xs text-indigo-300 transition hover:bg-indigo-400/10 hover:text-indigo-200"
            >
              <X size={13} />
              Clear
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        <span className="font-medium text-slate-300">{resultCount}</span>{" "}
        {resultCount === 1 ? "member" : "members"} found
      </p>
    </div>
  );
};

export default MembersToolbar;
