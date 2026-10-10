"use client";

import {
  Activity,
  Building2,
  FolderKanban,
  LayoutGrid,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import OrganizationSelector from "./OrganizationSelector";
import { useAppSelector } from "@/store/hooks";
import { selectOrganizationMembers } from "@/features/organization-member/organization-member.selectors";

const OrganizationSidebar = () => {
  const params = useParams<{ slug: string }>();
  const pathname = usePathname();

  const organizationMembers = useAppSelector(selectOrganizationMembers);

  const basePath = `/org/${params.slug}`;

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

  console.log(organizationMembers);

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/6 lg:block">
      <div className="flex h-screen flex-col">
        <OrganizationSelector />

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
                    {organizationMembers.length}
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
