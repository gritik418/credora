"use client";

import { TaskPriority, TaskStatus } from "@/features/task/task.interface";
import {
  AlignJustify,
  CalendarDays,
  ChevronDown,
  LayoutGrid,
  ListFilter,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatus | "All statuses";
  onStatusFilterChange: (value: TaskStatus | "All statuses") => void;
  priorityFilter: TaskPriority | "All priorities";
  onPriorityFilterChange: (value: TaskPriority | "All priorities") => void;
  view: "board" | "list";
  onViewChange: (value: "board" | "list") => void;
  onCreateTask: () => void;
  resultCount: number;
}

const TaskToolbar = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  view,
  onViewChange,
  onCreateTask,
  resultCount,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ListFilter size={17} className="text-indigo-300" />
            <h2 className="text-sm font-semibold text-white">All tasks</h2>
            <span className="rounded-md border border-white/8 bg-white/3 px-2 py-0.5 text-[10px] text-slate-400">
              {resultCount}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Manage work, track progress, and keep your team aligned.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateTask}
          className="inline-flex cursor-pointer h-10 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:brightness-110"
        >
          <Plus size={16} />
          Create task
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/7 bg-[#0c0f18] p-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks, IDs, labels..."
            className="h-10 w-full rounded-xl border border-white/7 bg-[#080b13] pl-10 pr-9 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <div className="relative">
            <SlidersHorizontal
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              value={statusFilter}
              onChange={(event) =>
                onStatusFilterChange(
                  event.target.value as TaskStatus | "All statuses",
                )
              }
              className="h-10 w-full appearance-none rounded-xl border border-white/7 bg-[#080b13] pl-8 pr-8 text-xs text-slate-300 outline-none focus:border-indigo-400/40 sm:w-40"
            >
              <option>All statuses</option>
              {Object.values(TaskStatus).map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative">
            <FlagIcon />
            <select
              value={priorityFilter}
              onChange={(event) =>
                onPriorityFilterChange(
                  event.target.value as TaskPriority | "All priorities",
                )
              }
              className="h-10 w-full appearance-none rounded-xl border border-white/7 bg-[#080b13] pl-8 pr-8 text-xs text-slate-300 outline-none focus:border-indigo-400/40 sm:w-40"
            >
              <option>All priorities</option>
              {Object.values(TaskPriority).map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-1 border-t border-white/6 pt-3 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
          <button
            type="button"
            onClick={() => onViewChange("board")}
            aria-label="Board view"
            title="Board view"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              view === "board"
                ? "border border-indigo-400/20 bg-indigo-400/10 text-indigo-300"
                : "text-slate-500 hover:bg-white/4 hover:text-slate-200"
            }`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-label="List view"
            title="List view"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              view === "list"
                ? "border border-indigo-400/20 bg-indigo-400/10 text-indigo-300"
                : "text-slate-500 hover:bg-white/4 hover:text-slate-200"
            }`}
          >
            <AlignJustify size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FlagIcon = () => (
  <CalendarDays
    size={13}
    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
  />
);

export default TaskToolbar;
