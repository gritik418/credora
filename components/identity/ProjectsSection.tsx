import ProjectCard from "./ProjectCard";

const projects = [
  {
    name: "Trackr",
    description:
      "A multi-tenant task management SaaS for organizations, workspaces, projects, and teams.",
    status: "Active",
    tasks: 18,
    contributions: 12,
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
  },
  {
    name: "HireGenie",
    description:
      "AI-powered career assistant for resume analysis, job matching, and interview preparation.",
    status: "Completed",
    tasks: 11,
    contributions: 8,
    technologies: ["Next.js", "AI", "Node.js", "PostgreSQL"],
  },
  {
    name: "Huddle",
    description:
      "A collaborative web application focused on real-time communication and team workflows.",
    status: "Completed",
    tasks: 9,
    contributions: 6,
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
  },
];

const ProjectsSection = () => {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Work
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight">
          Selected projects
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Projects connected to verified work history and contributions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
