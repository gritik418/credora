import {
  ProjectStatus,
  ProjectWithWorkspaceAndMembers,
} from "@/features/project/project.interface";
import { getInitials } from "@/lib/string.utils";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Props {
  project: ProjectWithWorkspaceAndMembers;
  view: "grid" | "list";
}

const statusStyles: Record<ProjectWithWorkspaceAndMembers["status"], string> = {
  [ProjectStatus.PLANNING]:
    "border-violet-400/20 bg-violet-400/8 text-violet-300",
  [ProjectStatus.ACTIVE]: "border-blue-400/20 bg-blue-400/8 text-blue-300",
  [ProjectStatus.ON_HOLD]: "border-amber-400/20 bg-amber-400/8 text-amber-300",
  [ProjectStatus.COMPLETED]:
    "border-emerald-400/20 bg-emerald-400/8 text-emerald-300",
  [ProjectStatus.CANCELLED]: "border-red-400/20 bg-red-400/8 text-red-300",
  [ProjectStatus.ARCHIVED]: "border-gray-400/20 bg-gray-400/8 text-gray-300",
};

const ProjectCard = ({ project, view }: Props) => {
  const isList = view === "list";

  const completedTasks = 80;
  const totalTasks = 90;

  const getAccentColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PLANNING:
        return "from-blue-500/35 via-cyan-500/4 to-transparent";
      case ProjectStatus.ACTIVE:
        return "from-indigo-500/35 via-violet-500/4 to-transparent";
      case ProjectStatus.ON_HOLD:
        return "from-amber-500/35 via-orange-500/4 to-transparent";
      case ProjectStatus.COMPLETED:
        return "from-emerald-500/35 via-green-500/4 to-transparent";
      case ProjectStatus.CANCELLED:
        return "from-red-500/35 via-rose-500/4 to-transparent";
      case ProjectStatus.ARCHIVED:
        return "from-gray-500/35 via-gray-500/4 to-transparent";
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getMemberColors = (name: string) => {
    const colors = [
      "from-blue-500/55 via-cyan-500/24 to-transparent",
      "from-indigo-500/55 via-violet-500/24 to-transparent",
      "from-amber-500/55 via-orange-500/24 to-transparent",
      "from-emerald-500/55 via-green-500/24 to-transparent",
      "from-red-500/55 via-rose-500/24 to-transparent",
      "from-pink-500/55 via-pink-500/24 to-transparent",
      "from-lime-500/55 via-lime-500/24 to-transparent",
      "from-violet-500/55 via-violet-500/24 to-transparent",
      "from-purple-500/55 via-purple-500/24 to-transparent",
      "from-slate-500/55 via-slate-500/24 to-transparent",
    ];

    const index = name.length % colors.length;

    return colors[index];
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/7 bg-[#0c0f18] transition duration-200 hover:border-indigo-400/22 hover:bg-[#0e121d] ${
        isList ? "flex flex-col gap-5 p-5 lg:flex-row lg:items-center" : "p-5"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b ${getAccentColor(project.status)} opacity-70`}
      />

      <div className={`relative min-w-0 ${isList ? "flex-1" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-400/8 text-indigo-300">
              <FolderKanban size={20} strokeWidth={1.7} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-slate-100 transition group-hover:text-indigo-200">
                  {project.name}
                </h3>
              </div>
              <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-500">
                {project.slug}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label={`Actions for ${project.name}`}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/6 hover:text-white"
          >
            <MoreHorizontal size={19} />
          </button>
        </div>

        <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-slate-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-md border px-2 py-1 text-[10px] font-medium ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Project progress</span>
            <span className="font-semibold tabular-nums text-slate-200">
              {90}%
            </span>
          </div>

          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/6"
            role="progressbar"
            aria-label={`${project.name} progress`}
            aria-valuenow={89}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                project.status === ProjectStatus.COMPLETED
                  ? "bg-emerald-400"
                  : "bg-linear-to-r from-indigo-500 to-violet-400"
              }`}
              style={{ width: `${89}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-slate-500">
            <span>
              {completedTasks} of {totalTasks} tasks
            </span>
            <span>Last update: {formatDate(project.updatedAt as string)}</span>
          </div>
        </div>
      </div>

      <div
        className={`relative flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-4 ${
          isList
            ? "lg:w-67.5 lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0"
            : "mt-5"
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <CalendarDays size={12} />
            Due date
          </div>
          <p className="mt-1.5 text-xs font-medium text-slate-300">
            {formatDate(project.dueDate as string)}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Users size={12} />
            Team
          </div>
          <div className="mt-1.5 flex items-center">
            <div className="flex -space-x-2">
              {project.members.slice(0, 4).map((member, index) => {
                if (!member.user.avatar) {
                  return (
                    <div
                      key={`${project.id}-${member.user.name}-${index}`}
                      title={member.user.name}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#0c0f18] bg-linear-to-br text-[9px] font-semibold text-white`}
                    >
                      <img
                        src={member.user.avatar}
                        alt={member.user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`${project.id}-${member.user.name}-${index}`}
                      title={member.user.name}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#0c0f18] bg-linear-to-br ${getMemberColors(member.user.name)} text-[9px] font-semibold text-white`}
                    >
                      {getInitials(member.user.name)}
                    </div>
                  );
                }
              })}
            </div>

            {project.members.length > 4 && (
              <span className="ml-2 text-[10px] text-slate-500">
                +{project.members.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Link
            href={`/workspace/${project.workspace.slug}/projects/${project.slug}`}
            aria-label={`Open ${project.name}`}
            className="inline-flex cursor-pointer h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/7 text-slate-500 transition hover:border-indigo-400/25 hover:bg-indigo-400/10 hover:text-indigo-300"
          >
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {project.status === ProjectStatus.COMPLETED && (
          <div className="flex w-full items-center gap-1.5 text-[10px] text-emerald-300">
            <CheckCircle2 size={12} />
            Project completed
          </div>
        )}

        {project.status === ProjectStatus.ON_HOLD && (
          <div className="flex w-full items-center gap-1.5 text-[10px] text-amber-300">
            <Clock3 size={12} />
            Temporarily on hold
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
