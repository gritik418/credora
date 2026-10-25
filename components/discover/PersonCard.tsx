"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Check,
  MapPin,
  MoreHorizontal,
  UserPlus,
} from "lucide-react";
import type { Person } from "./discover.data";

type PersonCardProps = {
  person: Person;
  compact?: boolean;
};

export default function PersonCard({
  person,
  compact = false,
}: PersonCardProps) {
  const [status, setStatus] = useState(person.connectionStatus);

  const handleConnection = () => {
    setStatus((current) => {
      if (current === "connected") return "none";
      if (current === "pending") return "none";
      return "pending";
    });
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-(--org-border) bg-(--org-surface) p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--org-border-hover) hover:bg-(--org-surface-hover) sm:p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <img
            src={person.avatar}
            alt={person.name}
            className="h-14 w-14 rounded-2xl border border-white/8 object-cover"
          />

          {person.verified && (
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-(--org-surface) bg-(--org-surface)">
              <BadgeCheck size={15} className="text-indigo-400" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-(--org-text)">
                {person.name}
              </h3>

              <p className="mt-0.5 truncate text-xs text-(--org-text-muted)">
                @{person.username}
              </p>
            </div>

            <button
              type="button"
              aria-label={`More options for ${person.name}`}
              className="rounded-lg p-1 text-(--org-text-muted) transition hover:bg-white/6 hover:text-white"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-10 text-sm leading-5 text-(--org-text-secondary)">
        {person.headline}
      </p>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-(--org-text-muted)">
        <MapPin size={13} className="shrink-0" />
        <span className="truncate">{person.location}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {person.skills.slice(0, compact ? 2 : 3).map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-white/6 bg-white/2.5 px-2 py-1 text-[10px] text-(--org-text-secondary)"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-(--org-border) pt-4">
        <div className="flex -space-x-2">
          {[21, 32, 44]
            .slice(0, person.mutualConnections > 0 ? 3 : 0)
            .map((id) => (
              <img
                key={id}
                src={`https://i.pravatar.cc/48?img=${id}`}
                alt=""
                className="h-5 w-5 rounded-full border-2 border-(--org-surface) object-cover"
              />
            ))}
        </div>

        <span className="min-w-0 flex-1 truncate text-[10px] text-(--org-text-muted)">
          {person.mutualConnections > 0
            ? `${person.mutualConnections} mutual connections`
            : "Grow your network"}
        </span>

        <button
          type="button"
          onClick={handleConnection}
          className={`flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition ${
            status === "pending"
              ? "border border-amber-400/20 bg-amber-400/7 text-amber-300 hover:bg-amber-400/10"
              : status === "connected"
                ? "border border-emerald-400/20 bg-emerald-400/7 text-emerald-300"
                : "org-primary-button"
          }`}
        >
          {status === "pending" ? (
            <>
              <Check size={13} />
              Requested
            </>
          ) : status === "connected" ? (
            <>
              <Check size={13} />
              Connected
            </>
          ) : (
            <>
              <UserPlus size={13} />
              Connect
            </>
          )}
        </button>
      </div>
    </article>
  );
}
