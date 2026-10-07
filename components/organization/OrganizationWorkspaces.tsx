"use client";

import {
  ArrowUpRight,
  FolderKanban,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const workspaces = [
  {
    name: "Engineering",
    slug: "engineering",
    description: "Product development and engineering",
    members: 12,
    projects: 5,
    progress: 74,
  },
  {
    name: "Product",
    slug: "product",
    description: "Product strategy and planning",
    members: 7,
    projects: 3,
    progress: 61,
  },
  {
    name: "Design",
    slug: "design",
    description: "Design systems and product experience",
    members: 5,
    projects: 4,
    progress: 82,
  },
];

const OrganizationWorkspaces = () => {
  const params = useParams<{ orgSlug: string }>();

  return (
    <section className="rounded-3xl border border-white/8 bg-white/2.5">
      <div className="flex items-center justify-between gap-4 border-b border-white/6 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-white">Workspaces</h2>
          <p className="mt-1 text-xs text-white/35">
            Teams and working areas inside your organization.
          </p>
        </div>

        <Link
          href={`/org/${params.orgSlug}/workspaces`}
          className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
        >
          View all
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.slug}
            href={`/org/${params.orgSlug}/workspaces/${workspace.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-white/7 bg-white/2 p-5 transition hover:border-indigo-400/15 hover:bg-indigo-500/[0.035]"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/8 blur-3xl transition group-hover:bg-indigo-500/15" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-300">
                  <FolderKanban size={18} />
                </div>

                <button
                  type="button"
                  onClick={(event) => event.preventDefault()}
                  className="cursor-pointer rounded-lg p-1.5 text-white/20 transition hover:bg-white/5 hover:text-white/60"
                >
                  <MoreHorizontal size={17} />
                </button>
              </div>

              <h3 className="mt-5 text-sm font-semibold text-white/85">
                {workspace.name}
              </h3>

              <p className="mt-1.5 min-h-10 text-xs leading-5 text-white/30">
                {workspace.description}
              </p>

              <div className="mt-5 flex items-center gap-4 text-[11px] text-white/35">
                <span className="flex items-center gap-1.5">
                  <Users size={13} />
                  {workspace.members} members
                </span>

                <span>{workspace.projects} projects</span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-[10px]">
                  <span className="text-white/25">Progress</span>
                  <span className="text-white/45">{workspace.progress}%</span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-white/6">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-400"
                    style={{ width: `${workspace.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OrganizationWorkspaces;
