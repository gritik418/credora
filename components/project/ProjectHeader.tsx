"use client";

import { selectSelectedProject } from "@/features/project/project.selectors";
import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock,
  Ellipsis,
  Layers3,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProjectStatusLabelAndIcon from "./ProjectStatusLabelAndIcon";

const ProjectHeader = () => {
  const project = useAppSelector(selectSelectedProject);
  const pathname = usePathname();
  const workspace = useAppSelector(selectSelectedWorkspace);

  const navigation = [
    {
      label: "Overview",
      href: `/workspace/${workspace?.slug}/projects/${project?.slug}`,
      isActive:
        pathname === `/workspace/${workspace?.slug}/projects/${project?.slug}`,
    },
    {
      label: "Tasks",
      href: `/workspace/${workspace?.slug}/projects/${project?.slug}/tasks`,
      isActive:
        pathname ===
        `/workspace/${workspace?.slug}/projects/${project?.slug}/tasks`,
    },
    {
      label: "Activity",
      href: `/workspace/${workspace?.slug}/projects/${project?.slug}/activity`,
      isActive:
        pathname ===
        `/workspace/${workspace?.slug}/projects/${project?.slug}/activity`,
    },
    {
      label: "Members",
      href: `/workspace/${workspace?.slug}/projects/${project?.slug}/members`,
      isActive:
        pathname ===
        `/workspace/${workspace?.slug}/projects/${project?.slug}/members`,
    },
    {
      label: "Files",
      href: `/workspace/${workspace?.slug}/projects/${project?.slug}/files`,
      isActive:
        pathname ===
        `/workspace/${workspace?.slug}/projects/${project?.slug}/files`,
    },
    {
      label: "Settings",
      href: `/workspace/${workspace?.slug}/projects/${project?.slug}/settings`,
      isActive:
        pathname ===
        `/workspace/${workspace?.slug}/projects/${project?.slug}/settings`,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!workspace || !project) return null;

  return (
    <div className="space-y-6">
      <Link
        href={`/workspace/${workspace.id}/projects`}
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-200"
      >
        <ArrowLeft size={15} />
        All projects
      </Link>

      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0c0f18]">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-indigo-500/12 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-violet-500/8 blur-[90px]" />

        <div className="relative p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
            <div className="flex min-w-0 gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-linear-to-br from-indigo-500/20 to-violet-500/20 text-indigo-300 shadow-lg shadow-indigo-950/20">
                <Layers3 size={25} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
                    PRJ-{project?.id?.slice(0, 6)}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />

                  <ProjectStatusLabelAndIcon status={project?.status} />
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {project?.name}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  {project?.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Created {formatDate(project?.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Due {formatDate(project?.dueDate || "")}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    Last Updated {formatDate(project?.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/7 hover:text-white"
              >
                <Ellipsis size={17} />
                <span className="hidden sm:inline">More</span>
                <ChevronDown size={13} />
              </button>

              <Link
                href={`/workspace/${workspace.id}/projects/${project?.slug}/tasks`}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:brightness-110"
              >
                <Plus size={16} />
                Add task
                <ArrowUpRight size={14} className="hidden sm:block" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/7 px-3 sm:px-5">
          <nav className="flex gap-1 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.isActive ? "page" : undefined}
                className={`relative shrink-0 px-3 py-3.5 text-xs font-medium transition sm:px-4 ${
                  item.isActive
                    ? "text-indigo-300"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {item.label}
                {item.isActive && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-indigo-400 sm:inset-x-4" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
