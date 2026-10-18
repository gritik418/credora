"use client";

import { SuggestedPeople } from "@/features/connection/connection.interface";
import { Skill } from "@/features/skills/skills.interface";
import {
  ArrowUpRight,
  BadgeCheck,
  MessageCircle,
  MoreHorizontal,
  Users,
} from "lucide-react";

interface ConnectionCardProps {
  user: SuggestedPeople;
}

const ConnectionCard = ({ user }: ConnectionCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/4">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-400/6 blur-2xl transition-all duration-500 group-hover:bg-violet-400/11" />

      <div className="relative flex items-start justify-between">
        <button
          className="relative shrink-0"
          aria-label={`View ${user.name}'s profile`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-indigo-400/20 to-violet-500/10 text-lg font-semibold text-violet-100">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              user.name
            )}
          </div>

          {user.id && (
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-[#11121a] bg-emerald-400" />
          )}
        </button>

        <button
          aria-label={`More options for ${user.name}`}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-white/6 hover:text-gray-300"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      <button className="relative mt-4 block max-w-full text-left">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-base font-semibold text-white transition-colors group-hover:text-violet-200">
            {user.name}
          </span>
          {user.id && (
            <BadgeCheck size={15} className="shrink-0 text-indigo-300" />
          )}
        </span>

        <p className="mt-1 truncate text-sm text-gray-400">
          {user.profile.headline}
        </p>

        <p className="mt-1 truncate text-xs text-gray-600">
          {user?.profile?.industry} · {user?.profile.city}
        </p>
      </button>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {user?.profile?.skills?.slice(0, 3).map((skill: Skill) => (
          <span
            key={skill.id}
            className="rounded-md border border-white/7 bg-white/2.5 px-2 py-1 text-[10px] text-gray-400"
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/7 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Users size={14} />
          {101} mutual
        </div>

        <div className="flex gap-2">
          <button
            aria-label={`Message ${user.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/9 text-gray-400 transition-colors hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-200"
          >
            <MessageCircle size={16} />
          </button>

          <button className="flex h-9 items-center gap-1.5 rounded-xl border border-white/9 px-3 text-xs font-medium text-gray-300 transition-all hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white">
            Profile
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ConnectionCard;
