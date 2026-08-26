import {
  CheckCircle2,
  GitCommit,
  ListChecks,
  MessageSquare,
} from "lucide-react";

const activities = [
  {
    icon: CheckCircle2,
    title: "Completed task",
    description: "Implemented workspace member role validation for Trackr.",
    project: "Trackr",
    date: "2 days ago",
  },
  {
    icon: GitCommit,
    title: "Project contribution",
    description:
      "Added resume matching logic and structured AI output validation.",
    project: "HireGenie",
    date: "5 days ago",
  },
  {
    icon: ListChecks,
    title: "Completed 8 tasks",
    description:
      "Completed a project milestone covering authentication and API integration.",
    project: "Huddle",
    date: "1 week ago",
  },
  {
    icon: MessageSquare,
    title: "Project discussion",
    description:
      "Participated in product and technical discussions for the next release.",
    project: "Trackr",
    date: "2 weeks ago",
  },
];

const ActivitySection = () => {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Recent activity
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight">
          Work activity
        </h2>
      </div>

      <div className="rounded-2xl border border-border bg-card/70">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={`${activity.title}-${index}`}
              className={`flex gap-4 p-5 ${
                index !== activities.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-4 w-4 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <p className="text-sm font-semibold">{activity.title}</p>

                  <span className="text-xs text-muted-foreground">
                    {activity.date}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {activity.description}
                </p>

                <span className="mt-2 inline-flex rounded-md bg-muted px-2 py-1 text-[11px] font-medium">
                  {activity.project}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActivitySection;
