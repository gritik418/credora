import { AlignLeft } from "lucide-react";

interface TaskDescriptionProps {
  description?: string;
}

const TaskDescription = ({ description }: TaskDescriptionProps) => {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <AlignLeft size={15} className="text-zinc-500" />
        <h3 className="text-sm font-medium text-zinc-200">Description</h3>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
        <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-400">
          {description || "No description provided for this task."}
        </p>
      </div>
    </section>
  );
};

export default TaskDescription;
