const PostAction = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <button className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600">
      <span className="text-base">{icon}</span>
      {label}
    </button>
  );
};

export default PostAction;
