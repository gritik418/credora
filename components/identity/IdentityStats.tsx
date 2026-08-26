import {
  BriefcaseBusiness,
  CheckCircle2,
  FolderKanban,
  ListChecks,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Verified experience",
    value: "6 mo",
    icon: BriefcaseBusiness,
  },
  {
    label: "Projects",
    value: "8",
    icon: FolderKanban,
  },
  {
    label: "Tasks completed",
    value: "46",
    icon: ListChecks,
  },
  {
    label: "Organizations",
    value: "3",
    icon: Users,
  },
  {
    label: "Verified records",
    value: "18",
    icon: CheckCircle2,
  },
];

const IdentityStats = () => {
  return (
    <section className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-card/70 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className={`p-5 ${
              index !== stats.length - 1
                ? "border-b border-border sm:border-r lg:border-b-0"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{stat.label}</span>
            </div>

            <p className="mt-3 text-2xl font-bold tracking-tight">
              {stat.value}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default IdentityStats;
