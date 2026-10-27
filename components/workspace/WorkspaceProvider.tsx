"use client";

import WorkspaceLoader from "@/components/loaders/WorkspaceLoader";
import { useGetOrganizationMembersQuery } from "@/features/organization-member/organization-member.api";
import { selectSelectedOrganization } from "@/features/organization/organization.selectors";
import { useGetProjectsQuery } from "@/features/project/project.api";
import { useGetWorkspaceMembersQuery } from "@/features/workspace-member/workspace-member.api";
import {
  useGetWorkspaceBySlugQuery,
  useGetWorkspacesQuery,
  useSwitchWorkspaceMutation,
} from "@/features/workspace/workspace.api";
import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import { Building2, FolderKanban, RefreshCw } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  slug: string;
  children: React.ReactNode;
}

const WorkspaceProvider = ({ children, slug }: Props) => {
  const [switchWorkspace, { isLoading: isSwitching }] =
    useSwitchWorkspaceMutation();

  const selectedWorkspace = useAppSelector(selectSelectedWorkspace);

  const organization = useAppSelector(selectSelectedOrganization);

  const { data, isError, isLoading, refetch } = useGetWorkspaceBySlugQuery(
    {
      workspaceSlug: slug,
      organizationId: organization?.id || "",
    },
    {
      skip: !organization?.id || !slug,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  useGetWorkspacesQuery(
    {
      orgId: organization?.id || "",
    },
    {
      skip: !organization?.id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  useGetWorkspaceMembersQuery(
    {
      workspaceId: selectedWorkspace?.id || "",
    },
    {
      skip: !selectedWorkspace?.id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  useGetProjectsQuery(
    {
      workspaceId: selectedWorkspace?.id || "",
    },
    {
      skip: !selectedWorkspace?.id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  useGetOrganizationMembersQuery(
    {
      orgId: organization?.id || "",
    },
    {
      skip: !organization?.id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  useEffect(() => {
    if (isLoading || isSwitching || !organization) return;

    if (
      data &&
      data.data?.workspace &&
      selectedWorkspace &&
      selectedWorkspace?.id !== data.data.workspace.id
    ) {
      switchWorkspace({
        workspaceId: data.data.workspace.id,
        organizationId: organization.id,
      });
    }
  }, [data, isLoading, isSwitching, selectedWorkspace?.id]);

  if (!organization?.id) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(79,70,229,0.12),transparent_42%)]" />

        <div className="relative flex w-full max-w-md flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-indigo-400/20 bg-indigo-500/10 shadow-[0_0_50px_rgba(99,102,241,0.08)]">
            <Building2 className="h-9 w-9 text-indigo-300" />
          </div>

          <h2 className="mt-7 text-xl font-semibold tracking-tight text-white">
            No organization selected
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Select an organization to access its workspaces, projects, tasks,
            and team discussions.
          </p>

          <Link
            href={"/org"}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
          >
            <Building2 className="h-4 w-4" />
            Go to organizations
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading && !data) {
    return <WorkspaceLoader />;
  }

  if (isError || !data) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(79,70,229,0.12),transparent_42%)]" />

        <div className="relative flex w-full max-w-md flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/3">
            <FolderKanban className="h-9 w-9 text-slate-400" />
          </div>

          <h2 className="mt-7 text-xl font-semibold tracking-tight text-white">
            Workspace unavailable
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            We couldn&apos;t find this workspace in your selected organization,
            or you may not have permission to access it.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WorkspaceProvider;
