"use client";

import { Plus, Users, Users2 } from "lucide-react";

interface Props {
  onInvite: () => void;
}

const MembersHeader = ({ onInvite }: Props) => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
            <Users2 size={14} />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/80">
            Organization Members
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Members
          <span className="text-white/35">.</span>
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
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
