"use client";

import { useMemo, useState } from "react";
import ConnectionRequests from "./ConnectionRequests";
import ConnectionsGrid from "./ConnectionsGrid";
import ConnectionsHeader from "./ConnectionsHeader";
import ConnectionsStats from "./ConnectionsStats";
import ConnectionsTabs, { ConnectionsTab } from "./ConnectionsTabs";
import ConnectionsToolbar from "./ConnectionsToolbar";
import DiscoverPeople from "./DiscoverPeople";

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState<ConnectionsTab>("connections");
  const [connections, setConnections] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");

  const pendingCount = requests.length;

  const filteredConnections = useMemo(() => {
    const query = search.trim().toLowerCase();

    return connections.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.headline.toLowerCase().includes(query) ||
        user.skills.some((skill: any) => skill.toLowerCase().includes(query));

      const matchesLocation =
        location === "all" || user.location.includes(location);

      return matchesSearch && matchesLocation;
    });
  }, [connections, search, location]);

  const filteredSuggestions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return suggestions.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.headline.toLowerCase().includes(query) ||
        user.skills.some((skill: any) => skill.toLowerCase().includes(query));

      const matchesLocation =
        location === "all" || user.location.includes(location);

      return matchesSearch && matchesLocation;
    });
  }, [suggestions, search, location]);

  const handleConnect = (user: any) => {
    const requestExists = requests.some(
      (request) => request.user.id === user.id,
    );

    if (requestExists || connections.some((item) => item.id === user.id)) {
      return;
    }

    const updatedUser: any = {
      ...user,
      status: "pending",
    };

    setRequests((current) => [
      ...current,
      {
        id: `request-${user.id}`,
        user: updatedUser,
        direction: "outgoing",
        sentAt: "Just now",
      },
    ]);

    setSuggestions((current) =>
      current.map((item) => (item.id === user.id ? updatedUser : item)),
    );
  };

  const handleAccept = (request: any) => {
    if (connections.some((user) => user.id === request.user.id)) {
      setRequests((current) =>
        current.filter((item) => item.id !== request.id),
      );
      return;
    }

    setConnections((current) => [
      ...current,
      {
        ...request.user,
        status: "connected",
      },
    ]);

    setRequests((current) => current.filter((item) => item.id !== request.id));

    setSuggestions((current) =>
      current.filter((user) => user.id !== request.user.id),
    );
  };

  return (
    <main className="min-h-screen px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-8">
      <div className="mx-auto max-w-360 space-y-7">
        <ConnectionsHeader />

        <ConnectionsStats
          connections={connections.length}
          requests={pendingCount}
          suggestions={
            suggestions.filter(
              (user) =>
                !requests.some((request) => request.user.id === user.id),
            ).length
          }
        />

        <section className="space-y-5">
          <ConnectionsTabs
            activeTab={activeTab}
            requestCount={
              requests.filter((request) => request.direction === "incoming")
                .length
            }
            onTabChange={setActiveTab}
          />

          {activeTab !== "requests" && (
            <ConnectionsToolbar
              search={search}
              location={location}
              onSearchChange={setSearch}
              onLocationChange={setLocation}
            />
          )}

          {activeTab === "connections" && (
            <>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Your professional network
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    People you have connected with on Credora
                  </p>
                </div>

                <span className="shrink-0 text-xs text-gray-500">
                  {filteredConnections.length}{" "}
                  {filteredConnections.length === 1 ? "person" : "people"}
                </span>
              </div>

              <ConnectionsGrid users={filteredConnections} mode="connected" />
            </>
          )}

          {activeTab === "requests" && (
            <ConnectionRequests requests={requests} />
          )}

          {activeTab === "discover" && (
            <DiscoverPeople
              users={filteredSuggestions.filter(
                (user) =>
                  !requests.some((request) => request.user.id === user.id) &&
                  !connections.some((connection) => connection.id === user.id),
              )}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default ConnectionsPage;
