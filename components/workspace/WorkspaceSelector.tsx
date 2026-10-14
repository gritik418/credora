"use client";

import { selectSelectedOrganization } from "@/features/organization/organization.selectors";
import { useSwitchWorkspaceMutation } from "@/features/workspace/workspace.api";
import {
  selectSelectedWorkspace,
  selectWorkspaces,
} from "@/features/workspace/workspace.selectors";
import { useAppSelector } from "@/store/hooks";
import { Check, ChevronDown, FolderKanban, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  setIsSwitching: Dispatch<SetStateAction<boolean>>;
}

const WorkspaceSelector = ({ setIsSwitching }: Props) => {
  const router = useRouter();
  const [switchWorkspace] = useSwitchWorkspaceMutation();

  const workspaces = useAppSelector(selectWorkspaces);
  const organization = useAppSelector(selectSelectedOrganization);
  const selectedWorkspace = useAppSelector(selectSelectedWorkspace);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSwitchWorkspace = async (
    organizationId: string,
    workspaceId: string,
  ) => {
    try {
      setIsSwitching(true);

      const result = await switchWorkspace({
        organizationId,
        workspaceId,
      }).unwrap();

      if (result.success && result.data?.workspace.slug) {
        router.replace(`/workspace/${result.data?.workspace.slug}`);
      } else {
        toast.error(result.message || "Failed to switch workspace.");
      }

      setIsOpen(false);
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    } finally {
      setIsSwitching(false);
    }
  };

  if (!organization) {
    return null;
  }

  return (
    <div className="relative border-b border-white/6 p-3">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="group/selector cursor-pointer flex h-12 w-full items-center gap-3 rounded-xl border border-white/6 bg-white/2.5 px-3 text-left transition hover:border-indigo-400/20 hover:bg-indigo-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      >
        {selectedWorkspace?.logo ? (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg">
            <img
              src={selectedWorkspace.logo}
              alt={selectedWorkspace.name}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
            <FolderKanban size={16} />
          </div>
        )}

        <div className="min-w-0 flex-1 opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100">
          <p className="truncate whitespace-nowrap text-xs font-medium text-zinc-200">
            {selectedWorkspace?.name ?? "Select workspace"}
          </p>
          <p className="truncate text-[10px] text-zinc-500">
            Workspace environment
          </p>
        </div>

        <ChevronDown
          size={15}
          className={`shrink-0 text-zinc-500 transition duration-200 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:group-focus-within/sidebar:opacity-100 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute lg:hidden lg:group-hover/sidebar:block lg:group-focus-within/sidebar:block left-3 right-3 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#101014] shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 border-b border-white/6 px-3 py-3">
            <Search size={14} className="shrink-0 text-zinc-500" />

            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a workspace..."
              className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-zinc-600"
            />

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSearch("");
              }}
              className="text-zinc-500 cursor-pointer transition hover:text-white"
              aria-label="Close workspace selector"
            >
              <X size={14} />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2 p-1.5">
            <p className="px-2 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Your workspaces
            </p>

            {selectedWorkspace ? (
              <button
                key={selectedWorkspace?.id}
                type="button"
                onClick={() =>
                  handleSwitchWorkspace(organization.id, selectedWorkspace.id)
                }
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition bg-indigo-500/10 text-indigo-200
              }`}
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10
                }`}
                >
                  <FolderKanban size={15} />
                </div>

                <span className="min-w-0 flex-1 truncate text-xs font-medium">
                  {selectedWorkspace?.name}
                </span>

                <Check size={15} className="shrink-0 text-indigo-300" />
              </button>
            ) : null}

            {filteredWorkspaces.length === 0 ? (
              <p className="px-3 py-5 text-center text-xs text-zinc-500">
                No workspaces found.
              </p>
            ) : (
              filteredWorkspaces
                .filter((w) => w.id !== selectedWorkspace?.id)
                .map((workspace) => {
                  return (
                    <button
                      key={workspace.id}
                      type="button"
                      onClick={() =>
                        handleSwitchWorkspace(organization.id, workspace.id)
                      }
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition text-zinc-300 hover:bg-white/4 hover:text-white`}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/6 bg-white/3">
                        <FolderKanban size={15} />
                      </div>

                      <span className="min-w-0 flex-1 truncate text-xs font-medium">
                        {workspace.name}
                      </span>
                    </button>
                  );
                })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSelector;
