"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CircleDot,
  Ellipsis,
  Flag,
  Layers3,
  Plus,
} from "lucide-react";

interface Props {
  workspaceId: string;
  projectId: string;
}

const ProjectHeader = ({ workspaceId, projectId }: Props) => {
  const projectName = "Credora Platform";

  const navigation = [
    {
      label: "Overview",
      href: `/workspace/${workspaceId}/projects/${projectId}`,
    },
    {
      label: "Tasks",
      href: `/workspace/${workspaceId}/projects/${projectId}/tasks`,
    },
    {
      label: "Activity",
      href: `/workspace/${workspaceId}/projects/${projectId}/activity`,
    },
    {
      label: "Members",
      href: `/workspace/${workspaceId}/projects/${projectId}/members`,
    },
    {
      label: "Files",
      href: `/workspace/${workspaceId}/projects/${projectId}/files`,
    },
    {
      label: "Settings",
      href: `/workspace/${workspaceId}/projects/${projectId}/settings`,
    },
  ];

  return (
    <div className="space-y-6">
      <Link
        href={`/workspace/${workspaceId}/projects`}
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
                    PRJ-01
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    <CircleDot size={11} />
                    In progress
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/15 bg-rose-400/6 px-2.5 py-1 text-[11px] font-medium text-rose-300">
                    <Flag size={11} />
                    High priority
                  </span>
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {projectName}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Building Credora&apos;s professional identity and verifiable
                  work-history platform, designed to make career achievements
                  transparent and meaningful.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Created Sep 24, 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Due Nov 20, 2026
                  </span>
                  <span>Updated 2 hours ago</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
              >
                <Ellipsis size={17} />
                <span className="hidden sm:inline">More</span>
                <ChevronDown size={13} />
              </button>

              <Link
                href={`/workspace/${workspaceId}/projects/${projectId}/tasks`}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:brightness-110"
              >
                <Plus size={16} />
                Add task
                <ArrowUpRight size={14} className="hidden sm:block" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/[0.07] px-3 sm:px-5">
          <nav className="flex gap-1 overflow-x-auto">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={`relative shrink-0 px-3 py-3.5 text-xs font-medium transition sm:px-4 ${
                  index === 0
                    ? "text-indigo-300"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {item.label}
                {index === 0 && (
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
