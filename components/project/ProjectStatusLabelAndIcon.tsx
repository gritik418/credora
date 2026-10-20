import { CircleDot } from "lucide-react";
import { ProjectStatus } from "@/features/project/project.interface";

const projectStatusConfig: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  [ProjectStatus.PLANNING]: {
    label: "Planning",
    className: "border-yellow-400/15 bg-yellow-400/7 text-yellow-300",
  },
  [ProjectStatus.ACTIVE]: {
    label: "Active",
    className: "border-emerald-400/15 bg-emerald-400/7 text-emerald-300",
  },
  [ProjectStatus.ON_HOLD]: {
    label: "On Hold",
    className: "border-amber-400/15 bg-amber-400/7 text-amber-300",
  },
  [ProjectStatus.COMPLETED]: {
    label: "Completed",
    className: "border-emerald-400/15 bg-emerald-400/7 text-emerald-300",
  },
  [ProjectStatus.CANCELLED]: {
    label: "Cancelled",
    className: "border-red-400/15 bg-red-400/7 text-red-300",
  },
  [ProjectStatus.ARCHIVED]: {
    label: "Archived",
    className: "border-slate-400/15 bg-slate-400/7 text-slate-300",
  },
};

const ProjectStatusLabelAndIcon = ({ status }: { status: ProjectStatus }) => {
  const config = projectStatusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${config.className}`}
    >
      <CircleDot size={11} />
      {config.label}
    </span>
  );
};

export default ProjectStatusLabelAndIcon;
