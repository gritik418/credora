"use client";

import { Workspace } from "@/features/workspace/workspace.interface";
import {
  Archive,
  ArrowUpRight,
  Check,
  Circle,
  Clock3,
  FolderKanban,
  MoreHorizontal,
  Pencil,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Props {
  workspace: Workspace;
  view: "GRID" | "LIST";
  onOpen: (workspace: Workspace) => void;
}

const roleStyles: Record<any, string> = {
  OWNER: "border-violet-400/15 bg-violet-400/10 text-violet-300",
  ADMIN: "border-indigo-400/15 bg-indigo-400/10 text-indigo-300",
  MANAGER: "border-sky-400/15 bg-sky-400/10 text-sky-300",
  MEMBER: "border-white/10 bg-white/5 text-white/50",
};

const WorkspaceCard = ({ workspace, view, onOpen }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const updatedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(workspace.updatedAt));

  return (
    <article
      className={`group relative min-w-0 overflow-visible rounded-2xl border border-(--org-border) bg-(--org-surface) transition duration-200 hover:border-white/12 hover:bg-white/2.5 ${
        view === "LIST" ? "flex flex-col sm:flex-row sm:items-center" : ""
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-5 top-0 h-px opacity-70 ${
          view === "GRID" ? "" : "hidden"
        }`}
        style={{
          //   background: `linear-gradient(90deg, transparent, ${workspace.color}, transparent)`,
          background: `linear-gradient(90deg, transparent, transparent)`,
        }}
      />

      <div
        className={`min-w-0 flex-1 p-5 ${
          view === "LIST" ? "sm:flex sm:items-center sm:gap-5" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpen(workspace)}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
              style={
                {
                  // color: workspace.color,
                  // backgroundColor: `${workspace.color}12`,
                  // borderColor: `${workspace.color}30`,
                }
              }
            >
              <FolderKanban size={21} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white/90 transition group-hover:text-white">
                {workspace.name}
              </h3>
              <p className="mt-1 truncate text-[11px] text-white/35">
                /{workspace.slug}
              </p>
            </div>
          </button>

          <div className="relative shrink-0">
            <button
              type="button"
              aria-label="Workspace actions"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/35 transition hover:bg-white/6 hover:text-white"
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close workspace actions"
                  className="fixed inset-0 z-20 cursor-default"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-white/10 bg-[#11131b] p-1.5 shadow-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs text-white/65 transition hover:bg-white/5 hover:text-white"
                  >
                    <Pencil size={14} />
                    Edit workspace
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs text-rose-300/80 transition hover:bg-rose-400/10 hover:text-rose-200"
                  >
                    <Archive size={14} />
                    {workspace.isActive
                      ? "Restore workspace"
                      : "Archive workspace"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <p
          className={`mt-4 text-xs leading-5 text-white/45 ${
            view === "LIST" ? "sm:mt-0 sm:max-w-sm" : "min-h-10"
          }`}
        >
          {workspace.description}
        </p>

        <div
          className={`mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 ${
            view === "LIST" ? "sm:mt-0 sm:ml-auto sm:justify-end" : ""
          }`}
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
            <FolderKanban size={13} className="text-white/30" />
            {2} projects
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
            <Users size={13} className="text-white/30" />
            {4} members
          </span>
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-3 border-t border-(--org-border) px-5 py-3.5 ${
          view === "LIST" ? "sm:w-52 sm:shrink-0 sm:border-l sm:border-t-0" : ""
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-medium ${roleStyles["ADMIN"]}`}
          >
            <Check size={11} />
            {/* {workspace.role.charAt(0) + workspace.role.slice(1).toLowerCase()} */}
          </span>

          <span
            className={`inline-flex items-center gap-1 text-[10px] ${
              workspace.isActive ? "text-white/30" : "text-emerald-300/65"
            }`}
          >
            {workspace.isActive ? (
              <Archive size={11} />
            ) : (
              <Circle size={7} fill="currentColor" />
            )}
            {workspace.isActive ? "Archived" : "Active"}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1 text-[10px] text-white/30 sm:inline-flex">
            <Clock3 size={11} />
            {updatedDate}
          </span>
          <button
            type="button"
            onClick={() => onOpen(workspace)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-white/45 transition hover:border-indigo-400/25 hover:bg-indigo-500/10 hover:text-indigo-300"
            aria-label={`Open ${workspace.name}`}
          >
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default WorkspaceCard;
