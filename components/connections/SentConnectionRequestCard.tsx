"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageSquareText,
  X,
  Check,
  Ban,
  Hourglass,
} from "lucide-react";
import { getInitials } from "@/lib/string.utils";
import {
  ConnectionRequestStatus,
  type SentConnectionRequest,
} from "@/features/connection-request/connection-request.interface";

interface SentConnectionRequestCardProps {
  request: SentConnectionRequest;
}

const formatDate = (date: Date) => {
  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) return "";

  const days = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatusDetails = (status: ConnectionRequestStatus) => {
  switch (status) {
    case ConnectionRequestStatus.ACCEPTED:
      return {
        label: "Accepted",
        icon: Check,
        className: "border-emerald-400/15 bg-emerald-400/8 text-emerald-300",
      };

    case ConnectionRequestStatus.DECLINED:
      return {
        label: "Declined",
        icon: Ban,
        className: "border-red-400/15 bg-red-400/8 text-red-300",
      };

    case ConnectionRequestStatus.EXPIRED:
      return {
        label: "Expired",
        icon: Clock3,
        className: "border-white/8 bg-white/[0.04] text-zinc-400",
      };

    default:
      return {
        label: "Pending",
        icon: Hourglass,
        className: "border-amber-400/15 bg-amber-400/8 text-amber-300",
      };
  }
};

export default function SentConnectionRequestCard({
  request,
}: SentConnectionRequestCardProps) {
  const { receiver } = request;
  const profile = receiver.profile;

  const headline =
    profile?.headline ||
    profile?.profession ||
    profile?.industry ||
    "Professional on Credora";

  const location = [profile?.city, profile?.state, profile?.country]
    .filter(Boolean)
    .join(", ");

  const status = getStatusDetails(request.status);
  const StatusIcon = status.icon;

  const canWithdraw = request.status === ConnectionRequestStatus.PENDING;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0d0f15] transition-all duration-300 hover:border-indigo-400/25 hover:bg-[#10121b]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-white/35">
            <ArrowUpRight size={13} />
            Sent invitation
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${status.className}`}
          >
            <StatusIcon size={12} />
            {status.label}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <Link
            href={`/identity/${receiver.username}`}
            aria-label={`View ${receiver.name}'s identity`}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/4 sm:h-16 sm:w-16"
          >
            {receiver.avatar ? (
              <Image
                src={receiver.avatar}
                alt={receiver.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-lg font-semibold text-indigo-200">
                {getInitials(receiver.name)}
              </div>
            )}
          </Link>

          <div className="min-w-0 flex-1">
            <Link
              href={`/identity/${receiver.username}`}
              className="block truncate text-sm font-semibold text-white transition-colors hover:text-indigo-300 sm:text-base"
            >
              {receiver.name}
            </Link>

            <p className="mt-1 text-xs text-white/35">@{receiver.username}</p>

            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/50 sm:text-sm">
              {headline}
            </p>

            {location && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/35">
                <MapPin size={13} className="shrink-0" />
                <span className="truncate">{location}</span>
              </p>
            )}
          </div>
        </div>

        {request.message && (
          <div className="mt-4 rounded-xl border border-indigo-400/10 bg-indigo-500/5 p-3">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-indigo-300">
              <MessageSquareText size={13} />
              Your message
            </div>

            <p className="whitespace-pre-wrap wrap-break-word text-xs leading-5 text-white/65">
              {request.message}
            </p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[11px] text-white/30">
            <Clock3 size={12} />
            Sent {formatDate(request.createdAt)}
          </span>

          <Link
            href={`/identity/${receiver.username}`}
            className="shrink-0 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            View identity
          </Link>
        </div>
      </div>

      {canWithdraw && (
        <div className="border-t border-white/6 bg-white/1.5 p-3 sm:px-5 sm:py-4">
          <button
            type="button"
            // onClick={() => onWithdraw(request.id)}
            // disabled={isWithdrawing}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/9 bg-white/2.5 px-3 text-sm font-medium text-white/65 transition-colors hover:border-red-400/20 hover:bg-red-400/[0.07] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={15} />
            {/* {isWithdrawing ? "Withdrawing..." : "Withdraw request"} */}
            Withdraw
          </button>
        </div>
      )}
    </article>
  );
}
