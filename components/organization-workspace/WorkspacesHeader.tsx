"use client";

import { Plus, Sparkles } from "lucide-react";

interface Props {
  onCreate: () => void;
}

const WorkspacesHeader = ({ onCreate }: Props) => {
  return (
    <header className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
              <Sparkles size={14} />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/80">
              Organization spaces
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Workspaces
            <span className="text-white/35">.</span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
            Organize your teams, projects, and work in dedicated spaces. Keep
            collaboration structured and progress easy to follow.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="org-primary-button cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:brightness-110"
        >
          <Plus size={17} />
          Create workspace
        </button>
      </div>
    </header>
  );
};

export default WorkspacesHeader;
