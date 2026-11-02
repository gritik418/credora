import { Users } from "lucide-react";
import { TaskAssignee } from "@/features/task/task.interface";
import { getInitials } from "@/lib/string.utils";

interface TaskAssigneesProps {
  assignees: TaskAssignee[];
}

const TaskAssignees = ({ assignees }: TaskAssigneesProps) => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={15} className="text-zinc-500" />
          <h3 className="text-sm font-medium text-zinc-200">Assignees</h3>
        </div>

        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-xs text-zinc-500">
          {assignees.length}
        </span>
      </div>

      {assignees.length ? (
        <div className="space-y-3">
          {assignees.map(({ id, user, role }) => (
            <div
              key={id}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-medium text-indigo-300">
                  {getInitials(user.name)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-200">
                  {user.name}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">@{user.username}</p>
              </div>

              <span className="rounded-md border border-white/[0.06] px-2 py-1 text-[10px] text-zinc-500">
                {role}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-white/[0.08] p-4 text-center text-sm text-zinc-500">
          No assignees yet.
        </p>
      )}
    </section>
  );
};

export default TaskAssignees;
