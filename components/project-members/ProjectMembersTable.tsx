"use client";

import { MoreHorizontal, ShieldCheck, UserMinus, Users } from "lucide-react";
import { useState } from "react";

interface Props {
  members: any[];
}

const roleStyles: Record<any["role"], string> = {
  "Project Lead": "border-violet-400/20 bg-violet-500/10 text-violet-300",
  Developer: "border-blue-400/20 bg-blue-500/10 text-blue-300",
  Designer: "border-pink-400/20 bg-pink-500/10 text-pink-300",
  QA: "border-amber-400/20 bg-amber-500/10 text-amber-300",
};

const ProjectMembersTable = ({ members }: Props) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/7 bg-[#0c0e14]">
      <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Team directory</h2>
          <p className="mt-1 text-xs text-gray-500">
            People currently assigned to this project
          </p>
        </div>

        <span className="rounded-lg border border-white/7 bg-white/3 px-2.5 py-1.5 text-xs text-gray-400">
          {members.length} results
        </span>
      </div>

      {members.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/7 bg-white/3 text-gray-500">
            <Users size={21} />
          </div>
          <h3 className="mt-4 text-sm font-medium text-white">
            No members found
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Try changing your search or role filter to find project members.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-195 text-left">
              <thead>
                <tr className="border-b border-white/6 text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3.5 font-medium">Member</th>
                  <th className="px-4 py-3.5 font-medium">Project role</th>
                  <th className="px-4 py-3.5 font-medium">Tasks completed</th>
                  <th className="px-4 py-3.5 font-medium">Active tasks</th>
                  <th className="px-4 py-3.5 font-medium">Joined</th>
                  <th className="px-4 py-3.5 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr key={member.id} className="transition hover:bg-white/2">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${member.avatarColor} text-xs font-semibold text-white shadow-lg shadow-black/20`}
                        >
                          {member.initials}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium text-gray-100">
                              {member.name}
                            </p>
                            {member.role === "Project Lead" && (
                              <ShieldCheck
                                size={14}
                                className="shrink-0 text-violet-300"
                              />
                            )}
                          </div>
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {member.email}
                          </p>
                          <p className="mt-1 text-[11px] text-gray-600">
                            {member.department}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {editingRoleId === member.id ? (
                        <select
                          autoFocus
                          value={member.role}
                          onChange={(event) => {
                            setEditingRoleId(null);
                          }}
                          onBlur={() => setEditingRoleId(null)}
                          className="rounded-lg border border-indigo-400/30 bg-[#11141c] px-2 py-1.5 text-xs text-white outline-none"
                        >
                          {(
                            [
                              "Project Lead",
                              "Developer",
                              "Designer",
                              "QA",
                            ] as any["role"][]
                          ).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingRoleId(member.id)}
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium transition hover:brightness-125 ${roleStyles[member.role]}`}
                          title="Change project role"
                        >
                          {member.role}
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-200">
                        {member.tasksCompleted}
                      </span>
                      <span className="ml-1 text-xs text-gray-600">tasks</span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        {member.activeTasks}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-xs text-gray-500">
                      {member.joinedAt}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((current) =>
                              current === member.id ? null : member.id,
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/7 hover:text-white"
                          aria-label={`Actions for ${member.name}`}
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenuId === member.id && (
                          <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-white/10 bg-[#151821] p-1.5 shadow-2xl shadow-black/50">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingRoleId(member.id);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-gray-300 transition hover:bg-white/6 hover:text-white"
                            >
                              <ShieldCheck size={14} />
                              Change role
                            </button>
                            {member.role !== "Project Lead" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-rose-300 transition hover:bg-rose-500/10"
                              >
                                <UserMinus size={14} />
                                Remove from project
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-white/6 md:hidden">
            {members.map((member) => (
              <div key={member.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${member.avatarColor} text-xs font-semibold text-white`}
                  >
                    {member.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-white">
                        {member.name}
                      </p>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] ${roleStyles[member.role]}`}
                      >
                        {member.role}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {member.email}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                      {member.department}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                      <span>{member.tasksCompleted} completed</span>
                      <span>{member.activeTasks} active</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <select
                        aria-label={`Change role for ${member.name}`}
                        value={member.role}
                        className="rounded-lg border border-white/8 bg-[#11141c] px-2.5 py-2 text-xs text-gray-300 outline-none"
                      >
                        {(
                          [
                            "Project Lead",
                            "Developer",
                            "Designer",
                            "QA",
                          ] as any["role"][]
                        ).map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>

                      {member.role !== "Project Lead" && (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-400/15 px-2.5 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                        >
                          <UserMinus size={13} />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectMembersTable;
