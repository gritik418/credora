import { Plus } from "lucide-react";

interface Props {
  memberCount: number;
  onAddMembers: () => void;
}

const ProjectMembersHeader = ({ memberCount, onAddMembers }: Props) => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Project members
            </h1>
            <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300">
              {memberCount} members
            </span>
          </div>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
            Manage your project team, review contributions, and add people from
            your organization.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddMembers}
        className="inline-flex cursor-pointer h-11 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400"
      >
        <Plus size={17} />
        Add members
      </button>
    </div>
  );
};

export default ProjectMembersHeader;
