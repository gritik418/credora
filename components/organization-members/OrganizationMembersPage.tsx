"use client";

import { OrganizationInviteStatus } from "@/features/organization-invite/organization-invite.interface";
import { selectOrganizationInvites } from "@/features/organization-invite/organization-invite.selectors";
import { OrganizationMember } from "@/features/organization-member/organization-member.interface";
import { selectOrganizationMembers } from "@/features/organization-member/organization-member.selectors";
import { OrganizationMemberRole } from "@/features/organization/organization.interface";
import { useAppSelector } from "@/store/hooks";
import { Building2, Mail, ShieldCheck, Users } from "lucide-react";
import { useMemo, useState } from "react";
import InviteMemberModal from "./InviteMemberModal";
import InvitesTable from "./InvitesTable";
import MembersHeader from "./MembersHeader";
import MembersStats from "./MembersStats";
import MembersTable from "./MembersTable";

type DirectoryTab = "MEMBERS" | "INVITES";

const OrganizationMembersPage = () => {
  const members = useAppSelector(selectOrganizationMembers);
  const invites = useAppSelector(selectOrganizationInvites);

  const [tab, setTab] = useState<DirectoryTab>("MEMBERS");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<OrganizationMember | null>(null);

  const memberCounts = useMemo(
    () => ({
      ALL: members.length,
      ACTIVE: members.filter((member) => member.isActive).length,
      PENDING: members.filter((member) => !member.isActive).length,
    }),
    [members],
  );

  const pendingInvites = useMemo(
    () =>
      invites.filter(
        (invite) =>
          invite.status === OrganizationInviteStatus.PENDING &&
          new Date(invite.expiresAt).getTime() > Date.now(),
      ).length,
    [invites],
  );

  return (
    <div className="org-shell org-background min-h-screen">
      <main className="mx-auto w-full max-w-[1600px]">
        <div className="space-y-7">
          <MembersHeader onInvite={() => setInviteOpen(true)} />

          <MembersStats
            total={memberCounts.ALL}
            active={memberCounts.ACTIVE}
            pending={pendingInvites}
            admins={
              members.filter(
                (member) =>
                  member.role === OrganizationMemberRole.OWNER ||
                  member.role === OrganizationMemberRole.ADMIN,
              ).length
            }
          />

          <section className="org-card overflow-visible">
            <div className="flex flex-col gap-4 border-b border-(--org-border) p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
                  {tab === "MEMBERS" ? (
                    <Building2 size={19} />
                  ) : (
                    <Mail size={19} />
                  )}
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {tab === "MEMBERS" ? "Team directory" : "Invitations"}
                  </h2>
                  <p className="mt-1 text-xs text-(--org-text-muted)">
                    {tab === "MEMBERS"
                      ? "Manage member access and contribution permissions"
                      : "Track invitations separately from member identities"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-1 border-b border-(--org-border) px-4 pt-3 sm:px-5">
              <button
                type="button"
                onClick={() => {
                  setTab("MEMBERS");
                }}
                className={`relative cursor-pointer flex items-center gap-2 px-3 py-3 text-xs font-medium transition ${
                  tab === "MEMBERS"
                    ? "text-white"
                    : "text-white/40 hover:text-white/75"
                }`}
              >
                <Users size={15} />
                Members
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                    tab === "MEMBERS"
                      ? "bg-indigo-500/15 text-indigo-300"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {memberCounts.ALL}
                </span>
                {tab === "MEMBERS" && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-indigo-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTab("INVITES");
                }}
                className={`relative cursor-pointer flex items-center gap-2 px-3 py-3 text-xs font-medium transition ${
                  tab === "INVITES"
                    ? "text-white"
                    : "text-white/40 hover:text-white/75"
                }`}
              >
                <Mail size={15} />
                Invitations
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                    tab === "INVITES"
                      ? "bg-indigo-500/15 text-indigo-300"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {invites.length}
                </span>
                {tab === "INVITES" && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-indigo-400" />
                )}
              </button>
            </div>

            {tab === "MEMBERS" ? (
              <>
                <MembersTable members={members} />

                <div className="flex flex-col gap-2 border-t border-(--org-border) px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <p className="text-xs text-(--org-text-muted)">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {members.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {members.length}
                    </span>{" "}
                    members
                  </p>
                  <p className="text-[11px] text-white/30">
                    Active members can contribute; inactive members cannot.
                  </p>
                </div>
              </>
            ) : (
              <>
                <InvitesTable />

                <div className="flex flex-col gap-2 border-t border-(--org-border) px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <p className="text-xs text-(--org-text-muted)">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {invites.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {invites.length}
                    </span>{" "}
                    invitations
                  </p>
                  <p className="text-[11px] text-white/30">
                    Invitations are separate from organization membership.
                  </p>
                </div>
              </>
            )}
          </section>

          <div className="flex items-start gap-3 rounded-xl border border-indigo-400/10 bg-indigo-500/3.5 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/10 bg-indigo-500/[0.07] text-indigo-300">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-medium text-white/75">
                Manage access responsibly
              </p>
              <p className="mt-1 text-xs leading-5 text-white/40">
                Only active members can contribute to the organization.
                Invitations grant no contribution access until accepted and
                membership is established.
              </p>
            </div>
          </div>
        </div>
      </main>

      <InviteMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />

      {selectedMember && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="org-card-gradient w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-white">Remove member?</h3>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Remove{" "}
              <span className="font-medium text-white">
                {selectedMember.user?.name ?? selectedMember.user?.email}
              </span>{" "}
              from this organization?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="org-secondary-button flex-1 rounded-xl px-4 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 rounded-xl bg-rose-500/90 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-500"
              >
                Remove member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationMembersPage;
