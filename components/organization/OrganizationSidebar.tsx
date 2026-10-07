"use client";

import {
  Activity,
  Building2,
  ChevronDown,
  FolderKanban,
  LayoutGrid,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const OrganizationSidebar = () => {
  const params = useParams<{ orgSlug: string }>();
  const pathname = usePathname();

  const basePath = `/org/${params.orgSlug}`;

  const navigation = [
    {
      label: "Overview",
      href: basePath,
      icon: LayoutGrid,
    },
    {
      label: "Members",
      href: `${basePath}/members`,
      icon: Users,
    },
    {
      label: "Workspaces",
      href: `${basePath}/workspaces`,
      icon: Building2,
    },
    {
      label: "Projects",
      href: `${basePath}/projects`,
      icon: FolderKanban,
    },
    {
      label: "Activity",
      href: `${basePath}/activity`,
      icon: Activity,
    },
  ];

  const isActive = (href: string) => {
    if (href === basePath) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/6 lg:block">
      <div className="flex h-screen flex-col">
        <div className="p-4">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/7 bg-white/2.5 p-3 text-left transition hover:border-white/12 hover:bg-white/4.5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300">
              <Building2 size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white/80">
                {params.orgSlug
                  ?.split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
              <p className="mt-0.5 text-[10px] text-white/30">Organization</p>
            </div>

            <ChevronDown size={15} className="text-white/25" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/25">
            Organization
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "border border-indigo-400/10 bg-indigo-500/10 text-white"
                    : "text-white/45 hover:bg-white/[0.035] hover:text-white/80"
                }`}
              >
                <Icon
                  size={17}
                  className={
                    active
                      ? "text-indigo-300"
                      : "text-white/30 group-hover:text-white/55"
                  }
                />

                <span>{item.label}</span>

                {item.label === "Members" && (
                  <span className="ml-auto rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-white/30">
                    24
                  </span>
                )}
              </Link>
            );
          })}

          <div className="my-5 h-px bg-white/6" />

          <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/25">
            Manage
          </p>

          <Link
            href={`${basePath}/settings`}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              pathname.startsWith(`${basePath}/settings`)
                ? "border border-indigo-400/10 bg-indigo-500/10 text-white"
                : "text-white/45 hover:bg-white/[0.035] hover:text-white/80"
            }`}
          >
            <Settings size={17} className="text-white/30" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="border-t border-white/6 p-4">
          <div className="rounded-2xl border border-indigo-400/10 bg-linear-to-br from-indigo-500/8 via-white/2 to-blue-500/4 p-4">
            <p className="text-xs font-medium text-white/65">
              Organization workspace
            </p>

            <p className="mt-1.5 text-[11px] leading-5 text-white/30">
              Manage your team, projects and work from one place.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrganizationSidebar;
