"use client";

import { selectSentConnectionRequestIds } from "@/features/connection-request/connection-request.selectors";
import { SuggestedPeople } from "@/features/connection/connection.interface";
import { selectConnectedUserIds } from "@/features/connection/connection.selectors";
import { getInitials } from "@/lib/string.utils";
import { useAppSelector } from "@/store/hooks";
import { useConnectionActions } from "@/store/hooks/connections/useConnectionActions";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  MapPin,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SuggestedPersonCardProps {
  person: SuggestedPeople;
}

export default function SuggestedPersonCard({
  person,
}: SuggestedPersonCardProps) {
  const [imageError, setImageError] = useState<boolean>(false);
  const connectedUserIds = useAppSelector(selectConnectedUserIds);
  const sentConnectionRequestIds = useAppSelector(
    selectSentConnectionRequestIds,
  );

  const { isSendingRequest, sendConnectionRequest } = useConnectionActions();

  const profile = person.profile;

  const location = profile.city;

  const skills = profile.skills ?? [];
  const visibleSkills = skills.slice(0, 3);
  const remainingSkills = Math.max(0, skills.length - visibleSkills.length);

  const matchReason = person.matchReasons?.[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/30">
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Match indicator */}
      <div className="flex items-center justify-between gap-2 px-4 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          {person.is2ndDegree ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-sky-400/15 bg-sky-400/8 px-2 py-1 text-[10px] font-semibold text-sky-300">
              <Users size={11} />
              2nd
            </span>
          ) : person.is3rdDegree ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-violet-400/15 bg-violet-400/8 px-2 py-1 text-[10px] font-semibold text-violet-300">
              <Users size={11} />
              3rd
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/8 bg-white/4 px-2 py-1 text-[10px] font-medium text-white/45">
              <Sparkles size={11} />
              Suggested
            </span>
          )}
        </div>

        {matchReason && (
          <div
            title={matchReason}
            className="flex max-w-[65%] items-center gap-1 rounded-full border border-indigo-400/15 bg-indigo-500/8 px-2 py-1 text-[10px] font-medium text-indigo-200"
          >
            <Sparkles size={11} className="shrink-0" />
            <span className="truncate">{matchReason}</span>
          </div>
        )}
      </div>

      {/* Person identity */}
      <div className="flex flex-col items-center px-5 pt-5 text-center">
        <Link
          href={`/${person.username}`}
          aria-label={`View ${person.name}'s identity`}
          className="relative mb-3 flex size-19 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-indigo-500/25 via-violet-500/15 to-blue-500/10 text-lg font-semibold text-indigo-100 ring-4 ring-white/2 transition-transform duration-300 group-hover:scale-[1.03]"
        >
          {person.avatar && !imageError ? (
            <Image
              src={person.avatar}
              alt={person.name}
              fill
              sizes="76px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            getInitials(person.name)
          )}
        </Link>

        <div className="flex max-w-full items-center justify-center gap-1.5">
          <Link
            href={`/identity/${person.username}`}
            className="truncate text-sm font-semibold text-white transition-colors hover:text-indigo-300"
          >
            {person.name}
          </Link>

          {person.isVerified && (
            <BadgeCheck
              size={16}
              className="shrink-0 text-indigo-400"
              aria-label="Verified"
            />
          )}
        </div>

        <p className="mt-1 text-xs text-white/35">@{person.username}</p>

        <p className="mt-3 line-clamp-2 min-h-9 max-w-70 text-[13px] leading-4.5 text-white/65">
          {profile.headline ||
            profile.profession ||
            profile.industry ||
            "Professional on Credora"}
        </p>
      </div>

      {/* Professional details */}
      <div className="mx-4 mt-4 space-y-2.5 rounded-xl border border-white/5 bg-white/2 p-3">
        {profile.profession && (
          <div className="flex items-center gap-2.5">
            <BriefcaseBusiness size={14} className="shrink-0 text-white/30" />
            <span className="truncate text-xs text-white/55">
              {profile.profession}
            </span>
          </div>
        )}

        {location && (
          <div className="flex items-center gap-2.5">
            <MapPin size={14} className="shrink-0 text-white/30" />
            <span className="truncate text-xs text-white/55">{location}</span>
          </div>
        )}

        {profile.educations?.[0]?.institution && (
          <div className="flex items-center gap-2.5">
            <GraduationCap size={14} className="shrink-0 text-white/30" />
            <span className="truncate text-xs text-white/55">
              {profile.educations[0].institution}
            </span>
          </div>
        )}

        {!profile.profession &&
          !location &&
          !profile.educations?.[0]?.institution && (
            <p className="text-xs text-white/35">
              Discover their professional identity
            </p>
          )}
      </div>

      {/* Shared skills */}
      <div className="flex-1 px-4 pb-4 pt-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
            Skills
          </span>

          {skills.length > 0 && (
            <span className="text-[10px] text-white/30">
              {skills.length} {skills.length === 1 ? "skill" : "skills"}
            </span>
          )}
        </div>

        {visibleSkills.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill, index) => {
              return (
                <span
                  key={`${skill.slug}-${index}`}
                  className="max-w-full truncate rounded-lg border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[10px] text-white/55"
                >
                  {skill.name}
                </span>
              );
            })}

            {remainingSkills > 0 && (
              <span className="rounded-lg border border-white/[0.07] px-2 py-1 text-[10px] text-white/40">
                +{remainingSkills}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-white/30">No skills added yet</p>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-white/6 p-4">
        {connectedUserIds.includes(person.id) ? (
          <button
            type="button"
            disabled
            className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2.5 text-xs font-medium text-emerald-300"
          >
            <Check size={15} />
            Connected
          </button>
        ) : sentConnectionRequestIds.includes(person.id) ? (
          <button
            type="button"
            disabled
            className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5 text-xs font-medium text-white/45"
          >
            Request pending
          </button>
        ) : (
          <button
            type="button"
            disabled={isSendingRequest}
            onClick={() =>
              sendConnectionRequest({
                receiverId: person.id,
                message: "",
              })
            }
            className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={15} />
            {isSendingRequest ? "Sending request..." : "Connect"}
          </button>
        )}

        <Link
          href={`/identity/${person.username}`}
          className="mt-2 flex w-full items-center justify-center gap-1.5 py-1 text-[11px] text-white/35 transition-colors hover:text-white/75"
        >
          View identity
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </article>
  );
}
