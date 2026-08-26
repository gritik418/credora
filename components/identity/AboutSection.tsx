import { Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="rounded-2xl border border-border bg-card/70 p-6 shadow-sm sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            About
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Building products from idea to production.
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
        <p>
          I’m a Full Stack Developer who enjoys turning product ideas into
          reliable, polished software. My work spans modern frontend
          experiences, backend systems, APIs, databases, authentication, and
          AI-powered features.
        </p>

        <p>
          I particularly enjoy working with TypeScript, React, Next.js, Node.js,
          NestJS, Python, Django, PostgreSQL, Prisma, and modern cloud tooling.
        </p>

        <p>
          My Credora identity documents the work I’ve actually contributed to,
          including organizations, projects, responsibilities, and completed
          tasks.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
