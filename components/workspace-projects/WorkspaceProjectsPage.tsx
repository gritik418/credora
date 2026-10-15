"use client";

import { ProjectStatus } from "@/features/project/project.interface";
import { selectProjects } from "@/features/project/project.selectors";
import { useAppSelector } from "@/store/hooks";
import {
  ArrowUpRight,
  FolderKanban,
  LayoutGrid,
  List,
  Plus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import ProjectCard from "./ProjectCard";
import ProjectsStats from "./ProjectsStats";
import ProjectsToolbar, { ProjectStatusFilter } from "./ProjectsToolbar";

const WorkspaceProjectsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatusFilter>("All projects");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [createOpen, setCreateOpen] = useState(false);

  const projects = useAppSelector(selectProjects);

  const activeCount = projects.filter(
    (project) => project.status === ProjectStatus.ACTIVE,
  ).length;

  const completedCount = projects.filter(
    (project) => project.status === ProjectStatus.COMPLETED,
  ).length;

  const totalTasks = 0;

  const completedTasks = 0;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#080a10] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-indigo-500/11 via-[#0c0f18] to-blue-500/5 p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/12 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-violet-500/8 blur-[80px]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
                <FolderKanban size={14} />
                Workspace management
              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Projects
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Plan work, track progress, and keep every project moving forward
                with your team.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300">
                  {projects.length} total projects
                </span>
                <span className="rounded-full border border-indigo-400/15 bg-indigo-400/6 px-3 py-1.5 text-xs text-indigo-300">
                  {activeCount} in progress
                </span>
                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/6 px-3 py-1.5 text-xs text-emerald-300">
                  {completedCount} completed
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              <Plus size={17} />
              Create project
            </button>
          </div>
        </section>

        <ProjectsStats
          total={projects.length}
          active={activeCount}
          completed={completedCount}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
        />

        <section className="space-y-5">
          <ProjectsToolbar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            resultCount={100}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-200">
                All projects
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Explore projects and their current progress.
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-white/8 bg-[#0c0f18] p-1">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                className={`rounded-lg p-2 transition ${
                  view === "grid"
                    ? "bg-indigo-400/15 text-indigo-300"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                <LayoutGrid size={17} />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
                className={`rounded-lg p-2 transition ${
                  view === "list"
                    ? "bg-indigo-400/15 text-indigo-300"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                <List size={17} />
              </button>
            </div>
          </div>

          {projects.length ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} view={view} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0c0f18] px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-slate-500">
                <FolderKanban size={21} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-slate-200">
                No projects found
              </h3>
              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                Try changing your search or status filter, or create a new
                project to get started.
              </p>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-400/8 px-3 py-2 text-xs font-medium text-indigo-300 transition hover:bg-indigo-400/[0.14]"
              >
                <Plus size={14} />
                Create project
              </button>
            </div>
          )}
        </section>

        <div className="flex items-start gap-3 rounded-xl border border-indigo-400/12 bg-indigo-400/4 p-4">
          <Sparkles size={17} className="mt-0.5 shrink-0 text-indigo-300" />
          <div>
            <p className="text-sm font-medium text-slate-200">
              Small tasks, visible progress
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Break projects into manageable tasks to help your team understand
              progress, identify blockers, and deliver consistently.
            </p>
          </div>
          <ArrowUpRight size={15} className="ml-auto shrink-0 text-slate-500" />
        </div>
      </div>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
};

export default WorkspaceProjectsPage;
