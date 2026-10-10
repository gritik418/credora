"use client";

import { useState } from "react";
import { Mail, Plus, ShieldCheck, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onInvite: (email: string, role: "ADMIN" | "MANAGER" | "MEMBER") => void;
}

const InviteMemberModal = ({ open, onClose, onInvite }: Props) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "MEMBER">("MEMBER");

  if (!open) return null;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    onInvite(email.trim(), role);
    setEmail("");
    setRole("MEMBER");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="org-card-gradient w-full max-w-md p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
            <Mail size={22} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/40 transition hover:bg-white/6 hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-semibold text-white">
          Invite a team member
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/45">
          Give someone access to your organization and collaborate on work
          together.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-white/70">
              Work email
            </label>

            <input
              autoFocus
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="h-11 w-full rounded-xl border border-white/9 bg-black/20 px-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-400/50"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-white/70">
              Organization role
            </label>

            <div className="relative">
              <ShieldCheck
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-300"
              />

              <select
                value={role}
                onChange={(event) => setRole(event.target.value as typeof role)}
                className="h-11 w-full appearance-none rounded-xl border border-white/9 bg-[#10131d] pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-400/50"
              >
                <option value="MEMBER">Member — Standard access</option>
                <option value="MANAGER">Manager — Team management</option>
                <option value="ADMIN">Admin — Organization management</option>
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-400/10 bg-indigo-500/5 p-3.5">
            <p className="text-xs leading-5 text-white/50">
              The selected role determines the member's permissions within the
              organization.
            </p>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="org-secondary-button flex-1 rounded-xl px-4 py-3 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="org-primary-button flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
            >
              <Plus size={16} />
              Invite member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
