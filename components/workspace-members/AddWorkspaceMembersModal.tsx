"use client";

import { selectOrganizationMembers } from "@/features/organization-member/organization-member.selectors";
import { useAddWorkspaceMembersMutation } from "@/features/workspace-member/workspace-member.api";
import { AddWorkspaceMembersResponseDto } from "@/features/workspace-member/workspace-member.interface";
import { selectWorkspaceMembers } from "@/features/workspace-member/workspace-member.selectors";
import { selectSelectedWorkspace } from "@/features/workspace/workspace.selectors";
import { getInitials } from "@/lib/string.utils";
import { useAppSelector } from "@/store/hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Check, LoaderCircle, Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export interface OrganizationMember {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  organizationRole: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddWorkspaceMembersModal = ({ open, onClose }: Props) => {
  const [addMembers, { isLoading }] = useAddWorkspaceMembersMutation();
  const [search, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const workspace = useAppSelector(selectSelectedWorkspace);

  const organizationMembers = useAppSelector(selectOrganizationMembers);
  const workspaceMembers = useAppSelector(selectWorkspaceMembers);

  const availableMembers = useMemo(() => {
    const existingIds = new Set(
      workspaceMembers.map((member) => member.userId),
    );
    const query = search.trim().toLowerCase();

    return organizationMembers.filter((member) => {
      if (existingIds.has(member.user.id)) return false;

      return (
        member.user.name.toLowerCase().includes(query) ||
        member.user.email.toLowerCase().includes(query)
      );
    });
  }, [organizationMembers, workspaceMembers, search]);

  if (!open) return null;

  const toggleMember = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((memberId) => memberId !== id)
        : [...current, id],
    );
  };

  const onAddMembers = async (members: string[]) => {
    try {
      if (!workspace?.id) {
        toast.error("No workspace selected.");
        return;
      }

      const result = await addMembers({
        workspaceId: workspace?.id,
        data: {
          members,
        },
      }).unwrap();

      if (result.success) {
        const message = result.data?.addedCount
          ? `Added ${result.data.addedCount} member(s) to the workspace.`
          : "No members added to the workspace.";
        toast.success(result.message || message);
      } else {
        toast.error(result.message || "Failed to add members.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as AddWorkspaceMembersResponseDto;

        if (response.errors) {
          if (response.errors.members) {
            toast.error(response.errors.members);
          }
        } else {
          toast.error(response.message || "Something went wrong.");
        }
        return;
      }

      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const handleClose = () => {
    setSearch("");
    setSelectedIds([]);
    onClose();
  };

  const handleSubmit = () => {
    if (!selectedIds.length) return;

    onAddMembers(selectedIds);

    handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="relative my-auto flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f18] shadow-[0_25px_100px_rgba(0,0,0,0.65)]">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-[75px]" />

        <div className="relative flex items-start justify-between border-b border-white/7 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
              <Users size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Add workspace members
              </h2>
              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                Select members from your organization to give them access to
                this workspace.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close add members modal"
            className="rounded-lg cursor-pointer border border-white/10 p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col gap-5 p-6">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
              autoFocus
              className="h-11 w-full rounded-xl border border-white/10 bg-[#080b13] pl-10 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">
              Organization members
            </p>
            <p className="text-xs text-indigo-300">
              {selectedIds.length} selected
            </p>
          </div>

          <div className="min-h-0 max-h-64 flex-1 space-y-1 overflow-y-auto">
            {availableMembers.length ? (
              availableMembers.map((member) => {
                const selected = selectedIds.includes(member.userId);

                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.userId)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      selected
                        ? "border-indigo-400/25 bg-indigo-400/7"
                        : "border-transparent hover:border-white/7 hover:bg-white/3"
                    }`}
                  >
                    {member.user.avatar ? (
                      <img
                        src={member.user.avatar}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-indigo-500/20 to-violet-500/20 text-xs font-semibold text-indigo-200">
                        {getInitials(member.user.name)}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">
                        {member.user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {member.user.email}
                      </p>
                    </div>

                    <span className="hidden rounded-md border border-white/7 px-2 py-1 text-[10px] text-slate-400 sm:inline-flex">
                      {member.role}
                    </span>

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        selected
                          ? "border-indigo-400 bg-indigo-500 text-white"
                          : "border-white/20 text-transparent"
                      }`}
                    >
                      <Check size={13} />
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Users size={24} className="text-slate-600" />
                <p className="mt-3 text-sm font-medium text-slate-300">
                  {organizationMembers.length
                    ? "No available members found"
                    : "No organization members available"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {organizationMembers.length
                    ? "Try another search or check whether these members already belong to this workspace."
                    : "Add members to your organization first."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-3 border-t border-white/7 p-6">
          <p className="text-xs text-slate-500">
            Only existing organization members can be added.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="h-10 cursor-pointer rounded-xl border border-white/10 px-4 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!selectedIds.length || isLoading}
              onClick={handleSubmit}
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <Users size={15} />
              )}

              {isLoading
                ? "Adding members..."
                : `Add ${selectedIds.length || ""} ${
                    selectedIds.length === 1 ? "member" : "members"
                  }`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkspaceMembersModal;
