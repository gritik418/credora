"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  FolderKanban,
  LayoutGrid,
  List,
  Plus,
  Sparkles,
} from "lucide-react";
import ProjectsStats from "./ProjectsStats";
import ProjectsToolbar, { ProjectStatusFilter } from "./ProjectsToolbar";
import ProjectCard, { WorkspaceProject } from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";

const initialProjects: WorkspaceProject[] = [
  {
    id: "1",
    name: "Credora Platform",
    description:
      "Build a professional identity platform with verified work history, organization workspaces, and career insights.",
    code: "CRD-01",
    status: "In progress",
    priority: "High",
    progress: 68,
    completedTasks: 34,
    totalTasks: 50,
    members: [
      { initials: "RG", color: "from-indigo-500 to-violet-500" },
      { initials: "AS", color: "from-sky-500 to-cyan-500" },
      { initials: "PV", color: "from-pink-500 to-rose-500" },
      { initials: "KS", color: "from-amber-500 to-orange-500" },
    ],
    dueDate: "Oct 28, 2026",
    tags: ["Product", "Web app"],
    updatedAt: "Updated 12 min ago",
    accent: "from-indigo-500/15 via-violet-500/[0.04] to-transparent",
  },
  {
    id: "2",
    name: "API Infrastructure",
    description:
      "Standardize API responses, improve service reliability, and strengthen authentication and access control.",
    code: "API-12",
    status: "In progress",
    priority: "Urgent",
    progress: 42,
    completedTasks: 21,
    totalTasks: 50,
    members: [
      { initials: "AS", color: "from-sky-500 to-cyan-500" },
      { initials: "RG", color: "from-indigo-500 to-violet-500" },
    ],
    dueDate: "Oct 22, 2026",
    tags: ["Backend", "Infrastructure"],
    updatedAt: "Updated 35 min ago",
    accent: "from-blue-500/15 via-cyan-500/[0.04] to-transparent",
  },
  {
    id: "3",
    name: "Design System",
    description:
      "Create reusable components, consistent design tokens, and accessible interaction patterns across Credora.",
    code: "DSN-08",
    status: "In progress",
    priority: "Medium",
    progress: 76,
    completedTasks: 19,
    totalTasks: 25,
    members: [
      { initials: "PV", color: "from-pink-500 to-rose-500" },
      { initials: "AM", color: "from-emerald-500 to-teal-500" },
      { initials: "RG", color: "from-indigo-500 to-violet-500" },
    ],
    dueDate: "Nov 04, 2026",
    tags: ["Design", "Frontend"],
    updatedAt: "Updated 2 hours ago",
    accent: "from-fuchsia-500/15 via-pink-500/[0.04] to-transparent",
  },
  {
    id: "4",
    name: "Member Analytics",
    description:
      "Build workspace analytics for project velocity, task completion, member activity, and delivery trends.",
    code: "ANL-04",
    status: "Planning",
    priority: "Medium",
    progress: 12,
    completedTasks: 3,
    totalTasks: 25,
    members: [
      { initials: "RG", color: "from-indigo-500 to-violet-500" },
      { initials: "KS", color: "from-amber-500 to-orange-500" },
    ],
    dueDate: "Nov 12, 2026",
    tags: ["Analytics", "Insights"],
    updatedAt: "Updated yesterday",
    accent: "from-emerald-500/15 via-teal-500/[0.04] to-transparent",
  },
  {
    id: "5",
    name: "Notification Center",
    description:
      "Introduce in-app notifications for task updates, workspace invitations, mentions, and project activity.",
    code: "NTF-06",
    status: "Completed",
    priority: "Low",
    progress: 100,
    completedTasks: 18,
    totalTasks: 18,
    members: [
      { initials: "AS", color: "from-sky-500 to-cyan-500" },
      { initials: "AM", color: "from-emerald-500 to-teal-500" },
    ],
    dueDate: "Oct 08, 2026",
    tags: ["Backend", "Product"],
    updatedAt: "Completed Oct 08",
    accent: "from-emerald-500/15 via-green-500/[0.04] to-transparent",
  },
  {
    id: "6",
    name: "Workspace Onboarding",
    description:
      "Streamline the new member journey with organization setup, workspace selection, and guided onboarding.",
    code: "ONB-03",
    status: "On hold",
    priority: "Low",
    progress: 30,
    completedTasks: 6,
    totalTasks: 20,
    members: [
      { initials: "PV", color: "from-pink-500 to-rose-500" },
      { initials: "KS", color: "from-amber-500 to-orange-500" },
    ],
    dueDate: "Nov 18, 2026",
    tags: ["UX", "Frontend"],
    updatedAt: "Updated 3 days ago",
    accent: "from-amber-500/15 via-orange-500/[0.04] to-transparent",
  },
];

const WorkspaceProjectsPage = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatusFilter>("All projects");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [createOpen, setCreateOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.code.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesStatus =
        status === "All projects" || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const handleCreateProject = (values: {
    name: string;
    description: string;
    priority: WorkspaceProject["priority"];
    dueDate: string;
    tags: string[];
  }) => {
    const project: WorkspaceProject = {
      id: crypto.randomUUID(),
      ...values,
      code: `PRJ-${String(projects.length + 1).padStart(2, "0")}`,
      status: "Planning",
      progress: 0,
      completedTasks: 0,
      totalTasks: 0,
      members: [{ initials: "RG", color: "from-indigo-500 to-violet-500" }],
      updatedAt: "Created just now",
      accent: "from-indigo-500/15 via-violet-500/[0.04] to-transparent",
    };

    setProjects((current) => [project, ...current]);
    setSearch("");
    setStatus("All projects");
    setView("grid");
    setCreateOpen(false);
  };

  const activeCount = projects.filter(
    (project) => project.status === "In progress",
  ).length;

  const completedCount = projects.filter(
    (project) => project.status === "Completed",
  ).length;

  const totalTasks = projects.reduce(
    (total, project) => total + project.totalTasks,
    0,
  );

  const completedTasks = projects.reduce(
    (total, project) => total + project.completedTasks,
    0,
  );

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#080a10] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-indigo-500/11 via-[#0c0f18] to-blue-500/5 p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/12 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-violet-500/8 blur-[80px]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
                <FolderKanban size={14} />
                Workspace management
              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Projects
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Plan work, track progress, and keep every project moving forward
                with your team.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300">
                  {projects.length} total projects
                </span>
                <span className="rounded-full border border-indigo-400/15 bg-indigo-400/6 px-3 py-1.5 text-xs text-indigo-300">
                  {activeCount} in progress
                </span>
                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/6 px-3 py-1.5 text-xs text-emerald-300">
                  {completedCount} completed
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              <Plus size={17} />
              Create project
            </button>
          </div>
        </section>

        <ProjectsStats
          total={projects.length}
          active={activeCount}
          completed={completedCount}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
        />

        <section className="space-y-5">
          <ProjectsToolbar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            resultCount={filteredProjects.length}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-200">
                All projects
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Explore projects and their current progress.
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-white/8 bg-[#0c0f18] p-1">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                className={`rounded-lg p-2 transition ${
                  view === "grid"
                    ? "bg-indigo-400/15 text-indigo-300"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                <LayoutGrid size={17} />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
                className={`rounded-lg p-2 transition ${
                  view === "list"
                    ? "bg-indigo-400/15 text-indigo-300"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                <List size={17} />
              </button>
            </div>
          </div>

          {filteredProjects.length ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} view={view} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0c0f18] px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-slate-500">
                <FolderKanban size={21} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-slate-200">
                No projects found
              </h3>
              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                Try changing your search or status filter, or create a new
                project to get started.
              </p>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-400/8 px-3 py-2 text-xs font-medium text-indigo-300 transition hover:bg-indigo-400/[0.14]"
              >
                <Plus size={14} />
                Create project
              </button>
            </div>
          )}
        </section>

        <div className="flex items-start gap-3 rounded-xl border border-indigo-400/12 bg-indigo-400/4 p-4">
          <Sparkles size={17} className="mt-0.5 shrink-0 text-indigo-300" />
          <div>
            <p className="text-sm font-medium text-slate-200">
              Small tasks, visible progress
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Break projects into manageable tasks to help your team understand
              progress, identify blockers, and deliver consistently.
            </p>
          </div>
          <ArrowUpRight size={15} className="ml-auto shrink-0 text-slate-500" />
        </div>
      </div>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default WorkspaceProjectsPage;
