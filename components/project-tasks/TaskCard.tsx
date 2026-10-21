"use client";

import { Task, TaskPriority, TaskStatus } from "@/features/task/task.interface";
import {
  CalendarDays,
  Ellipsis,
  Flag,
  MessageSquare,
  UserRound,
} from "lucide-react";

interface Props {
  task: Task;
  onClick: (task: Task) => void;
  onDragStart?: (taskId: string) => void;
  compact?: boolean;
}

const priorityStyles: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "text-slate-400 bg-slate-400/10 border-slate-400/15",
  [TaskPriority.MEDIUM]: "text-sky-300 bg-sky-400/10 border-sky-400/15",
  [TaskPriority.HIGH]: "text-amber-300 bg-amber-400/10 border-amber-400/15",
  [TaskPriority.URGENT]: "text-rose-300 bg-rose-400/10 border-rose-400/15",
};

const labelStyles = [
  "border-indigo-400/15 bg-indigo-400/8 text-indigo-300",
  "border-violet-400/15 bg-violet-400/8 text-violet-300",
  "border-cyan-400/15 bg-cyan-400/8 text-cyan-300",
];

const TaskCard = ({ task, onClick, onDragStart, compact = false }: Props) => {
  const overdue =
    task.dueDate &&
    new Date(`${task.dueDate}T23:59:59`) < new Date() &&
    task.status !== TaskStatus.COMPLETED;

  return (
    <article
      draggable={!compact}
      onDragStart={() => onDragStart?.(task.id)}
      onClick={() => onClick(task)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(task);
        }
      }}
      role="button"
      tabIndex={0}
      className={`group cursor-pointer rounded-xl border border-white/7 bg-[#0c0f18] p-3.5 text-left transition hover:border-indigo-400/25 hover:bg-[#101421] hover:shadow-lg hover:shadow-black/10 ${
        compact ? "flex items-center gap-4" : ""
      }`}
    >
      <div className={compact ? "min-w-0 flex-1" : ""}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold tracking-wide text-slate-500">
            {task.id}
          </span>
          <button
            type="button"
            aria-label={`More options for ${task.title}`}
            onClick={(event) => event.stopPropagation()}
            className="rounded-md p-1 text-slate-600 opacity-100 transition hover:bg-white/6 hover:text-slate-300 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Ellipsis size={16} />
          </button>
        </div>

        <h3 className="mt-1.5 text-xs font-semibold leading-5 text-slate-200 transition group-hover:text-white">
          {task.title}
        </h3>

        {!compact && task.description && (
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-slate-500">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium ${priorityStyles[task.priority]}`}
          >
            <Flag size={10} />
            {task.priority}
          </span>

          {/* {task.labels.slice(0, compact ? 2 : 3).map((label, index) => (
            <span
              key={label}
              className={`rounded-md border px-2 py-1 text-[10px] ${
                labelStyles[index % labelStyles.length]
              }`}
            >
              {label}
            </span>
          ))} */}
          {/* {task.labels.length > (compact ? 2 : 3) && (
            <span className="text-[10px] text-slate-500">
              +{task.labels.length - (compact ? 2 : 3)}
            </span>
          )} */}
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-3 border-t border-white/5 pt-3 ${
          compact ? "shrink-0 border-0 pt-0" : "mt-3"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          {(task as any)?.assignee ? (
            <div
              title={(task as any).assignee.name}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${(task as any).assignee.color} text-[9px] font-semibold text-white ring-2 ring-[#0c0f18]`}
            >
              {(task as any).assignee.initials}
            </div>
          ) : (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-white/15 text-slate-500">
              <UserRound size={13} />
            </div>
          )}

          <span className="truncate text-[10px] text-slate-500">
            {(task as any).assignee?.name ?? "Unassigned"}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {task.dueDate && (
            <span
              className={`inline-flex items-center gap-1 text-[10px] ${
                overdue ? "text-rose-300" : "text-slate-500"
              }`}
              title={overdue ? "Overdue" : "Due date"}
            >
              <CalendarDays size={11} />
              {new Date(`${task.dueDate}T12:00:00`).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric" },
              )}
            </span>
          )}

          {!compact && (
            <span className="flex items-center gap-1 text-[10px] text-slate-600">
              <MessageSquare size={11} />0
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
