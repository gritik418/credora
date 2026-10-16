"use client";

import { Task, TaskPriority, TaskStatus } from "@/features/task/task.interface";
import {
  CheckCircle2,
  CircleDashed,
  Clock3,
  ListTodo,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import TaskBoard from "./TaskBoard";
import TaskDetailsDrawer from "./TaskDetailsDrawer";
import TaskToolbar from "./TaskToolbar";

interface Props {
  workspaceId: string;
  projectId: string;
}

const ProjectTasksPage = ({ workspaceId, projectId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All statuses">(
    "All statuses",
  );
  const [priorityFilter, setPriorityFilter] = useState<
    TaskPriority | "All priorities"
  >("All priorities");
  const [view, setView] = useState<"board" | "list">("board");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.id.toLowerCase().includes(query) ||
        task?.description?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All statuses" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All priorities" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const completedCount = tasks.filter(
    (task) => task.status === TaskStatus.COMPLETED,
  ).length;
  const inProgressCount = tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS,
  ).length;
  const reviewCount = tasks.filter(
    (task) => task.status === TaskStatus.IN_REVIEW,
  ).length;
  const completion = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const openCreateDrawer = (status: TaskStatus = TaskStatus.TODO) => {
    setDrawerOpen(true);
  };

  const openEditDrawer = (task: Task) => {
    setDrawerOpen(true);
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  };

  return (
    <div className="min-h-screen bg-[#070912] text-slate-200">
      <div className="mx-auto max-w-[1700px] space-y-6">
        <div className="space-y-5">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Tasks
              </h1>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500 sm:text-sm">
                Organize work, assign responsibilities, and move tasks forward.
                Keep every part of the project on track.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/7 bg-[#0c0f18] px-3.5 py-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                  <TrendingUp size={15} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">Completion</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {completion}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/7 bg-[#0c0f18] px-3.5 py-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300">
                  <ListTodo size={15} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">Total tasks</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {tasks.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/7 bg-[#0c0f18] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500">All tasks</span>
              <ListTodo size={16} className="text-indigo-300" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">
              {tasks.length}
            </p>
            <p className="mt-1 text-[10px] text-slate-600">
              Across all statuses
            </p>
          </div>

          <div className="rounded-2xl border border-white/7 bg-[#0c0f18] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500">In progress</span>
              <CircleDashed size={16} className="text-indigo-300" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">
              {inProgressCount}
            </p>
            <p className="mt-1 text-[10px] text-slate-600">
              Currently being worked on
            </p>
          </div>

          <div className="rounded-2xl border border-white/7 bg-[#0c0f18] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500">In review</span>
              <Clock3 size={16} className="text-amber-300" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">
              {reviewCount}
            </p>
            <p className="mt-1 text-[10px] text-slate-600">
              Waiting for review
            </p>
          </div>

          <div className="rounded-2xl border border-white/7 bg-[#0c0f18] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500">Completed</span>
              <CheckCircle2 size={16} className="text-emerald-300" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">
              {completedCount}
            </p>
            <p className="mt-1 text-[10px] text-slate-600">
              Successfully finished
            </p>
          </div>
        </div>

        <TaskToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          view={view}
          onViewChange={setView}
          onCreateTask={() => openCreateDrawer()}
          resultCount={filteredTasks.length}
        />

        <TaskBoard
          tasks={filteredTasks}
          view={view}
          onTaskClick={openEditDrawer}
          onCreateTask={openCreateDrawer}
          onStatusChange={handleStatusChange}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/6 pt-4">
          <p className="text-[10px] text-slate-600">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
          <p className="text-[10px] text-slate-600">
            Drag tasks between columns to update their status.
          </p>
        </div>
      </div>

      <TaskDetailsDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectTasksPage;
