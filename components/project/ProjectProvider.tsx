"use client";
import { useGetProjectBySlugQuery } from "@/features/project/project.api";
import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import React from "react";

interface Props {
  children: React.ReactNode;
  projectSlug: string;
}

const ProjectProvider = ({ children, projectSlug }: Props) => {
  const workspace = useAppSelector(selectSelectedWorkspace);

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

  return <div>{children}</div>;
};

export default ProjectProvider;
