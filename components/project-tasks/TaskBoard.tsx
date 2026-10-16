"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  CircleDashed,
  Clock3,
  Plus,
  X,
} from "lucide-react";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "@/features/task/task.interface";

interface Props {
  tasks: Task[];
  view: "board" | "list";
  onTaskClick: (task: Task) => void;
  onCreateTask: (status: TaskStatus) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const columnStyles: Record<
  TaskStatus,
  { icon: typeof Circle; color: string; dot: string }
> = {
  [TaskStatus.TODO]: {
    icon: Circle,
    color: "text-blue-400",
    dot: "bg-blue-400",
  },
  [TaskStatus.IN_REVIEW]: {
    icon: Circle,
    color: "text-sky-400",
    dot: "bg-sky-400",
  },
  [TaskStatus.IN_PROGRESS]: {
    icon: CircleDashed,
    color: "text-yellow-300",
    dot: "bg-yellow-300",
  },
  [TaskStatus.ESCALATED]: {
    icon: Clock3,
    color: "text-red-300",
    dot: "bg-red-300",
  },
  [TaskStatus.COMPLETED]: {
    icon: CheckCircle2,
    color: "text-emerald-300",
    dot: "bg-emerald-300",
  },
  [TaskStatus.CANCELLED]: {
    icon: X,
    color: "text-slate-300",
    dot: "bg-slate-300",
  },
};

const TaskBoard = ({
  tasks,
  view,
  onTaskClick,
  onCreateTask,
  onStatusChange,
}: Props) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);

  const handleDrop = (status: TaskStatus) => {
    if (draggingId) onStatusChange(draggingId, status);
    setDraggingId(null);
    setDragOverStatus(null);
  };

  if (view === "list") {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0f18]">
        <div className="overflow-x-auto">
          <div className="min-w-190">
            <div className="grid grid-cols-[minmax(260px,2fr)_130px_120px_150px_100px] gap-4 border-b border-white/[0.07] px-5 py-3">
              {["Task", "Status", "Priority", "Assignee", "Due date"].map(
                (label) => (
                  <span
                    key={label}
                    className="text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>

            {tasks.map((task) => {
              const style = columnStyles[task.status];
              const Icon = style.icon;

              return (
                <button
                  type="button"
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className="grid w-full grid-cols-[minmax(260px,2fr)_130px_120px_150px_100px] items-center gap-4 border-b border-white/4 px-5 py-3.5 text-left transition last:border-0 hover:bg-white/2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-200">
                      {task.title}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-600">{task.id}</p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] ${style.color}`}
                  >
                    <Icon size={13} />
                    {task.status}
                  </span>

                  <span className="text-[11px] text-slate-400">
                    {task.priority}
                  </span>

                  <span className="flex min-w-0 items-center gap-2">
                    {/* {task.assignee ? (
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${task.assignee.color} text-[9px] font-semibold text-white`}
                      >
                        {task.assignee.initials}
                      </span>
                    ) : (
                      <span className="h-6 w-6 rounded-full border border-dashed border-white/15" />
                    )} */}
                    <span className="truncate text-[11px] text-slate-400">
                      {/* {task?.assignee?.name ?? "Unassigned"}
                       */}
                      Unassigned
                    </span>
                  </span>

                  <span className="text-[11px] text-slate-500">
                    {task.dueDate
                      ? new Date(`${task.dueDate}T12:00:00`).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" },
                        )
                      : "—"}
                  </span>
                </button>
              );
            })}

            {!tasks.length && (
              <div className="px-5 py-14 text-center text-xs text-slate-500">
                No tasks match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="grid min-w-262.5 grid-cols-5 items-start gap-3">
        {Object.values(TaskStatus).map((status) => {
          const style = columnStyles[status];
          const Icon = style.icon;
          const columnTasks = tasks.filter((task) => task.status === status);
          const isOver = dragOverStatus === status;

          return (
            <section
              key={status}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOverStatus(status);
              }}
              onDragLeave={(event) => {
                if (
                  !event.currentTarget.contains(event.relatedTarget as Node)
                ) {
                  setDragOverStatus(null);
                }
              }}
              onDrop={(event) => {
                event.preventDefault();
                handleDrop(status);
              }}
              className={`min-h-90 rounded-2xl border p-2.5 transition ${
                isOver
                  ? "border-indigo-400/40 bg-indigo-400/6"
                  : "border-white/6 bg-white/1.5"
              }`}
            >
              <div className="flex items-center justify-between gap-2 px-1 pb-3 pt-1">
                <div className="flex min-w-0 items-center gap-2">
                  <Icon size={15} className={style.color} />
                  <h3 className="truncate text-xs font-semibold text-slate-300">
                    {status}
                  </h3>
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white/5 px-1 text-[10px] text-slate-500">
                    {columnTasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onCreateTask(status)}
                  aria-label={`Add task to ${status}`}
                  className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.07] hover:text-white"
                >
                  <Plus size={15} />
                </button>
              </div>

              <div className="space-y-2.5">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    onDragStart={() => setDraggingId(task.id)}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDragOverStatus(null);
                    }}
                    className={`transition ${
                      draggingId === task.id ? "opacity-40" : ""
                    }`}
                  >
                    <TaskCard
                      task={task}
                      onClick={onTaskClick}
                      onDragStart={setDraggingId}
                    />
                  </div>
                ))}

                {!columnTasks.length && (
                  <div className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.07] px-3 text-center">
                    <span className="text-[10px] text-slate-600">
                      Drop tasks here
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => onCreateTask(status)}
                className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-white/4 hover:text-slate-200"
              >
                <Plus size={13} />
                Add task
              </button>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
