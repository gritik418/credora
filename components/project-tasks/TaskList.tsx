import React from "react";
import { columnStyles } from "./TaskBoard";
import { Task } from "@/features/task/task.interface";

interface Props {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const TaskList = ({ tasks, onTaskClick }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/7 bg-[#0c0f18]">
      <div className="overflow-x-auto">
        <div className="min-w-190">
          <div className="grid grid-cols-[minmax(260px,2fr)_130px_120px_150px_100px] gap-4 border-b border-white/7 px-5 py-3">
            {["Task", "Status", "Priority", "Assignee", "Due date"].map(
              (label) => (
                <span
                  key={label}
                  className="text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                >
                  {label}
                </span>
              ),
            )}
          </div>

          {tasks.map((task) => {
            const style = columnStyles[task.status];
            const Icon = style.icon;

            return (
              <button
                type="button"
                key={task.id}
                onClick={() => onTaskClick(task)}
                className="grid w-full grid-cols-[minmax(260px,2fr)_130px_120px_150px_100px] items-center gap-4 border-b border-white/4 px-5 py-3.5 text-left transition last:border-0 hover:bg-white/2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-200">
                    {task.title}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-600">{task.id}</p>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] ${style.color}`}
                >
                  <Icon size={13} />
                  {task.status}
                </span>

                <span className="text-[11px] text-slate-400">
                  {task.priority}
                </span>

                <span className="flex min-w-0 items-center gap-2">
                  {/* {task.assignee ? (
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${task.assignee.color} text-[9px] font-semibold text-white`}
                      >
                        {task.assignee.initials}
                      </span>
                    ) : (
                      <span className="h-6 w-6 rounded-full border border-dashed border-white/15" />
                    )} */}
                  <span className="truncate text-[11px] text-slate-400">
                    {/* {task?.assignee?.name ?? "Unassigned"}
                     */}
                    Unassigned
                  </span>
                </span>

                <span className="text-[11px] text-slate-500">
                  {task.dueDate
                    ? new Date(`${task.dueDate}T12:00:00`).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" },
                      )
                    : "—"}
                </span>
              </button>
            );
          })}

          {!tasks.length && (
            <div className="px-5 py-14 text-center text-xs text-slate-500">
              No tasks match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
