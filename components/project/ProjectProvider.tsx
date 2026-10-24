"use client";
import {
  useGetProjectBySlugQuery,
  useGetTaskAssigneesQuery,
  useGetTaskReviewersQuery,
} from "@/features/project/project.api";
import { selectSelectedProject } from "@/features/project/project.selectors";
import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import React from "react";

interface Props {
  children: React.ReactNode;
  projectSlug: string;
}

const ProjectProvider = ({ children, projectSlug }: Props) => {
  const workspace = useAppSelector(selectSelectedWorkspace);
  const project = useAppSelector(selectSelectedProject);

  useGetProjectBySlugQuery(
    {
      projectSlug,
      workspaceId: workspace?.id ?? "",
    },
    {
      skip: !workspace?.id || !projectSlug,
      refetchOnMountOrArgChange: true,
    },
  );

  useGetTaskAssigneesQuery(
    {
      projectId: project?.id ?? "",
      workspaceId: workspace?.id ?? "",
    },
    {
      skip: !workspace?.id || !project?.id,
      refetchOnMountOrArgChange: true,
    },
  );

  useGetTaskReviewersQuery(
    {
      projectId: project?.id ?? "",
      workspaceId: workspace?.id ?? "",
    },
    {
      skip: !workspace?.id || !project?.id,
      refetchOnMountOrArgChange: true,
    },
  );

  return <div>{children}</div>;
};

export default ProjectProvider;
