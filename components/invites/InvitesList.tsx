"use client";

import { selectReceivedOrganizationInvites } from "@/features/user/user.selectors";
import { useAppSelector } from "@/store/hooks";
import { Building2, Inbox, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import OrganizationInviteCard from "./OrganizationInviteCard";

type InviteFilter = "ALL" | "PENDING" | "ACCEPTED" | "DECLINED";

const filters: { label: string; value: InviteFilter }[] = [
  { label: "All invites", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Declined", value: "DECLINED" },
];

const InvitesList = () => {
  const invites = useAppSelector(selectReceivedOrganizationInvites);
  const [activeFilter, setActiveFilter] = useState<InviteFilter>("ALL");
  const [search, setSearch] = useState("");

  console.log(invites);

  const pendingCount = invites.filter(
    (invite) =>
      invite.status === "PENDING" &&
      new Date(invite.expiresAt).getTime() > Date.now(),
  ).length;

  const filteredInvites = useMemo(() => {
    const query = search.trim().toLowerCase();

    return invites.filter((invite) => {
      const matchesFilter =
        activeFilter === "ALL" || invite.status === activeFilter;

      const matchesSearch =
        !query ||
        invite.organization.name.toLowerCase().includes(query) ||
        invite.organization.description?.toLowerCase().includes(query) ||
        invite.invitedBy.name.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [invites, activeFilter, search]);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">
              Your invitations
            </h2>
            {pendingCount > 0 && (
              <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2 py-0.5 text-xs font-medium text-indigo-300">
                {pendingCount} pending
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            Manage requests to join organizations on Credora.
          </p>
        </div>

        <div className="relative w-full lg:max-w-xs">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search organizations..."
            className="h-11 w-full rounded-xl border border-white/[0.08] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {filteredInvites.length > 0 ? (
        <div className="space-y-4">
          {filteredInvites.map((invite) => (
            <OrganizationInviteCard key={invite.id} invite={invite} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.01] px-6 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07]">
            {search ? (
              <Search size={23} className="text-zinc-500" />
            ) : (
              <Inbox size={23} className="text-zinc-500" />
            )}
          </div>

          <h3 className="text-base font-medium text-zinc-200">
            {search
              ? "No matching invitations"
              : activeFilter === "ALL"
                ? "You're all caught up"
                : `No ${activeFilter.toLowerCase()} invitations`}
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
            {search
              ? "Try searching with a different organization or inviter name."
              : activeFilter === "ALL"
                ? "When an organization invites you to join its team, you'll find the invitation here."
                : "Invitations matching this filter will appear here."}
          </p>

          {(search || activeFilter !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("ALL");
              }}
              className="mt-5 rounded-xl border border-white/[0.09] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              Clear filters
            </button>
          )}

          <div className="mt-8 flex items-center gap-2 text-xs text-zinc-600">
            <Building2 size={14} />
            Your organization memberships stay under your control.
          </div>
        </div>
      )}
    </section>
  );
};

export default InvitesList;
