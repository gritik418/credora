"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  CircleDashed,
  Clock3,
  ListTodo,
} from "lucide-react";

interface Props {
  workspaceId: string;
  projectId: string;
}

const taskStatuses = [
  {
    label: "Completed",
    count: 34,
    total: 50,
    color: "bg-emerald-400",
    textColor: "text-emerald-300",
    icon: CheckCircle2,
  },
  {
    label: "In progress",
    count: 9,
    total: 50,
    color: "bg-indigo-400",
    textColor: "text-indigo-300",
    icon: CircleDashed,
  },
  {
    label: "To do",
    count: 5,
    total: 50,
    color: "bg-slate-500",
    textColor: "text-slate-300",
    icon: Circle,
  },
  {
    label: "In review",
    count: 2,
    total: 50,
    color: "bg-amber-400",
    textColor: "text-amber-300",
    icon: Clock3,
  },
];

const ProjectProgressCard = ({ workspaceId, projectId }: Props) => {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300">
              <ListTodo size={16} />
            </div>
            <h2 className="text-sm font-semibold text-white">
              Project progress
            </h2>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Track your team&apos;s progress across all tasks.
          </p>
        </div>

        <Link
          href={`/workspace/${workspaceId}/projects/${projectId}/tasks`}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
        >
          All tasks
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center justify-center sm:w-40">
          <div className="relative flex h-36 w-36 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="49"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="9"
              />
              <circle
                cx="60"
                cy="60"
                r="49"
                fill="none"
                stroke="#818cf8"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 49 * 0.68} ${2 * Math.PI * 49}`}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-semibold tracking-tight text-white">
                68%
              </span>
              <span className="mt-1 text-[10px] text-slate-500">Completed</span>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          {taskStatuses.map((status) => {
            const Icon = status.icon;
            const percentage = (status.count / status.total) * 100;

            return (
              <div key={status.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className={status.textColor} />
                    <span className="text-xs text-slate-400">
                      {status.label}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-slate-200">
                    {status.count}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                  <div
                    className={`h-full rounded-full ${status.color} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between rounded-xl border border-white/6 bg-white/2 px-4 py-3">
        <div>
          <p className="text-xs font-medium text-slate-300">
            Overall completion
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            34 out of 50 tasks completed
          </p>
        </div>

        <span className="text-sm font-semibold text-emerald-300">+12.5%</span>
      </div>
    </section>
  );
};

export default ProjectProgressCard;
