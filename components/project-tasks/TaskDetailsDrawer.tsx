"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  Flag,
  Layers3,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { Task, TaskPriority, TaskStatus } from "@/features/task/task.interface";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TaskDetailsDrawer = ({ open, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [labels, setLabels] = useState("");
  const [error, setError] = useState("");

  const teamMembers: { id: string }[] = [];

  const task: Task = {
    id: "",
    organizationId: "",
    title: "",
    description: "",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    createdAt: new Date(),
    updatedAt: new Date(),
    projectId: "",
    dueDate: new Date(),
  };

  if (!open) return null;

  const handleSubmit = () => {};

  const handleDelete = () => {};

  return (
    <div
      className="fixed inset-0 z-100 flex justify-end bg-black/60 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="flex h-full w-full max-w-xl flex-col border-l border-white/8 bg-[#0c0f18] shadow-2xl shadow-black/40">
        <div className="relative flex items-start justify-between gap-4 overflow-hidden border-b border-white/7 p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-[80px]" />

          <div className="relative flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
              <Layers3 size={19} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Create a task
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Add a task to this project and assign ownership.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task drawer"
            className="relative rounded-lg border border-white/8 p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
            {task && (
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-white/8 bg-white/3 px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-slate-400">
                  {task.id}
                </span>
                <span className="text-[10px] text-slate-600">
                  Created{" "}
                  {new Date(`${task.createdAt}T12:00:00`).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </span>
              </div>
            )}

            <div>
              <label
                htmlFor="task-title"
                className="mb-2 block text-xs font-medium text-slate-300"
              >
                Task title <span className="text-rose-400">*</span>
              </label>
              <input
                id="task-title"
                autoFocus
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError("");
                }}
                placeholder="What needs to be done?"
                className="h-12 w-full rounded-xl border border-white/9 bg-[#080b13] px-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
              />
              {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
            </div>

            <div>
              <label
                htmlFor="task-description"
                className="mb-2 block text-xs font-medium text-slate-300"
              >
                Description
              </label>
              <textarea
                id="task-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Add context, requirements, or acceptance criteria..."
                className="w-full resize-y rounded-xl border border-white/9 bg-[#080b13] px-4 py-3 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="task-status"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300"
                >
                  <CircleDot size={14} className="text-indigo-300" />
                  Status
                </label>
                <div className="relative">
                  <select
                    id="task-status"
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value as TaskStatus)
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-white/9 bg-[#080b13] px-3 pr-9 text-xs text-slate-200 outline-none focus:border-indigo-400/40"
                  >
                    {Object.values(TaskStatus).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300"
                >
                  <Flag size={14} className="text-amber-300" />
                  Priority
                </label>
                <div className="relative">
                  <select
                    id="task-priority"
                    className="h-11 w-full appearance-none rounded-xl border border-white/9 bg-[#080b13] px-3 pr-9 text-xs text-slate-200 outline-none focus:border-indigo-400/40"
                  >
                    {Object.values(TaskPriority).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="task-assignee"
                className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300"
              >
                <UserRound size={14} className="text-sky-300" />
                Assignee
              </label>
              <div className="relative">
                <select
                  id="task-assignee"
                  value={assigneeId}
                  onChange={(event) => setAssigneeId(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/9 bg-[#080b13] px-3 pr-9 text-xs text-slate-200 outline-none focus:border-indigo-400/40"
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map((member: any) => (
                    <option key={member.id} value={member.id}>
                      {member?.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="task-due-date"
                className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300"
              >
                <CalendarDays size={14} className="text-violet-300" />
                Due date
              </label>
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="h-11 w-full rounded-xl border border-white/9 bg-[#080b13] px-3 text-xs text-slate-200 outline-none scheme-dark focus:border-indigo-400/40"
              />
            </div>

            <div>
              <label
                htmlFor="task-labels"
                className="mb-2 block text-xs font-medium text-slate-300"
              >
                Labels
              </label>
              <input
                id="task-labels"
                value={labels}
                onChange={(event) => setLabels(event.target.value)}
                placeholder="Frontend, API, Bug (comma-separated)"
                className="h-11 w-full rounded-xl border border-white/9 bg-[#080b13] px-3 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-400/40"
              />
              <p className="mt-1.5 text-[10px] text-slate-600">
                Separate multiple labels with commas.
              </p>
            </div>

            {task && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-rose-400/15 px-3 text-xs font-medium text-rose-300 transition hover:bg-rose-400/7"
              >
                <Trash2 size={14} />
                Delete task
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/7 bg-[#0c0f18] p-5 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-white/9 px-4 text-xs font-medium text-slate-300 transition hover:bg-white/4"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 text-xs font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:brightness-110"
            >
              {task ? <Save size={14} /> : <Check size={14} />}
              {task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
};

export default TaskDetailsDrawer;
