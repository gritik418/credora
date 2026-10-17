"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Sparkles,
  Users,
  UserPlus,
} from "lucide-react";
import { SuggestedPeople } from "@/features/connection/connection.interface";
import { Skill } from "@/features/skills/skills.interface";

interface DiscoverCardProps {
  user: SuggestedPeople;
}

const DiscoverCard = ({ user }: DiscoverCardProps) => {
  const [sent, setSent] = useState(false);

  const handleConnect = () => {
    if (sent) return;

    setSent(true);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/25 hover:bg-white/[0.04]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/[0.05] blur-3xl transition-colors group-hover:bg-violet-400/[0.1]" />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/15 bg-indigo-400/[0.06] px-2.5 py-1 text-[10px] font-medium text-indigo-200">
          <Sparkles size={11} />
          Suggested for you
        </span>

        {user && <BadgeCheck size={17} className="text-indigo-300" />}
      </div>

      <button className="relative mt-5 flex w-full flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[26px] border border-white/10 bg-gradient-to-br from-violet-400/20 via-indigo-400/10 to-blue-400/15 text-xl font-semibold text-white shadow-lg shadow-indigo-950/20">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-[26px] object-cover"
              />
            ) : (
              user.name
            )}
          </div>

          {user.id && (
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-[3px] border-[#11121a] bg-emerald-400" />
          )}
        </div>

        <h3 className="flex items-center gap-1.5 text-base font-semibold text-white transition-colors group-hover:text-violet-200">
          {user.name}
          {user.id && <BadgeCheck size={14} className="text-indigo-300" />}
        </h3>

        <p className="mt-1 max-w-full truncate text-sm text-gray-400">
          {user.profile.headline}
        </p>

        <p className="mt-1 text-xs text-gray-600">
          {user.profile.profession} · {user.profile.city}
        </p>
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <Users size={14} />
        20 mutual connections
      </div>

      <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-600">
          Shared interests
        </p>

        <div className="flex flex-wrap justify-center gap-1.5">
          {user.profile.skills?.slice(0, 3).map((skill: Skill) => (
            <span
              key={skill.id}
              className="rounded-md bg-white/[0.045] px-2 py-1 text-[10px] text-gray-400"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <button
          onClick={handleConnect}
          disabled={sent}
          className={`flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium transition-all ${
            sent
              ? "border border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
              : "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-950/20 hover:brightness-110"
          }`}
        >
          {sent ? <Check size={15} /> : <UserPlus size={15} />}
          {sent ? "Request sent" : "Connect"}
        </button>

        <button
          aria-label={`View ${user.name}'s profile`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowUpRight size={17} />
        </button>
      </div>
    </article>
  );
};

export default DiscoverCard;
