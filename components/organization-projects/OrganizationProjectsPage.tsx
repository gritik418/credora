"use client";

import { selectOrganizationProjects } from "@/features/organization/organization.selectors";
import { useAppSelector } from "@/store/hooks";
import {
  Archive,
  CalendarClock,
  CheckCircle2,
  FolderKanban,
  Layers3,
  Pause,
  Timer,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsToolbar, { ProjectFilter, ProjectView } from "./ProjectsToolbar";
import { ProjectWithWorkspace } from "@/features/organization/organization.interface";
import { ProjectStatus } from "@/features/project/project.interface";

const OrganizationProjectsPage = () => {
  const projects = useAppSelector(selectOrganizationProjects);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("ALL");
  const [view, setView] = useState<ProjectView>("GRID");

  const isOverdue = (project: ProjectWithWorkspace) =>
    project.status !== ProjectStatus.COMPLETED &&
    project.status !== ProjectStatus.ARCHIVED &&
    Boolean(project.dueDate) &&
    new Date(project.dueDate!).getTime() < Date.now();

  const counts = useMemo(
    () => ({
      ALL: projects.length,
      ACTIVE: projects.filter(
        (project) => project.status === ProjectStatus.ACTIVE,
      ).length,
      COMPLETED: projects.filter(
        (project) => project.status === ProjectStatus.COMPLETED,
      ).length,
      PLANNING: projects.filter(
        (project) => project.status === ProjectStatus.PLANNING,
      ).length,
      ARCHIVED: projects.filter(
        (project) => project.status === ProjectStatus.ARCHIVED,
      ).length,
      ON_HOLD: projects.filter(
        (project) => project.status === ProjectStatus.ON_HOLD,
      ).length,
      CANCELLED: projects.filter(
        (project) => project.status === ProjectStatus.CANCELLED,
      ).length,
      OVERDUE: projects.filter(isOverdue).length,
    }),
    [projects],
  );

  const stats = useMemo(
    () => [
      {
        label: "Total projects",
        value: projects.length,
        description: "Across all workspaces",
        icon: Layers3,
        color: "indigo",
      },
      {
        label: "Active projects",
        value: counts.ACTIVE,
        description: "Currently in progress",
        icon: FolderKanban,
        color: "sky",
      },
      {
        label: "Completed",
        value: counts.COMPLETED,
        description: "Successfully finished",
        icon: CheckCircle2,
        color: "emerald",
      },
      {
        label: "Planning",
        value: counts.PLANNING,
        description: "Currently in planning",
        icon: FolderKanban,
        color: "sky",
      },
      {
        label: "Archived",
        value: counts.ARCHIVED,
        description: "Successfully archived",
        icon: Archive,
        color: "gray",
      },
      {
        label: "On Hold",
        value: counts.ON_HOLD,
        description: "Currently on hold",
        icon: Pause,
        color: "yellow",
      },
      {
        label: "Cancelled",
        value: counts.CANCELLED,
        description: "Successfully cancelled",
        icon: XCircle,
        color: "red",
      },
      {
        label: "Overdue",
        value: projects.filter(isOverdue).length,
        description: "Past their due date",
        icon: Timer,
        color: "rose",
      },
    ],
    [projects, counts],
  );

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return projects
      .filter((project) => {
        const status = project.status;

        const matchesFilter = filter === "ALL" || status === filter;

        const matchesSearch =
          !normalizedSearch ||
          project.name.toLowerCase().includes(normalizedSearch) ||
          project.slug.toLowerCase().includes(normalizedSearch) ||
          project.description?.toLowerCase().includes(normalizedSearch);

        return matchesFilter && matchesSearch;
      })
      .sort(
        (first, second) =>
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime(),
      );
  }, [projects, filter, search]);

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-[1600px] space-y-8">
        <ProjectsHeader />

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            const styles: Record<string, string> = {
              indigo: "border-indigo-400/15 bg-indigo-500/10 text-indigo-300",
              sky: "border-sky-400/15 bg-sky-400/10 text-sky-300",
              emerald:
                "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
              rose: "border-rose-400/15 bg-rose-400/10 text-rose-300",
              yellow: "border-yellow-400/15 bg-yellow-400/10 text-yellow-300",
              red: "border-red-400/15 bg-red-400/10 text-red-300",
              gray: "border-gray-400/15 bg-gray-400/10 text-gray-300",
            };

            return (
              <div
                key={stat.label}
                className="org-card flex items-center gap-4 p-4 sm:p-5"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${styles[stat.color]}`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-white/40">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] text-white/30">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="space-y-5">
          <ProjectsToolbar
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
            view={view}
            onViewChange={setView}
            counts={counts}
          />

          {filteredProjects.length > 0 ? (
            <div
              className={
                view === "GRID"
                  ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} view={view} />
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
                  ? "No matching projects"
                  : filter === "ARCHIVED"
                    ? "No archived projects"
                    : filter === "COMPLETED"
                      ? "No completed projects"
                      : "No projects found"}
              </h3>

              <p className="mt-2 max-w-sm text-xs leading-5 text-white/40">
                {search
                  ? "Try another search term or change the selected filter."
                  : "Projects across your organization's workspaces will appear here."}
              </p>

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
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white/70">
                {projects.length}
              </span>{" "}
              projects
            </p>

            <p className="inline-flex items-center gap-1.5 text-[11px] text-white/30">
              <CalendarClock size={12} />
              Project timelines across your organization
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrganizationProjectsPage;
