"use client";

import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import {
  Activity,
  ArrowLeft,
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import WorkspaceSelector from "./WorkspaceSelector";

interface Props {
  mobileOpen: boolean;
  onClose: () => void;
  setIsSwitching: Dispatch<SetStateAction<boolean>>;
}

const WorkspaceSidebar = ({ mobileOpen, onClose, setIsSwitching }: Props) => {
  const pathname = usePathname();
  const workspace = useAppSelector(selectSelectedWorkspace);
  const basePath = `/workspace/${workspace?.slug}`;

  const navigation = [
    {
      label: "Overview",
      href: basePath,
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      href: `${basePath}/projects`,
      icon: FolderKanban,
    },
    {
      label: "Members",
      href: `${basePath}/members`,
      icon: Users,
    },
    {
      label: "Activity",
      href: `${basePath}/activity`,
      icon: Activity,
    },
    {
      label: "Discussions",
      href: `${basePath}/discussions`,
      icon: MessageSquare,
    },
  ];

  const isActive = (href: string) =>
    href === basePath
      ? pathname === basePath
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`group/sidebar fixed inset-y-0 left-0 z-70 flex w-65 flex-col border-r border-(--org-border) bg-[#090b12] transition-[width,transform] duration-300 ease-out lg:w-19 lg:hover:w-65 lg:focus-within:w-65 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-19 shrink-0 items-center justify-between border-b border-white/6 px-5 lg:justify-start lg:gap-4 lg:px-5.5">
          <Link
            href={basePath}
            className="flex min-w-0 items-center gap-3"
            onClick={onClose}
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-950/40">
              <FolderKanban size={19} className="text-white" />
            </div>

            <div className="min-w-0 opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
              <p className="whitespace-nowrap text-sm font-semibold tracking-tight text-white">
                Credora
              </p>
              <p className="whitespace-nowrap text-[11px] text-zinc-500">
                Workspace
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <WorkspaceSelector setIsSwitching={setIsSwitching} />

        <div className="flex-1 overflow-x-hidden overflow-y-auto px-3 py-5">
          <p className="mb-3 whitespace-nowrap px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600 opacity-100 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
            Workspace
          </p>

          <nav className="flex flex-col gap-1">
            {navigation.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  title={label}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex h-11 items-center gap-3 overflow-hidden rounded-xl px-3 transition-colors ${
                    active
                      ? "bg-indigo-500/10 text-white"
                      : "text-zinc-500 hover:bg-white/4 hover:text-zinc-200"
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-2 left-0 top-2 w-0.75 rounded-r-full bg-indigo-400" />
                  )}

                  <Icon
                    size={19}
                    strokeWidth={active ? 2 : 1.7}
                    className={`ml-0.5 size-4.75 shrink-0 ${
                      active ? "text-indigo-300" : ""
                    }`}
                  />

                  <span className="whitespace-nowrap text-[13px] font-medium opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mb-3 mt-8 whitespace-nowrap px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600 opacity-100 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
            Manage
          </div>

          <Link
            href={`${basePath}/settings`}
            title="Settings"
            onClick={onClose}
            className={`flex h-11 items-center gap-3 overflow-hidden rounded-xl px-3 transition-colors ${
              isActive(`${basePath}/settings`)
                ? "bg-indigo-500/10 text-white"
                : "text-zinc-500 hover:bg-white/4 hover:text-zinc-200"
            }`}
          >
            <Settings2 size={19} className="ml-0.5 shrink-0" />
            <span className="whitespace-nowrap text-[13px] font-medium opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
              Settings
            </span>
          </Link>
        </div>

        <div className="shrink-0 border-t border-white/6 p-3">
          <Link
            href="/organizations"
            title="Back to organizations"
            onClick={onClose}
            className="flex h-11 items-center gap-3 overflow-hidden rounded-xl px-3 text-zinc-500 transition-colors hover:bg-white/4 hover:text-zinc-200"
          >
            <ArrowLeft size={18} className="ml-0.5 shrink-0" />
            <span className="whitespace-nowrap text-[13px] font-medium opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
              Organizations
            </span>
          </Link>

          <div className="mt-2 flex h-11 items-center gap-3 overflow-hidden rounded-xl px-3 text-zinc-600">
            <CircleHelp size={18} className="ml-0.5 shrink-0" />
            <span className="whitespace-nowrap text-xs opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
              Help & support
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default WorkspaceSidebar;
