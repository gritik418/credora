import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  ListChecks,
} from "lucide-react";

interface Project {
  name: string;
  description: string;
  status: string;
  tasks: number;
  contributions: number;
  technologies: string[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  const active = project.status === "Active";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/10" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
            {project.name.slice(0, 2).toUpperCase()}
          </div>

          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              active
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {active ? (
              <CircleDot className="h-3 w-3" />
            ) : (
              <CheckCircle2 className="h-3 w-3" />
            )}

            {project.status}
          </span>
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-semibold">{project.name}</h3>

          <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-4 border-y border-border py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ListChecks className="h-3.5 w-3.5" />
            {project.tasks} tasks
          </span>

          <span>{project.contributions} contributions</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {technology}
            </span>
          ))}
        </div>

        <button className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary">
          Explore project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
