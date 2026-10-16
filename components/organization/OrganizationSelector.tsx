"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, ChevronDown, Plus, Layers3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
  selectOrganizations,
  selectSelectedOrganization,
} from "@/features/organization/organization.selectors";
import OrganizationSwitchLoader from "../loaders/OrganizationSwitchLoader";
import { useSwitchOrganizationMutation } from "@/features/organization/organization.api";
import { toast } from "react-toastify";

const OrganizationSelector = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [switchOrganization, { isLoading }] = useSwitchOrganizationMutation();

  const organization = useAppSelector(selectSelectedOrganization);

  const organizations = useAppSelector(selectOrganizations);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSwitchOrganization = async (organizationId: string) => {
    try {
      const result = await switchOrganization({ organizationId }).unwrap();

      if (result.success && result.data?.organization.slug) {
        router.replace(`/org/${result.data?.organization.slug}`);
      } else {
        toast.error(result.message || "Failed to switch organization.");
      }

      setIsOpen(false);
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  if (!organization) {
    return null;
  }

  if (isLoading) {
    return <OrganizationSwitchLoader />;
  }

  return (
    <div ref={dropdownRef} className="relative w-full min-w-0 p-4">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full min-w-0 cursor-pointer items-center gap-3 rounded-xl border border-white/7 bg-white/2.5 p-3 text-left transition hover:border-white/12 hover:bg-white/4.5"
      >
        {organization.logo ? (
          <img
            src={organization.logo}
            alt="logo"
            className="flex h-9 w-9 object-contain shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/20 to-violet-500/10 text-indigo-300">
            <Building2 size={17} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-white/80">
            {organization.name}
          </p>
          <p className="mt-0.5 text-[10px] text-white/30">
            Current organization
          </p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={15} className="text-white/35" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="absolute left-4 right-4 top-full z-50 box-border overflow-hidden rounded-xl border border-white/10 bg-[#101014] p-1.5 shadow-2xl shadow-black/50"
          >
            <div className="px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
                Your organizations
              </p>
            </div>

            <div className="max-h-64 space-y-1 overflow-y-auto">
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSwitchOrganization(organization.id)}
                className="flex w-full min-w-0 items-center gap-3 rounded-lg bg-indigo-500/10 p-2.5 text-left transition hover:bg-indigo-500/15"
              >
                {organization.logo ? (
                  <img
                    src={organization.logo}
                    alt="logo"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300"
                  />
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
                    <Building2 size={15} />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white">
                    {organization.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-indigo-300/70">
                    Current organization
                  </p>
                </div>

                <Check size={15} className="shrink-0 text-indigo-300" />
              </button>

              {organizations
                .filter((org) => org.slug !== organization.slug)
                .map((org) => (
                  <button
                    key={org.slug}
                    type="button"
                    role="menuitem"
                    onClick={() => handleSwitchOrganization(org.id)}
                    className="flex w-full cursor-pointer min-w-0 items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-white/5"
                  >
                    {org.logo ? (
                      <img
                        src={org.logo}
                        alt="logo"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-white/50"
                      />
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-white/50">
                        <Building2 size={15} />
                      </div>
                    )}
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-white/70">
                      {org.name}
                    </span>
                  </button>
                ))}
            </div>

            <div className="my-1.5 border-t border-white/7" />

            <button
              type="button"
              role="menuitem"
              onClick={() => handleNavigate("/org")}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-white/5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-white/50">
                <Layers3 size={15} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white/75">
                  View all organizations
                </p>
                <p className="mt-0.5 text-[10px] text-white/35">
                  Manage your workspaces
                </p>
              </div>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => handleNavigate("/org/create")}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-white/5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
                <Plus size={15} />
              </div>

              <span className="text-xs font-medium text-indigo-300">
                Create organization
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizationSelector;
