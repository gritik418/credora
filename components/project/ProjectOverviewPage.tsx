"use client";

import {
  ArrowUpRight,
  CalendarCheck2,
  CheckCircle2,
  CircleAlert,
  Sparkles,
  Target,
} from "lucide-react";
import ProjectActivity from "./ProjectActivity";
import ProjectHeader from "./ProjectHeader";
import ProjectMilestones from "./ProjectMilestones";
import ProjectOverviewStats from "./ProjectOverviewStats";
import ProjectProgressCard from "./ProjectProgressCard";
import ProjectTeam from "./ProjectTeam";

interface Props {
  workspaceId: string;
  projectId: string;
}

const ProjectOverviewPage = ({ workspaceId, projectId }: Props) => {
  return (
    <div className="min-h-screen bg-[#070912] text-slate-200">
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <ProjectHeader workspaceId={workspaceId} projectId={projectId} />

        <ProjectOverviewStats />

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
          <div className="min-w-0 space-y-5">
            <ProjectProgressCard
              workspaceId={workspaceId}
              projectId={projectId}
            />

            <ProjectMilestones />

            <ProjectActivity workspaceId={workspaceId} projectId={projectId} />
          </div>

          <aside className="min-w-0 space-y-5">
            <ProjectTeam workspaceId={workspaceId} projectId={projectId} />

            <section className="relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-linear-to-br from-indigo-500/12 via-[#0c0f18] to-violet-500/8 p-5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/12 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                    <Sparkles size={17} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      Project health
                    </h2>
                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Based on current progress
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                  <span className="text-sm font-medium text-emerald-300">
                    On track
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  The project is progressing toward its target completion date.
                  Keep an eye on pending reviews and upcoming milestones.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-slate-400">
                      <Target size={14} />
                      Completion target
                    </span>
                    <span className="font-medium text-slate-200">80%</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full w-[68%] rounded-full bg-linear-to-r from-indigo-400 to-violet-400" />
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-slate-400">
                      <CalendarCheck2 size={14} />
                      Target date
                    </span>
                    <span className="text-slate-200">Nov 20, 2026</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-slate-400">
                      <CircleAlert size={14} />
                      Pending reviews
                    </span>
                    <span className="text-amber-300">2 tasks</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/[0.07] bg-[#0c0f18] p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 size={17} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Recent achievement
                  </h2>
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    Project milestone
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm font-medium text-slate-200">
                Organization permissions completed
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Workspace roles and access control have been completed, bringing
                the team closer to the next release milestone.
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-4">
                <span className="text-[10px] text-slate-500">
                  Completed today
                </span>

                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-300">
                  Achievement unlocked
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
