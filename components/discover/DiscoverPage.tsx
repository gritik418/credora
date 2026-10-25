"use client";

import {
  ArrowDownWideNarrow,
  Compass,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import DiscoverSearch from "./DiscoverSearch";
import DiscoverSidebar from "./DiscoverSidebar";
import DiscoverTabs from "./DiscoverTabs";
import OrganizationsSection from "./OrganizationsSection";
import PeopleSection from "./PeopleSection";

import {
  organizations as initialOrganizations,
  people as initialPeople,
  type DiscoverTab,
} from "./discover.data";

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<DiscoverTab>("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"relevant" | "name">("relevant");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredPeople = useMemo(() => {
    let result = initialPeople.filter((person) => {
      const searchable = [
        person.name,
        person.username,
        person.headline,
        person.location,
        ...person.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchable.includes(normalizedSearch);

      const matchesVerified = !verifiedOnly || person.verified;

      return matchesSearch && matchesVerified;
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [normalizedSearch, verifiedOnly, sortBy]);

  const filteredOrganizations = useMemo(() => {
    let result = initialOrganizations.filter((organization) => {
      const searchable = [
        organization.name,
        organization.description,
        organization.industry,
        organization.location,
        ...organization.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchable.includes(normalizedSearch);

      const matchesVerified = !verifiedOnly || organization.verified === true;

      return matchesSearch && matchesVerified;
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [normalizedSearch, verifiedOnly, sortBy]);

  const isSearching = normalizedSearch.length > 0;

  const handleSkillSearch = (skill: string) => {
    setSearch(skill);
    setActiveTab("all");
  };

  const clearFilters = () => {
    setVerifiedOnly(false);
    setSortBy("relevant");
  };

  return (
    <main className="org-shell org-background min-h-screen">
      <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-12 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        {/* Page heading */}
        <header className="mb-7 flex flex-col justify-between gap-5 sm:mb-9 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-500/7 px-3 py-1.5">
              <Sparkles size={13} className="text-indigo-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-200">
                Your professional world
              </span>
            </div>

            <h1 className="org-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Discover
              <span className="ml-2 bg-linear-to-r from-indigo-300 via-violet-300 to-blue-300 bg-clip-text text-transparent">
                more.
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-(--org-text-muted)">
              Find people who inspire you, organizations doing meaningful work,
              and connections that move you forward.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-(--org-border) bg-(--org-surface) px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10">
              <Compass size={18} className="text-indigo-300" />
            </div>
            <div>
              <p className="text-xs font-medium text-(--org-text)">
                Discover your next connection
              </p>
              <p className="mt-1 text-[11px] text-(--org-text-muted)">
                People · Teams · Opportunities
              </p>
            </div>
          </div>
        </header>

        {/* Search and filters */}
        <section className="mb-5 space-y-3">
          <DiscoverSearch
            value={search}
            onChange={setSearch}
            onFiltersClick={() => setShowFilters((current) => !current)}
          />

          {showFilters && (
            <div className="org-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-(--org-text-secondary)">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(event) => setVerifiedOnly(event.target.checked)}
                    className="h-4 w-4 accent-indigo-500"
                  />
                  Verified only
                </label>

                <div className="flex items-center gap-2 text-sm text-(--org-text-secondary)">
                  <ArrowDownWideNarrow size={15} />
                  <label htmlFor="discover-sort">Sort by</label>
                  <select
                    id="discover-sort"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value as "relevant" | "name")
                    }
                    className="rounded-lg border border-(--org-border) bg-[#0d1018] px-2 py-1.5 text-xs text-(--org-text) outline-none focus:border-indigo-500/40"
                  >
                    <option value="relevant">Relevance</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="self-start text-xs text-indigo-300 transition hover:text-white sm:self-auto"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Tabs */}
        <div className="mb-7">
          <DiscoverTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            peopleCount={filteredPeople.length}
            organizationsCount={filteredOrganizations.length}
          />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_310px]">
          <div className="min-w-0 space-y-9">
            {activeTab === "all" && !isSearching && (
              <section className="relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-(--org-surface) p-5 sm:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.14),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.07),transparent_45%)]" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-300">
                      <Sparkles size={14} />
                      <span>GOOD THINGS HAPPEN THROUGH CONNECTIONS</span>
                    </div>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-(--org-text) sm:text-2xl">
                      Your next chapter starts with a discovery.
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-(--org-text-muted)">
                      Find professionals with shared interests, explore
                      organizations, and discover the people behind great work.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("people")}
                      className="org-primary-button flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
                    >
                      <Users size={16} />
                      Find people
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "all" && (
              <>
                <PeopleSection
                  people={
                    isSearching ? filteredPeople : filteredPeople.slice(0, 4)
                  }
                  title={
                    isSearching ? "Matching people" : "People you may know"
                  }
                  description={
                    isSearching
                      ? "Professionals matching your search."
                      : "Professionals worth getting to know."
                  }
                  onViewAll={
                    !isSearching ? () => setActiveTab("people") : undefined
                  }
                />

                <OrganizationsSection
                  organizations={
                    isSearching
                      ? filteredOrganizations
                      : filteredOrganizations.slice(0, 3)
                  }
                  title={
                    isSearching
                      ? "Matching organizations"
                      : "Organizations to explore"
                  }
                  description="Explore teams and the work they do."
                  onViewAll={
                    !isSearching
                      ? () => setActiveTab("organizations")
                      : undefined
                  }
                />
              </>
            )}

            {activeTab === "people" && (
              <PeopleSection
                people={filteredPeople}
                title={isSearching ? "Search results" : "Discover people"}
                description="Build your network with meaningful professional connections."
              />
            )}

            {activeTab === "organizations" && (
              <OrganizationsSection
                organizations={filteredOrganizations}
                title={
                  isSearching ? "Search results" : "Discover organizations"
                }
                description="Find teams, workplaces, and communities to explore."
              />
            )}

            {isSearching &&
              filteredPeople.length === 0 &&
              filteredOrganizations.length === 0 && (
                <div className="org-card flex flex-col items-center px-5 py-14 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-(--org-border) bg-white/2.5">
                    <Search size={23} className="text-(--org-text-muted)" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-(--org-text)">
                    Nothing found just yet
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-(--org-text-muted)">
                    We couldn't find people or organizations matching &quot;
                    {search}&quot;. Try a different name, skill, or keyword.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveTab("all");
                    }}
                    className="org-primary-button mt-5 rounded-xl px-4 py-2.5 text-sm font-medium"
                  >
                    Explore everything
                  </button>
                </div>
              )}
          </div>

          <div className="min-w-0 xl:sticky xl:top-6">
            <DiscoverSidebar onSearchSkill={handleSkillSearch} />

            <div className="mt-5 px-2">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-(--org-text-faint)">
                <span>About Credora</span>
                <span>Privacy</span>
                <span>Guidelines</span>
              </div>
              <p className="mt-3 text-[10px] text-(--org-text-faint)">
                © 2026 Credora. Build a reputation that reflects your work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
