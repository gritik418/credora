"use client";

import { Bell, ChevronDown, Command, Menu, Plus, Search } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

const WorkspaceHeader = ({ onMenuClick }: Props) => {
  return (
    <header className="sticky top-0 z-40 flex h-19 items-center justify-between gap-4 border-b border-white/6 bg-[#090b12]/85 px-4 backdrop-blur-2xl sm:px-7 xl:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/2.5 text-zinc-400 transition-colors hover:bg-white/6 hover:text-white lg:hidden"
        >
          <Menu size={19} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <span>Workspace</span>
            <span className="text-zinc-700">/</span>
            <span className="truncate text-zinc-300">Overview</span>
          </div>

          <h1 className="mt-1 truncate text-base font-semibold tracking-tight text-white sm:text-lg">
            Workspace overview
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="hidden h-10 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/2.5 px-3 text-zinc-500 transition-colors hover:border-white/15 hover:text-zinc-300 sm:flex sm:w-52 lg:w-60"
        >
          <Search size={16} />
          <span className="flex-1 text-left text-xs">Search workspace...</span>
          <span className="flex items-center gap-1 rounded-md border border-white/8 bg-white/3 px-1.5 py-1 text-[10px] text-zinc-500">
            <Command size={10} /> K
          </span>
        </button>

        <button
          type="button"
          aria-label="Search workspace"
          className="flex size-10 items-center justify-center rounded-xl border border-white/[0.07] text-zinc-400 hover:bg-white/5 sm:hidden"
        >
          <Search size={18} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/2.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-2.25 top-2 size-1.5 rounded-full bg-indigo-400 ring-2 ring-[#090b12]" />
        </button>

        <div className="hidden h-8 w-px bg-white/[0.07] sm:block" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-white/4"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/25 to-violet-500/20 text-xs font-semibold text-indigo-200 ring-1 ring-indigo-400/20">
            W
          </div>
          <ChevronDown size={14} className="hidden text-zinc-500 sm:block" />
        </button>

        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl bg-indigo-500 px-4 text-xs font-semibold text-white shadow-lg shadow-indigo-950/20 transition-colors hover:bg-indigo-400 md:flex"
        >
          <Plus size={15} />
          New project
        </button>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
