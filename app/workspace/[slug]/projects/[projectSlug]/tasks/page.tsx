import ProjectTasksPage from "@/components/project-tasks/ProjectTasksPage";

interface Props {
  params: Promise<{
    workspaceId: string;
    projectId: string;
  }>;
}

const TasksPage = async ({ params }: Props) => {
  const { workspaceId, projectId } = await params;

  return <ProjectTasksPage workspaceId={workspaceId} projectId={projectId} />;
};

export default TasksPage;
