"use client";

import { Check, ChevronDown, Search, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";

export interface SelectableMember {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
}

interface MemberMultiSelectProps {
  label: string;
  description: string;
  members: SelectableMember[];
  selectedIds: string[];
  onToggle: (member: SelectableMember) => void;
  onClear: () => void;
  accent?: "indigo" | "violet";
  error?: string;
}

const MemberMultiSelect = ({
  label,
  description,
  members,
  selectedIds,
  onToggle,
  onClear,
  accent = "indigo",
  error,
}: MemberMultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) =>
      [member.name, member.username, member.email].some((value) =>
        (value ?? "").toLowerCase().includes(query),
      ),
    );
  }, [members, search]);

  const selectedMembers = members.filter((member) =>
    selectedIds.includes(member.id),
  );

  const styles =
    accent === "violet"
      ? {
          icon: "text-violet-300",
          active: "border-violet-400/30 bg-violet-500/8",
          checkbox: "border-violet-400 bg-violet-500 text-white",
          chip: "border-violet-400/20 bg-violet-500/8 text-violet-200",
        }
      : {
          icon: "text-indigo-300",
          active: "border-indigo-400/30 bg-indigo-500/8",
          checkbox: "border-indigo-400 bg-indigo-500 text-white",
          chip: "border-indigo-400/20 bg-indigo-500/8 text-indigo-200",
        };

  const initials = (name: string) =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] ?? "")
      .join("")
      .toUpperCase();

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-slate-200">{label}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>

        <span className="shrink-0 rounded-lg border border-white/8 bg-white/3 px-2.5 py-1 text-xs tabular-nums text-slate-400">
          {selectedIds.length} selected
        </span>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((value) => !value)}
          className={`flex min-h-14.5 w-full items-center gap-3 rounded-xl border bg-[#0a0c13] p-3 text-left transition ${
            error
              ? "border-rose-400/50"
              : open
                ? styles.active
                : "border-white/8 hover:border-white/15"
          }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.035] ${styles.icon}`}
          >
            <UserRound size={17} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-slate-200">
              {selectedIds.length
                ? `${selectedIds.length} ${label.toLowerCase()}`
                : `Select ${label.toLowerCase()}`}
            </span>

            <span className="mt-1 block truncate text-xs text-slate-500">
              {selectedMembers.length
                ? selectedMembers.map((member) => member.name).join(", ")
                : "Search and select team members"}
            </span>
          </span>

          <ChevronDown
            size={17}
            className={`shrink-0 text-slate-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#11141e] shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
            <div className="border-b border-white/7 p-3">
              <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/8 bg-black/20 px-3 focus-within:border-indigo-400/40">
                <Search size={15} className="shrink-0 text-slate-500" />

                <input
                  autoFocus
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, username or email..."
                  className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-slate-600"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="text-slate-500 transition hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div
              className="max-h-60 overflow-y-auto p-1.5"
              role="listbox"
              aria-multiselectable="true"
            >
              {filteredMembers.length ? (
                filteredMembers.map((member) => {
                  const selected = selectedIds.includes(member.id);

                  return (
                    <button
                      key={member.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => onToggle(member)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                        selected
                          ? styles.active
                          : "border-transparent hover:bg-white/4"
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/8 bg-linear-to-br from-indigo-500/20 to-violet-500/20 text-xs font-semibold text-indigo-200">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          initials(member.name)
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-slate-200">
                          {member.name}
                        </span>

                        <span className="mt-1 block truncate text-[10px] text-slate-500">
                          @{member.username} · {member.email}
                        </span>
                      </span>

                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                          selected
                            ? styles.checkbox
                            : "border-white/15 text-transparent"
                        }`}
                      >
                        <Check size={12} />
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-9 text-center">
                  <UserRound
                    size={22}
                    className="mx-auto mb-2 text-slate-600"
                  />
                  <p className="text-xs text-slate-400">No members found</p>
                  <p className="mt-1 text-[10px] text-slate-600">
                    Try another name or username.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/7 px-3.5 py-3">
              <span className="text-[10px] text-slate-500">
                {selectedIds.length} selected
              </span>

              <div className="flex items-center gap-3">
                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="text-xs text-slate-400 transition hover:text-white"
                  >
                    Clear all
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-white/7 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/12"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-1.5 text-xs text-rose-300"
        >
          <X size={14} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      {selectedMembers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedMembers.map((member) => (
            <span
              key={member.id}
              className={`inline-flex max-w-full items-center gap-2 rounded-lg border py-1.5 pl-1.5 pr-2 ${styles.chip}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/6 text-[9px] font-semibold">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials(member.name)
                )}
              </span>

              <span className="max-w-36 truncate text-[10px] font-medium">
                {member.name}
              </span>

              <button
                type="button"
                onClick={() => onToggle(member)}
                aria-label={`Remove ${member.name}`}
                className="shrink-0 opacity-60 transition hover:opacity-100"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberMultiSelect;
