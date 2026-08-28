import SidebarItem from "./SidebarItem";

const FeedSidebar = () => {
  return (
    <div className="sticky top-24 space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="h-16 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-500" />

        <div className="px-5 pb-5">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Ritik Gupta"
            className="-mt-7 h-14 w-14 rounded-2xl border-4 border-white object-cover"
          />

          <h2 className="mt-3 font-bold text-slate-900">Ritik Gupta</h2>

          <p className="mt-0.5 text-xs text-slate-500">Full Stack Developer</p>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Profile completion</span>
              <span className="font-semibold text-indigo-600">82%</span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[82%] rounded-full bg-linear-to-r from-indigo-600 to-violet-500" />
            </div>
          </div>
        </div>
      </div>

      <nav className="rounded-2xl border border-slate-200 bg-white p-2">
        <SidebarItem active label="Feed" icon="⌂" />
        <SidebarItem label="My Posts" icon="◉" />
        <SidebarItem label="Connections" icon="◎" />
        <SidebarItem label="Projects" icon="◇" />
        <SidebarItem label="Organizations" icon="▣" />
      </nav>
    </div>
  );
};

export default FeedSidebar;
