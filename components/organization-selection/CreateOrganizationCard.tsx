"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateOrganizationCard = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/org/create")}
      className="group relative flex min-h-65 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/10 bg-white/1.5 p-6 text-center transition duration-300 hover:border-indigo-400/25 hover:bg-indigo-500/[0.035]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)] opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.035] text-white/35 transition group-hover:border-indigo-400/20 group-hover:bg-indigo-500/10 group-hover:text-indigo-300">
        <Plus size={23} />
      </div>

      <h2 className="relative mt-5 text-sm font-semibold text-white/75">
        Create an organization
      </h2>

      <p className="relative mt-1.5 max-w-xs text-xs leading-5 text-white/30">
        Start a new organization and bring your team, projects and work
        together.
      </p>

      <span className="relative mt-5 flex items-center gap-1.5 text-xs font-medium text-indigo-300/70 transition group-hover:text-indigo-300">
        Get started
        <ArrowUpRight size={13} />
      </span>
    </button>
  );
};

export default CreateOrganizationCard;
