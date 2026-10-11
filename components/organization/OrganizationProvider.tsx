"use client";

import OrganizationLoader from "@/components/loaders/OrganizationLoader";
import { useGetOrganizationInvitesQuery } from "@/features/organization-invite/organization-invite.api";
import { useGetOrganizationMembersQuery } from "@/features/organization-member/organization-member.api";
import {
  useGetOrganizationBySlugQuery,
  useGetOrganizationsQuery,
} from "@/features/organization/organization.api";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  slug: string;
}

const OrganizationProvider = ({ slug, children }: Props) => {
  const { data, isLoading, isError } = useGetOrganizationBySlugQuery(slug, {
    refetchOnMountOrArgChange: true,
    skip: !slug,
  });

  const {
    data: organizationsData,
    isLoading: organizationsLoading,
    isError: organizationsIsError,
  } = useGetOrganizationsQuery();

  const orgId = data?.data?.organization?.id || "";

  useGetOrganizationMembersQuery(
    { orgId },
    {
      skip: !orgId,
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: invitesData } = useGetOrganizationInvitesQuery(
    { orgId },
    {
      skip: !orgId,
      refetchOnMountOrArgChange: true,
    },
  );

  console.log(invitesData);

  if (isLoading || organizationsLoading) {
    return <OrganizationLoader />;
  }

  if (isError || !data || organizationsIsError || !organizationsData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-xl text-red-400">
            !
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            Organization unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            We couldn&apos;t load this organization. It may not exist, or you
            may not have permission to access it.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl cursor-pointer bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default OrganizationProvider;
