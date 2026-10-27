"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Check, MapPin, MessageSquareText, X } from "lucide-react";
import { getInitials } from "@/lib/string.utils";
import { ConnectionRequest } from "@/features/connection-request/connection-request.interface";

interface ConnectionRequestCardProps {
  request: ConnectionRequest;
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
  });
};

export default function ConnectionRequestCard({
  request,
}: ConnectionRequestCardProps) {
  const { sender } = request;
  const profile = sender.profile;

  const headline =
    profile?.headline ||
    profile?.profession ||
    profile?.industry ||
    "Professional on Credora";

  const location = [profile?.city, profile?.state, profile?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0d0f15] transition-all duration-300 hover:border-indigo-400/25 hover:bg-[#10121b]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Link
            href={`/${sender.username}`}
            aria-label={`View ${sender.name}'s identity`}
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/4 sm:h-16 sm:w-16"
          >
            {sender.avatar ? (
              <Image
                src={sender.avatar}
                alt={sender.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-lg font-semibold text-indigo-200">
                {getInitials(sender.name)}
              </div>
            )}
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <Link
                href={`/${sender.username}`}
                className="truncate text-sm font-semibold text-white transition-colors hover:text-indigo-300 sm:text-base"
              >
                {sender.name}
              </Link>

              <BadgeCheck
                size={15}
                className="hidden shrink-0 text-indigo-400"
                aria-label="Verified"
              />
            </div>

            <p className="mt-1 text-xs text-white/35">@{sender.username}</p>

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
              Personal message
            </div>
            <p className="whitespace-pre-wrap wrap-break-word text-xs leading-5 text-white/65">
              {request.message}
            </p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[11px] text-white/30">
            Requested {formatDate(request.createdAt)}
          </span>

          <Link
            href={`/${sender.username}`}
            className="shrink-0 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            View identity
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-white/6 bg-white/15 p-3 sm:px-5 sm:py-4">
        <button
          type="button"
          //   onClick={() => onAccept(request.id)}
          //   disabled={isBusy}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check size={16} />
          {/* {isAccepting ? "Accepting..." : "Accept"} */}
          Accept
        </button>

        <button
          type="button"
          //   onClick={() => onIgnore(request.id)}
          //   disabled={}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/9 bg-white/2.5 px-3 text-sm font-medium text-white/65 transition-colors hover:border-red-400/20 hover:bg-red-400/[0.07] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={16} />
          {/* {isIgnoring ? "Ignoring..." : "Ignore"} */}
          Ignore
        </button>
      </div>
    </article>
  );
}
