"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Check,
  Compass,
  Flame,
  Hash,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { discoveryCategories, trendingSkills } from "./discover.data";

type DiscoverSidebarProps = {
  onSearchSkill: (skill: string) => void;
};

const categoryIcons = [BriefcaseBusiness, Sparkles, Flame, Users];

export default function DiscoverSidebar({
  onSearchSkill,
}: DiscoverSidebarProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill],
    );

    onSearchSkill(skill);
  };

  return (
    <aside className="space-y-4">
      <section className="org-card-gradient relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10">
            <Compass size={19} className="text-indigo-300" />
          </div>

          <h3 className="mt-4 text-base font-semibold text-(--org-text)">
            Your next connection starts here.
          </h3>

          <p className="mt-2 text-xs leading-5 text-(--org-text-muted)">
            Discover professionals, find great teams, and build a stronger
            professional identity.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-indigo-300">
            <Sparkles size={14} />
            <span>Make your work discoverable</span>
          </div>
        </div>
      </section>

      <section className="org-card p-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-indigo-300" />
          <h3 className="text-sm font-semibold text-(--org-text)">
            Trending skills
          </h3>
        </div>

        <p className="mt-1 text-xs text-(--org-text-muted)">
          Explore people by what they do.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {trendingSkills.map((skill) => {
            const selected = selectedSkills.includes(skill);

            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs transition ${
                  selected
                    ? "border-indigo-400/30 bg-indigo-500/10 text-indigo-200"
                    : "border-(--org-border) bg-white/2 text-(--org-text-secondary) hover:border-indigo-400/20 hover:bg-indigo-500/5"
                }`}
              >
                {selected ? <Check size={12} /> : <Hash size={12} />}
                {skill}
              </button>
            );
          })}
        </div>
      </section>

      <section className="org-card p-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-violet-300" />
          <h3 className="text-sm font-semibold text-(--org-text)">
            Explore by interest
          </h3>
        </div>

        <div className="mt-3 space-y-1">
          {discoveryCategories.map((category, index) => {
            const Icon = categoryIcons[index] ?? BriefcaseBusiness;

            return (
              <button
                key={category.label}
                type="button"
                onClick={() => onSearchSkill(category.label)}
                className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-3 text-left transition hover:bg-white/[0.035]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-(--org-border) bg-white/2.5 text-(--org-text-muted) transition group-hover:border-indigo-400/20 group-hover:text-indigo-300">
                  <Icon size={16} />
                </span>

                <span className="min-w-0 flex-1 text-xs font-medium text-(--org-text-secondary) transition group-hover:text-white">
                  {category.label}
                </span>

                <ArrowUpRight
                  size={14}
                  className="text-(--org-text-faint) transition group-hover:text-indigo-300"
                />
              </button>
            );
          })}
        </div>
      </section>

      <section className="org-card p-4">
        <div className="flex items-center gap-2">
          <Bookmark size={16} className="text-indigo-300" />
          <h3 className="text-sm font-semibold text-(--org-text)">
            Make your mark
          </h3>
        </div>

        <p className="mt-2 text-xs leading-5 text-(--org-text-muted)">
          Keep your skills and work history up to date so the right people can
          find you.
        </p>

        <button
          type="button"
          className="org-secondary-button mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs"
        >
          <Building2 size={14} />
          Explore your network
          <ArrowUpRight size={13} />
        </button>
      </section>
    </aside>
  );
}
