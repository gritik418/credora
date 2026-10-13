import {
  ArrowRight,
  Bookmark,
  CircleHelp,
  Flame,
  MessageSquareText,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Discussion } from "./DiscussionCard";
import { DiscussionCategory } from "./DiscussionsToolbar";

interface Props {
  discussions: Discussion[];
  onCreate: () => void;
  onSelectCategory: (category: DiscussionCategory) => void;
}

const DiscussionsSidebar = ({
  discussions,
  onCreate,
  onSelectCategory,
}: Props) => {
  const pinned = discussions.filter((discussion) => discussion.pinned);
  const trending = [...discussions]
    .sort((a, b) => b.replies - a.replies)
    .slice(0, 3);

  const categories = [
    { name: "Engineering", count: 0, color: "bg-blue-400" },
    { name: "Design", count: 0, color: "bg-pink-400" },
    { name: "Announcements", count: 0, color: "bg-amber-400" },
    { name: "General", count: 0, color: "bg-emerald-400" },
  ] as const;

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Pinned discussions
          </h2>
          <Bookmark size={16} className="text-amber-300" />
        </div>

        <div className="mt-4 space-y-4">
          {pinned.length ? (
            pinned.map((discussion) => (
              <button
                key={discussion.id}
                type="button"
                onClick={() => onSelectCategory(discussion.category)}
                className="group block w-full text-left"
              >
                <p className="line-clamp-2 text-xs font-medium leading-5 text-slate-300 transition group-hover:text-indigo-200">
                  {discussion.title}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-500">
                  <MessageSquareText size={12} />
                  {discussion.replies} replies
                  <span>·</span>
                  {discussion.author}
                </div>
              </button>
            ))
          ) : (
            <p className="text-xs text-slate-500">No pinned discussions yet.</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Popular topics
          </h2>
          <Flame size={16} className="text-orange-300" />
        </div>

        <div className="mt-4 space-y-1">
          {categories.map((item) => {
            const count = discussions.filter(
              (discussion) => discussion.category === item.name,
            ).length;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  onSelectCategory(
                    item.name as Exclude<DiscussionCategory, "All">,
                  )
                }
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-left transition hover:bg-white/[0.035]"
              >
                <span className="flex items-center gap-2.5 text-xs text-slate-400">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  {item.name}
                </span>
                <span className="text-[11px] text-slate-600">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-5">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-300" />
          <h2 className="text-sm font-semibold text-slate-200">
            Most discussed
          </h2>
        </div>

        <div className="mt-4 space-y-4">
          {trending.map((discussion, index) => (
            <div key={discussion.id} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/4 text-[10px] font-semibold text-slate-400">
                0{index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-medium leading-5 text-slate-300">
                  {discussion.title}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  {discussion.replies} replies
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-linear-to-br from-indigo-500/10 to-violet-500/4 p-5">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
            <MessageSquareText size={17} />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-slate-200">
            Have something to share?
          </h2>
          <p className="mt-1.5 text-xs leading-5 text-slate-400">
            Start a conversation, get feedback, and keep your team aligned.
          </p>

          <button
            type="button"
            onClick={onCreate}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500/15 px-3 py-2.5 text-xs font-semibold text-indigo-200 transition hover:bg-indigo-500/25"
          >
            <Plus size={14} />
            Start a discussion
            <ArrowRight size={13} className="ml-auto" />
          </button>
        </div>
      </section>

      <div className="flex items-start gap-2.5 px-2 py-1 text-[11px] leading-5 text-slate-500">
        <ShieldCheck size={15} className="mt-0.5 shrink-0 text-slate-400" />
        <p>
          Keep conversations constructive and avoid sharing sensitive
          information outside your workspace.
          <span className="mt-1 flex items-center gap-1 text-slate-400">
            <CircleHelp size={11} />
            Workspace guidelines
          </span>
        </p>
      </div>
    </aside>
  );
};

export default DiscussionsSidebar;
