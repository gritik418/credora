"use client";

import { FormEvent, useEffect, useState } from "react";
import { FolderKanban, LoaderCircle, X } from "lucide-react";

export interface CreateWorkspaceInput {
  name: string;
  description: string;
  color: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateWorkspaceInput) => void;
  initialValues?: CreateWorkspaceInput;
  mode?: "CREATE" | "EDIT";
}

const colors = [
  "#818cf8",
  "#c084fc",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#fb7185",
];

const CreateWorkspaceModal = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  mode = "CREATE",
}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    setName(initialValues?.name ?? "");
    setDescription(initialValues?.description ?? "");
    setColor(initialValues?.color ?? colors[0]);
    setSubmitting(false);
  }, [open, initialValues]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || submitting) return;

    setSubmitting(true);

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      color,
    });

    setSubmitting(false);
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
                {mode === "EDIT" ? "Edit workspace" : "Create workspace"}
              </h2>
              <p className="mt-1 text-xs text-white/40">
                {mode === "EDIT"
                  ? "Update your workspace details."
                  : "Create a dedicated space for your team's work."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div>
            <label
              htmlFor="workspace-name"
              className="mb-2 block text-xs font-medium text-white/70"
            >
              Workspace name <span className="text-rose-300">*</span>
            </label>
            <input
              id="workspace-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Product Development"
              maxLength={60}
              required
              autoFocus
              className="h-11 w-full rounded-xl border border-white/10 bg-white/2.5 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
            <p className="mt-1.5 text-right text-[10px] text-white/25">
              {name.length}/60
            </p>
          </div>

          <div>
            <label
              htmlFor="workspace-description"
              className="mb-2 block text-xs font-medium text-white/70"
            >
              Description
            </label>
            <textarea
              id="workspace-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What will your team organize here?"
              rows={3}
              maxLength={240}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/2.5 px-3.5 py-3 text-sm leading-5 text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
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
              className="org-secondary-button rounded-xl px-4 py-2.5 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || submitting}
              className="org-primary-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting && (
                <LoaderCircle size={15} className="animate-spin" />
              )}
              {mode === "EDIT" ? "Save changes" : "Create workspace"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;
