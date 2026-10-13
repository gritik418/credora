import { Search, X } from "lucide-react";

export type ProjectStatusFilter =
  | "All projects"
  | "Planning"
  | "In progress"
  | "On hold"
  | "Completed";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  status: ProjectStatusFilter;
  onStatusChange: (value: ProjectStatusFilter) => void;
  resultCount: number;
}

const ProjectsToolbar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  resultCount,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search projects by name, code, or tag..."
          className="h-11 w-full rounded-xl border border-white/8 bg-[#0c0f18] pl-10 pr-10 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
        />

        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as ProjectStatusFilter)
        }
        aria-label="Filter projects by status"
        className="h-11 rounded-xl border border-white/8 bg-[#0c0f18] px-3 text-xs text-slate-300 outline-none transition focus:border-indigo-400/40"
      >
        <option>All projects</option>
        <option>Planning</option>
        <option>In progress</option>
        <option>On hold</option>
        <option>Completed</option>
      </select>

      <span className="shrink-0 text-xs text-slate-500">
        {resultCount} {resultCount === 1 ? "project" : "projects"}
      </span>
    </div>
  );
};

export default ProjectsToolbar;
