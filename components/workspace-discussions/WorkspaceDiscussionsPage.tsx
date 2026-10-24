"use client";

import { useMemo, useState } from "react";
import { MessageSquareText, Plus, Search, Sparkles } from "lucide-react";
import DiscussionsToolbar, {
  DiscussionCategory,
  DiscussionSort,
} from "./DiscussionsToolbar";
import DiscussionCard, { Discussion } from "./DiscussionCard";
import DiscussionsSidebar from "./DiscussionsSidebar";
import CreateDiscussionModal from "./CreateDiscussionModal";

const initialDiscussions: Discussion[] = [
  {
    id: "1",
    title: "How should we structure the next release?",
    description:
      "Let's align on the release scope, milestones, and ownership before we start implementation. Share any blockers or dependencies we should account for.",
    author: "Ritik Gupta",
    initials: "RG",
    avatarColor: "from-indigo-500 to-violet-500",
    category: "Announcements",
    tags: ["Release", "Planning"],
    replies: 12,
    views: 148,
    time: "18 min ago",
    pinned: true,
    status: "Active",
  },
  {
    id: "2",
    title: "Proposed API response structure for projects",
    description:
      "I've drafted a consistent response format for project endpoints, including pagination metadata and standardized error responses. Would love a review before we finalize it.",
    author: "Aarav Sharma",
    initials: "AS",
    avatarColor: "from-sky-500 to-cyan-500",
    category: "Engineering",
    tags: ["API", "Backend", "Review"],
    replies: 8,
    views: 96,
    time: "42 min ago",
    pinned: true,
    status: "Active",
  },
  {
    id: "3",
    title: "Feedback on the new workspace experience",
    description:
      "The updated workspace layout is ready for feedback. I'm especially interested in navigation clarity, the members screen, and how we surface important actions.",
    author: "Priya Verma",
    initials: "PV",
    avatarColor: "from-pink-500 to-rose-500",
    category: "Design",
    tags: ["UX", "Feedback"],
    replies: 15,
    views: 213,
    time: "2 hours ago",
    pinned: false,
    status: "Active",
  },
  {
    id: "4",
    title: "A few conventions for pull requests",
    description:
      "Sharing some lightweight conventions to make reviews easier: smaller PRs, clear descriptions, screenshots for UI changes, and linking the related task.",
    author: "Kabir Singh",
    initials: "KS",
    avatarColor: "from-amber-500 to-orange-500",
    category: "Engineering",
    tags: ["Git", "Code Review"],
    replies: 4,
    views: 67,
    time: "Yesterday",
    pinned: false,
    status: "Active",
  },
  {
    id: "5",
    title: "Welcome to the new team members!",
    description:
      "A warm welcome to everyone joining the workspace. Introduce yourself, share what you're working on, and let us know where you'd like to contribute.",
    author: "Ananya Mehta",
    initials: "AM",
    avatarColor: "from-emerald-500 to-teal-500",
    category: "General",
    tags: ["Welcome", "Team"],
    replies: 6,
    views: 82,
    time: "2 days ago",
    pinned: false,
    status: "Active",
  },
];

const WorkspaceDiscussionsPage = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<DiscussionCategory>("All");
  const [sort, setSort] = useState<DiscussionSort>("Latest");
  const [createOpen, setCreateOpen] = useState(false);

  const filteredDiscussions = useMemo(() => {
    const result = discussions.filter((discussion) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        discussion.title.toLowerCase().includes(query) ||
        discussion.description.toLowerCase().includes(query) ||
        discussion.author.toLowerCase().includes(query) ||
        discussion.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        category === "All" || discussion.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "Most discussed") {
      return result.sort((a, b) => b.replies - a.replies);
    }

    if (sort === "Most viewed") {
      return result.sort((a, b) => b.views - a.views);
    }

    return result.sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [discussions, search, category, sort]);

  const handleCreateDiscussion = (values: {
    title: string;
    description: string;
    category: Exclude<DiscussionCategory, "All">;
    tags: string[];
  }) => {
    const newDiscussion: Discussion = {
      id: crypto.randomUUID(),
      ...values,
      author: "Ritik Gupta",
      initials: "RG",
      avatarColor: "from-indigo-500 to-violet-500",
      replies: 0,
      views: 1,
      time: "Just now",
      pinned: false,
      status: "Active",
    };

    setDiscussions((current) => [newDiscussion, ...current]);
    setCategory("All");
    setSort("Latest");
    setSearch("");
    setCreateOpen(false);
  };

  const activeCount = discussions.filter(
    (discussion) => discussion.status === "Active",
  ).length;

  const pinnedCount = discussions.filter(
    (discussion) => discussion.pinned,
  ).length;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#080a10] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-375 space-y-7">
        <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-indigo-500/11 via-[#0c0f18] to-violet-500/6 p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-indigo-500/12 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 right-1/3 h-48 w-48 rounded-full bg-violet-500/8 blur-[80px]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
                <MessageSquareText size={14} />
                Team collaboration
              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Workspace discussions
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                A shared space for ideas, decisions, questions, and updates.
                Keep important conversations connected to your team's work.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300">
                  {discussions.length} discussions
                </span>
                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/6 px-3 py-1.5 text-xs text-emerald-300">
                  {activeCount} active
                </span>
                <span className="rounded-full border border-amber-400/15 bg-amber-400/6 px-3 py-1.5 text-xs text-amber-300">
                  {pinnedCount} pinned
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              <Plus size={17} />
              New discussion
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <section className="min-w-0 space-y-4">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search discussions, topics, or people..."
                className="h-12 w-full rounded-xl border border-white/8 bg-[#0c0f18] pl-11 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            <DiscussionsToolbar
              category={category}
              onCategoryChange={setCategory}
              sort={sort}
              onSortChange={setSort}
            />

            <div className="flex items-center justify-between gap-3 px-1">
              <div>
                <h2 className="text-sm font-semibold text-slate-200">
                  {category === "All" ? "All conversations" : category}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {filteredDiscussions.length}{" "}
                  {filteredDiscussions.length === 1
                    ? "discussion"
                    : "discussions"}{" "}
                  found
                </p>
              </div>

              <div className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
                <Sparkles size={14} className="text-indigo-300" />
                Team knowledge, in one place
              </div>
            </div>

            <div className="space-y-3">
              {filteredDiscussions.length ? (
                filteredDiscussions.map((discussion) => (
                  <DiscussionCard key={discussion.id} discussion={discussion} />
                ))
              ) : (
                <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0c0f18] px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-slate-500">
                    <MessageSquareText size={21} />
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-slate-200">
                    No discussions found
                  </h3>
                  <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                    Try a different search or category, or start a new
                    conversation with your team.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCreateOpen(true)}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-400/8 px-3 py-2 text-xs font-medium text-indigo-300 transition hover:bg-indigo-400/14"
                  >
                    <Plus size={14} />
                    Start a discussion
                  </button>
                </div>
              )}
            </div>
          </section>

          <DiscussionsSidebar
            discussions={discussions}
            onCreate={() => setCreateOpen(true)}
            onSelectCategory={setCategory}
          />
        </div>
      </div>

      <CreateDiscussionModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateDiscussion}
      />
    </div>
  );
};

export default WorkspaceDiscussionsPage;
