"use client";

import { FormEvent, useState } from "react";
import {
  ChevronDown,
  Hash,
  MessageSquareText,
  Plus,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { DiscussionCategory } from "./DiscussionsToolbar";

type CreateDiscussionValues = {
  title: string;
  description: string;
  category: Exclude<DiscussionCategory, "All">;
  tags: string[];
};

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (values: CreateDiscussionValues) => void;
}

const categories: Exclude<DiscussionCategory, "All">[] = [
  "General",
  "Announcements",
  "Engineering",
  "Design",
];

const CreateDiscussionModal = ({ open, onClose, onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<Exclude<DiscussionCategory, "All">>("General");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("General");
    setTagsInput("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const normalizedDescription = description.trim();

    if (normalizedTitle.length < 5) {
      setError("Your title must contain at least 5 characters.");
      return;
    }

    if (normalizedDescription.length < 10) {
      setError("Add a little more detail to start the conversation.");
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

    onCreate({
      title: normalizedTitle,
      description: normalizedDescription,
      category,
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
              <MessageSquareText size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Start a discussion
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Share an idea, ask a question, or bring your team together.
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
              htmlFor="discussion-title"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Discussion title
            </label>
            <input
              id="discussion-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
              maxLength={120}
              required
              autoFocus
              placeholder="What would you like to discuss?"
              className="h-12 w-full rounded-xl border border-white/9 bg-[#080b13] px-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
            <p className="mt-1.5 text-right text-[10px] text-slate-600">
              {title.length}/120
            </p>
          </div>

          <div>
            <label
              htmlFor="discussion-description"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Description
            </label>
            <textarea
              id="discussion-description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setError("");
              }}
              maxLength={3000}
              required
              rows={5}
              placeholder="Add context, explain the problem, or share your idea..."
              className="w-full resize-y rounded-xl border border-white/9 bg-[#080b13] px-4 py-3 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
            <p className="mt-1.5 text-right text-[10px] text-slate-600">
              {description.length}/3000
            </p>
          </div>

          <div>
            <label
              htmlFor="discussion-category"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Category
            </label>
            <div className="relative">
              <Hash
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <select
                id="discussion-category"
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value as Exclude<DiscussionCategory, "All">,
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-white/9 bg-[#080b13] pl-10 pr-10 text-sm text-slate-200 outline-none transition focus:border-indigo-400/40"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="discussion-tags"
              className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-300"
            >
              <Tag size={13} />
              Tags
              <span className="font-normal text-slate-600">
                Optional · up to 5
              </span>
            </label>
            <input
              id="discussion-tags"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="e.g. frontend, planning, feedback"
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
              Keep your title clear and your description specific to help
              teammates contribute useful answers.
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
              Create discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;
