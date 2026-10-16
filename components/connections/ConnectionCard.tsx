"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Props {
  user: any;
  mode: "connected" | "discover" | "pending";
}

const ConnectionCard = ({ user, mode }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article className="group relative flex min-w-0 flex-col rounded-2xl border border-white/7 bg-[#0c0e14] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400/25 hover:bg-[#10121b] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <a
          href={`/identity/${user.username}`}
          aria-label={`View ${user.name}'s identity`}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${user.avatarColor} text-sm font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition group-hover:scale-[1.03]`}
        >
          {user.initials}
        </a>

        {user.verified && (
          <span
            title="Verified professional"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300"
          >
            <BadgeCheck size={16} />
          </span>
        )}
      </div>

      <div className="mt-4 min-w-0">
        <a
          href={`/identity/${user.username}`}
          className="inline-flex max-w-full items-center gap-1.5 text-[15px] font-semibold text-white transition hover:text-indigo-300"
        >
          <span className="truncate">{user.name}</span>
        </a>

        <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
          {user.headline}
        </p>

        <div className="mt-3 flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{user.location}</span>
        </div>

        <div className="mt-2 flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
          <Users size={13} className="shrink-0" />
          <span>
            {user.mutualConnections} mutual connection
            {user.mutualConnections === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {user.skills.slice(0, 3).map((skill: any) => (
          <span
            key={skill}
            className="max-w-full truncate rounded-lg border border-white/6 bg-white/2.5 px-2 py-1 text-[10px] font-medium text-gray-400"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-white/6 pt-4">
        {mode === "connected" && (
          <>
            <a
              href={`/messages?user=${encodeURIComponent(user.username)}`}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/9 bg-white/2.5 px-3 text-sm font-medium text-gray-200 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white"
            >
              <MessageCircle size={15} />
              Message
            </a>

            <div className="relative">
              <button
                type="button"
                aria-label={`More actions for ${user.name}`}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/7 text-gray-500 transition hover:bg-white/5 hover:text-white"
              >
                <MoreHorizontal size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 z-20 w-48 rounded-xl border border-white/10 bg-[#151821] p-1.5 shadow-2xl shadow-black/40">
                  <a
                    href={`/identity/${user.username}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <BriefcaseBusiness size={14} />
                    View identity
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-rose-300 transition hover:bg-rose-500/10"
                  >
                    <UserMinus size={14} />
                    Remove connection
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {mode === "discover" && (
          <>
            <button
              type="button"
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              <UserPlus size={15} />
              Connect
            </button>

            <a
              href={`/identity/${user.username}`}
              aria-label={`View ${user.name}'s identity`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <BriefcaseBusiness size={16} />
            </a>
          </>
        )}

        {mode === "pending" && (
          <button
            type="button"
            className="h-10 flex-1 rounded-xl border border-white/8 text-sm font-medium text-gray-300 transition hover:border-rose-400/25 hover:bg-rose-500/6 hover:text-rose-300"
          >
            Cancel request
          </button>
        )}
      </div>
    </article>
  );
};

export default ConnectionCard;
