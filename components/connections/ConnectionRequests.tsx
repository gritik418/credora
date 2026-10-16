"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock3,
  MapPin,
  UserRoundX,
  Users,
  X,
} from "lucide-react";

interface Props {
  requests: any[];
}

const ConnectionRequests = ({ requests }: Props) => {
  const incoming = requests.filter(
    (request) => request.direction === "incoming",
  );

  const outgoing = requests.filter(
    (request) => request.direction === "outgoing",
  );

  const RequestCard = ({ request }: { request: any }) => {
    const user = request.user;
    const isIncoming = request.direction === "incoming";

    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-white/7 bg-[#0c0e14] p-4 transition hover:border-white/12 sm:flex-row sm:items-center sm:p-5">
        <a
          href={`/identity/${user.username}`}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${user.avatarColor} text-sm font-semibold text-white`}
        >
          {user.initials}
        </a>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`/identity/${user.username}`}
              className="text-sm font-semibold text-white transition hover:text-indigo-300"
            >
              {user.name}
            </a>
            {user.verified && (
              <BadgeCheck size={15} className="text-indigo-300" />
            )}
          </div>

          <p className="mt-1 line-clamp-2 text-sm text-gray-400">
            {user.headline}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} />
              {user.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users size={12} />
              {user.mutualConnections} mutual connections
            </span>
          </div>

          <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-gray-600">
            {isIncoming ? (
              <ArrowDownLeft size={13} />
            ) : (
              <ArrowUpRight size={13} />
            )}
            {isIncoming ? "Received" : "Sent"} {request.sentAt}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isIncoming ? (
            <>
              <button
                type="button"
                aria-label={`Decline ${user.name}'s request`}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 text-gray-400 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300"
              >
                <X size={17} />
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                <Check size={15} />
                Accept
              </button>
            </>
          ) : (
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/8 px-3 text-sm text-gray-300 transition hover:border-rose-400/25 hover:bg-rose-500/6 hover:text-rose-300"
            >
              <UserRoundX size={15} />
              Cancel request
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-7">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Received requests
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              People who want to connect with you
            </p>
          </div>
          <span className="rounded-lg border border-white/7 bg-white/2.5 px-2.5 py-1 text-xs text-gray-400">
            {incoming.length}
          </span>
        </div>

        {incoming.length > 0 ? (
          <div className="space-y-3">
            {incoming.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/8 px-5 py-9 text-center">
            <Clock3 className="mx-auto text-gray-600" size={22} />
            <p className="mt-3 text-sm text-gray-400">
              You&apos;re all caught up on incoming requests.
            </p>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Sent requests</h2>
            <p className="mt-1 text-xs text-gray-500">
              Requests waiting for others to respond
            </p>
          </div>
          <span className="rounded-lg border border-white/7 bg-white/2.5 px-2.5 py-1 text-xs text-gray-400">
            {outgoing.length}
          </span>
        </div>

        {outgoing.length > 0 ? (
          <div className="space-y-3">
            {outgoing.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/8 px-5 py-9 text-center">
            <p className="text-sm text-gray-400">
              You have no pending sent requests.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ConnectionRequests;
