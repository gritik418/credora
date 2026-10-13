import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  MoreHorizontal,
  Users,
} from "lucide-react";

export interface WorkspaceProject {
  id: string;
  name: string;
  description: string;
  code: string;
  status: "Planning" | "In progress" | "On hold" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  progress: number;
  completedTasks: number;
  totalTasks: number;
  members: {
    initials: string;
    color: string;
  }[];
  dueDate: string;
  tags: string[];
  updatedAt: string;
  accent: string;
}

interface Props {
  project: WorkspaceProject;
  view: "grid" | "list";
}

const statusStyles: Record<WorkspaceProject["status"], string> = {
  Planning: "border-violet-400/20 bg-violet-400/8 text-violet-300",
  "In progress": "border-blue-400/20 bg-blue-400/8 text-blue-300",
  "On hold": "border-amber-400/20 bg-amber-400/8 text-amber-300",
  Completed: "border-emerald-400/20 bg-emerald-400/8 text-emerald-300",
};

const priorityStyles: Record<WorkspaceProject["priority"], string> = {
  Low: "bg-slate-500",
  Medium: "bg-blue-400",
  High: "bg-orange-400",
  Urgent: "bg-rose-400",
};

const ProjectCard = ({ project, view }: Props) => {
  const isList = view === "list";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0f18] transition duration-200 hover:border-indigo-400/22 hover:bg-[#0e121d] ${
        isList ? "flex flex-col gap-5 p-5 lg:flex-row lg:items-center" : "p-5"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b ${project.accent} opacity-70`}
      />

      <div className={`relative min-w-0 ${isList ? "flex-1" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-400/8 text-indigo-300">
              <Circle size={20} strokeWidth={1.7} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-slate-100 transition group-hover:text-indigo-200">
                  {project.name}
                </h3>
              </div>
              <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-500">
                {project.code}
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

          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/2.5 px-2 py-1 text-[10px] text-slate-400">
            <span
              className={`h-1.5 w-1.5 rounded-full ${priorityStyles[project.priority]}`}
            />
            {project.priority} priority
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Project progress</span>
            <span className="font-semibold tabular-nums text-slate-200">
              {project.progress}%
            </span>
          </div>

          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/6"
            role="progressbar"
            aria-label={`${project.name} progress`}
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                project.status === "Completed"
                  ? "bg-emerald-400"
                  : "bg-linear-to-r from-indigo-500 to-violet-400"
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-slate-500">
            <span>
              {project.completedTasks} of {project.totalTasks} tasks
            </span>
            <span>{project.updatedAt}</span>
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
            {project.dueDate}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Users size={12} />
            Team
          </div>
          <div className="mt-1.5 flex items-center">
            <div className="flex -space-x-2">
              {project.members.slice(0, 4).map((member, index) => (
                <div
                  key={`${project.id}-${member.initials}-${index}`}
                  title={member.initials}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0c0f18] bg-linear-to-br ${member.color} text-[9px] font-semibold text-white`}
                >
                  {member.initials}
                </div>
              ))}
            </div>
            {project.members.length > 4 && (
              <span className="ml-2 text-[10px] text-slate-500">
                +{project.members.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/[0.035] px-2 py-1 text-[10px] text-slate-500"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="rounded-md bg-white/[0.035] px-2 py-1 text-[10px] text-slate-500">
                +{project.tags.length - 2}
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={`Open ${project.name}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] text-slate-500 transition hover:border-indigo-400/25 hover:bg-indigo-400/10 hover:text-indigo-300"
          >
            <ArrowUpRight size={15} />
          </button>
        </div>

        {project.status === "Completed" && (
          <div className="flex w-full items-center gap-1.5 text-[10px] text-emerald-300">
            <CheckCircle2 size={12} />
            Project completed
          </div>
        )}

        {project.status === "On hold" && (
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
