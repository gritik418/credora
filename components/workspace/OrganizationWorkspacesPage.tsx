"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Archive,
  ArrowUpRight,
  FolderKanban,
  Layers3,
  Plus,
  Users,
} from "lucide-react";
import WorkspacesHeader from "./WorkspacesHeader";
import WorkspacesToolbar, {
  WorkspaceFilter,
  WorkspaceView,
} from "./WorkspacesToolbar";
import WorkspaceCard from "./WorkspaceCard";
import CreateWorkspaceModal, {
  CreateWorkspaceInput,
} from "./CreateWorkspaceModal";
import { Workspace } from "@/features/workspace/workspace.interface";

const OrganizationWorkspacesPage = () => {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const organizationSlug = params.slug;

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<WorkspaceFilter>("ALL");
  const [view, setView] = useState<WorkspaceView>("GRID");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null,
  );

  const counts = useMemo(
    () => ({
      ALL: workspaces.length,
      ACTIVE: workspaces.filter((workspace) => workspace.isActive).length,
      ARCHIVED: workspaces.filter((workspace) => !workspace.isActive).length,
    }),
    [workspaces],
  );

  const filteredWorkspaces = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return workspaces
      .filter((workspace) => {
        const matchesFilter =
          filter === "ALL" ||
          (filter === "ACTIVE" && !workspace.isActive) ||
          (filter === "ARCHIVED" && workspace.isActive);

        const matchesSearch =
          !normalizedSearch ||
          workspace.name.toLowerCase().includes(normalizedSearch) ||
          workspace?.description?.toLowerCase().includes(normalizedSearch) ||
          workspace.slug.toLowerCase().includes(normalizedSearch);

        return matchesFilter && matchesSearch;
      })
      .sort(
        (first, second) =>
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime(),
      );
  }, [workspaces, filter, search]);

  const totalProjects = useMemo(
    () =>
      workspaces
        .filter((workspace) => !workspace.isActive)
        .reduce((total, workspace) => total + 0, 0),
    [workspaces],
  );

  const totalMembers = useMemo(
    () =>
      new Set(
        workspaces.filter((workspace) => !workspace.isActive),
        //   .map((workspace) => workspace.memberCount),
      ).size,
    [workspaces],
  );

  const openCreateModal = () => {
    setEditingWorkspace(null);
    setModalOpen(true);
  };

  const openEditModal = (workspace: Workspace) => {
    setEditingWorkspace(workspace);
    setModalOpen(true);
  };

  const handleOpenWorkspace = (workspace: Workspace) => {
    router.push(`/org/${organizationSlug}/workspaces/${workspace.slug}`);
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-[1600px] space-y-8">
        <WorkspacesHeader
          organizationName={organizationSlug}
          onCreate={openCreateModal}
        />

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="org-card flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
              <Layers3 size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40">Total workspaces</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                {counts.ALL}
              </p>
              <p className="mt-1 text-[10px] text-white/30">
                Across this organization
              </p>
            </div>
          </div>

          <div className="org-card flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-300">
              <FolderKanban size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40">Active projects</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                {totalProjects}
              </p>
              <p className="mt-1 text-[10px] text-white/30">
                In active workspaces
              </p>
            </div>
          </div>

          <div className="org-card flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/10 text-violet-300">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40">Workspace members</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                {totalMembers}
              </p>
              <p className="mt-1 text-[10px] text-white/30">
                Distinct membership counts
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <WorkspacesToolbar
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
            view={view}
            onViewChange={setView}
            counts={counts}
          />

          {filteredWorkspaces.length > 0 ? (
            <div
              className={
                view === "GRID"
                  ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {filteredWorkspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  view={view}
                  onOpen={handleOpenWorkspace}
                  onEdit={openEditModal}
                />
              ))}
            </div>
          ) : (
            <div className="org-card flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
                {filter === "ARCHIVED" ? (
                  <Archive size={23} />
                ) : (
                  <FolderKanban size={23} />
                )}
              </div>
              <h3 className="mt-5 text-sm font-semibold text-white">
                {search
                  ? "No matching workspaces"
                  : filter === "ARCHIVED"
                    ? "No archived workspaces"
                    : "Your next workspace starts here"}
              </h3>
              <p className="mt-2 max-w-sm text-xs leading-5 text-white/40">
                {search
                  ? "Try a different search term or change the selected filter."
                  : "Create a workspace to organize projects, invite collaborators, and keep your team's work in one place."}
              </p>
              {!search && filter !== "ARCHIVED" && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="org-primary-button mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-white"
                >
                  <Plus size={15} />
                  Create workspace
                </button>
              )}
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-4 text-xs text-indigo-300 transition hover:text-indigo-200"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 border-t border-(--org-border) pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/35">
              Showing{" "}
              <span className="font-medium text-white/70">
                {filteredWorkspaces.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white/70">
                {workspaces.length}
              </span>{" "}
              workspaces
            </p>

            <p className="inline-flex items-center gap-1.5 text-[11px] text-white/30">
              <ArrowUpRight size={12} />
              Workspaces keep projects and collaboration organized
            </p>
          </div>
        </section>
      </main>

      <CreateWorkspaceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingWorkspace(null);
        }}
        mode={editingWorkspace ? "EDIT" : "CREATE"}
        initialValues={{
          name: "",
          color: "",
          description: "",
        }}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default OrganizationWorkspacesPage;
