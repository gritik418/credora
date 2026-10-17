"use client";

import { useEffect, useMemo, useState } from "react";
import { Inbox, Network, Search, Sparkles, Users } from "lucide-react";
import ConnectionsHeader from "./ConnectionsHeader";
import ConnectionsOverview from "./ConnectionsOverview";
import ConnectionsTabs, { ConnectionTab } from "./ConnectionsTabs";
import ConnectionsToolbar from "./ConnectionsToolbar";
import ConnectionsGrid from "./ConnectionsGrid";
import DiscoverGrid from "./DiscoverGrid";
import RequestsList from "./RequestsList";
import { Skill } from "@/features/skills/skills.interface";
import { useGetSuggestedPeopleQuery } from "@/features/connection/connection.api";
import { SuggestedPeople } from "@/features/connection/connection.interface";

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState<ConnectionTab>("connections");
  const [connections, setConnections] = useState([]);
  const [suggestions, setSuggestions] = useState<SuggestedPeople[]>([]);
  const [requests, setRequests] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");

  const { data } = useGetSuggestedPeopleQuery({
    limit: 50,
    page: 1,
  });

  const incomingRequests = requests.filter(
    (request: any) => request?.direction === "incoming",
  );

  const outgoingRequests = requests.filter(
    (request: any) => request?.direction === "outgoing",
  );

  //   const filterPeople = <T extends Person>(people: T[]): T[] => {
  //     const query = search.trim().toLowerCase();
  //     const selectedLocation = location.toLowerCase();

  //     return people.filter((user) => {
  //       const matchesSearch =
  //         !query ||
  //         user.name.toLowerCase().includes(query) ||
  //         user.username.toLowerCase().includes(query) ||
  //         user.headline.toLowerCase().includes(query) ||
  //         user.company.toLowerCase().includes(query) ||
  //         user.skills.some((skill:Skill) => skill.toLowerCase().includes(query));

  //       const matchesLocation =
  //         selectedLocation === "all" ||
  //         user.location.toLowerCase().includes(selectedLocation);

  //       return matchesSearch && matchesLocation;
  //     });
  //   };

  //   const filteredConnections = useMemo(
  //     () => filterPeople(connections),
  //     [connections, search, location],
  //   );

  //   const filteredSuggestions = useMemo(
  //     () => filterPeople(suggestions),
  //     [suggestions, search, location],
  //   );

  //   const filteredIncoming = useMemo(
  //     () => filterPeople(incomingRequests),
  //     [requests, search, location],
  //   );

  //   const filteredOutgoing = useMemo(
  //     () => filterPeople(outgoingRequests),
  //     [requests, search, location],
  //   );

  useEffect(() => {
    if (data) {
      setSuggestions(data.data.suggestedPeople);
    }
  }, [data]);
  return (
    <main className="min-h-screen px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        <ConnectionsHeader />

        <ConnectionsOverview
          connections={connections.length}
          requests={incomingRequests.length}
          suggestions={suggestions.length}
        />

        <section className="space-y-5">
          <ConnectionsTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            connectionCount={connections.length}
            requestCount={incomingRequests.length}
          />

          <ConnectionsToolbar
            search={search}
            location={location}
            onSearchChange={setSearch}
            onLocationChange={setLocation}
          />

          {activeTab === "connections" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Your network
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Professionals you have built a connection with.
                  </p>
                </div>

                <span className="text-xs text-gray-500">{111} people</span>
              </div>

              {[].length ? (
                <ConnectionsGrid users={[]} />
              ) : (
                <EmptyState
                  icon={<Network size={22} />}
                  title="No connections found"
                  description="Try a different search, or discover professionals to grow your network."
                />
              )}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="space-y-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Connection requests
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Keep your professional relationships moving forward.
                  </p>
                </div>

                <span className="text-xs text-gray-500">
                  {incomingRequests.length} incoming · {outgoingRequests.length}{" "}
                  outgoing
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Inbox size={15} className="text-violet-300" />
                  Received
                  <span className="text-xs text-gray-600">({100})</span>
                </div>

                {[].length ? (
                  <RequestsList requests={[]} />
                ) : (
                  <EmptyState
                    icon={<Inbox size={22} />}
                    title="You're all caught up"
                    description="New incoming connection requests will appear here."
                  />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Users size={15} className="text-blue-300" />
                  Sent
                  <span className="text-xs text-gray-600">({[].length})</span>
                </div>

                {[].length ? (
                  <RequestsList requests={[]} />
                ) : (
                  <p className="rounded-xl border border-dashed border-white/[0.08] px-4 py-7 text-center text-sm text-gray-500">
                    You haven't sent any pending requests.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "discover" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={17} className="text-violet-300" />
                    <h2 className="text-lg font-semibold text-white">
                      People worth knowing
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Discover professionals through shared skills and mutual
                    connections.
                  </p>
                </div>

                <span className="text-xs text-gray-500">
                  {suggestions.length} suggestions
                </span>
              </div>

              {suggestions.length ? (
                <DiscoverGrid users={suggestions} />
              ) : (
                <EmptyState
                  icon={<Sparkles size={22} />}
                  title="No new suggestions"
                  description="You're all caught up. Check back later for more professionals to connect with."
                />
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] px-6 py-14 text-center">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025] text-violet-300">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
      {description}
    </p>
  </div>
);

export default ConnectionsPage;
