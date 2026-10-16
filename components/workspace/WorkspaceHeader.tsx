"use client";

import { selectCurrentUser } from "@/features/auth/auth.selectors";
import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import { Bell, Menu } from "lucide-react";
import ProfileMenu from "../navbar/ProfileMenu";

interface Props {
  onMenuClick: () => void;
}

const WorkspaceHeader = ({ onMenuClick }: Props) => {
  const user = useAppSelector(selectCurrentUser);
  const workspace = useAppSelector(selectSelectedWorkspace);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 flex h-19 items-center justify-between gap-4 border-b border-white/6 bg-[#090b12]/85 px-4 backdrop-blur-2xl sm:px-7 xl:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex cursor-pointer size-10 shrink-0 items-center justify-center rounded-xl border border-white/7 bg-white/2.5 text-zinc-400 transition-colors hover:bg-white/6 hover:text-white lg:hidden"
        >
          <Menu size={19} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <span>Workspace</span>
            <span className="text-zinc-700">/</span>
            <span className="truncate text-zinc-300">Overview</span>
          </div>

          <h1 className="mt-1 truncate text-base font-semibold tracking-tight text-white sm:text-lg">
            {workspace?.name}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-xl border border-white/7 bg-white/2.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-2.25 top-2 size-1.5 rounded-full bg-indigo-400 ring-2 ring-[#090b12]" />
        </button>

        <div className="hidden h-8 w-px bg-white/7 sm:block" />

        <ProfileMenu user={user} />
      </div>
    </header>
  );
};

export default WorkspaceHeader;
