"use client";

import { FormEvent, useState } from "react";
import {
  AtSign,
  Check,
  ChevronDown,
  LoaderCircle,
  Mail,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onInvite: (email: string, role: "Admin" | "Member") => void;
}

const InviteWorkspaceMemberModal = ({ open, onClose, onInvite }: Props) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Admin" | "Member">("Member");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setIsLoading(true);

    onInvite(normalizedEmail, role);
    setEmail("");
    setRole("Member");
    setIsLoading(false);
  };

  const handleClose = () => {
    setEmail("");
    setRole("Member");
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f18] shadow-[0_25px_100px_rgba(0,0,0,0.65)]">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/12 blur-[75px]" />

        <div className="relative flex items-start justify-between border-b border-white/[0.07] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
              <Users size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Invite a teammate
              </h2>
              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                Add someone to your workspace and choose their access level.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close invite modal"
            className="rounded-lg border border-white/6 p-2 text-slate-500 transition hover:bg-white/6 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-6 p-6">
          <div>
            <label
              htmlFor="member-email"
              className="mb-2 block text-xs font-medium text-slate-300"
            >
              Email address
            </label>

            <div className="relative">
              <AtSign
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                id="member-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="teammate@company.com"
                className="h-12 w-full rounded-xl border border-white/9 bg-[#080b13] pl-10 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-300">
              Workspace role
            </label>

            <div className="relative">
              <select
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as "Admin" | "Member")
                }
                className="h-12 w-full appearance-none rounded-xl border border-white/9 bg-[#080b13] px-4 pr-10 text-sm text-slate-200 outline-none transition focus:border-indigo-400/40"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div
              className={`rounded-xl border p-4 transition ${
                role === "Member"
                  ? "border-indigo-400/20 bg-indigo-400/6"
                  : "border-white/7 bg-white/2"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-indigo-300">
                  <Users size={17} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-200">
                      Member access
                    </p>
                    {role === "Member" && (
                      <Check size={15} className="text-indigo-300" />
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Collaborate on projects and tasks with standard workspace
                    permissions.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 transition ${
                role === "Admin"
                  ? "border-violet-400/20 bg-violet-400/6"
                  : "border-white/[0.07] bg-white/2"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-violet-300">
                  <ShieldCheck size={17} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-200">
                      Admin access
                    </p>
                    {role === "Admin" && (
                      <Check size={15} className="text-violet-300" />
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Manage workspace settings, members, and workspace-level
                    configuration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white/2.5 px-3 py-2.5 text-[11px] leading-5 text-slate-500">
            <Mail size={14} className="shrink-0 text-slate-400" />
            This demo adds a pending invitation locally. Email delivery will be
            connected to the backend later.
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/6 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="h-11 rounded-xl border border-white/9 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Mail size={16} />
              )}
              Send invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteWorkspaceMemberModal;
