"use client";

import { TaskInfo } from "@/features/task/task.interface";
import TaskInfoHeader from "./TaskInfoHeader";
import TaskDescription from "./TaskDescription";
import TaskDetails from "./TaskDetails";
import TaskAssignees from "./TaskAssignees";
import TaskReviewers from "./TaskReviewers";

interface TaskInfoContentProps {
  task: TaskInfo;
  onClose: () => void;
  onEdit?: () => void;
}

const TaskInfoContent = ({ task, onClose, onEdit }: TaskInfoContentProps) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d12]">
      <TaskInfoHeader
        title={task.title}
        status={task.status}
        priority={task.priority}
        onClose={onClose}
        onEdit={onEdit}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <TaskDescription description={task.description} />
            <TaskDetails task={task} />
          </div>

          <div className="space-y-8">
            <TaskAssignees assignees={task.assignees} />
            <TaskReviewers reviewers={task.reviewRecipients} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 py-3 sm:px-7">
        <p className="text-xs text-zinc-600">
          Task ID: <span className="font-mono text-zinc-500">{task.id}</span>
        </p>
      </div>
    </div>
  );
};

export default TaskInfoContent;
