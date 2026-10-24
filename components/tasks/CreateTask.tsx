"use client";

import { selectAvailableAssignees } from "@/features/project/project.selectors";
import {
  TaskAssignee,
  TaskPriority,
  TaskStatus,
} from "@/features/task/task.interface";
import { useAppSelector } from "@/store/hooks";
import {
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  CircleDot,
  Flag,
  Layers3,
  Plus,
  Search,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
}

const CreateTask = ({ open, onClose }: CreateTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<TaskAssignee[]>(
    [],
  );
  const [labels, setLabels] = useState("");
  const [assigneeSearch, setAssigneeSearch] = useState("");
  const [assigneeOpen, setAssigneeOpen] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableAssignees = useAppSelector(selectAvailableAssignees);

  const modalRef = useRef<HTMLDivElement>(null);
  const assigneeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (assigneeOpen) {
          setAssigneeOpen(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, assigneeOpen, onClose]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        assigneeRef.current &&
        !assigneeRef.current.contains(event.target as Node)
      ) {
        setAssigneeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const filteredAssignees = useMemo(() => {
    return availableAssignees.filter(
      (assignee) =>
        assignee.user.name
          .toLowerCase()
          .includes(assigneeSearch.toLowerCase()) ||
        assignee.user.username
          .toLowerCase()
          .includes(assigneeSearch.toLowerCase()) ||
        assignee.user.email
          .toLowerCase()
          .includes(assigneeSearch.toLowerCase()),
    );
  }, [availableAssignees, assigneeSearch]);

  const toggleAssignee = (assignee: TaskAssignee) => {
    setSelectedAssigneeIds((current) =>
      current.includes(assignee.id)
        ? current.filter((assigneeId) => assigneeId !== assignee.id)
        : [...current, assignee.id],
    );

    setSelectedAssignees((current) =>
      current.includes(assignee)
        ? current.filter((a) => a.id !== assignee.id)
        : [...current, assignee],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Give your task a title before creating it.");
      return;
    }

    if (startDate && dueDate && dueDate < startDate) {
      setError("The due date cannot be earlier than the start date.");
      return;
    }

    setIsSubmitting(true);

    try {
      onClose();
    } catch {
      setError("Couldn't create the task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const inputClass =
    "h-11 w-full rounded-xl border border-white/[0.08] bg-[#0a0c13] px-3.5 text-[13px] text-slate-200 outline-none transition placeholder:text-slate-600 hover:border-white/[0.14] focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10";

  const labelClass =
    "mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400";

  const iconClass = "h-3.5 w-3.5 shrink-0 text-indigo-300";

  const statusLabel = (value: string) =>
    value
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const priorityColor: Record<string, string> = {
    LOW: "text-sky-300",
    MEDIUM: "text-amber-300",
    HIGH: "text-orange-300",
    URGENT: "text-rose-300",
  };

  const filteredReviewers: any = [];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part: any) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="relative flex max-h-[92dvh] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d0f17] shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:rounded-[24px]"
      >
        <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-indigo-500/[0.12] blur-[100px]" />
        <div className="pointer-events-none absolute -left-24 top-40 h-56 w-56 rounded-full bg-violet-500/[0.07] blur-[90px]" />

        <form
          onSubmit={handleSubmit}
          className="relative flex min-h-0 flex-1 flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300 shadow-inner shadow-indigo-400/5">
                <Layers3 size={21} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2
                    id="create-task-title"
                    className="text-[16px] font-semibold tracking-tight text-white sm:text-lg"
                  >
                    Create a task
                  </h2>
                  <span className="rounded-md border border-indigo-400/20 bg-indigo-400/[0.08] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-indigo-300">
                    New
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  Turn your next idea into action.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              aria-label="Close create task modal"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] text-slate-500 transition hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
            >
              <X size={17} />
            </button>
          </div>

          {/* Form body */}
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            {/* Task title */}
            <div>
              <label htmlFor="create-task-name" className={labelClass}>
                Task title <span className="text-rose-400">*</span>
              </label>

              <input
                id="create-task-name"
                autoFocus
                required
                maxLength={160}
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError("");
                }}
                placeholder="e.g. Build the authentication flow"
                className="h-[50px] w-full rounded-xl border border-white/[0.09] bg-[#090b12] px-4 text-sm font-medium text-white outline-none transition placeholder:font-normal placeholder:text-slate-600 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10"
              />

              <div className="mt-2 flex items-center justify-between">
                <p className="text-[10px] text-slate-600">
                  Make it clear and easy to understand.
                </p>
                <span className="text-[10px] tabular-nums text-slate-600">
                  {title.length}/160
                </span>
              </div>
            </div>
            {/* Description */}
            <div>
              <label htmlFor="create-task-description" className={labelClass}>
                Description
              </label>

              <textarea
                id="create-task-description"
                rows={3}
                maxLength={3000}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add context, requirements, or acceptance criteria..."
                className="w-full resize-y rounded-xl border border-white/[0.08] bg-[#0a0c13] px-3.5 py-3 text-[13px] leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 hover:border-white/[0.14] focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>
            {/* Status + Priority */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="create-task-status" className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <CircleDot className={iconClass} />
                    Status
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="create-task-status"
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value as TaskStatus)
                    }
                    className={`${inputClass} appearance-none pr-9`}
                  >
                    {Object.values(TaskStatus).map((item) => (
                      <option key={item} value={item}>
                        {statusLabel(String(item))}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>
              </div>

              <div>
                <label htmlFor="create-task-priority" className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <Flag className={iconClass} />
                    Priority
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="create-task-priority"
                    value={priority}
                    onChange={(event) =>
                      setPriority(event.target.value as TaskPriority)
                    }
                    className={`${inputClass} appearance-none pr-9 ${
                      priorityColor[String(priority)] ?? ""
                    }`}
                  >
                    {Object.values(TaskPriority).map((item) => (
                      <option key={item} value={item}>
                        {statusLabel(String(item))}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>
              </div>
            </div>
            {/* Start date + Due date */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className={labelClass + " mb-0"}>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className={iconClass} />
                    Schedule
                  </span>
                </label>
                <span className="text-[10px] text-slate-600">Optional</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-3.5">
                  <label
                    htmlFor="create-task-start-date"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Start date
                  </label>
                  <input
                    id="create-task-start-date"
                    type="date"
                    value={startDate}
                    max={dueDate || undefined}
                    onChange={(event) => {
                      setStartDate(event.target.value);
                      setError("");
                    }}
                    className={`${inputClass} scheme-dark px-2.5 text-xs`}
                  />
                  <p className="mt-2 text-[10px] leading-4 text-slate-600">
                    When work should begin.
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-3.5">
                  <label
                    htmlFor="create-task-due-date"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Due date
                  </label>
                  <input
                    id="create-task-due-date"
                    type="date"
                    min={startDate || undefined}
                    value={dueDate}
                    onChange={(event) => {
                      setDueDate(event.target.value);
                      setError("");
                    }}
                    className={`${inputClass} scheme-dark px-2.5 text-xs`}
                  />
                  <p className="mt-2 text-[10px] leading-4 text-slate-600">
                    When the task should be completed.
                  </p>
                </div>
              </div>
            </div>

            {/* Assignees */}
            <div ref={assigneeRef} className="relative">
              <div className="mb-2 flex items-center justify-between">
                <label className={labelClass + " mb-0"}>
                  <span className="inline-flex items-center gap-2">
                    <UserRound className={iconClass} />
                    Assignees
                  </span>
                </label>

                <span className="text-[10px] text-slate-500">
                  {selectedAssigneeIds.length
                    ? `${selectedAssigneeIds.length} selected`
                    : "Unassigned"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setAssigneeOpen((current) => !current)}
                aria-expanded={assigneeOpen}
                className={`flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border bg-[#0a0c13] px-3.5 py-2.5 text-left transition ${
                  assigneeOpen
                    ? "border-indigo-400/40 ring-2 ring-indigo-500/10"
                    : "border-white/[0.08] hover:border-white/[0.14]"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-white/15 text-slate-500">
                    <Plus size={15} />
                  </div>

                  <span className="truncate text-xs text-slate-300">
                    {!selectedAssigneeIds.length
                      ? "Assign people to this task"
                      : `${selectedAssigneeIds.length} people assigned. Click here to change.`}
                  </span>
                </div>

                <ChevronDown
                  size={15}
                  className={`shrink-0 text-slate-500 transition ${
                    assigneeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {assigneeOpen && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#11141e] shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                  <div className="border-b border-white/[0.07] p-3">
                    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-black/20 px-3">
                      <Search size={15} className="shrink-0 text-slate-500" />
                      <input
                        autoFocus
                        value={assigneeSearch}
                        onChange={(event) =>
                          setAssigneeSearch(event.target.value)
                        }
                        placeholder="Search name, username or email..."
                        className="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-600"
                      />

                      {assigneeSearch && (
                        <button
                          type="button"
                          onClick={() => setAssigneeSearch("")}
                          className="text-slate-500 hover:text-white"
                          aria-label="Clear assignee search"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="max-h-56 overflow-y-auto p-1.5">
                    {filteredAssignees.length ? (
                      filteredAssignees.map((assignee: TaskAssignee) => (
                        <button
                          key={assignee.id}
                          type="button"
                          onClick={() => toggleAssignee(assignee)}
                          className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-white/[0.045]"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-gradient-to-br from-indigo-500/25 to-violet-500/10 text-[11px] font-semibold text-indigo-200">
                            {assignee.user.avatar ? (
                              <img
                                src={assignee.user.avatar}
                                alt={assignee.user.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              getInitials(assignee.user.name)
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-medium text-slate-200">
                              {assignee.user.name}
                            </span>
                            <span className="mt-1 block truncate text-[10px] text-slate-500">
                              @{assignee.user.username} · {assignee.user.email}
                            </span>
                          </span>

                          {selectedAssigneeIds.includes(assignee.id) ? (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-indigo-400/40 text-indigo-300">
                              <Check size={12} />
                            </span>
                          ) : (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/[0.12] text-transparent">
                              <Check size={12} />
                            </span>
                          )}
                        </button>
                      ))
                    ) : (
                      <>
                        {assigneeSearch ? (
                          <div className="px-4 py-8 text-center">
                            <UserRound
                              size={20}
                              className="mx-auto mb-2 text-slate-600"
                            />
                            <p className="text-xs text-slate-400">
                              No team members found
                            </p>
                            <p className="mt-1 text-[10px] text-slate-600">
                              Try a different search.
                            </p>

                            <button
                              onClick={() => setAssigneeSearch("")}
                              className="mt-4 cursor-pointer rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-sm text-slate-200 transition hover:bg-white/[0.045]"
                            >
                              Clear search
                            </button>
                          </div>
                        ) : (
                          <div className="px-4 py-8 text-center">
                            <UserRound
                              size={20}
                              className="mx-auto mb-2 text-slate-600"
                            />
                            <p className="text-xs text-slate-400">
                              No team members found
                            </p>
                            <p className="mt-1 text-[10px] text-slate-600">
                              Try a different search.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {selectedAssigneeIds.length > 0 && (
                    <div className="flex items-center justify-between border-t border-white/[0.07] px-3.5 py-2.5">
                      <span className="text-[10px] text-slate-500">
                        {selectedAssigneeIds.length} people selected
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAssigneeIds([]);
                          setSelectedAssignees([]);
                          setAssigneeOpen(false);
                        }}
                        className="text-[10px] font-medium text-indigo-300 transition hover:text-indigo-200"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}

              {selectedAssignees.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedAssignees.map((assignee: TaskAssignee) => (
                    <span
                      key={assignee.id}
                      className="inline-flex max-w-full items-center gap-2 rounded-lg border border-indigo-400/15 bg-indigo-400/[0.06] py-1.5 pl-1.5 pr-2 text-[10px] text-indigo-200"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-500/20 text-[8px] font-semibold">
                        {assignee.user.avatar ? (
                          <img
                            src={assignee.user.avatar}
                            alt={assignee.user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          assignee.user.name.charAt(0).toUpperCase()
                        )}
                      </span>
                      <span className="max-w-40 truncate">
                        {assignee.user.name}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleAssignee(assignee)}
                        aria-label={`Remove ${assignee.user.name}`}
                        className="ml-0.5 text-indigo-300/60 transition hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Reviewers */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-2">
                    <CheckCheck className={iconClass} />
                    Reviewers
                  </span>
                </label>

                <span className="text-[10px] text-slate-500">
                  {["de"].length} selected
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0c13]">
                <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-3.5">
                  <Search size={15} className="shrink-0 text-slate-500" />

                  <input
                    placeholder="Search reviewers by name, username or email..."
                    className="h-11 min-w-0 flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-600"
                  />

                  {
                    <button
                      type="button"
                      className="text-slate-500 hover:text-white"
                      aria-label="Clear reviewer search"
                    >
                      <X size={14} />
                    </button>
                  }
                </div>

                <div className="max-h-52 overflow-y-auto p-1.5">
                  {filteredReviewers.length > 0 ? (
                    filteredReviewers.map((user: any) => {
                      const selected = [""].includes("ritik");

                      return (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => {}}
                          className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition ${
                            selected
                              ? "bg-indigo-500/[0.10]"
                              : "hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-[11px] font-semibold text-indigo-200">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              getInitials(user.name)
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-slate-200">
                              {user.name}
                            </p>
                            <p className="mt-1 truncate text-[10px] text-slate-500">
                              @{user.username} · {user.email}
                            </p>
                          </div>

                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                              selected
                                ? "border-indigo-400 bg-indigo-500 text-white"
                                : "border-white/[0.15] text-transparent"
                            }`}
                          >
                            <Check size={12} />
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="px-3 py-8 text-center text-xs text-slate-500">
                      No reviewers found.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.07] px-3.5 py-2.5">
                  <span className="text-[10px] text-slate-500">
                    Select one or more team members
                  </span>

                  {["hey"].length > 0 && (
                    <button
                      type="button"
                      className="text-[10px] font-medium text-indigo-300 hover:text-indigo-200"
                    >
                      Clear selection
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {[].map((user: any) => (
                  <span
                    key={user.id}
                    className="inline-flex max-w-full items-center gap-2 rounded-lg border border-violet-400/15 bg-violet-400/[0.06] py-1.5 pl-1.5 pr-2 text-[10px] text-violet-200"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/20 text-[8px] font-semibold">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </span>

                    <span className="max-w-36 truncate">{user.name}</span>

                    <button
                      type="button"
                      onClick={() => {}}
                      aria-label={`Remove ${user.name} as reviewer`}
                      className="text-violet-300/60 transition hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Labels */}
            <div>
              <label htmlFor="create-task-labels" className={labelClass}>
                Labels{" "}
                <span className="normal-case tracking-normal text-slate-600">
                  (optional)
                </span>
              </label>

              <input
                id="create-task-labels"
                value={labels}
                onChange={(event) => setLabels(event.target.value)}
                placeholder="Frontend, API, Bug..."
                className={inputClass}
              />
              <p className="mt-2 text-[10px] text-slate-600">
                Separate multiple labels with commas.
              </p>
            </div>
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-rose-400/15 bg-rose-400/[0.06] px-3.5 py-3 text-xs leading-5 text-rose-300"
              >
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] bg-[#0c0e16]/95 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="hidden items-center gap-2 text-[10px] text-slate-600 sm:flex">
              <Sparkles size={13} className="text-indigo-300/70" />
              <span>Small steps. Meaningful progress.</span>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="h-10 rounded-xl border border-white/[0.09] px-4 text-xs font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-xs font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCheck size={15} />
                    Create task
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
