"use client";

import { FormEvent, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  FolderKanban,
  Plus,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { WorkspaceProject } from "./ProjectCard";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (values: {
    name: string;
    description: string;
    priority: WorkspaceProject["priority"];
    dueDate: string;
    tags: string[];
  }) => void;
}

const CreateProjectModal = ({ open, onClose, onCreate }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<WorkspaceProject["priority"]>("Medium");
  const [dueDate, setDueDate] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const resetForm = () => {
    setName("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setTagsInput("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedDescription = description.trim();

    if (normalizedName.length < 3) {
      setError("Project name must contain at least 3 characters.");
      return;
    }

    if (normalizedDescription.length < 10) {
      setError("Add a short description of at least 10 characters.");
      return;
    }

    if (dueDate && dueDate < new Date().toISOString().slice(0, 10)) {
      setError("The due date cannot be in the past.");
      return;
    }

    const tags = [
      ...new Set(
        tagsInput
          .split(",")
          .map((tag) => tag.trim().replace(/^#/, ""))
          .filter(Boolean),
      ),
    ].slice(0, 5);

    const formattedDueDate = dueDate
      ? new Date(`${dueDate}T12:00:00`).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "Not set";

    onCreate({
      name: normalizedName,
      description: normalizedDescription,
      priority,
      dueDate: formattedDueDate,
      tags,
    });

    resetForm();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="relative my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f18] shadow-[0_25px_100px_rgba(0,0,0,0.65)]">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/12 blur-[75px]" />

        <div className="relative flex items-start justify-between border-b border-white/[0.07] p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
              <FolderKanban size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Create a project
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Define the project details and give your team a clear starting
                point.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="rounded-lg border border-white/6 p-2 text-slate-500 transition hover:bg-white/6 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-5 p-5 sm:p-6">
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Project name
            </label>
            <input
              id="project-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="e.g. Customer dashboard"
              maxLength={100}
              required
              autoFocus
              className="h-12 w-full rounded-xl border border-white/9 bg-[#080b13] px-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Description
            </label>
            <textarea
              id="project-description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setError("");
              }}
              placeholder="What are you building, and what outcome do you want?"
              rows={4}
              maxLength={1000}
              required
              className="w-full resize-y rounded-xl border border-white/9 bg-[#080b13] px-4 py-3 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
            <p className="mt-1 text-right text-[10px] text-slate-600">
              {description.length}/1000
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="project-priority"
                className="mb-2 block text-xs font-medium text-slate-300"
              >
                Priority
              </label>
              <div className="relative">
                <select
                  id="project-priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value as WorkspaceProject["priority"],
                    )
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-white/9 bg-[#080b13] px-3 pr-9 text-sm text-slate-200 outline-none transition focus:border-indigo-400/40"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="project-due-date"
                className="mb-2 block text-xs font-medium text-slate-300"
              >
                Due date
              </label>
              <div className="relative">
                <CalendarDays
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  id="project-due-date"
                  type="date"
                  value={dueDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => {
                    setDueDate(event.target.value);
                    setError("");
                  }}
                  className="h-11 w-full min-w-0 rounded-xl border border-white/9 bg-[#080b13] pl-9 pr-2 text-sm text-slate-300 outline-none transition focus:border-indigo-400/40"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="project-tags"
              className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300"
            >
              <Tag size={13} />
              Tags
              <span className="font-normal text-slate-600">
                Optional · up to 5
              </span>
            </label>
            <input
              id="project-tags"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="e.g. frontend, backend, product"
              className="h-11 w-full rounded-xl border border-white/9 bg-[#080b13] px-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40"
            />
            <p className="mt-1.5 text-[10px] text-slate-600">
              Separate tags with commas.
            </p>
          </div>

          {error && (
            <p className="rounded-lg border border-rose-400/15 bg-rose-400/6 px-3 py-2.5 text-xs text-rose-300">
              {error}
            </p>
          )}

          <div className="flex items-start gap-2 rounded-lg bg-white/2.5 px-3 py-3 text-[11px] leading-5 text-slate-500">
            <Sparkles size={14} className="mt-0.5 shrink-0 text-indigo-300" />
            <p>
              You can add tasks, assign members, and update the project status
              after creating it.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/6 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="h-11 rounded-xl border border-white/9 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              <Plus size={16} />
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
