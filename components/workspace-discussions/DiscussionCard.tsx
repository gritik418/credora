import { ArrowUpRight, Eye, MessageCircle, Pin, Tag } from "lucide-react";
import { DiscussionCategory } from "./DiscussionsToolbar";

export interface Discussion {
  id: string;
  title: string;
  description: string;
  author: string;
  initials: string;
  avatarColor: string;
  category: Exclude<DiscussionCategory, "All">;
  tags: string[];
  replies: number;
  views: number;
  time: string;
  pinned: boolean;
  status: "Active" | "Resolved";
}

interface Props {
  discussion: Discussion;
}

const categoryStyles: Record<Discussion["category"], string> = {
  Announcements: "border-amber-400/20 bg-amber-400/8 text-amber-300",
  Engineering: "border-blue-400/20 bg-blue-400/8 text-blue-300",
  Design: "border-pink-400/20 bg-pink-400/8 text-pink-300",
  General: "border-emerald-400/20 bg-emerald-400/8 text-emerald-300",
};

const DiscussionCard = ({ discussion }: Props) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-4 transition duration-200 hover:border-indigo-400/22 hover:bg-[#0e121d] sm:p-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-indigo-400/0 via-indigo-400/0 to-blue-400/0 transition group-hover:via-indigo-400/50" />

      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${discussion.avatarColor} text-xs font-semibold text-white shadow-lg shadow-black/10`}
        >
          {discussion.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md border px-2 py-1 text-[10px] font-medium ${categoryStyles[discussion.category]}`}
            >
              {discussion.category}
            </span>

            {discussion.pinned && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-300/80">
                <Pin size={11} />
                Pinned
              </span>
            )}

            {discussion.status === "Resolved" && (
              <span className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.07] px-2 py-1 text-[10px] text-emerald-300">
                Resolved
              </span>
            )}
          </div>

          <button
            type="button"
            className="mt-3 block text-left"
            onClick={() => {}}
          >
            <h3 className="text-sm font-semibold leading-6 text-slate-100 transition group-hover:text-indigo-200 sm:text-[15px]">
              {discussion.title}
            </h3>
          </button>

          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400 sm:text-[13px]">
            {discussion.description}
          </p>

          {discussion.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {discussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-white/[0.035] px-2 py-1 text-[10px] text-slate-400"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
              <span className="font-medium text-slate-300">
                {discussion.author}
              </span>
              <span className="text-slate-700">·</span>
              <span>{discussion.time}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle size={14} />
                {discussion.replies} replies
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye size={14} />
                {discussion.views}
              </span>
              <ArrowUpRight
                size={15}
                className="ml-auto text-slate-600 transition group-hover:text-indigo-300"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DiscussionCard;
