import { Building2, ShieldCheck, Sparkles } from "lucide-react";

const InvitesHeader = () => {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/7 p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-600/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-64 rounded-full bg-violet-600/8 blur-[80px]" />

      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/8 px-3 py-1.5 text-xs font-medium text-indigo-300">
            <Sparkles size={13} />
            Your next opportunity
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Organization invites
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-400 sm:text-base">
            Join teams, connect your professional identity, and bring your work
            history together in one place.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/[0.07] bg-white/2.5 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
            <Building2 size={21} />
          </div>
          <div>
            <p className="text-xs text-zinc-500">Your invitations</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-zinc-200">
              <ShieldCheck size={14} className="text-emerald-400" />
              Manage securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitesHeader;
