"use client";

import { selectCurrentUser } from "@/features/auth/auth.selectors";
import {
  selectAvailableAssignees,
  selectAvailableReviewers,
  selectSelectedProject,
} from "@/features/project/project.selectors";
import {
  CreateTaskResponseDto,
  TaskPriority,
  TaskStatus,
} from "@/features/task/task.interface";
import CreateTaskDto from "@/features/task/dto/create-task.dto";
import CreateTaskSchema from "@/features/task/schemas/create-task.schema";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CalendarDays,
  CheckCheck,
  ChevronDown,
  CircleDot,
  Flag,
  Layers3,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import MemberMultiSelect, { SelectableMember } from "./MemberMultiSelect";
import { toast } from "react-toastify";
import { useCreateTaskMutation } from "@/features/task/task.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
}

const formatDateInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const CreateTask = ({ open, onClose }: CreateTaskProps) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const user = useAppSelector(selectCurrentUser);
  const availableAssignees = useAppSelector(selectAvailableAssignees);
  const availableReviewers = useAppSelector(selectAvailableReviewers);
  const currentProject = useAppSelector(selectSelectedProject);

  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([]);
  const [selectedReviewerIds, setSelectedReviewerIds] = useState<string[]>([]);
  const [labels, setLabels] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    watch,
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      startDate: formatDateInput(new Date()),
      dueDate: "",
      assignees: [],
      reviewers: [],
      labels: [],
    },
  });

  const title = watch("title") ?? "";
  const startDate = watch("startDate");
  const dueDate = watch("dueDate");
  const priority = watch("priority");

  const assigneeOptions: SelectableMember[] = useMemo(
    () =>
      availableAssignees.map((assignee) => ({
        id: assignee.user.id,
        name: assignee.user.name,
        username: assignee.user.username,
        email: assignee.user.email,
        avatar: assignee.user.avatar ?? null,
      })),
    [availableAssignees],
  );

  const reviewerOptions: SelectableMember[] = useMemo(
    () =>
      availableReviewers.map((reviewer) => ({
        id: reviewer.id,
        name: reviewer.name,
        username: reviewer.username,
        email: reviewer.email,
        avatar: reviewer.avatar ?? null,
      })),
    [availableReviewers],
  );

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    onClose();
  }, [isSubmitting, onClose]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;

    reset({
      title: "",
      description: "",
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      startDate: formatDateInput(new Date()),
      dueDate: "",
      assignees: [],
      reviewers: user?.id ? [user.id] : [],
      labels: [],
    });

    setSelectedAssigneeIds([]);
    setSelectedReviewerIds(user?.id ? [user.id] : []);
    setLabels("");
    setSubmitError("");
  }, [open, reset, user?.id]);

  const handleAssigneeToggle = (member: SelectableMember) => {
    setSelectedAssigneeIds((current) => {
      const next = current.includes(member.id)
        ? current.filter((id) => id !== member.id)
        : [...current, member.id];

      setValue("assignees", next, {
        shouldValidate: true,
        shouldDirty: true,
      });

      return next;
    });
  };

  const handleReviewerToggle = (member: SelectableMember) => {
    setSelectedReviewerIds((current) => {
      const next = current.includes(member.id)
        ? current.filter((id) => id !== member.id)
        : [...current, member.id];

      setValue("reviewers", next, {
        shouldValidate: true,
        shouldDirty: true,
      });

      return next;
    });
  };

  const handleClearAssignees = () => {
    setSelectedAssigneeIds([]);
    setValue("assignees", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleClearReviewers = () => {
    setSelectedReviewerIds([]);
    setValue("reviewers", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCreateTask = async (values: any) => {
    setSubmitError("");

    if (!currentProject) {
      setSubmitError("No project selected. Please select a project.");
      return;
    }

    const parsedLabels = labels
      .split(",")
      .map((label) => label.trim())
      .filter(Boolean);

    const payload = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      status: values.status,
      priority: values.priority,
      startDate:
        values.startDate instanceof Date
          ? values.startDate
          : new Date(`${values.startDate}T00:00:00`),
      dueDate: values.dueDate
        ? values.dueDate instanceof Date
          ? values.dueDate
          : new Date(`${values.dueDate}T00:00:00`)
        : undefined,
      assignees: selectedAssigneeIds,
      reviewers: selectedReviewerIds,
      labels: parsedLabels,
    } as unknown as CreateTaskDto;

    try {
      const result = await createTask({
        projectId: currentProject.id,
        data: payload,
      }).unwrap();

      if (result.success) {
        toast.success(result.message || "Location info added successfully.");
        handleClose();
      } else {
        toast.error(result.message || "Failed to add location info.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as CreateTaskResponseDto;

        if (response.errors) {
          Object.entries(response.errors).forEach(([field, message]) => {
            if (message) {
              setError(field as keyof CreateTaskDto, {
                type: "server",
                message,
              });
            }
          });
        } else {
          toast.error(response.message || "Something went wrong.");
        }
        return;
      }

      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  if (!open || !currentProject) return null;

  const inputClass =
    "h-11 w-full rounded-xl border border-white/8 bg-[#0a0c13] px-3.5 text-[13px] text-slate-200 outline-none transition placeholder:text-slate-600 hover:border-white/14 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10";

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

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        className="relative flex max-h-[92dvh] w-full max-w-170 flex-col overflow-hidden rounded-2xl border border-white/9 bg-[#0d0f17] shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:rounded-3xl"
      >
        <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-indigo-500/12 blur-[100px]" />
        <div className="pointer-events-none absolute -left-24 top-40 h-56 w-56 rounded-full bg-violet-500/7 blur-[90px]" />

        <form
          onSubmit={handleSubmit(handleCreateTask)}
          noValidate
          className="relative flex min-h-0 flex-1 flex-col"
        >
          <div className="flex items-center justify-between border-b border-white/7 px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300 shadow-inner shadow-indigo-400/5">
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
                  <span className="rounded-md border border-indigo-400/20 bg-indigo-400/8 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-indigo-300">
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
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/7 text-slate-500 transition hover:border-white/14 hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              <X size={17} />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            {submitError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/7 p-3.5 text-sm text-rose-200"
              >
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0 text-rose-300"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-medium">Couldn’t create task</p>
                  <p className="mt-1 wrap-break-word text-xs leading-5 text-rose-200/80">
                    {submitError}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitError("")}
                  aria-label="Dismiss error"
                  className="text-rose-200/60 hover:text-rose-100"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            <div>
              <label htmlFor="create-task-name" className={labelClass}>
                Task title <span className="text-rose-400">*</span>
              </label>

              <input
                {...register("title")}
                id="create-task-name"
                autoFocus
                maxLength={200}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={
                  errors.title ? "create-task-title-error" : undefined
                }
                placeholder="e.g. Build the authentication flow"
                className={`${inputClass} h-12.5 text-sm font-medium text-white placeholder:font-normal ${
                  errors.title
                    ? "border-rose-400/60 focus:border-rose-400/60 focus:ring-rose-500/10"
                    : ""
                }`}
              />

              <div className="mt-2 flex items-start justify-between gap-3">
                {errors.title ? (
                  <p
                    id="create-task-title-error"
                    role="alert"
                    className="text-xs text-rose-300"
                  >
                    {String(errors.title.message)}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-600">
                    Make it clear and easy to understand.
                  </p>
                )}

                <span className="shrink-0 text-[10px] tabular-nums text-slate-600">
                  {title.length}/200
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="create-task-description" className={labelClass}>
                Description
              </label>

              <textarea
                {...register("description")}
                id="create-task-description"
                rows={3}
                maxLength={3000}
                aria-invalid={Boolean(errors.description)}
                placeholder="Add context, requirements, or acceptance criteria..."
                className={`w-full resize-y rounded-xl border bg-[#0a0c13] px-3.5 py-3 text-[13px] leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 hover:border-white/14 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10 ${
                  errors.description ? "border-rose-400/60" : "border-white/8"
                }`}
              />

              {errors.description && (
                <p role="alert" className="mt-2 text-xs text-rose-300">
                  {String(errors.description.message)}
                </p>
              )}
            </div>

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
                    {...register("status")}
                    id="create-task-status"
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

                {errors.status && (
                  <p role="alert" className="mt-2 text-xs text-rose-300">
                    {String(errors.status.message)}
                  </p>
                )}
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
                    {...register("priority")}
                    id="create-task-priority"
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

                {errors.priority && (
                  <p role="alert" className="mt-2 text-xs text-rose-300">
                    {String(errors.priority.message)}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className={`${labelClass} mb-0`}>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className={iconClass} />
                    Schedule
                  </span>
                </label>

                <span className="text-[10px] text-slate-600">Optional</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/7 bg-white/15 p-3.5">
                  <label
                    htmlFor="create-task-start-date"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Start date
                  </label>

                  <input
                    id="create-task-start-date"
                    type="date"
                    {...register("startDate")}
                    max={dueDate || undefined}
                    aria-invalid={Boolean(errors.startDate)}
                    className={`${inputClass} scheme-dark px-2.5 text-xs ${
                      errors.startDate ? "border-rose-400/60" : ""
                    }`}
                  />

                  {errors.startDate && (
                    <p
                      role="alert"
                      className="mt-2 text-[11px] leading-4 text-rose-300"
                    >
                      {String(errors.startDate.message)}
                    </p>
                  )}

                  {!errors.startDate && (
                    <p className="mt-2 text-[10px] leading-4 text-slate-600">
                      When work should begin.
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-white/7 bg-white/15 p-3.5">
                  <label
                    htmlFor="create-task-due-date"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Due date
                  </label>

                  <input
                    id="create-task-due-date"
                    type="date"
                    {...register("dueDate")}
                    min={startDate || undefined}
                    aria-invalid={Boolean(errors.dueDate)}
                    className={`${inputClass} scheme-dark px-2.5 text-xs ${
                      errors.dueDate ? "border-rose-400/60" : ""
                    }`}
                  />

                  {errors.dueDate && (
                    <p
                      role="alert"
                      className="mt-2 text-[11px] leading-4 text-rose-300"
                    >
                      {String(errors.dueDate.message)}
                    </p>
                  )}

                  {!errors.dueDate && (
                    <p className="mt-2 text-[10px] leading-4 text-slate-600">
                      When the task should be completed.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <MemberMultiSelect
                label="Assignees"
                description="People responsible for completing this task."
                members={assigneeOptions}
                selectedIds={selectedAssigneeIds}
                onToggle={handleAssigneeToggle}
                onClear={handleClearAssignees}
                accent="indigo"
                error={
                  errors.assignees?.message
                    ? String(errors.assignees.message)
                    : undefined
                }
              />

              <div className="h-px bg-white/6" />

              <MemberMultiSelect
                label="Reviewers"
                description="People who will review and approve the work."
                members={reviewerOptions}
                selectedIds={selectedReviewerIds}
                onToggle={handleReviewerToggle}
                onClear={handleClearReviewers}
                accent="violet"
                error={
                  errors.reviewers?.message
                    ? String(errors.reviewers.message)
                    : undefined
                }
              />
            </div>

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
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/7 bg-[#0c0e16]/95 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="hidden items-center gap-2 text-[10px] text-slate-600 sm:flex">
              <Sparkles size={13} className="text-indigo-300/70" />
              <span>Small steps. Meaningful progress.</span>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="h-10 rounded-xl border border-white/9 px-4 text-xs font-medium text-slate-300 transition hover:bg-white/4 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 text-xs font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting || isLoading ? (
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
