"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FolderKanban,
  GitBranch,
  MoreHorizontal,
  Plus,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface Props {
  workspaceId: string;
}

const stats = [
  {
    label: "Total projects",
    value: "12",
    change: "+2 this month",
    icon: FolderKanban,
    trend: "up",
  },
  {
    label: "Active tasks",
    value: "28",
    change: "8 due this week",
    icon: Zap,
    trend: "neutral",
  },
  {
    label: "Workspace members",
    value: "08",
    change: "+1 recently",
    icon: Users,
    trend: "up",
  },
  {
    label: "Completed tasks",
    value: "146",
    change: "+18 this month",
    icon: CheckCircle2,
    trend: "up",
  },
];

const projects = [
  {
    name: "Credora Platform",
    description: "Professional identity and verified work history.",
    code: "CR",
    color: "from-indigo-500/20 to-violet-500/10",
    accent: "text-indigo-300",
    border: "border-indigo-400/15",
    status: "In progress",
    progress: 72,
    tasks: "18 / 25 tasks",
    members: ["RG", "AK", "SM"],
  },
  {
    name: "Design System",
    description: "Shared components and design foundations.",
    code: "DS",
    color: "from-cyan-500/15 to-blue-500/10",
    accent: "text-cyan-300",
    border: "border-cyan-400/15",
    status: "In progress",
    progress: 48,
    tasks: "12 / 25 tasks",
    members: ["RG", "PK"],
  },
  {
    name: "API Infrastructure",
    description: "Reliable services, permissions, and integrations.",
    code: "API",
    color: "from-emerald-500/15 to-teal-500/10",
    accent: "text-emerald-300",
    border: "border-emerald-400/15",
    status: "Planning",
    progress: 24,
    tasks: "6 / 25 tasks",
    members: ["AK", "SM", "PK"],
  },
];

const activities = [
  {
    initials: "RG",
    name: "Ritik Gupta",
    action: "completed a task in",
    target: "Credora Platform",
    detail: "Implemented workspace-level permissions",
    time: "18 min ago",
    color: "bg-indigo-500/15 text-indigo-300",
    icon: CheckCircle2,
  },
  {
    initials: "AK",
    name: "Aarav Kumar",
    action: "created a project in",
    target: "Design System",
    detail: "Component library improvements",
    time: "1 hour ago",
    color: "bg-cyan-500/15 text-cyan-300",
    icon: FolderKanban,
  },
  {
    initials: "SM",
    name: "Sanya Mehta",
    action: "updated a task in",
    target: "API Infrastructure",
    detail: "Organization access control",
    time: "3 hours ago",
    color: "bg-violet-500/15 text-violet-300",
    icon: GitBranch,
  },
];

const WorkspaceOverview = ({ workspaceId }: Props) => {
  const basePath = `/workspace/${workspaceId}`;

  return (
    <div className="mx-auto w-full max-w-375 space-y-8 px-4 py-7 sm:px-7 sm:py-9 xl:px-10">
      <section className="relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-[#0c0f19] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-32 size-80 rounded-full bg-indigo-500/12 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-36 right-1/3 size-64 rounded-full bg-violet-500/7 blur-[90px]" />

        <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-400/7 px-3 py-1.5 text-[11px] font-medium text-indigo-200">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Workspace is active
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Your team&apos;s work,
              <span className="text-indigo-300"> in one place.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              Track projects, coordinate your team, and keep every important
              update connected to the work behind it.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={`${basePath}/projects`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/7"
            >
              View projects
              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-xs font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              <Plus size={15} />
              Create project
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/6.5 bg-[#0c0f17] p-5 transition-colors hover:border-white/11"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-zinc-500">
                  {stat.label}
                </p>
                <div className="flex size-9 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/7 text-indigo-300">
                  <Icon size={17} />
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-2">
                <span className="text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </span>

                <span
                  className={`mb-1 inline-flex items-center gap-1 text-[10px] ${
                    stat.trend === "up" ? "text-emerald-400" : "text-zinc-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <Clock3 size={12} />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 items-start gap-8 2xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white">Projects</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Keep track of what your team is building.
              </p>
            </div>

            <Link
              href={`${basePath}/projects`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200"
            >
              All projects
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.code}
                className="group rounded-2xl border border-white/6.5 bg-[#0c0f17] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/20 hover:bg-[#0e111b]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl border ${project.border} bg-linear-to-br ${project.color} text-xs font-bold ${project.accent}`}
                  >
                    {project.code}
                  </div>

                  <button
                    type="button"
                    aria-label={`More options for ${project.name}`}
                    className="rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-white/5 hover:text-zinc-300"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                <h4 className="mt-5 text-sm font-semibold text-zinc-100 transition-colors group-hover:text-white">
                  {project.name}
                </h4>

                <p className="mt-2 min-h-10 text-xs leading-5 text-zinc-500">
                  {project.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400">
                    <span
                      className={`size-1.5 rounded-full ${
                        project.status === "Planning"
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                    />
                    {project.status}
                  </span>

                  <span className="text-[10px] text-zinc-500">
                    {project.tasks}
                  </span>
                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/6">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-400 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/5.5 pt-4">
                  <div className="flex -space-x-2">
                    {project.members.map((member, index) => (
                      <div
                        key={member}
                        className={`flex size-7 items-center justify-center rounded-full border-2 border-[#0c0f17] text-[9px] font-semibold ${
                          index === 0
                            ? "bg-indigo-500/20 text-indigo-200"
                            : index === 1
                              ? "bg-violet-500/20 text-violet-200"
                              : "bg-cyan-500/20 text-cyan-200"
                        }`}
                      >
                        {member}
                      </div>
                    ))}
                  </div>

                  <span className="text-[10px] font-medium text-zinc-500">
                    {project.progress}% complete
                  </span>
                </div>
              </article>
            ))}

            <button
              type="button"
              className="flex min-h-57.5 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/1 p-6 text-center transition-all hover:border-indigo-400/30 hover:bg-indigo-500/3.5"
            >
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-zinc-400">
                <Plus size={19} />
              </div>
              <span className="mt-3 text-xs font-medium text-zinc-300">
                Create a new project
              </span>
              <span className="mt-1 text-[11px] text-zinc-600">
                Start something great with your team.
              </span>
            </button>
          </div>
        </div>

        <aside className="space-y-7">
          <div className="rounded-2xl border border-white/6.5 bg-[#0c0f17] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Recent activity
                </h3>
                <p className="mt-1 text-[11px] text-zinc-500">
                  What&apos;s happening in your workspace
                </p>
              </div>

              <Activity size={17} className="text-zinc-500" />
            </div>

            <div className="mt-6 space-y-5">
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={`${activity.initials}-${index}`}
                    className="flex gap-3"
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-semibold ${activity.color}`}
                    >
                      {activity.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] leading-5 text-zinc-400">
                        <span className="font-medium text-zinc-200">
                          {activity.name}
                        </span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium text-indigo-300">
                          {activity.target}
                        </span>
                      </p>

                      <div className="mt-1.5 flex items-start gap-1.5">
                        <Icon
                          size={12}
                          className="mt-0.5 shrink-0 text-zinc-600"
                        />
                        <p className="text-[10px] leading-4 text-zinc-500">
                          {activity.detail}
                        </p>
                      </div>

                      <p className="mt-2 text-[10px] text-zinc-600">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href={`${basePath}/activity`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/7 py-2.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.035] hover:text-white"
            >
              View activity
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-violet-400/15 bg-linear-to-br from-violet-500/9 via-[#0c0f17] to-indigo-500/6 p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative flex size-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
              <Zap size={18} />
            </div>

            <h3 className="relative mt-4 text-sm font-semibold text-white">
              Keep work connected
            </h3>

            <p className="relative mt-2 text-xs leading-5 text-zinc-400">
              Projects bring tasks, team activity, and meaningful work history
              together in one place.
            </p>

            <Link
              href={`${basePath}/projects`}
              className="relative mt-4 inline-flex items-center gap-2 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
            >
              Explore projects
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex items-center gap-2 px-1 text-[10px] text-zinc-600">
            <ArrowDownRight size={13} />
            Workspace insights will appear as your team works.
          </div>
        </aside>
      </section>
    </div>
  );
};

export default WorkspaceOverview;
