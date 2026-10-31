"use client";

import { Task, TaskStatus } from "@/features/task/task.interface";
import {
  Check,
  CheckCircle2,
  Circle,
  CircleDashed,
  Clock3,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskBoardColumn from "./TaskBoardColumn";

interface Props {
  onTaskClick: (task: Task) => void;
  onCreateTask: (defaultStatus: TaskStatus) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

export const columnStyles: Record<
  TaskStatus,
  { icon: typeof Circle; color: string; dot: string }
> = {
  [TaskStatus.TODO]: {
    icon: Circle,
    color: "text-blue-400",
    dot: "bg-blue-400",
  },
  [TaskStatus.IN_REVIEW]: {
    icon: Circle,
    color: "text-sky-400",
    dot: "bg-sky-400",
  },
  [TaskStatus.IN_PROGRESS]: {
    icon: CircleDashed,
    color: "text-yellow-300",
    dot: "bg-yellow-300",
  },
  [TaskStatus.ESCALATED]: {
    icon: Clock3,
    color: "text-red-300",
    dot: "bg-red-300",
  },
  [TaskStatus.COMPLETED]: {
    icon: CheckCircle2,
    color: "text-emerald-300",
    dot: "bg-emerald-300",
  },
  [TaskStatus.CANCELLED]: {
    icon: X,
    color: "text-slate-300",
    dot: "bg-slate-300",
  },
};

const TaskBoard = ({ onTaskClick, onCreateTask, onStatusChange }: Props) => {
  const [selectedStatusView, setSelectedStatusView] = useState<TaskStatus[]>([
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.ESCALATED,
  ]);

  const handleSelectStatus = (status: TaskStatus) => {
    if (selectedStatusView.includes(status)) return;

    setSelectedStatusView((prev) => {
      if (prev.length >= 4) {
        return [...prev.slice(1), status];
      }

      return [...prev, status];
    });
  };
  return (
    <div className="overflow-x-auto pb-4">
      <div className="grid grid-cols-6 min-w-262.5 pb-4 gap-3">
        {Object.values(TaskStatus).map((status) => {
          const isSelected = selectedStatusView.includes(status);
          const { icon: Icon, color } = columnStyles[status];

          return (
            <label
              key={status}
              className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all duration-200 ${
                isSelected
                  ? "border-indigo-500/40 bg-indigo-500/8 shadow-[0_0_20px_rgba(99,102,241,0.05)]"
                  : "border-white/6 bg-[#111318] hover:border-white/15 hover:bg-[#17191f]"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleSelectStatus(status)}
                className="sr-only"
                aria-label={`Select ${status}`}
              />

              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                  isSelected ? "bg-indigo-500/15" : "bg-white/4"
                }`}
              >
                <Icon size={17} className={color} />
              </div>

              <span
                className={`truncate text-sm capitalize font-medium ${
                  isSelected
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {status.replace(/_/g, " ").toLowerCase()}
              </span>

              <div className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-full border border-white/15">
                {isSelected && (
                  <div className="size-2 rounded-full bg-indigo-400" />
                )}
              </div>
            </label>
          );
        })}
      </div>

      <div className="grid min-w-262.5 grid-cols-4 items-start gap-3">
        {selectedStatusView.map((status) => {
          return (
            <TaskBoardColumn
              key={status}
              onStatusChange={onStatusChange}
              onCreateTask={onCreateTask}
              onTaskClick={onTaskClick}
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
