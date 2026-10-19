"use client";

import { useMemo } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  MapPin,
  MoreHorizontal,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { SuggestedPeople } from "@/features/connection/connection.interface";

type Props = {
  person: SuggestedPeople;
  requestSent: boolean;
  onConnect: () => void;
};

const ConnectionCard = ({ person, requestSent, onConnect }: Props) => {
  const item = person as any;

  const profile = item.profile ?? item.user?.profile ?? {};
  const name =
    item.name ??
    item.fullName ??
    item.user?.name ??
    [item.firstName, item.lastName].filter(Boolean).join(" ") ??
    "Professional";

  const headline =
    item.headline ??
    profile.headline ??
    item.designation ??
    item.title ??
    item.user?.headline ??
    "Professional";

  const company =
    item.company ??
    item.currentCompany ??
    profile.experiences?.[0]?.company ??
    item.user?.company ??
    "";

  const institution =
    item.institution ?? profile.educations?.[0]?.institution ?? "";

  const location = item.location ?? profile.location ?? item.city ?? "";

  const avatar =
    item.avatar ??
    item.avatarUrl ??
    item.profileImage ??
    item.image ??
    item.user?.avatar ??
    item.user?.profileImage ??
    profile.avatar ??
    profile.avatarUrl ??
    "";

  const initials = useMemo(
    () =>
      name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part: string) => part[0])
        .join("")
        .toUpperCase(),
    [name],
  );

  const reason = company
    ? "Shared professional interests"
    : institution
      ? "Shared education"
      : "Suggested for you";

  return (
    <article className="group relative flex min-h-75 flex-col overflow-hidden rounded-2xl border border-white/8 bg-credora-card-bg transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/25">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-br from-violet-500/10 via-indigo-500/4 to-transparent opacity-70 transition group-hover:opacity-100" />

      <div className="relative flex items-start justify-between p-5 pb-0">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-violet-500/25 to-indigo-500/10 text-sm font-semibold text-violet-200">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              initials || <UserRound size={22} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-zinc-100 transition group-hover:text-white">
              {name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
              {headline}
            </p>
          </div>
        </div>

        <button
          aria-label={`More options for ${name}`}
          className="ml-2 rounded-lg p-1.5 text-zinc-600 transition hover:bg-white/6 hover:text-zinc-300"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      <div className="relative flex-1 px-5 pt-5">
        <div className="space-y-2.5">
          {company && (
            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <BriefcaseBusiness size={14} className="shrink-0 text-zinc-600" />
              <span className="truncate">{company}</span>
            </div>
          )}

          {institution && (
            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <GraduationCap size={14} className="shrink-0 text-zinc-600" />
              <span className="truncate">{institution}</span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <MapPin size={14} className="shrink-0 text-zinc-600" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {!company && !institution && !location && (
            <p className="text-xs leading-5 text-zinc-500">
              Explore their professional identity and experience on Credora.
            </p>
          )}
        </div>

        <div className="mt-5 inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/6 bg-white/2.5 px-2.5 py-1.5 text-[11px] text-zinc-500">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
          <span className="truncate">{reason}</span>
        </div>
      </div>

      <div className="relative mt-5 border-t border-white/6 p-4">
        <button
          onClick={onConnect}
          disabled={requestSent}
          className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-btn-primary text-sm font-medium transition ${
            requestSent
              ? "cursor-default border border-emerald-400/15 bg-emerald-400/6 text-emerald-300"
              : "bg-violet-500 text-white shadow-lg shadow-violet-950/20 hover:bg-violet-400 active:scale-[0.99]"
          }`}
        >
          {requestSent ? (
            <>
              <Check size={16} />
              Request sent
            </>
          ) : (
            <>
              <UserRoundPlus size={16} />
              Connect
              <ArrowUpRight size={14} className="opacity-60" />
            </>
          )}
        </button>
      </div>
    </article>
  );
};

export default ConnectionCard;
