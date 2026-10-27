"use client";

import { ReceivedOrganizationInvite } from "@/features/user/user.interface";
import { getInitials } from "@/lib/string.utils";
import { useOrgInviteActions } from "@/store/hooks/connections/useOrgInviteActions";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  LoaderCircle,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

interface OrganizationInviteCardProps {
  invite: ReceivedOrganizationInvite;
}

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const getExpiryLabel = (expiresAt: string) => {
  const remaining = new Date(expiresAt).getTime() - Date.now();

  if (remaining <= 0) return "Expired";

  const days = Math.ceil(remaining / (1000 * 60 * 60 * 24));

  if (days === 1) return "Expires in 1 day";

  return `Expires in ${days} days`;
};

const getRoleLabel = (role: string) =>
  role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const OrganizationInviteCard = ({ invite }: OrganizationInviteCardProps) => {
  const expired = new Date(invite.expiresAt).getTime() <= Date.now();

  const {
    isAcceptingInvite,
    isDecliningInvite,
    acceptOrganizationInvite,
    declineOrganizationInvite,
  } = useOrgInviteActions();

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] transition duration-200 hover:border-indigo-400/20">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-indigo-200">
            {invite.organization.logo ? (
              <img
                src={invite.organization.logo}
                alt={`${invite.organization.name} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold">
                {getInitials(invite.organization.name)}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-white">
                {invite.organization.name}
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2 py-1 text-[10px] font-medium text-emerald-300">
                <ShieldCheck size={11} />
                Organization invite
              </span>
            </div>

            <p className="mt-1 break-all text-sm text-zinc-500">
              {invite.organization.supportEmail}
            </p>

            {invite.organization.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-400">
                {invite.organization.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} />
                Invited {formatDate(invite.createdAt)}
              </span>

              {invite.organization.website && (
                <a
                  href={invite.organization.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-indigo-300"
                >
                  Visit website
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="my-5 h-px bg-white/5.5" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            {invite.invitedBy.avatar ? (
              <img
                src={invite.invitedBy.avatar}
                alt={invite.invitedBy.name}
                className="h-9 w-9 shrink-0 rounded-full border border-white/10 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/5 text-xs font-medium text-zinc-300">
                {getInitials(invite.invitedBy.name)}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-sm text-zinc-300">
                <span className="font-medium text-white">
                  {invite.invitedBy.name}
                </span>{" "}
                <span className="text-zinc-500">invited you</span>
              </p>

              <p className="mt-0.5 text-xs text-zinc-500">
                @{invite.invitedBy.username}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {invite.department && (
              <span className="rounded-lg border border-white/[0.07] bg-white/2.5 px-3 py-2 text-xs text-zinc-400">
                {invite.department}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/15 bg-indigo-400/6 px-3 py-2 text-xs text-indigo-200">
              <UserRound size={13} />
              {getRoleLabel(invite.role)}
            </span>
          </div>
        </div>

        {invite.designation && (
          <p className="mt-3 text-xs text-zinc-500">
            Designation:{" "}
            <span className="text-zinc-300">{invite.designation}</span>
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3 border-t border-white/5.5 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={`flex items-center gap-1.5 text-xs ${
              expired ? "text-red-400" : "text-zinc-500"
            }`}
          >
            <Clock3 size={13} />
            {getExpiryLabel(invite.expiresAt)}
          </p>

          {!expired ? (
            <div className="flex gap-2">
              <button
                type="button"
                disabled={expired || isDecliningInvite}
                onClick={() => {
                  declineOrganizationInvite({
                    inviteId: invite.id,
                  });
                }}
                className="inline-flex cursor-pointer flex-1 items-center justify-center gap-2 rounded-xl border border-white/9 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-red-400/25 hover:bg-red-400/6 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                {isDecliningInvite ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <X size={15} />
                )}
                Decline
              </button>

              <button
                type="button"
                disabled={expired || isAcceptingInvite}
                onClick={() => {
                  acceptOrganizationInvite({
                    inviteId: invite.id,
                  });
                }}
                className="inline-flex cursor-pointer flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-950/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                {isAcceptingInvite ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <Check size={15} />
                )}
                Accept invite
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default OrganizationInviteCard;
