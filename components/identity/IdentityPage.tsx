"use client";

import {
  Activity,
  BriefcaseBusiness,
  FolderKanban,
  Globe,
  Mail,
  MapPin,
  Share2,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import IdentityHeader from "./IdentityHeader";
import IdentityStats from "./IdentityStats";
import IdentityTabs from "./IdentityTabs";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContributionsSection from "./ContributionsSection";
import VerificationCard from "./VerificationCard";
import ActivitySection from "./ActivitySection";

const IdentityPage = ({ username }: { username: string }) => {
  return (
    <main className="min-h-screen bg-background">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute right-0 top-150 h-100 w-100 rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 lg:px-8">
        {/* Top navigation */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <span className="text-sm font-bold">C</span>
            </div>

            <span className="text-sm font-semibold tracking-tight">
              Credora
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-xl border border-border bg-card/70 px-3 py-2 text-sm font-medium transition hover:bg-muted sm:flex">
              <Share2 className="h-4 w-4" />
              Share
            </button>

            <button className="rounded-xl border border-border bg-card/70 p-2 transition hover:bg-muted">
              <Globe className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Identity header */}
        <IdentityHeader username={username} />

        {/* Stats */}
        <IdentityStats />

        {/* Tabs */}
        <IdentityTabs />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main content */}
          <div className="min-w-0 space-y-8">
            <AboutSection />

            <ExperienceSection />

            <ProjectsSection />

            <SkillsSection />

            <ContributionsSection />

            <ActivitySection />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <VerificationCard />

            {/* Contact */}
            <section className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Connect
                </p>

                <h3 className="mt-1 text-base font-semibold">
                  Professional links
                </h3>
              </div>

              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-xl border border-border/70 p-3 transition hover:bg-muted"
                >
                  <FaGithub className="h-4 w-4" />
                  <span className="text-sm">GitHub</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 rounded-xl border border-border/70 p-3 transition hover:bg-muted"
                >
                  <FaLinkedin className="h-4 w-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 rounded-xl border border-border/70 p-3 transition hover:bg-muted"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Contact</span>
                </a>
              </div>
            </section>

            {/* Current focus */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Activity className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Currently</p>
                  <h3 className="text-sm font-semibold">
                    Open to opportunities
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Interested in full-stack product engineering, AI-powered
                products, and teams building ambitious software.
              </p>
            </section>

            {/* Quick record */}
            <section className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Record
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-medium">6 months verified</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Projects</p>
                    <p className="text-sm font-medium">8 documented</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">India</p>
                  </div>
                </div>
              </div>
            </section>

            <p className="px-2 text-center text-xs leading-5 text-muted-foreground">
              This identity is powered by Credora. Verified records are provided
              by organizations and connected workspaces.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default IdentityPage;
