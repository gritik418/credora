import { CheckCircle2, GitBranch, ListChecks, TrendingUp } from "lucide-react";
import Contribution from "./Contribution";

const ContributionsSection = () => {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Evidence of work
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight">
          Contributions
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Contribution icon={ListChecks} value="46" label="Tasks completed" />

        <Contribution
          icon={GitBranch}
          value="18"
          label="Project contributions"
        />

        <Contribution
          icon={CheckCircle2}
          value="12"
          label="Verified milestones"
        />

        <Contribution icon={TrendingUp} value="87%" label="Completion rate" />
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card/70 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Contribution activity</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Documented activity across verified workspaces.
            </p>
          </div>

          <span className="text-xs font-medium text-muted-foreground">
            Last 12 months
          </span>
        </div>

        <div className="mt-5 flex h-28 items-end gap-1">
          {[
            30, 45, 28, 65, 48, 72, 55, 85, 63, 76, 91, 80, 68, 95, 73, 88, 60,
            78, 92, 84,
          ].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-md bg-primary/20 transition hover:bg-primary/40"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributionsSection;
