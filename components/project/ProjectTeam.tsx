import Link from "next/link";
import {
  ArrowRight,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";

const members = [
  {
    name: "Ritik Gupta",
    role: "Project lead",
    initials: "RG",
    color: "from-indigo-500 to-violet-500",
    tasks: 12,
    completed: 9,
  },
  {
    name: "Aarav Sharma",
    role: "Backend developer",
    initials: "AS",
    color: "from-sky-500 to-cyan-500",
    tasks: 10,
    completed: 7,
  },
  {
    name: "Priya Verma",
    role: "Frontend developer",
    initials: "PV",
    color: "from-pink-500 to-rose-500",
    tasks: 8,
    completed: 6,
  },
  {
    name: "Karan Mehta",
    role: "UI/UX designer",
    initials: "KM",
    color: "from-amber-500 to-orange-500",
    tasks: 6,
    completed: 4,
  },
];

interface Props {
  workspaceId: string;
  projectId: string;
}

const ProjectTeam = ({ workspaceId, projectId }: Props) => {
  return (
    <section className="rounded-2xl border border-white/7 bg-[#0c0f18] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300">
              <Users size={16} />
            </div>
            <h2 className="text-sm font-semibold text-white">Project team</h2>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            People working on this project.
          </p>
        </div>

        <button
          type="button"
          aria-label="Team options"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/6 bg-white/2 p-3">
        <div className="flex -space-x-2">
          {members.map((member) => (
            <div
              key={member.initials}
              title={member.name}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0c0f18] bg-linear-to-br ${member.color} text-[10px] font-semibold text-white`}
            >
              {member.initials}
            </div>
          ))}
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0c0f18] bg-[#202536] text-[10px] font-medium text-slate-300">
            +2
          </div>
        </div>

        <span className="text-[11px] text-slate-500">6 collaborators</span>
      </div>

      <div className="mt-3 divide-y divide-white/5">
        {members.map((member) => (
          <div key={member.name} className="flex items-center gap-3 py-3.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${member.color} text-xs font-semibold text-white`}
            >
              {member.initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-200">
                {member.name}
              </p>
              <p className="mt-1 truncate text-[10px] text-slate-500">
                {member.role}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium text-slate-300">
                {member.completed}/{member.tasks}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">Tasks done</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={`/workspace/${workspaceId}/projects/${projectId}/members`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/8 text-xs font-medium text-slate-300 transition hover:bg-white/4 hover:text-white"
        >
          <Users size={14} />
          View team
        </Link>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-indigo-400/15 bg-indigo-400/6 text-xs font-medium text-indigo-300 transition hover:bg-indigo-400/12"
        >
          <Plus size={14} />
          Add members
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/6 bg-white/2 p-3">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-slate-500" />
        <p className="text-[10px] leading-5 text-slate-500">
          Project access follows workspace membership and your
          organization&apos;s permission rules.
        </p>
      </div>

      <Link
        href={`/workspace/${workspaceId}/projects/${projectId}/members`}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
      >
        Manage project members
        <ArrowRight size={13} />
      </Link>
    </section>
  );
};

export default ProjectTeam;
