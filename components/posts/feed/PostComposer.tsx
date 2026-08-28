import ComposerButton from "./ComposerButton";

const PostComposer = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Your avatar"
          className="h-11 w-11 rounded-xl object-cover"
        />

        <button className="flex h-11 flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-left text-sm text-slate-400 transition hover:border-indigo-200 hover:bg-white">
          Share an update, achievement, or project...
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex gap-1">
          <ComposerButton icon="▧" label="Media" />
          <ComposerButton icon="◇" label="Project" />
          <ComposerButton icon="✓" label="Achievement" />
        </div>

        <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600">
          Create post
        </button>
      </div>
    </div>
  );
};

export default PostComposer;
