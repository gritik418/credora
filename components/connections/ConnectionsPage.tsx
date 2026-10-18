"use client";

import { useGetSuggestedPeopleQuery } from "@/features/connection/connection.api";
import { SuggestedPeople } from "@/features/connection/connection.interface";
import { Inbox, Network, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import ConnectionsGrid from "./ConnectionsGrid";
import ConnectionsHeader from "./ConnectionsHeader";
import ConnectionsTabs, { ConnectionTab } from "./ConnectionsTabs";
import ConnectionsToolbar from "./ConnectionsToolbar";
import DiscoverGrid from "./DiscoverGrid";
import RequestsList from "./RequestsList";

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState<ConnectionTab>("connections");
  const [connections, setConnections] = useState([]);
  const [suggestions, setSuggestions] = useState<SuggestedPeople[]>([]);
  const [requests, setRequests] = useState<any>([]);
  const [search, setSearch] = useState("");

  const { data } = useGetSuggestedPeopleQuery({
    limit: 150,
    page: 1,
  });

  useEffect(() => {
    if (data) {
      setSuggestions(data.data.suggestedPeople);
    }
  }, [data]);

  return (
    <main className="min-h-screen px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        <ConnectionsHeader />

        <section className="space-y-5">
          <ConnectionsTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            connectionCount={connections.length}
            requestCount={requests.length}
          />

          <ConnectionsToolbar search={search} onSearchChange={setSearch} />

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
                    description="New connection requests will appear here."
                  />
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
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/1 px-6 py-14 text-center">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/2.5 text-violet-300">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
      {description}
    </p>
  </div>
);

export default ConnectionsPage;
