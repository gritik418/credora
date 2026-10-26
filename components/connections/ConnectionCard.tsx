"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  UserRound,
  UserRoundMinus,
} from "lucide-react";
import { useState } from "react";
import { Connection } from "@/features/connection/connection.interface";

interface ConnectionCardProps {
  connection: Connection;
}

export default function ConnectionCard({ connection }: ConnectionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const person = connection.connection;
  const profile = person.profile;

  const location = [profile.city, profile.state, profile.country]
    .filter(Boolean)
    .join(", ");

  const initials =
    person.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f15] transition-all duration-300 hover:border-indigo-500/30 hover:bg-[#10121a]">
      {/* Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between p-5 pb-0">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-sm font-semibold text-indigo-200">
            {person.avatar ? (
              <Image
                src={person.avatar}
                alt={person.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">
              {person.name}
            </h3>

            <Link
              href={`/identity/${person.username}`}
              className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-xs text-white/40 transition-colors hover:text-indigo-300"
            >
              <span className="truncate">@{person.username}</span>
              <ArrowUpRight size={12} className="shrink-0" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Connection options"
            aria-expanded={menuOpen}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/6 hover:text-white"
          >
            <MoreHorizontal size={19} />
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                aria-label="Close options menu"
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setMenuOpen(false)}
              />

              <div className="absolute right-0 top-9 z-20 w-48 rounded-xl border border-white/10 bg-[#151720] p-1.5 shadow-2xl shadow-black/40">
                <Link
                  href={`/identity/${person.username}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs text-white/70 transition-colors hover:bg-white/6 hover:text-white"
                >
                  <UserRound size={15} />
                  View identity
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <UserRoundMinus size={15} />
                  Remove connection
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="min-h-10.5">
          <p className="line-clamp-2 text-sm leading-5 text-white/75">
            {profile.headline || profile.profession || "Credora member"}
          </p>
        </div>

        {profile.profession && profile.headline && (
          <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
            <BriefcaseBusiness size={13} className="shrink-0" />
            <span className="truncate">{profile.profession}</span>
          </div>
        )}

        {location && (
          <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {profile.bio && (
          <p className="mt-4 line-clamp-2 text-xs leading-5 text-white/45">
            {profile.bio}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 border-t border-white/6 pt-4">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-xs font-medium text-white/75 transition-colors hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-200"
          >
            <MessageCircle size={14} />
            Message
          </button>

          <Link
            href={`/identity/${person.username}`}
            aria-label={`View ${person.name}'s identity`}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white transition-colors hover:bg-indigo-400"
          >
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
