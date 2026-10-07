"use client";

import { CheckCircle2, FolderKanban, UserPlus, Workflow } from "lucide-react";

const activities = [
  {
    icon: CheckCircle2,
    title: "A task was completed",
    description: "Ritik completed Build organization dashboard",
    time: "12 min ago",
  },
  {
    icon: FolderKanban,
    title: "New project created",
    description: "Credora dashboard was added to Engineering",
    time: "1 hour ago",
  },
  {
    icon: UserPlus,
    title: "New member joined",
    description: "Arjun joined the Product workspace",
    time: "3 hours ago",
  },
  {
    icon: Workflow,
    title: "Workspace updated",
    description: "Engineering workspace settings were updated",
    time: "Yesterday",
  },
];

const OrganizationActivity = () => {
  return (
    <section className="rounded-3xl border border-white/8 bg-white/2.5">
      <div className="border-b border-white/6 px-5 py-5 sm:px-6">
        <h2 className="text-base font-semibold text-white">Recent activity</h2>
        <p className="mt-1 text-xs text-white/35">
          Recent changes across your organization.
        </p>
      </div>

      <div className="divide-y divide-white/6">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={`${activity.title}-${activity.time}`}
              className="flex gap-3 px-5 py-4 sm:px-6"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/7 bg-white/3 text-white/40">
                <Icon size={16} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white/70">
                  {activity.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/30">
                  {activity.description}
                </p>
              </div>

              <span className="ml-auto shrink-0 text-[10px] text-white/20">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OrganizationActivity;
