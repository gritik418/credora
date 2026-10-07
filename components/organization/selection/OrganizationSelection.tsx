"use client";

import { useGetOrganizationsQuery } from "@/features/organization/organization.api";
import { selectOrganizations } from "@/features/organization/organization.selectors";
import { useAppSelector } from "@/store/hooks";
import CreateOrganizationCard from "./CreateOrganizationCard";
import OrganizationCard from "./OrganizationCard";
import OrganizationSelectionHeader from "./OrganizationSelectionHeader";
import { Organization } from "@/features/organization/organization.interface";

const OrganizationSelection = () => {
  const organizations: Organization[] = useAppSelector(selectOrganizations);
  useGetOrganizationsQuery();

  return (
    <main className="org-shell org-background min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pt-6 pb-10 sm:px-8 lg:px-10 lg:py-8">
        <div className="flex flex-1 flex-col justify-center py-4 lg:py-6">
          <OrganizationSelectionHeader />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {organizations.map((organization: Organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
              />
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
