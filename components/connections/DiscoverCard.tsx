"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Sparkles,
  Users,
  UserPlus,
  Network,
  GitBranch,
  GraduationCap,
  Building2,
  Code2,
  BriefcaseBusiness,
  Factory,
  Target,
  MapPin,
  Search,
  type LucideIcon,
} from "lucide-react";
import {
  MatchReason,
  SuggestedPeople,
} from "@/features/connection/connection.interface";
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

  const suggestionReasonLabels: Record<MatchReason, string> = {
    search: "Matches your search",
    "second-degree": "Connected to your network",
    "third-degree": "In your extended network",
    institution: "Studied at the same institution",
    company: "Worked at the same company",
    skills: "Shared skills",
    profession: "Similar profession",
    industry: "Same industry",
    headline: "Similar career focus",
    bio: "Similar interests",
    city: "Based in your city",
  };

  const suggestionReasonIcons: Record<MatchReason, LucideIcon> = {
    search: Search,
    "second-degree": Network,
    "third-degree": GitBranch,
    institution: GraduationCap,
    company: Building2,
    skills: Code2,
    profession: BriefcaseBusiness,
    industry: Factory,
    headline: Target,
    bio: Sparkles,
    city: MapPin,
  };

  const suggestionReasonPriority: MatchReason[] = [
    "search",
    "second-degree",
    "third-degree",
    "institution",
    "company",
    "skills",
    "profession",
    "industry",
    "headline",
    "bio",
    "city",
  ];

  const getSuggestionReason = (reasons: MatchReason[]) => {
    const reason = suggestionReasonPriority.find((item) =>
      reasons.includes(item),
    );

    if (!reason) {
      return {
        label: "Suggested for you",
        Icon: Sparkles,
      };
    }

    return {
      label: suggestionReasonLabels[reason],
      Icon: suggestionReasonIcons[reason],
    };
  };

  const { label, Icon } = getSuggestionReason(user.matchReasons);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/25 hover:bg-white/4">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/5 blur-3xl transition-colors group-hover:bg-violet-400/1" />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/15 bg-indigo-400/6 px-2.5 py-1 text-[10px] font-medium text-indigo-200">
          <Icon size={12} /> {label}
        </span>
      </div>

      <button className="relative mt-5 flex w-full flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="flex h-19 w-19 items-center justify-center rounded-[26px] border border-white/10 bg-linear-to-br from-violet-400/20 via-indigo-400/10 to-blue-400/15 text-xl font-semibold text-white shadow-lg shadow-indigo-950/20">
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
        </div>

        <h3 className="flex items-center gap-1.5 text-base font-semibold text-white transition-colors group-hover:text-violet-200">
          {user.name}
          {user.isVerified && (
            <BadgeCheck size={14} className="text-indigo-300" />
          )}
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

      <div className="mt-4 rounded-xl border border-white/6 bg-white/2 p-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-600">
          Shared interests
        </p>

        <div className="flex flex-wrap justify-center gap-1.5">
          {user.profile.skills?.slice(0, 3).map((skill: Skill) => (
            <span
              key={skill.id}
              className="rounded-md bg-white/4.5 px-2 py-1 text-[10px] text-gray-400"
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
              ? "border border-emerald-400/20 bg-emerald-400/7 text-emerald-300"
              : "bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-950/20 hover:brightness-110"
          }`}
        >
          {sent ? <Check size={15} /> : <UserPlus size={15} />}
          {sent ? "Request sent" : "Connect"}
        </button>

        <button
          aria-label={`View ${user.name}'s profile`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/9 text-gray-400 transition-colors hover:bg-white/6 hover:text-white"
        >
          <ArrowUpRight size={17} />
        </button>
      </div>
    </article>
  );
};

export default DiscoverCard;
