"use client";

import { ProjectWithWorkspace } from "@/features/organization/organization.interface";
import { ProjectStatus } from "@/features/project/project.interface";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  FolderKanban,
  Layers3,
} from "lucide-react";
import Link from "next/link";

interface Props {
  project: ProjectWithWorkspace;
  view: "GRID" | "LIST";
}

const statusStyles: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  [ProjectStatus.COMPLETED]:
    "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  [ProjectStatus.ARCHIVED]: "border-white/10 bg-white/5 text-white/45",
  [ProjectStatus.ON_HOLD]: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  [ProjectStatus.PLANNING]:
    "border-violet-400/20 bg-violet-400/10 text-violet-300",
  [ProjectStatus.CANCELLED]: "border-red-400/20 bg-red-400/10 text-red-300",
};

const formatDate = (value?: string | Date | null) => {
  if (!value) return "Not set";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not set";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const ProjectCard = ({ project, view }: Props) => {
  const isOverdue =
    project.status !== ProjectStatus.COMPLETED &&
    project.status !== ProjectStatus.ARCHIVED &&
    Boolean(project.dueDate) &&
    new Date(project.dueDate!).getTime() < Date.now();

  const badgeStyle =
    statusStyles[project.status] ?? "border-white/10 bg-white/5 text-white/50";

  return (
    <Link
      href={`/workspace/${project.workspace.slug}/projects/${project.slug}`}
    >
      <article
        className={`group relative min-w-0 overflow-hidden rounded-2xl border border-(--org-border) bg-(--org-surface) transition duration-200 hover:border-indigo-400/25 hover:bg-white/2.5 ${
          view === "LIST" ? "flex flex-col lg:flex-row lg:items-stretch" : ""
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/40 to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="min-w-0 flex-1 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
              <FolderKanban size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="min-w-0 truncate text-sm font-semibold text-white/90 transition group-hover:text-white">
                  {project.name}
                </h3>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-[9px] font-semibold tracking-wide ${badgeStyle}`}
                >
                  <CircleDot size={10} />
                  {project.status.replaceAll("_", " ")}
                </span>
              </div>

              <p className="mt-1 truncate text-[11px] text-white/30">
                /{project.slug}
              </p>
            </div>

            <ArrowUpRight
              size={16}
              className="mt-1 shrink-0 text-white/20 transition group-hover:text-indigo-300"
            />
          </div>

          <p
            className={`mt-4 text-xs leading-5 text-white/45 ${
              view === "GRID" ? "min-h-10" : ""
            }`}
          >
            {project.description || "No project description provided."}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/6 bg-white/2 p-3">
              <div className="flex items-center gap-1.5 text-[10px] text-white/35">
                <CalendarDays size={12} />
                Start date
              </div>
              <p className="mt-2 text-xs font-medium text-white/75">
                {formatDate(project.startDate)}
              </p>
            </div>

            <div
              className={`rounded-xl border p-3 ${
                isOverdue
                  ? "border-rose-400/15 bg-rose-400/4"
                  : "border-white/6 bg-white/2"
              }`}
            >
              <div
                className={`flex items-center gap-1.5 text-[10px] ${
                  isOverdue ? "text-rose-300/70" : "text-white/35"
                }`}
              >
                <Clock3 size={12} />
                Due date
              </div>
              <p
                className={`mt-2 text-xs font-medium ${
                  isOverdue ? "text-rose-300" : "text-white/75"
                }`}
              >
                {formatDate(project.dueDate)}
                {isOverdue && (
                  <span className="ml-1.5 text-[9px]">Overdue</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 flex min-w-0 items-center gap-3 rounded-xl border border-white/6 bg-black/15 p-3">
            {project.workspace?.logo ? (
              <img
                src={project.workspace.logo}
                alt={`${project.workspace.name} logo`}
                className="h-9 w-9 shrink-0 rounded-lg border border-white/10 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-white/45">
                <Layers3 size={16} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/30">
                Workspace
              </p>
              <p className="mt-1 truncate text-xs font-medium text-white/75">
                {project.workspace?.name ?? "Workspace unavailable"}
              </p>
              {project.workspace && (
                <p className="mt-0.5 truncate text-[10px] text-white/30">
                  /{project.workspace.slug}
                </p>
              )}
            </div>

            {project.workspace && (
              <CheckCircle2 size={14} className="shrink-0 text-indigo-300/60" />
            )}
          </div>
        </div>

        <div
          className={`flex items-center justify-between gap-3 border-t border-(--org-border) px-5 py-3 ${
            view === "LIST"
              ? "lg:w-44 lg:shrink-0 lg:flex-col lg:items-start lg:justify-center lg:border-l lg:border-t-0"
              : ""
          }`}
        >
          <div className="flex items-center gap-2 text-[10px] text-white/30">
            <Clock3 size={12} />
            Updated {formatDate(project.updatedAt)}
          </div>

          <span className="inline-flex items-center gap-1.5 text-[10px] text-white/35">
            <CircleDot
              size={11}
              className={
                status === "ACTIVE"
                  ? "text-sky-300"
                  : status === "COMPLETED"
                    ? "text-emerald-300"
                    : "text-white/25"
              }
            />
            Project overview
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
