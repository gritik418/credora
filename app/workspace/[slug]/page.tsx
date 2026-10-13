import WorkspaceOverview from "@/components/workspace/WorkspaceOverview";

interface Props {
  params: Promise<{
    workspaceId: string;
  }>;
}

const WorkspacePage = async ({ params }: Props) => {
  const { workspaceId } = await params;

  return <WorkspaceOverview workspaceId={workspaceId} />;
};

export default WorkspacePage;
