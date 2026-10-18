"use client";

import { BriefcaseBusiness, Sparkles } from "lucide-react";

const ProjectsHeader = () => {
  return (
    <header className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
              <Sparkles size={14} />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/80">
              Organization overview
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Projects
            <span className="text-white/35">.</span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
            Explore projects across your organization. Track timelines,
            understand project status, and see which workspaces each project
            belongs to.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/2.5 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
            <BriefcaseBusiness size={17} />
          </div>

          <div>
            <p className="text-xs font-medium text-white/75">
              Organization projects
            </p>
            <p className="mt-1 text-[10px] text-white/35">
              One view across all workspaces
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProjectsHeader;
