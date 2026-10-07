import { Sparkles } from "lucide-react";

const OrganizationSelectionHeader = () => {
  return (
    <div className="max-w-2xl">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-500/8 px-3 py-1.5 text-[11px] font-medium text-indigo-300">
        <Sparkles size={13} />
        Your workspaces
      </div>

      <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
        Where do you want to work?
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
        Choose an organization to continue. Your work, projects, teams and
        contributions stay organized within each workspace.
      </p>
    </div>
  );
};

export default OrganizationSelectionHeader;
