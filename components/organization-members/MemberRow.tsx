"use client";

import { OrganizationMember } from "@/features/organization-member/organization-member.interface";
import { OrganizationMemberRole } from "@/features/organization/organization.interface";
import {
  Check,
  ChevronDown,
  Clock3,
  Copy,
  Ellipsis,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

interface Props {
  member: OrganizationMember;
}

const roleStyles: Record<OrganizationMemberRole, string> = {
  OWNER: "border-violet-400/20 bg-violet-500/10 text-violet-300",
  ADMIN: "border-indigo-400/20 bg-indigo-500/10 text-indigo-300",
  MANAGER: "border-blue-400/20 bg-blue-500/10 text-blue-300",
  MEMBER: "border-white/[0.08] bg-white/[0.04] text-white/60",
  RECRUITER: "border-white/[0.08] bg-white/[0.04] text-white/60",
};

const MemberRow = ({ member }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const initials = member.user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(member.user.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.alert(member.user.email);
    }
  };

  return (
    <div className="group relative grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-(--org-border) px-4 py-4 transition hover:bg-white/[0.018] sm:px-5 lg:grid-cols-[minmax(230px,1.6fr)_minmax(110px,0.8fr)_minmax(110px,0.8fr)_minmax(125px,0.9fr)_40px] lg:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative shrink-0">
          {member.user.avatar ? (
            <img
              src={member.user.avatar}
              alt={member.user.name}
              className="h-11 w-11 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/15 bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-sm font-semibold text-indigo-200">
              {initials}
            </div>
          )}

          <span
            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0d1018] ${
              member.isActive ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-medium text-white">
              {member.user.name}
            </p>

            {member.role === "OWNER" && (
              <ShieldCheck size={14} className="shrink-0 text-violet-300" />
            )}
          </div>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-1 flex max-w-full items-center gap-1.5 text-left text-xs text-(--org-text-muted) transition hover:text-indigo-300"
          >
            <span className="truncate">{member.user.email}</span>
            {copied ? (
              <Check size={12} className="shrink-0 text-emerald-300" />
            ) : (
              <Copy
                size={11}
                className="shrink-0 opacity-0 transition group-hover:opacity-70"
              />
            )}
          </button>
        </div>
      </div>

      <div className="hidden min-w-0 lg:block">
        <div className="relative">
          <button
            type="button"
            disabled={member.role === "OWNER"}
            onClick={() => {
              setRoleOpen(!roleOpen);
              setMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition disabled:cursor-default ${roleStyles[member.role]}`}
          >
            {member.role}
            {member.role !== "OWNER" && <ChevronDown size={12} />}
          </button>

          {roleOpen && (
            <div className="absolute left-0 top-full z-30 mt-2 w-36 rounded-xl border border-white/10 bg-[#121622] p-1.5 shadow-2xl">
              {Object.values(OrganizationMemberRole).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setRoleOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition hover:bg-white/5 ${
                    member.role === role ? "text-indigo-300" : "text-white/65"
                  }`}
                >
                  {role}
                  {member.role === role && <Check size={13} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden min-w-0 lg:block">
        <span
          className={`inline-flex items-center font-semibold gap-1.5 text-xs ${
            member.isActive ? "text-emerald-300" : "text-red-300"
          }`}
        >
          {member.isActive ? (
            <HiCheckCircle size={13} />
          ) : (
            <HiExclamationCircle size={13} />
          )}
          {member.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="hidden min-w-0 lg:block">
        <p className="truncate text-xs text-white/65">{member.user.username}</p>
        <p className="mt-1 truncate text-[11px] text-white/35">{member.id}</p>
      </div>

      <div className="relative col-start-2 row-start-1 flex items-center justify-end lg:col-auto lg:row-auto">
        <button
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setRoleOpen(false);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/6 hover:text-white"
          aria-label={`Actions for ${member.user.name}`}
        >
          <Ellipsis size={19} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-white/10 bg-[#121622] p-1.5 shadow-2xl">
            <div className="border-b border-white/6 px-3 py-2">
              <p className="truncate text-xs font-medium text-white">
                {member.user.name}
              </p>
              <p className="mt-1 text-[10px] text-white/40">Member actions</p>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-white/65 hover:bg-white/5 hover:text-white"
            >
              <Copy size={14} />
              Copy email
            </button>

            {member.isActive && (
              <button
                type="button"
                onClick={() =>
                  window.alert(`Resend invitation to ${member.user.email}`)
                }
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-white/65 hover:bg-white/5 hover:text-white"
              >
                <Clock3 size={14} />
                Resend invitation
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
              }}
              disabled={member.role === "OWNER"}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-rose-300 hover:bg-rose-400/8 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <X size={14} />
              Remove member
            </button>
          </div>
        )}
      </div>

      <div className="col-span-2 flex flex-wrap items-center gap-2 lg:hidden">
        <span
          className={`rounded-md border px-2 py-1 text-[10px] font-medium ${roleStyles[member.role]}`}
        >
          {member.role}
        </span>

        {/* <span className="text-[11px] text-white/40">{member.department}</span> */}

        <span
          className={`ml-auto text-[10px] ${
            member.isActive ? "text-emerald-300" : "text-amber-300"
          }`}
        >
          {member.isActive ? "Active" : "Pending"}
        </span>
      </div>
    </div>
  );
};

export default MemberRow;
