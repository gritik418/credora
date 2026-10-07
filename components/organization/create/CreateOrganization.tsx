"use client";

import { ArrowLeft, Building2, Sparkles } from "lucide-react";
import Link from "next/link";
import CreateOrganizationForm from "./CreateOrganizationForm";
import OrganizationPreview from "./OrganizationPreview";

const CreateOrganization = () => {
  return (
    <main className="org-shell org-background min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/org"
            className="group flex items-center gap-2 text-xs font-medium text-white/35 transition hover:text-white/70"
          >
            <ArrowLeft
              size={15}
              className="transition group-hover:-translate-x-0.5"
            />
            Back to organizations
          </Link>

          <div className="flex items-center gap-2 text-xs text-white/25">
            <Building2 size={14} />
            New organization
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-500/8 px-3 py-1.5 text-[11px] font-medium text-indigo-300">
              <Sparkles size={13} />
              Create your workspace
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Start something new.
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/40 sm:text-base">
              Create an organization to bring your people, workspaces, projects
              and professional contributions together.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <CreateOrganizationForm />
            <OrganizationPreview />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateOrganization;
