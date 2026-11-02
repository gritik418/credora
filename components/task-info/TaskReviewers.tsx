import { ClipboardCheck } from "lucide-react";
import { TaskReviewRecipient } from "@/features/task/task.interface";
import { getInitials } from "@/lib/string.utils";

interface TaskReviewersProps {
  reviewers: TaskReviewRecipient[];
}

const TaskReviewers = ({ reviewers }: TaskReviewersProps) => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={15} className="text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-200">Reviewers</h3>
        </div>

        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-xs text-zinc-500">
          {reviewers.length}
        </span>
      </div>

      {reviewers.length ? (
        <div className="space-y-3">
          {reviewers.map(({ id, member, isDefault }) => (
            <div
              key={id}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3"
            >
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-10 w-10 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-xs font-medium text-violet-300">
                  {getInitials(member.name)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-200">
                  {member.name}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  @{member.username}
                </p>
              </div>

              {isDefault && (
                <span className="rounded-md border border-violet-400/15 bg-violet-400/[0.06] px-2 py-1 text-[10px] text-violet-300">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-white/[0.08] p-4 text-center text-sm text-zinc-500">
          No reviewers assigned.
        </p>
      )}
    </section>
  );
};

export default TaskReviewers;
