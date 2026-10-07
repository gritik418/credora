"use client";

import { ArrowLeft, UserRound } from "lucide-react";
import Link from "next/link";
import OrganizationCard from "./OrganizationCard";
import CreateOrganizationCard from "./CreateOrganizationCard";
import OrganizationSelectionHeader from "./OrganizationSelectionHeader";

const organizations = [
  {
    name: "Credora",
    slug: "credora",
    description:
      "Build, manage and verify professional work across teams and projects.",
    members: 24,
    projects: 12,
    role: "Owner",
    color: "indigo" as const,
    active: true,
  },
  {
    name: "Acme Technologies",
    slug: "acme-technologies",
    description:
      "Product engineering workspace for building modern digital products.",
    members: 18,
    projects: 8,
    role: "Member",
    color: "violet" as const,
  },
];

const OrganizationSelection = () => {
  return (
    <main className="org-shell org-background min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pt-6 pb-10 sm:px-8 lg:px-10 lg:py-8">
        <div className="flex flex-1 flex-col justify-center py-4 lg:py-6">
          <OrganizationSelectionHeader />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {organizations.map((organization) => (
              <OrganizationCard key={organization.slug} {...organization} />
            ))}

            <CreateOrganizationCard />
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/25">
              Select an organization to continue working.
            </p>

            <p className="text-xs text-white/20">
              You can switch organizations anytime.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrganizationSelection;
