"use client";

import { selectSelectedOrganization } from "@/features/organization/organization.selectors";
import CreateWorkspaceDto from "@/features/workspace/dto/create-workspace.dto";
import CreateWorkspaceSchema from "@/features/workspace/schemas/create-workspace.schema";
import { useCreateWorkspaceMutation } from "@/features/workspace/workspace.api";
import { CreateWorkspaceResponseDto } from "@/features/workspace/workspace.interface";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FolderKanban, LoaderCircle, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

interface Props {
  open: boolean;
  onClose: () => void;
}

const colors = [
  "#818cf8",
  "#c084fc",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#fb7185",
];

type CreateWorkspaceInputDto = z.input<typeof CreateWorkspaceSchema>;
type CreateWorkspaceOutputDto = z.output<typeof CreateWorkspaceSchema>;

const CreateWorkspaceModal = ({ open, onClose }: Props) => {
  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();
  const [color, setColor] = useState(colors[0]);
  const selectedOrganization = useAppSelector(selectSelectedOrganization);

  const {
    register,
    watch,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateWorkspaceInputDto, undefined, CreateWorkspaceOutputDto>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      logo: "",
    },
    mode: "onChange",
    resolver: zodResolver(CreateWorkspaceSchema),
  });

  if (!open || !selectedOrganization) return null;

  const handleCreateWorkspace = async (data: CreateWorkspaceDto) => {
    try {
      const result = await createWorkspace({
        data,
        orgId: selectedOrganization.id,
      }).unwrap();

      if (result.success) {
        toast.success(result.message || "Workspace created successfully.");
        reset();
        onClose();
      } else {
        toast.error(result.message || "Failed to create workspace.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as CreateWorkspaceResponseDto;

        if (response.errors) {
          Object.entries(response.errors).forEach(([field, message]) => {
            if (message) {
              setError(field as keyof CreateWorkspaceDto, {
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

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="workspace-modal-title"
        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0d1018] shadow-2xl shadow-black/50"
      >
        <div className="flex items-start justify-between border-b border-white/[0.07] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl border"
              style={{
                color,
                backgroundColor: `${color}15`,
                borderColor: `${color}35`,
              }}
            >
              <FolderKanban size={20} />
            </div>
            <div>
              <h2
                id="workspace-modal-title"
                className="text-base font-semibold text-white"
              >
                Create workspace
              </h2>
              <p className="mt-1 text-xs text-white/40">
                Create a dedicated space for your team's work.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateWorkspace)}
          className="space-y-5 p-5 sm:p-6"
        >
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="workspace-name"
                className="mb-2 block text-xs font-medium text-white/70"
              >
                Workspace name <span className="text-rose-300">*</span>
              </label>

              <p className="mt-1.5 text-right text-[10px] text-white/25">
                {watch().name.length}/60
              </p>
            </div>

            <input
              {...register("name")}
              id="workspace-name"
              placeholder="e.g. Product Development"
              maxLength={60}
              autoFocus
              className="h-11 w-full rounded-xl border border-white/10 bg-white/2.5 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-rose-300">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="workspace-slug"
                className="mb-2 block text-xs font-medium text-white/70"
              >
                Workspace slug <span className="text-rose-300">*</span>
              </label>

              <p className="mt-1.5 text-right text-[10px] text-white/25">
                {watch().slug.length}/60
              </p>
            </div>

            <input
              {...register("slug")}
              type="text"
              id="workspace-slug"
              placeholder="e.g. product-development"
              maxLength={60}
              className="h-11 w-full rounded-xl border border-white/10 bg-white/2.5 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />

            {errors.slug && (
              <p className="mt-1 text-xs text-rose-300">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="workspace-logo"
              className="mb-2 block text-xs font-medium text-white/70"
            >
              Workspace logo
            </label>
            <input
              {...register("logo")}
              id="workspace-logo"
              placeholder="Paste logo URL"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/2.5 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />

            {errors.logo && (
              <p className="mt-1 text-xs text-rose-300">
                {errors.logo.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="workspace-description"
              className="mb-2 block text-xs font-medium text-white/70"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              id="workspace-description"
              placeholder="What will your team organize here?"
              rows={3}
              maxLength={240}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/2.5 px-3.5 py-3 text-sm leading-5 text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />

            {errors.description && (
              <p className="mt-1 text-xs text-rose-300">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <span className="mb-3 block text-xs font-medium text-white/70">
              Workspace color
            </span>
            <div className="flex flex-wrap gap-3">
              {colors.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-label={`Select color ${option}`}
                  aria-pressed={color === option}
                  onClick={() => setColor(option)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                    color === option
                      ? "border-white/50 ring-2 ring-white/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  style={{ backgroundColor: `${option}25` }}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: option }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="org-secondary-button cursor-pointer rounded-xl px-4 py-2.5 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="org-primary-button cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {(isSubmitting || isLoading) && (
                <LoaderCircle size={15} className="animate-spin" />
              )}
              Create workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;
