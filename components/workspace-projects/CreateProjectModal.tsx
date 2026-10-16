"use client";

import CreateProjectDto from "@/features/project/dto/create-project.dto";
import { useCreateProjectMutation } from "@/features/project/project.api";
import { CreateProjectResponseDto } from "@/features/project/project.interface";
import CreateProjectSchema from "@/features/project/schemas/create-project.schema";
import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CalendarDays, FolderKanban, Plus, Sparkles, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

interface Props {
  open: boolean;
  onClose: () => void;
}

type CreateProjectInput = z.input<typeof CreateProjectSchema>;
type CreateProjectOutput = z.output<typeof CreateProjectSchema>;

const CreateProjectModal = ({ open, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const workspace = useAppSelector(selectSelectedWorkspace);

  const {
    watch,
    register,
    setError,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateProjectInput, unknown, CreateProjectOutput>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      dueDate: undefined,
    },
    mode: "onChange",
    resolver: zodResolver(CreateProjectSchema),
  });

  const startDate = new Date(watch("startDate") as string)
    .toISOString()
    .split("T")[0];

  const projectName = watch("name");

  const handleClose = () => {
    onClose();
  };

  const handleCreateProject = async (data: CreateProjectDto) => {
    try {
      if (!workspace?.id) return;
      const result = await createProject({
        data,
        workspaceId: workspace.id,
      }).unwrap();

      if (result.success) {
        toast.success(result.message || "Project created successfully.");
        onClose();
      } else {
        toast.error(result.message || "Failed to create project.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as CreateProjectResponseDto;

        if (response.errors && Object.entries(response.errors).length) {
          Object.entries(response.errors).forEach(([field, message]) => {
            if (message) {
              setError(field as keyof CreateProjectDto, {
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

  useEffect(() => {
    if (projectName.trim()) {
      setValue("slug", projectName.toLowerCase().trim().replaceAll(/ /g, "-"));
    }
  }, [projectName]);

  if (!open || !workspace) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="relative my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f18] shadow-[0_25px_100px_rgba(0,0,0,0.65)]">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/12 blur-[75px]" />

        <div className="relative flex items-start justify-between border-b border-white/7 p-5 sm:p-6">
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
            className="rounded-lg cursor-pointer border border-white/6 p-2 text-slate-500 transition hover:bg-white/6 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateProject)}
          className="relative space-y-5 p-5 sm:p-6"
        >
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Project name
            </label>
            <input
              {...register("name")}
              id="project-name"
              placeholder="e.g. Customer dashboard"
              maxLength={100}
              autoFocus
              className="h-12 w-full rounded-xl border border-white/9 bg-[#080b13] px-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-rose-300">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="project-slug"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Project slug
            </label>
            <input
              {...register("slug")}
              id="project-slug"
              placeholder="e.g. customer-dashboard"
              maxLength={100}
              className="h-12 w-full rounded-xl border border-white/9 bg-[#080b13] px-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
            {errors.slug && (
              <p className="mt-1 text-xs text-rose-300">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              id="project-description"
              placeholder="What are you building, and what outcome do you want?"
              rows={4}
              maxLength={1000}
              className="w-full resize-y rounded-xl border border-white/9 bg-[#080b13] px-4 py-3 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
            <p className="mt-1 text-right text-[10px] text-slate-600">
              {watch("description")?.length}/1000
            </p>

            {errors.description && (
              <p className="mt-1 text-xs text-rose-300">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex-1">
              <label
                htmlFor="project-start-date"
                className="mb-2 block text-xs font-medium text-slate-300"
              >
                Start date
              </label>
              <div className="relative">
                <CalendarDays
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  {...register("startDate")}
                  id="project-start-date"
                  type="date"
                  value={startDate}
                  className="h-11 w-full min-w-0 rounded-xl border border-white/9 bg-[#080b13] pl-9 pr-2 text-sm text-slate-300 outline-none transition focus:border-indigo-400/40 scheme-dark"
                />
              </div>

              {errors.startDate && (
                <p className="mt-1 text-xs text-rose-300">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="flex-1">
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
                  {...register("dueDate")}
                  id="project-due-date"
                  type="date"
                  className="h-11 w-full min-w-0 rounded-xl border border-white/9 bg-[#080b13] pl-9 pr-2 text-sm text-slate-300 outline-none transition focus:border-indigo-400/40 scheme-dark"
                />
              </div>

              {errors.dueDate && (
                <p className="mt-1 text-xs text-rose-300">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

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
              className="h-11 cursor-pointer rounded-xl border border-white/9 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex cursor-pointer h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
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
