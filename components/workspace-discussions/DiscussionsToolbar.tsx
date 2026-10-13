import {
  Megaphone,
  MessageCircle,
  Palette,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";

export type DiscussionCategory =
  | "All"
  | "Announcements"
  | "Engineering"
  | "Design"
  | "General";

export type DiscussionSort = "Latest" | "Most discussed" | "Most viewed";

interface Props {
  category: DiscussionCategory;
  onCategoryChange: (category: DiscussionCategory) => void;
  sort: DiscussionSort;
  onSortChange: (sort: DiscussionSort) => void;
}

const categories = [
  { label: "All", icon: MessageCircle },
  { label: "Announcements", icon: Megaphone },
  { label: "Engineering", icon: Wrench },
  { label: "Design", icon: Palette },
  { label: "General", icon: MessageCircle },
] satisfies {
  label: DiscussionCategory;
  icon: typeof MessageCircle;
}[];

const DiscussionsToolbar = ({
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: Props) => {
  return (
    <div className="space-y-3">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {categories.map((item) => {
          const Icon = item.icon;
          const active = category === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onCategoryChange(item.label)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition ${
                active
                  ? "border-indigo-400/25 bg-indigo-400/12 text-indigo-200"
                  : "border-white/7 bg-[#0c0f18] text-slate-400 hover:border-white/13 hover:text-slate-200"
              }`}
            >
              <Icon size={14} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-3">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <SlidersHorizontal size={13} />
          Sort conversations
        </span>

        <select
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value as DiscussionSort)
          }
          aria-label="Sort discussions"
          className="h-9 rounded-lg border border-white/8 bg-[#0c0f18] px-3 text-xs text-slate-300 outline-none focus:border-indigo-400/40"
        >
          <option>Latest</option>
          <option>Most discussed</option>
          <option>Most viewed</option>
        </select>
      </div>
    </div>
  );
};

export default DiscussionsToolbar;
