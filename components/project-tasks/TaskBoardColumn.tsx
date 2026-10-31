import { Icon, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "@/features/task/task.interface";
import { columnStyles } from "./TaskBoard";
import { useGetTasksQuery } from "@/features/task/task.api";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedProject } from "@/features/project/project.selectors";

interface Props {
  status: TaskStatus;
  onCreateTask: (status: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const TaskBoardColumn = ({
  status,
  onCreateTask,
  onTaskClick,
  onStatusChange,
}: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const project = useAppSelector(selectSelectedProject);

  const { data, isLoading } = useGetTasksQuery(
    {
      projectId: project?.id ?? "",
      pagination: {
        limit,
        page,
      },
      query: { search, status },
    },
    {
      skip: !project?.id,
    },
  );

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);

  const handleDrop = (status: TaskStatus) => {
    if (draggingId) onStatusChange(draggingId, status);
    setDraggingId(null);
    setDragOverStatus(null);
  };

  const style = columnStyles[status];
  const Icon = style.icon;
  const isOver = dragOverStatus === status;

  useEffect(() => {
    if (data?.data?.tasks) {
      setTasks(data.data.tasks);
    }
  }, [data]);

  return (
    <section
      key={status}
      onDragOver={(event) => {
        event.preventDefault();
        setDragOverStatus(status);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setDragOverStatus(null);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        handleDrop(status);
      }}
      className={`h-170 overflow-y-scroll rounded-2xl border p-2.5 transition ${
        isOver
          ? "border-indigo-400/40 bg-indigo-400/6"
          : "border-white/6 bg-white/1.5"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-1 pb-3 pt-1">
        <div className="flex min-w-0 items-center gap-2">
          <Icon size={15} className={style.color} />
          <h3 className="truncate text-xs font-semibold text-slate-300">
            {status}
          </h3>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white/5 px-1 text-[10px] text-slate-500">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onCreateTask(status)}
          aria-label={`Add task to ${status}`}
          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/7 hover:text-white"
        >
          <Plus size={15} />
        </button>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            onDragStart={() => setDraggingId(task.id)}
            onDragEnd={() => {
              setDraggingId(null);
              setDragOverStatus(null);
            }}
            className={`transition ${
              draggingId === task.id ? "opacity-40" : ""
            }`}
          >
            <TaskCard
              task={task}
              onClick={onTaskClick}
              onDragStart={setDraggingId}
            />
          </div>
        ))}

        {!tasks.length && (
          <div className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-dashed border-white/7 px-3 text-center">
            <span className="text-[10px] text-slate-600">Drop tasks here</span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => onCreateTask(status)}
        className="mt-2.5 cursor-pointer flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-white/4 hover:text-slate-200"
      >
        <Plus size={13} />
        Add task
      </button>
    </section>
  );
};

export default TaskBoardColumn;
