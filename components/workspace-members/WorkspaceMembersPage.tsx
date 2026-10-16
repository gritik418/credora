"use client";

import {
  WorkspaceMember,
  WorkspaceMemberRole,
} from "@/features/workspace-member/workspace-member.interface";
import { selectWorkspaceMembers } from "@/features/workspace-member/workspace-member.selectors";
import { useAppSelector } from "@/store/hooks";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import AddWorkspaceMembersModal from "./AddWorkspaceMembersModal";
import MembersStats from "./MembersStats";
import MembersTable from "./MembersTable";
import MembersToolbar from "./MembersToolbar";

const WorkspaceMembersPage = () => {
  const members = useAppSelector(selectWorkspaceMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [addMembersOpen, setAddMembersOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    return members.filter((member: WorkspaceMember) => {
      const matchesSearch =
        member.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        member.user?.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All roles" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [members, search, roleFilter, statusFilter]);

  const activeCount = members.filter((member) => member.user.isActive).length;

  const adminCount = members.filter(
    (member) => member.role === WorkspaceMemberRole.ADMIN,
  ).length;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#080a10] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-indigo-500/10 via-[#0c0f18] to-blue-500/5 p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-[90px]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
                <Users size={14} />
                Workspace settings
              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Workspace members
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Manage your team, assign roles, and control who has access to
                this workspace.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {activeCount} active members
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1.5">
                  <ShieldCheck size={13} className="text-indigo-300" />
                  Role-based access
                </span>
              </div>
            </div>

            <button
              onClick={() => setAddMembersOpen(true)}
              className="inline-flex cursor-pointer shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              <Users size={16} />
              Add members
            </button>
          </div>
        </section>

        <MembersStats
          total={members.length}
          admins={adminCount}
          active={activeCount}
        />

        <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#0c0f18] shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
          <div className="flex flex-col gap-3 border-b border-white/6 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-base font-semibold">Team directory</h2>
              <p className="mt-1 text-xs text-slate-500">
                View and manage everyone in this workspace.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-white/9 bg-white/3 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/16 hover:bg-white/6 sm:self-auto"
            >
              <ArrowDownToLine size={14} />
              Export members
            </button>
          </div>

          <MembersToolbar
            search={search}
            onSearchChange={setSearch}
            roleFilter={roleFilter}
            onRoleChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            resultCount={filteredMembers.length}
          />

          <MembersTable members={filteredMembers} />

          <div className="flex flex-col gap-2 border-t border-white/6 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>
              Showing{" "}
              <span className="font-medium text-slate-300">
                {filteredMembers.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-300">
                {members.length}
              </span>{" "}
              members
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              Workspace access is role-based
              <ArrowUpRight size={12} />
            </span>
          </div>
        </section>

        <div className="flex items-start gap-3 rounded-xl border border-indigo-400/12 bg-indigo-400/4 p-4">
          <Clock3 size={17} className="mt-0.5 shrink-0 text-indigo-300" />
          <div>
            <p className="text-sm font-medium text-slate-200">
              Keep your workspace secure
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Give admin access only to trusted teammates.
            </p>
          </div>
        </div>
      </div>

      <AddWorkspaceMembersModal
        open={addMembersOpen}
        onClose={() => setAddMembersOpen(false)}
      />
    </div>
  );
};

export default WorkspaceMembersPage;
