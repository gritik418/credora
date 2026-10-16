"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCheck, Search, UserPlus, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Props {
  open: boolean;
  members: any[];
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (memberIds: string[]) => void;
}

const AddProjectMembersModal = ({
  open,
  members,
  isLoading,
  onClose,
  onSubmit,
}: Props) => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIds([]);
    }
  }, [open]);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return members;

    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query),
    );
  }, [members, search]);

  const toggleMember = (memberId: string) => {
    setSelectedIds((current) =>
      current.includes(memberId)
        ? current.filter((id) => id !== memberId)
        : [...current, memberId],
    );
  };

  const toggleAll = () => {
    const visibleIds = filteredMembers.map((member) => member.id);
    const allSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedIds.includes(id));

    setSelectedIds((current) =>
      allSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : [...new Set([...current, ...visibleIds])],
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isLoading) {
              onClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-project-members-title"
            className="my-auto flex max-h-[min(720px,calc(100dvh-32px))] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1017] shadow-2xl shadow-black/60"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between border-b border-white/7 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2
                    id="add-project-members-title"
                    className="text-lg font-semibold text-white"
                  >
                    Add project members
                  </h2>
                  <p className="mt-1 max-w-sm text-sm leading-5 text-gray-400">
                    Select people who already belong to your organization.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                aria-label="Close modal"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/6 hover:text-white disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 pb-3 sm:px-6">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, email, or department"
                  className="h-11 w-full rounded-xl border border-white/8 bg-[#090b10] pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-400/40"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {filteredMembers.length} available{" "}
                  {filteredMembers.length === 1 ? "person" : "people"}
                </p>

                {filteredMembers.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="text-xs font-medium text-indigo-300 transition hover:text-indigo-200"
                  >
                    {filteredMembers.every((member) =>
                      selectedIds.includes(member.id),
                    )
                      ? "Deselect visible"
                      : "Select visible"}
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 sm:px-6">
              {filteredMembers.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/7 bg-white/3 text-gray-500">
                    <Users size={21} />
                  </div>
                  <p className="mt-3 text-sm font-medium text-white">
                    No available members
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Try another search or add members to your organization
                    first.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMembers.map((member) => {
                    const selected = selectedIds.includes(member.id);

                    return (
                      <button
                        type="button"
                        key={member.id}
                        disabled={isLoading}
                        onClick={() => toggleMember(member.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                          selected
                            ? "border-indigo-400/35 bg-indigo-500/9"
                            : "border-white/6 bg-white/1.5 hover:border-white/12 hover:bg-white/[0.035]"
                        } disabled:opacity-60`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${member.avatarColor} text-xs font-semibold text-white`}
                        >
                          {member.initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-100">
                            {member.name}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {member.email}
                          </p>
                          <p className="mt-1 text-[11px] text-gray-600">
                            {member.department}
                          </p>
                        </div>

                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                            selected
                              ? "border-indigo-400 bg-indigo-500 text-white"
                              : "border-white/15 bg-transparent text-transparent"
                          }`}
                        >
                          <Check size={13} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-white/7 bg-[#0b0d13] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCheck size={15} className="text-indigo-300" />
                {selectedIds.length} selected
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="h-10 flex-1 rounded-xl border border-white/8 px-4 text-sm font-medium text-gray-300 transition hover:bg-white/4 disabled:opacity-50 sm:flex-none"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => onSubmit(selectedIds)}
                  disabled={selectedIds.length === 0 || isLoading}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Adding members...
                    </>
                  ) : (
                    <>
                      <UserPlus size={15} />
                      Add {selectedIds.length > 0
                        ? selectedIds.length
                        : ""}{" "}
                      {selectedIds.length === 1 ? "member" : "members"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddProjectMembersModal;
