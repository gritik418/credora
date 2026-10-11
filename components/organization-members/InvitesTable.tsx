"use client";

import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Mail,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

interface Props {
  invites: any[];
  onResend?: (invite: any) => void;
  onRevoke?: (invite: any) => void;
}

const statusStyles: Record<
  any["status"],
  { label: string; className: string; icon: typeof Clock3 }
> = {
  PENDING: {
    label: "Pending",
    className: "border-amber-400/15 bg-amber-400/10 text-amber-300",
    icon: Clock3,
  },
  ACCEPTED: {
    label: "Accepted",
    className: "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
    icon: CheckCircle2,
  },
  REVOKED: {
    label: "Revoked",
    className: "border-rose-400/15 bg-rose-400/10 text-rose-300",
    icon: XCircle,
  },
  EXPIRED: {
    label: "Expired",
    className: "border-white/10 bg-white/5 text-white/45",
    icon: CalendarClock,
  },
};

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const isExpired = (invite: any) =>
  invite.status === "PENDING" &&
  new Date(invite.expiresAt).getTime() < Date.now();

const InvitesTable = ({ invites, onResend, onRevoke }: Props) => {
  if (!invites.length) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
          <Mail size={23} />
        </div>
        <h3 className="mt-5 text-sm font-semibold text-white">
          No invitations found
        </h3>
        <p className="mt-2 max-w-sm text-xs leading-5 text-white/40">
          Invitations sent to people will appear here, separately from your
          organization members.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-190 text-left">
        <thead>
          <tr className="border-b border-(--org-border) bg-white/1.5">
            {[
              "Invitee",
              "Role",
              "Status",
              "Invited on",
              "Expires",
              "Actions",
            ].map((heading) => (
              <th
                key={heading}
                className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-(--org-border)">
          {invites.map((invite) => {
            const expired = isExpired(invite);
            const status = expired
              ? statusStyles.EXPIRED
              : statusStyles[invite.status];
            const StatusIcon = status.icon;
            const canManage = invite.status === "PENDING";

            return (
              <tr key={invite.id} className="transition hover:bg-white/2">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.035] text-white/55">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="max-w-62.5 truncate text-sm font-medium text-white/85">
                        {invite.email}
                      </p>
                      <p className="mt-1 text-[11px] text-white/35">
                        Invitation · Not a member yet
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/2.5 px-2.5 py-1.5 text-xs text-white/65">
                    <ShieldCheck size={12} />
                    {invite.role}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium ${status.className}`}
                  >
                    <StatusIcon size={12} />
                    {status.label}
                  </span>
                </td>

                <td className="px-5 py-4 text-xs text-white/55">
                  {formatDate(invite.createdAt)}
                </td>

                <td className="px-5 py-4 text-xs text-white/55">
                  {formatDate(invite.expiresAt)}
                </td>

                <td className="px-5 py-4">
                  {canManage && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onResend?.(invite)}
                        title="Resend invitation"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-white/45 transition hover:border-indigo-400/25 hover:bg-indigo-500/10 hover:text-indigo-300"
                      >
                        <RotateCcw size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRevoke?.(invite)}
                        className="rounded-lg border border-rose-400/10 px-2.5 py-2 text-[11px] font-medium text-rose-300/80 transition hover:bg-rose-400/10 hover:text-rose-200"
                      >
                        Revoke
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvitesTable;
