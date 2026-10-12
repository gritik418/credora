"use client";

import { Plus, Users } from "lucide-react";

interface Props {
  onInvite: () => void;
}

const MembersHeader = ({ onInvite }: Props) => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-indigo-300">
          <Users size={15} />
          ORGANIZATION
          <span className="text-white/20">/</span>
          <span className="text-white/50">MEMBERS</span>
        </div>

        <h1 className="org-heading text-2xl font-semibold sm:text-3xl">
          Members
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-(--org-text-muted)">
          Manage your team, organize responsibilities, and control access to
          your organization.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onInvite}
          className="org-primary-button cursor-pointer flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
        >
          <Plus size={17} />
          Invite member
        </button>
      </div>
    </div>
  );
};

export default MembersHeader;
