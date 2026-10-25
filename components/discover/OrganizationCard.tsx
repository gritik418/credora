"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  MapPin,
  Users,
} from "lucide-react";
import type { Organization } from "./discover.data";

const logoStyles = [
  "from-indigo-500/20 to-violet-500/10 text-indigo-300",
  "from-blue-500/20 to-cyan-500/10 text-blue-300",
  "from-fuchsia-500/20 to-pink-500/10 text-fuchsia-300",
];

type OrganizationCardProps = {
  organization: Organization;
};

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  const [following, setFollowing] = useState(false);

  const logoStyle =
    logoStyles[(Number(organization.id) - 1) % logoStyles.length] ??
    logoStyles[0];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-(--org-border) bg-(--org-surface) p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--org-border-hover) hover:bg-(--org-surface-hover) sm:p-5">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/6 blur-3xl transition-all group-hover:bg-indigo-500/12" />

      <div className="relative flex items-start gap-3">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/7 bg-linear-to-br ${logoStyle}`}
        >
          {organization.logo ? (
            <img
              src={organization.logo}
              alt={`${organization.name} logo`}
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <span className="text-sm font-bold tracking-wide">
              {organization.initials}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-semibold text-(--org-text)">
              {organization.name}
            </h3>
            {organization.verified && (
              <BadgeCheck size={15} className="shrink-0 text-indigo-400" />
            )}
          </div>

          <p className="mt-1 truncate text-xs text-(--org-text-muted)">
            {organization.industry}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-(--org-text-muted)">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {organization.members} members
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {organization.location}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Explore ${organization.name}`}
          className="rounded-lg p-1.5 text-(--org-text-muted) transition hover:bg-white/6 hover:text-white"
        >
          <ArrowUpRight size={17} />
        </button>
      </div>

      <p className="relative mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-(--org-text-secondary)">
        {organization.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {organization.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-(--org-border) bg-white/2.5 px-2 py-1 text-[10px] text-(--org-text-secondary)"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-(--org-border) pt-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/4 text-(--org-text-muted)">
          <Building2 size={14} />
        </div>

        <span className="min-w-0 flex-1 truncate text-[11px] text-(--org-text-muted)">
          Explore organization
        </span>

        <button
          type="button"
          onClick={() => setFollowing((current) => !current)}
          className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition ${
            following
              ? "border border-emerald-400/20 bg-emerald-400/7 text-emerald-300"
              : "org-secondary-button"
          }`}
        >
          {following ? (
            <>
              <Check size={13} />
              Following
            </>
          ) : (
            "Follow"
          )}
        </button>
      </div>
    </article>
  );
}
