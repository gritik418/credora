"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import MembersHeader from "./MembersHeader";
import MembersStats from "./MembersStats";
import MembersToolbar, { MemberFilter } from "./MembersToolbar";
import MembersTable from "./MembersTable";
import InvitesTable from "./InvitesTable";
import InviteMemberModal from "./InviteMemberModal";
import { useAppSelector } from "@/store/hooks";
import { selectOrganizationMembers } from "@/features/organization-member/organization-member.selectors";
import { OrganizationMember } from "@/features/organization-member/organization-member.interface";
import { OrganizationMemberRole } from "@/features/organization/organization.interface";

type DirectoryTab = "MEMBERS" | "INVITES";

const OrganizationMembersPage = () => {
  const members = useAppSelector(selectOrganizationMembers);
  const invites: any[] = [];

  const [tab, setTab] = useState<DirectoryTab>("MEMBERS");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MemberFilter>("ALL");
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
          invite.status === "PENDING" &&
          new Date(invite.expiresAt).getTime() > Date.now(),
      ).length,
    [invites],
  );

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return members.filter((member: OrganizationMember) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "ACTIVE" && member.isActive) ||
        (filter === "PENDING" && !member.isActive);

      const matchesSearch =
        !normalizedSearch ||
        member.user?.name?.toLowerCase().includes(normalizedSearch) ||
        member.user?.email?.toLowerCase().includes(normalizedSearch) ||
        member.role?.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [members, filter, search]);

  const filteredInvites = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return invites.filter((invite: any) => {
      const matchesSearch =
        !normalizedSearch ||
        invite.email.toLowerCase().includes(normalizedSearch) ||
        invite.role.toLowerCase().includes(normalizedSearch) ||
        invite.status.toLowerCase().includes(normalizedSearch);

      return matchesSearch;
    });
  }, [invites, search]);

  const changeRole = (id: string, role: OrganizationMemberRole) => {};

  const removeMember = (member: OrganizationMember) => {
    setSelectedMember(member);
  };

  const confirmRemove = () => {
    if (!selectedMember) return;

    setSelectedMember(null);
  };

  const inviteMember = (
    email: string,
    role: "ADMIN" | "MANAGER" | "MEMBER",
  ) => {
    const normalizedEmail = email.trim().toLowerCase();

    const alreadyMember = members.some(
      (member) => member.user?.email?.toLowerCase() === normalizedEmail,
    );

    const alreadyInvited = invites.some(
      (invite) =>
        invite.email.toLowerCase() === normalizedEmail &&
        invite.status === "PENDING" &&
        new Date(invite.expiresAt).getTime() > Date.now(),
    );

    if (alreadyMember) {
      window.alert("This person is already a member of the organization.");
      return;
    }

    if (alreadyInvited) {
      window.alert("There is already a pending invitation for this email.");
      return;
    }

    setInviteOpen(false);
    setTab("INVITES");
    setSearch("");
  };

  const handleResendInvite = (invite: any) => {
    window.alert(`Resend invitation to ${invite.email} via your invite API.`);
  };

  const handleRevokeInvite = (invite: any) => {
    window.alert(`Revoke invitation for ${invite.email} via your invite API.`);
  };

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
                (member) => member.role === "OWNER" || member.role === "ADMIN",
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

              <div className="flex items-center gap-2 self-start rounded-lg border border-white/6 bg-white/2.5 px-3 py-2 sm:self-auto">
                {tab === "MEMBERS" ? (
                  <>
                    <Users size={14} className="text-indigo-300" />
                    <span className="text-xs text-white/65">
                      {memberCounts.ACTIVE} active members
                    </span>
                  </>
                ) : (
                  <>
                    <Mail size={14} className="text-indigo-300" />
                    <span className="text-xs text-white/65">
                      {pendingInvites} pending invitations
                    </span>
                  </>
                )}
                <ArrowUpRight size={13} className="text-white/30" />
              </div>
            </div>

            <div className="flex gap-1 border-b border-(--org-border) px-4 pt-3 sm:px-5">
              <button
                type="button"
                onClick={() => {
                  setTab("MEMBERS");
                  setSearch("");
                }}
                className={`relative flex items-center gap-2 px-3 py-3 text-xs font-medium transition ${
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
                  setSearch("");
                }}
                className={`relative flex items-center gap-2 px-3 py-3 text-xs font-medium transition ${
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

            <MembersToolbar
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
              counts={memberCounts}
              {...({
                placeholder:
                  tab === "MEMBERS"
                    ? "Search members..."
                    : "Search invitations...",
              } as object)}
            />

            {tab === "MEMBERS" ? (
              <>
                <MembersTable
                  members={filteredMembers}
                  onRoleChange={changeRole}
                  onRemove={removeMember}
                />

                <div className="flex flex-col gap-2 border-t border-(--org-border) px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <p className="text-xs text-(--org-text-muted)">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {filteredMembers.length}
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
                <InvitesTable
                  invites={filteredInvites}
                  onResend={handleResendInvite}
                  onRevoke={handleRevokeInvite}
                />

                <div className="flex flex-col gap-2 border-t border-(--org-border) px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <p className="text-xs text-(--org-text-muted)">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {filteredInvites.length}
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
        onInvite={inviteMember}
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
                onClick={confirmRemove}
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
