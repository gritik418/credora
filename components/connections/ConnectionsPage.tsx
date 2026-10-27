"use client";

import { useGetSuggestedPeopleQuery } from "@/features/connection/connection.api";
import { SuggestedPeople } from "@/features/connection/connection.interface";
import {
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  Stars,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ConnectionCard from "./ConnectionCard";
import EmptyState from "./EmptyState";
import RequestsDrawer from "./RequestsDrawer";
import { useAppSelector } from "@/store/hooks";
import { selectConnections } from "@/features/connection/connection.selectors";
import SuggestedPersonCard from "./SuggestedPersonCard";

const ConnectionsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All people");
  const connections = useAppSelector(selectConnections);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedPeople[]>([]);

  const { data, isLoading, isError } = useGetSuggestedPeopleQuery({
    limit: 150,
    page: 1,
  });

  useEffect(() => {
    if (data?.data?.suggestedPeople) {
      setSuggestions(data.data.suggestedPeople);
    }
  }, [data]);

  const filteredSuggestions = useMemo(() => {
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
            className="inline-flex cursor-pointer h-11 items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/4 px-4 text-sm font-medium text-zinc-200 transition hover:border-violet-400/30 hover:bg-white/7 md:self-auto"
          >
            <Users size={16} />
            Manage requests
            <ArrowUpRight size={15} className="text-zinc-500" />
          </button>
        </header>

        <section className="overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-5 py-4 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 gap-3">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search your connections"
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

          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-500/10">
                <Stars size={14} className="text-yellow-300" />
              </div>

              <p className="text-xs font-semibold tracking-wider text-zinc-300">
                {connections.length}{" "}
                {connections.length === 1 ? "connection" : "connections"}
              </p>
            </div>

            <span className="text-xs text-zinc-400">
              Connect with people you know to grow your network.
            </span>
          </div>

          {connections.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {connections.map((connection) => {
                return (
                  <ConnectionCard key={connection.id} connection={connection} />
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No connections found"
              description={
                search
                  ? "Try another name, role, company, or institution."
                  : "There aren't any connections to show right now."
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

        <section className="mt-10 border-t border-white/[0.07] pt-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10">
                  <UsersRound className="size-4 text-indigo-300" />
                </div>

                <span className="text-xs font-medium uppercase tracking-[0.14em] text-indigo-300/80">
                  Expand your network
                </span>
              </div>

              <h2 className="text-xl font-semibold tracking-tight text-white">
                Discover people
              </h2>

              <p className="mt-1.5 max-w-lg text-sm leading-6 text-zinc-400">
                Meet professionals with shared interests, skills, and
                experiences.
              </p>
            </div>
          </div>

          {filteredSuggestions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredSuggestions.map((suggestion) => (
                <SuggestedPersonCard key={suggestion.id} person={suggestion} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No people found"
              description={
                search
                  ? "Try another name, role, company, or institution."
                  : "There aren't any suggestions to show right now. Check back later."
              }
              action={
                search || filter !== "All people" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setFilter("All people");
                    }}
                    className="mt-4 rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white"
                  >
                    Clear filters
                  </button>
                ) : undefined
              }
            />
          )}
        </section>
      </div>

      <RequestsDrawer
        open={isRequestsOpen}
        onClose={() => setIsRequestsOpen(false)}
      />
    </main>
  );
};

export default ConnectionsPage;
