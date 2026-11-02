import { CalendarDays, Clock3, FolderKanban } from "lucide-react";
import { Task } from "@/features/task/task.interface";

interface TaskDetailsProps {
  task: Task;
}

const formatDate = (date?: Date) => {
  if (!date) return "Not set";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025]">
      <Icon size={15} className="text-zinc-500" />
    </div>

    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-zinc-300">{value}</p>
    </div>
  </div>
);

const TaskDetails = ({ task }: TaskDetailsProps) => {
  return (
    <section>
      <h3 className="mb-4 text-sm font-medium text-zinc-200">Task details</h3>

      <div className="grid grid-cols-1 gap-5 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 sm:grid-cols-2">
        <DetailItem
          icon={CalendarDays}
          label="Start date"
          value={formatDate(task.startDate)}
        />

        <DetailItem
          icon={Clock3}
          label="Due date"
          value={formatDate(task.dueDate)}
        />

        <DetailItem
          icon={FolderKanban}
          label="Created"
          value={formatDate(task.createdAt)}
        />

        <DetailItem
          icon={CalendarDays}
          label="Last updated"
          value={formatDate(task.updatedAt)}
        />
      </div>
    </section>
  );
};

export default TaskDetails;
