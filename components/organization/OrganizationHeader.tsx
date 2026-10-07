"use client";

import { Building2, Settings, UserPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const OrganizationHeader = () => {
  const router = useRouter();
  const params = useParams<{ orgSlug: string }>();

  const orgName = params.orgSlug
    ? params.orgSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Organization";

  return (
    <header className="border-b sticky top-0 border-white/6 z-10 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-5 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
            <Building2 size={20} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-white">
              {orgName}
            </h1>
            <p className="mt-0.5 text-xs text-white/35">
              Organization workspace
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => router.push(`/org/${params.orgSlug}/settings`)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5 text-sm font-medium text-white/55 transition hover:border-white/15 hover:bg-white/6 hover:text-white"
          >
            <Settings size={15} />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            type="button"
            onClick={() => router.push(`/org/${params.orgSlug}/members`)}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            <UserPlus size={15} />
            <span className="hidden sm:inline">Invite</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default OrganizationHeader;
