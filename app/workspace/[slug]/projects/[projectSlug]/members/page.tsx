import ProjectMembersPage from "@/components/project-members/ProjectMembersPage";

interface Props {
  params: Promise<{
    slug: string;
    projectSlug: string;
  }>;
}

const ProjectMembersRoute = async ({ params }: Props) => {
  const { slug, projectSlug } = await params;

  return <ProjectMembersPage workspaceId={slug} projectId={projectSlug} />;
};

export default ProjectMembersRoute;
