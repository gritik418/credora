"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";
import MembersStats from "./MembersStats";
import MembersToolbar from "./MembersToolbar";
import MembersTable, { WorkspaceMember } from "./MembersTable";
import InviteWorkspaceMemberModal from "./InviteWorkspaceMemberModal";

const initialMembers: WorkspaceMember[] = [
  {
    id: "1",
    name: "Ritik Gupta",
    email: "ritik@example.com",
    initials: "RG",
    color: "from-indigo-500 to-violet-500",
    role: "Owner",
    status: "Active",
    joinedAt: "Oct 02, 2026",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    initials: "AS",
    color: "from-sky-500 to-cyan-500",
    role: "Admin",
    status: "Active",
    joinedAt: "Oct 03, 2026",
    lastActive: "12 min ago",
  },
  {
    id: "3",
    name: "Priya Verma",
    email: "priya@example.com",
    initials: "PV",
    color: "from-pink-500 to-rose-500",
    role: "Member",
    status: "Active",
    joinedAt: "Oct 04, 2026",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Kabir Singh",
    email: "kabir@example.com",
    initials: "KS",
    color: "from-amber-500 to-orange-500",
    role: "Member",
    status: "Inactive",
    joinedAt: "Oct 05, 2026",
    lastActive: "2 days ago",
  },
  {
    id: "5",
    name: "Ananya Mehta",
    email: "ananya@example.com",
    initials: "AM",
    color: "from-emerald-500 to-teal-500",
    role: "Admin",
    status: "Pending",
    joinedAt: "Oct 11, 2026",
    lastActive: "Invitation sent",
  },
];

const WorkspaceMembersPage = () => {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [inviteOpen, setInviteOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All roles" || member.role === roleFilter;

      const matchesStatus =
        statusFilter === "All statuses" || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, search, roleFilter, statusFilter]);

  const handleInvite = (email: string, role: "Admin" | "Member") => {
    const name = email.split("@")[0].replace(/[._-]/g, " ");
    const initials = name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    setMembers((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: name.replace(/\b\w/g, (char) => char.toUpperCase()),
        email,
        initials,
        color: "from-indigo-500 to-blue-500",
        role,
        status: "Pending",
        joinedAt: "Oct 13, 2026",
        lastActive: "Invitation sent",
      },
    ]);

    setInviteOpen(false);
  };

  const activeCount = members.filter(
    (member) => member.status === "Active",
  ).length;

  const adminCount = members.filter(
    (member) => member.role === "Admin" || member.role === "Owner",
  ).length;

  const pendingCount = members.filter(
    (member) => member.status === "Pending",
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
              onClick={() => setInviteOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              <Users size={16} />
              Invite members
            </button>
          </div>
        </section>

        <MembersStats
          total={members.length}
          admins={adminCount}
          pending={pendingCount}
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
              Give admin access only to trusted teammates. Pending invitations
              will appear here until the invited members join.
            </p>
          </div>
        </div>
      </div>

      <InviteWorkspaceMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
};

export default WorkspaceMembersPage;
