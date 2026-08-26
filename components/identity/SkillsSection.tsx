import { Code2, Database, Layers3, Server, Sparkles } from "lucide-react";

const groups = [
  {
    title: "Frontend",
    icon: Layers3,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "NestJS", "Express", "Python", "Django", "FastAPI"],
  },
  {
    title: "Data",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Redis"],
  },
  {
    title: "Engineering",
    icon: Code2,
    skills: ["Git", "Docker", "REST APIs", "OAuth", "Socket.io"],
  },
  {
    title: "AI",
    icon: Sparkles,
    skills: ["LLMs", "LangChain", "RAG", "Embeddings", "AI APIs"],
  },
];

const SkillsSection = () => {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Capabilities
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight">
          Skills & technologies
        </h2>
      </div>

      <div className="space-y-3">
        {groups.map((group) => {
          const Icon = group.icon;

          return (
            <div
              key={group.title}
              className="rounded-2xl border border-border bg-card/70 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex w-32 shrink-0 items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{group.title}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
