"use client";

import {
  Activity,
  Building2,
  CheckCircle2,
  FolderKanban,
  Users,
} from "lucide-react";
import { useState } from "react";

const OrganizationPreview = () => {
  const [organizationName] = useState("Your Organization");

  return (
    <div className="lg:sticky lg:top-8 lg:self-start">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <p className="org-label">Preview</p>
          <p className="mt-1 text-xs text-white/30">
            How your organization starts
          </p>
        </div>

        <span className="rounded-full border border-emerald-400/15 bg-emerald-400/8 px-2.5 py-1 text-[9px] font-medium text-emerald-300">
          Ready
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#0c0f17] shadow-2xl shadow-black/30">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/12 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-500/8 blur-3xl" />

        <div className="relative border-b border-white/6 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
              <Building2 size={21} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {organizationName}
              </p>
              <p className="mt-1 text-[10px] text-white/30">
                Organization workspace
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs leading-5 text-white/30">
            Your organization will become the home for your teams, projects and
            professional work.
          </p>
        </div>

        <div className="relative grid grid-cols-2 gap-px bg-white/6">
          {[
            {
              label: "Members",
              value: "1",
              icon: Users,
            },
            {
              label: "Workspaces",
              value: "0",
              icon: Activity,
            },
            {
              label: "Projects",
              value: "0",
              icon: FolderKanban,
            },
            {
              label: "Status",
              value: "Ready",
              icon: CheckCircle2,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="bg-[#0c0f17] p-4">
                <Icon size={15} className="text-white/25" />

                <p className="mt-4 text-lg font-semibold text-white">
                  {item.value}
                </p>

                <p className="mt-0.5 text-[10px] text-white/25">{item.label}</p>
              </div>
            );
          })}
        </div>

        <div className="relative border-t border-white/6 p-5">
          <p className="org-label">What happens next</p>

          <div className="mt-4 space-y-3">
            {[
              "Create your organization",
              "Set up your first workspace",
              "Invite your team",
              "Start tracking real work",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/4 text-[9px] font-medium text-white/35">
                  {index + 1}
                </div>

                <p className="text-xs text-white/40">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[10px] leading-5 text-white/20">
        You can change organization settings and invite members anytime.
      </p>
    </div>
  );
};

export default OrganizationPreview;
