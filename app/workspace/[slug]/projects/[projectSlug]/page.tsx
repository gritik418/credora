import ProjectOverviewPage from "@/components/project/ProjectOverviewPage";

interface Props {
  params: Promise<{
    workspaceId: string;
    projectId: string;
  }>;
}

const ProjectPage = async ({ params }: Props) => {
  const { workspaceId, projectId } = await params;

  return (
    <ProjectOverviewPage workspaceId={workspaceId} projectId={projectId} />
  );
};

export default ProjectPage;
