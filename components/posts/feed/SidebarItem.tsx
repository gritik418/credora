const SidebarItem = ({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) => {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg text-base">
        {icon}
      </span>

      {label}
    </button>
  );
};

export default SidebarItem;
