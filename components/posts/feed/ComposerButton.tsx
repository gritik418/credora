const ComposerButton = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-800">
      <span className="text-sm text-indigo-500">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default ComposerButton;
