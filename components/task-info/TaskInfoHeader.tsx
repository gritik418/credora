"use client";

import { ArrowLeft, CalendarDays, Ellipsis, Pencil } from "lucide-react";
import { TaskPriority, TaskStatus } from "@/features/task/task.interface";

interface TaskInfoHeaderProps {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  onClose: () => void;
  onEdit?: () => void;
}

const statusStyles: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  [TaskStatus.IN_PROGRESS]: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  [TaskStatus.IN_REVIEW]:
    "bg-violet-500/10 text-violet-400 border-violet-500/20",
  [TaskStatus.ESCALATED]: "bg-red-500/10 text-red-400 border-red-500/20",
  [TaskStatus.COMPLETED]:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  [TaskStatus.CANCELLED]: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

const priorityStyles: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "text-zinc-400",
  [TaskPriority.MEDIUM]: "text-blue-400",
  [TaskPriority.HIGH]: "text-orange-400",
  [TaskPriority.URGENT]: "text-red-400",
};

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const TaskInfoHeader = ({
  title,
  status,
  priority,
  onClose,
  onEdit,
}: TaskInfoHeaderProps) => {
  return (
    <div className="border-b border-white/[0.07] px-5 py-4 sm:px-7">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to tasks
        </button>

        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.08] px-3 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Pencil size={13} />
              Edit
            </button>
          )}

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Ellipsis size={17} />
          </button>
        </div>
      </div>

      <h1 className="text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
        {title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
          {formatLabel(status)}
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-xs">
          <span className={`font-medium ${priorityStyles[priority]}`}>
            {formatLabel(priority)}
          </span>
          <span className="text-zinc-600">Priority</span>
        </span>
      </div>
    </div>
  );
};

export default TaskInfoHeader;
