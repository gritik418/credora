import {
  WorkspaceMember,
  WorkspaceMemberRole,
} from "@/features/workspace-member/workspace-member.interface";
import { MoreHorizontal, ShieldCheck, UserRound } from "lucide-react";

interface Props {
  members: WorkspaceMember[];
}

const roleStyles: Record<WorkspaceMemberRole, string> = {
  [WorkspaceMemberRole.ADMIN]:
    "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
  [WorkspaceMemberRole.MEMBER]:
    "border-white/[0.09] bg-white/[0.04] text-slate-400",
};

const statusStyles: Record<string, string> = {
  Active: "border-green-400/20 bg-green-400/10 text-green-300",
  Inactive: "border-white/[0.09] bg-white/[0.04] text-slate-400",
};

const MembersTable = ({ members }: Props) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getBgColor = (name: string) => {
    const colors = [
      "bg-linear-to-br from-indigo-500 to-violet-500",
      "bg-linear-to-br from-green-500 to-emerald-500",
      "bg-linear-to-br from-pink-500 to-rose-500",
      "bg-linear-to-br from-blue-500 to-cyan-500",
      "bg-linear-to-br from-yellow-500 to-amber-500",
      "bg-linear-to-br from-purple-500 to-violet-500",
      "bg-linear-to-br from-orange-500 to-rose-500",
      "bg-linear-to-br from-pink-500 to-purple-500",
      "bg-linear-to-br from-cyan-500 to-blue-500",
      "bg-linear-to-br from-amber-500 to-yellow-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (!members.length) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-slate-500">
          <UserRound size={21} />
        </div>
        <h3 className="mt-4 text-sm font-medium text-slate-200">
          No members found
        </h3>
        <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
          Try changing your search or filters to find workspace members.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-225 border-collapse text-left">
          <thead>
            <tr className="border-b border-white/6 bg-white/1.5">
              <th className="px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                Member
              </th>
              <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                Role
              </th>
              <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                Status
              </th>
              <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                Joined
              </th>
              <th className="px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                Last active
              </th>
              <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-b border-white/4.5 transition last:border-b-0 hover:bg-white/2.5"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${getBgColor(member.user.name)} text-xs font-semibold text-white shadow-lg shadow-black/10`}
                    >
                      {getInitials(member.user.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-slate-200">
                          {member.user.name}
                        </p>
                        {member.role === WorkspaceMemberRole.ADMIN && (
                          <ShieldCheck
                            size={14}
                            className="shrink-0 text-violet-300"
                          />
                        )}
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-medium ${roleStyles[member.role]}`}
                  >
                    {member.role}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusStyles[member.user.isActive ? "Active" : "Inactive"]}`}
                    />
                    {member.user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-4 text-xs text-slate-400">
                  {formatDate(member.createdAt)}
                </td>

                <td className="px-4 py-4 text-xs text-slate-400">
                  {formatDate(member.user.lastLoginAt)}
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Actions for ${member.user.name}`}
                    className="rounded-lg border border-transparent p-2 text-slate-500 transition hover:border-white/8 hover:bg-white/5 hover:text-white"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-white/6 md:hidden">
        {members.map((member) => (
          <article key={member.id} className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${getBgColor(member.user.name)} text-xs font-semibold text-white`}
              >
                {getInitials(member.user.name)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-200">
                      {member.user.name}
                    </p>
                    <p className="mt-1 break-all text-xs text-slate-500">
                      {member.user.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Actions for ${member.user.name}`}
                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-white"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md border px-2 py-1 text-[11px] font-medium ${roleStyles[member.role]}`}
                  >
                    {member.role}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusStyles[member.user.isActive ? "Active" : "Inactive"]}`}
                    />
                    {member.user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                  <span>Joined {member.createdAt}</span>
                  <span>{member.user.lastLoginAt}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default MembersTable;
