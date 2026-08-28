import PostAction from "./PostAction";

type Post = {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    profession: string;
    verified: boolean;
  };
  content: string;
  skills: string[];
  type: string;
  organization: string;
  createdAt: string;
  reactions: number;
  comments: number;
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300">
      <div className="p-5">
        {/* Author */}
        <div className="flex items-start gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-11 w-11 rounded-xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-bold text-slate-900">
                {post.author.name}
              </h3>

              {post.author.verified && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                  ✓
                </span>
              )}
            </div>

            <p className="mt-0.5 truncate text-xs text-slate-500">
              {post.author.profession}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              {post.createdAt} · {post.organization}
            </p>
          </div>

          <button className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
            •••
          </button>
        </div>

        {/* Context */}
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
            {post.type.replace("_", " ")}
          </span>

          <span className="text-[11px] text-slate-400">
            Professional activity
          </span>
        </div>

        {/* Content */}
        <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700">
          {post.content}
        </p>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Verification */}
        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-xs text-emerald-700">
              ✓
            </div>

            <div>
              <p className="text-xs font-semibold text-emerald-800">
                Verified professional activity
              </p>

              <p className="mt-0.5 text-[10px] text-emerald-700/70">
                Confirmed by {post.organization}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
        <span>{post.reactions} reactions</span>
        <span>{post.comments} comments</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 border-t border-slate-100">
        <PostAction icon="♡" label="React" />
        <PostAction icon="◌" label="Comment" />
        <PostAction icon="↗" label="Share" />
      </div>
    </article>
  );
};

export default PostCard;
