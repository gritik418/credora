"use client";

import { ArrowRight, Building2, Check, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Organization,
  OrganizationMemberRole,
} from "@/features/organization/organization.interface";

interface Props {
  organization: Organization;
}

const colorMap = {
  indigo: {
    icon: "border-indigo-400/15 bg-indigo-500/10 text-indigo-300",
    glow: "bg-indigo-500/10",
    badge: "border-indigo-400/15 bg-indigo-500/10 text-indigo-300",
  },
  violet: {
    icon: "border-violet-400/15 bg-violet-500/10 text-violet-300",
    glow: "bg-violet-500/10",
    badge: "border-violet-400/15 bg-violet-500/10 text-violet-300",
  },
  blue: {
    icon: "border-blue-400/15 bg-blue-500/10 text-blue-300",
    glow: "bg-blue-500/10",
    badge: "border-blue-400/15 bg-blue-500/10 text-blue-300",
  },
  emerald: {
    icon: "border-emerald-400/15 bg-emerald-500/10 text-emerald-300",
    glow: "bg-emerald-500/10",
    badge: "border-emerald-400/15 bg-emerald-500/10 text-emerald-300",
  },
  amber: {
    icon: "border-amber-400/15 bg-amber-500/10 text-amber-300",
    glow: "bg-amber-500/10",
    badge: "border-amber-400/15 bg-amber-500/10 text-amber-300",
  },
};

const OrganizationCard = ({ organization }: Props) => {
  const router = useRouter();

  const getColorTheme = (role: OrganizationMemberRole) => {
    switch (role) {
      case OrganizationMemberRole.OWNER:
        return colorMap.indigo;

      case OrganizationMemberRole.ADMIN:
        return colorMap.violet;

      case OrganizationMemberRole.RECRUITER:
        return colorMap.blue;

      case OrganizationMemberRole.MANAGER:
        return colorMap.emerald;

      case OrganizationMemberRole.MEMBER:
        return colorMap.amber;

      default:
        return colorMap.indigo;
    }
  };

  const theme = getColorTheme(organization.role);

  return (
    <button
      type="button"
      onClick={() => router.push(`/org/${organization.slug}`)}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-3xl border text-left transition duration-300 ${
        organization.isActive
          ? "border-indigo-400/25 bg-indigo-500/[0.07] shadow-[0_20px_70px_rgba(79,70,229,0.12)]"
          : "border-white/8 bg-white/2.5 hover:-translate-y-1 hover:border-white/15 hover:bg-white/4.5"
      }`}
    >
      <div
        className={`absolute -right-20 -top-20 h-56 w-56 rounded-full ${theme.glow} blur-3xl transition duration-500 group-hover:scale-125`}
      />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border ${theme.icon}`}
          >
            {organization.logo ? (
              <img
                src={organization.logo}
                alt={organization.name}
                className="h-full w-full rounded-xl object-cover"
                width={100}
                height={100}
              />
            ) : (
              <Building2 size={21} />
            )}
          </div>

          <div className="flex items-center gap-2">
            {organization.isActive && (
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/8 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                <Check size={11} />
                Active
              </span>
            )}

            <ArrowRight
              size={18}
              className="text-white/20 transition duration-300 group-hover:translate-x-1 group-hover:text-white/60"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            {organization.name}
          </h2>

          <p className="mt-1 text-xs text-white/25">@{organization.slug}</p>

          <p className="mt-3 min-h-10 max-w-md text-xs leading-5 text-white/35">
            {organization.description ||
              "No organization description has been added yet."}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-medium ${theme.badge}`}
          >
            {organization.role}
          </span>

          <span className="flex items-center gap-1.5 rounded-lg border border-white/6 bg-white/2.5 px-2.5 py-1.5 text-[10px] text-white/35">
            <Mail size={12} />
            {organization.supportEmail}
          </span>
        </div>

        <div className="mt-6 border-t border-white/6 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/20">
              Member since
            </span>

            <span className="text-[10px] text-white/35">
              {new Date(organization.joinedAt).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default OrganizationCard;
