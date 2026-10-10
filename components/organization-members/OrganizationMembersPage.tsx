"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Building2, Users } from "lucide-react";
import MembersHeader from "./MembersHeader";
import MembersStats from "./MembersStats";
import MembersToolbar, { MemberFilter } from "./MembersToolbar";
import MembersTable from "./MembersTable";
import InviteMemberModal from "./InviteMemberModal";
import { useAppSelector } from "@/store/hooks";
import { selectOrganizationMembers } from "@/features/organization-member/organization-member.selectors";
import { OrganizationMember } from "@/features/organization-member/organization-member.interface";
import { OrganizationMemberRole } from "@/features/organization/organization.interface";

const OrganizationMembersPage = () => {
  const members = useAppSelector(selectOrganizationMembers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MemberFilter>("ALL");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<OrganizationMember | null>(null);

  const counts = useMemo(
    () => ({
      ALL: members.length,
      ACTIVE: members.filter((member) => member.isActive).length,
      PENDING: members.filter((member) => !member.isActive).length,
    }),
    [members],
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
    const existing = members.some(
      (member) => member.user?.email.toLowerCase() === email.toLowerCase(),
    );

    if (existing) {
      window.alert("This email is already part of the member list.");
      return;
    }

    setFilter("ALL");
    setSearch("");
  };

  return (
    <div className="org-shell org-background min-h-screen">
      <main className="mx-auto w-full max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 xl:px-10">
        <div className="space-y-7">
          <MembersHeader onInvite={() => setInviteOpen(true)} />

          <MembersStats
            total={counts.ALL}
            active={counts.ACTIVE}
            pending={counts.PENDING}
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
                  <Building2 size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Team directory
                  </h2>
                  <p className="mt-1 text-xs text-(--org-text-muted)">
                    View and manage your organization members
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start rounded-lg border border-white/6 bg-white/2.5 px-3 py-2 sm:self-auto">
                <Users size={14} className="text-indigo-300" />
                <span className="text-xs text-white/65">
                  {counts.ACTIVE} active members
                </span>
                <ArrowUpRight size={13} className="text-white/30" />
              </div>
            </div>

            <MembersToolbar
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
              counts={counts}
            />

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
                <span className="font-medium text-white">{members.length}</span>{" "}
                members
              </p>

              <p className="text-[11px] text-white/30">
                Organization access &amp; membership
              </p>
            </div>
          </section>

          <div className="flex items-start gap-3 rounded-xl border border-indigo-400/10 bg-indigo-500/3.5 p-4">
            <ShieldCheckIcon />
            <div>
              <p className="text-xs font-medium text-white/75">
                Manage access responsibly
              </p>
              <p className="mt-1 text-xs leading-5 text-white/40">
                Assign roles based on responsibilities. Owners retain full
                control over the organization.
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
                {selectedMember.user.name}
              </span>{" "}
              from this organization? This action is only simulated in the UI.
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

const ShieldCheckIcon = () => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/10 bg-indigo-500/[0.07] text-indigo-300">
    <Users size={16} />
  </div>
);

export default OrganizationMembersPage;
