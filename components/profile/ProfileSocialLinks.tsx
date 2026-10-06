import { ICurrentProfile } from "@/features/auth/auth.interface";
import { ExternalLink, Globe, Plus } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { LiaLinkedinIn } from "react-icons/lia";
import Link from "next/link";

interface Props {
  profile?: ICurrentProfile;
}

const ProfileSocialLinks = ({ profile }: Props) => {
  const github = profile?.githubUrl;
  const linkedin = profile?.linkedinUrl;
  const website = profile?.website;

  const links = [
    {
      label: "GitHub",
      description: "Projects, code, and open-source work",
      value: github,
      icon: BsGithub,
      iconClass: "text-white",
      iconBg: "bg-white/10",
      border: "border-white/8",
      background: "bg-white/[0.025]",
    },
    {
      label: "LinkedIn",
      description: "Professional profile and network",
      value: linkedin,
      icon: LiaLinkedinIn,
      iconClass: "text-blue-400",
      iconBg: "bg-blue-500/10",
      border: "border-blue-500/10",
      background: "bg-blue-500/[0.04]",
    },
    {
      label: "Website",
      description: "Personal website and portfolio",
      value: website,
      icon: Globe,
      iconClass: "text-indigo-400",
      iconBg: "bg-indigo-500/10",
      border: "border-indigo-500/10",
      background: "bg-indigo-500/[0.04]",
    },
  ];

  return (
    <section className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-white">Social links</h2>

      <p className="mt-1 text-xs text-white/25">Find me across the web</p>

      <div className="mt-5 space-y-3">
        {links.map((link) => {
          const Icon = link.icon;

          if (!link.value) {
            return (
              <Link
                key={link.label}
                href="/profile/edit"
                className="group flex items-center gap-3 rounded-xl border border-dashed border-white/8 bg-white/1.5 p-3.5 transition hover:border-indigo-400/20 hover:bg-indigo-500/4"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${link.iconBg} ${link.iconClass}`}
                >
                  <Icon size={16} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white/70">
                    Add {link.label}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-white/25">
                    Connect your {link.label} profile
                  </p>
                </div>

                <Plus
                  size={15}
                  className="shrink-0 text-white/20 transition group-hover:text-indigo-400"
                />
              </Link>
            );
          }

          return (
            <a
              key={link.label}
              href={link.value}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 rounded-xl border p-3.5 transition hover:border-white/15 hover:bg-white/4.5 ${link.border} ${link.background}`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${link.iconBg} ${link.iconClass}`}
              >
                <Icon size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white/80">
                  {link.label}
                </p>

                <p className="mt-0.5 truncate text-xs text-white/30">
                  {link.description}
                </p>
              </div>

              <ExternalLink
                size={15}
                className="shrink-0 text-white/20 transition group-hover:text-white/50"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileSocialLinks;
