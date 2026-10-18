"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Check,
  Clock3,
  MessageSquareText,
  UserRoundCheck,
  X,
} from "lucide-react";

interface ConnectionRequestCardProps {
  request: any;
}

const ConnectionRequestCard = ({ request }: ConnectionRequestCardProps) => {
  const [status, setStatus] = useState<
    "pending" | "accepted" | "declined" | "cancelled"
  >("pending");

  const isIncoming = request.direction === "incoming";

  const handleAction = (action: "accepted" | "declined" | "cancelled") => {
    if (status !== "pending") return;

    setStatus(action);
  };

  return (
    <article className="group rounded-2xl border border-white/8 bg-white/2.5 p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035] sm:p-5">
      <div className="flex items-start gap-3.5">
        <button
          aria-label={`View ${request.name}'s profile`}
          className="relative shrink-0"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-violet-400/20 to-blue-400/10 text-sm font-semibold text-violet-100">
            {request.avatar ? (
              <img
                src={request.avatar}
                alt={request.name}
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              request.initials
            )}
          </div>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <button className="truncate text-sm font-semibold text-white hover:text-violet-200">
              {request.name}
            </button>

            {request.verified && (
              <BadgeCheck size={14} className="shrink-0 text-indigo-300" />
            )}
          </div>

          <p className="mt-1 truncate text-xs text-gray-400">
            {request.headline}
          </p>

          <p className="mt-1 truncate text-xs text-gray-600">
            {request.company} · {request.location}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
            <span>{request.mutualConnections} mutual connections</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 size={11} />
              {request.sentAt}
            </span>
          </div>
        </div>
      </div>

      {request.message && (
        <div className="mt-4 flex gap-2.5 rounded-xl border border-white/6 bg-white/2 p-3">
          <MessageSquareText
            size={15}
            className="mt-0.5 shrink-0 text-gray-500"
          />
          <p className="text-xs leading-5 text-gray-400">{request.message}</p>
        </div>
      )}

      {status !== "pending" ? (
        <div className="mt-4 flex items-center gap-2 border-t border-white/6 pt-4 text-xs text-gray-400">
          {status === "accepted" ? (
            <>
              <UserRoundCheck size={15} className="text-emerald-400" />
              Connection accepted
            </>
          ) : status === "declined" ? (
            <>
              <X size={15} />
              Request declined
            </>
          ) : (
            <>
              <X size={15} />
              Request cancelled
            </>
          )}
        </div>
      ) : isIncoming ? (
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2 border-t border-white/6 pt-4">
          <button
            onClick={() => handleAction("accepted")}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-3 text-xs font-medium text-white transition-all hover:brightness-110"
          >
            <Check size={14} />
            Accept request
          </button>

          <button
            onClick={() => handleAction("declined")}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/9 px-3 text-xs text-gray-400 transition-colors hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300"
          >
            <X size={14} />
            Decline
          </button>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/6 pt-4">
          <span className="flex items-center gap-2 text-xs text-amber-300">
            <Clock3 size={14} />
            Awaiting response
          </span>

          <button
            onClick={() => handleAction("cancelled")}
            className="rounded-lg border border-white/8 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-red-400/20 hover:text-red-300"
          >
            Cancel request
          </button>
        </div>
      )}
    </article>
  );
};

export default ConnectionRequestCard;
