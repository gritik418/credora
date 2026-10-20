"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Network,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useGetSuggestedPeopleQuery } from "@/features/connection/connection.api";
import { SuggestedPeople } from "@/features/connection/connection.interface";
import ConnectionCard from "./ConnectionCard";
import RequestsDrawer from "./RequestsDrawer";
import StatCard from "./StatCard";
import EmptyState from "./EmptyState";

const ConnectionsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All people");
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedPeople[]>([]);
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  const { data, isLoading, isError } = useGetSuggestedPeopleQuery({
    limit: 150,
    page: 1,
  });

  useEffect(() => {
    if (data?.data?.suggestedPeople) {
      setSuggestions(data.data.suggestedPeople);
    }
  }, [data]);

  const filteredPeople = useMemo(() => {
    return suggestions.filter((person) => {
      const item = person as any;
      const profile = item.profile ?? item.user?.profile ?? {};
      const name =
        item.name ??
        item.fullName ??
        item.user?.name ??
        [item.firstName, item.lastName].filter(Boolean).join(" ") ??
        "";
      const headline =
        item.headline ??
        profile.headline ??
        item.designation ??
        item.user?.headline ??
        "";
      const company =
        item.company ??
        item.currentCompany ??
        profile.experiences?.[0]?.company ??
        "";
      const institution =
        item.institution ?? profile.educations?.[0]?.institution ?? "";
      const location = item.location ?? profile.location ?? item.city ?? "";

      const searchable = [name, headline, company, institution, location]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchable.includes(search.toLowerCase());

      const matchesFilter =
        filter === "All people" ||
        (filter === "Companies" &&
          Boolean(company) &&
          company.toLowerCase().includes(search.toLowerCase())) ||
        (filter === "Institutions" &&
          Boolean(institution) &&
          institution.toLowerCase().includes(search.toLowerCase())) ||
        (filter === "Locations" &&
          Boolean(location) &&
          location.toLowerCase().includes(search.toLowerCase()));

      return matchesSearch && matchesFilter;
    });
  }, [suggestions, search, filter]);

  const handleRequestSent = (personId: string) => {
    setSentRequests((previous) =>
      previous.includes(personId) ? previous : [...previous, personId],
    );
  };

  const getPersonId = (person: SuggestedPeople) => {
    const item = person as any;
    return String(item.id ?? item.userId ?? item.user?.id ?? "");
  };

  return (
    <main className="min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-[18%] h-105 w-105 rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute -right-30 top-[35%] h-95 w-95 rounded-full bg-blue-600/6 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
        <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/7 px-3 py-1.5 text-xs font-medium text-violet-200">
              <Sparkles size={13} />
              Your professional network
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your network<span className="text-violet-400">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Meet people who share your experience, interests, and ambitions.
              Build relationships that move your career forward.
            </p>
          </div>

          <button
            onClick={() => setIsRequestsOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/4 px-4 text-sm font-medium text-zinc-200 transition hover:border-violet-400/30 hover:bg-white/7 md:self-auto"
          >
            <Users size={16} />
            Manage requests
            <ArrowUpRight size={15} className="text-zinc-500" />
          </button>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            icon={<Network size={18} />}
            label="Your connections"
            value="Your network"
            detail="People you’re connected with"
            accent="violet"
          />
          <StatCard
            icon={<Users size={18} />}
            label="Suggested people"
            value={suggestions.length.toLocaleString()}
            detail="Professionals to discover"
            accent="blue"
          />
          <StatCard
            icon={<Sparkles size={18} />}
            label="Personalized discovery"
            value="Made for you"
            detail="Based on shared backgrounds"
            accent="emerald"
          />
        </section>

        <section className="overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-5 border-b border-white/7 py-4 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 gap-3">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search people, roles, companies..."
                  className="h-11 w-full rounded-xl border border-white/8 bg-black/20 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/10"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/3 px-4 text-sm text-zinc-300 transition hover:bg-white/7">
                <SlidersHorizontal size={15} />
                Filters
              </button>
            </div>
          </div>

          {filteredPeople.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPeople.map((person, index) => {
                const id = getPersonId(person);

                return (
                  <ConnectionCard
                    key={id || index}
                    person={person}
                    requestSent={sentRequests.includes(id)}
                    onConnect={() => handleRequestSent(id)}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No people found"
              description={
                search
                  ? "Try another name, role, company, or institution."
                  : "There aren't any suggestions to show right now."
              }
              action={
                search || filter !== "All people" ? (
                  <button
                    onClick={() => {
                      setSearch("");
                      setFilter("All people");
                    }}
                    className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
                  >
                    Clear filters
                  </button>
                ) : undefined
              }
            />
          )}
        </section>

        <p className="mt-5 text-center text-xs text-zinc-600">
          Better connections start with shared experience.
        </p>
      </div>

      <RequestsDrawer
        open={isRequestsOpen}
        onClose={() => setIsRequestsOpen(false)}
      />
    </main>
  );
};

export default ConnectionsPage;
