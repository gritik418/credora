"use client";

import { selectSentConnectionRequestIds } from "@/features/connection-request/connection-request.selectors";
import { SuggestedPeople } from "@/features/connection/connection.interface";
import { selectConnectedUserIds } from "@/features/connection/connection.selectors";
import { getInitials } from "@/lib/string.utils";
import { useAppSelector } from "@/store/hooks";
import { useConnectionActions } from "@/store/hooks/connections/useConnectionActions";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Check,
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

  const isConnected = connectedUserIds.includes(person.id);
  const isRequestSent = sentConnectionRequestIds.includes(person.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1020] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/30">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Badges */}
      <div className="flex items-center justify-between gap-2 px-4 pt-3.5">
        <span
          className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium ${
            person.is2ndDegree
              ? "border-sky-400/15 bg-sky-400/6 text-sky-300"
              : person.is3rdDegree
                ? "border-violet-400/15 bg-violet-400/6 text-violet-300"
                : "border-white/7 bg-white/3 text-white/40"
          }`}
        >
          <Users size={11} />
          {person.is2ndDegree
            ? "2nd"
            : person.is3rdDegree
              ? "3rd"
              : "Suggested"}
        </span>

        {person.matchReasons?.[0] && (
          <span
            title={person.matchReasons[0]}
            className="flex max-w-[60%] items-center gap-1 rounded-full border border-indigo-400/15 bg-indigo-500/6 px-2 py-1 text-[10px] text-indigo-300"
          >
            <Sparkles size={11} className="shrink-0" />
            <span className="truncate">{person.matchReasons[0]}</span>
          </span>
        )}
      </div>

      {/* Identity */}
      <div className="flex flex-col items-center gap-3 px-4 py-4">
        <Link
          href={`/${person.username}`}
          className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-indigo-400/20 bg-linear-to-br from-indigo-500/25 via-violet-500/15 to-blue-500/10 text-sm font-semibold text-indigo-100 ring-2 ring-white/2 transition-transform group-hover:scale-[1.03]"
        >
          {person.avatar && !imageError ? (
            <Image
              src={person.avatar}
              alt={person.name}
              fill
              sizes="64px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            getInitials(person.name)
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
          <div className="flex items-center gap-1">
            <Link
              href={`/${person.username}`}
              className="truncate text-sm font-semibold text-white transition-colors hover:text-indigo-300"
            >
              {person.name}
            </Link>

            {person.isVerified && (
              <BadgeCheck
                size={14}
                className="shrink-0 text-indigo-400"
                aria-label="Verified"
              />
            )}
          </div>

          <p className="mt-0.5 truncate text-[11px] text-white/35">
            @{person.username}
          </p>

          <p className="mt-1 line-clamp-1 text-xs text-white/55">
            {profile.headline ||
              profile.profession ||
              profile.industry ||
              "Professional on Credora"}
          </p>
        </div>
      </div>

      {/* Professional details */}
      {(profile.profession || profile.city) && (
        <div className="flex items-start flex-col gap-0.5 px-4 pb-3">
          {profile.profession && (
            <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-white/40">
              <BriefcaseBusiness size={12} className="shrink-0" />
              <span className="truncate">{profile.profession}</span>
            </span>
          )}

          {profile.city && (
            <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-white/40">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{profile.city}</span>
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 border-t border-white/6 p-3">
        {isConnected ? (
          <button
            type="button"
            disabled
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2 text-xs font-medium text-emerald-300"
          >
            <Check size={14} />
            Connected
          </button>
        ) : isRequestSent ? (
          <button
            type="button"
            disabled
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-xs font-medium text-white/45"
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
            className="flex cursor-pointer flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={14} />
            {isSendingRequest ? "Sending..." : "Connect"}
          </button>
        )}
      </div>
    </article>
  );
}
