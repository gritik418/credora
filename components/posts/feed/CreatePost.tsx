"use client";

import {
  BriefcaseBusiness,
  Image,
  Lightbulb,
  Plus,
  Trophy,
} from "lucide-react";

const CreatePost = () => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.09), rgba(11,11,15,0.95) 45%, rgba(59,130,246,0.06))",
        borderColor: "var(--credora-border)",
      }}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-credora-violet opacity-8 blur-3xl" />

      <div className="relative">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-credora-gradient-primary text-sm font-semibold text-white">
            RG
          </div>

          <button className="flex min-h-11 flex-1 items-center rounded-xl border border-credora-border bg-black/20 px-4 text-left text-sm text-credora-text-muted transition hover:border-credora-border-hover hover:bg-white/2.5">
            What are you working on?
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-credora-border pt-4">
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-credora-text-secondary transition hover:bg-white/4 hover:text-credora-text">
            <BriefcaseBusiness size={15} className="text-credora-primary" />
            Project
          </button>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-credora-text-secondary transition hover:bg-white/4 hover:text-credora-text">
            <Trophy size={15} className="text-credora-amber" />
            Achievement
          </button>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-credora-text-secondary transition hover:bg-white/4 hover:text-credora-text">
            <Lightbulb size={15} className="text-credora-violet" />
            Idea
          </button>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-credora-text-secondary transition hover:bg-white/4 hover:text-credora-text">
            <Image size={15} className="text-credora-blue" />
            Media
          </button>

          <button className="ml-auto flex items-center gap-2 rounded-lg bg-credora-primary px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-credora-primary-hover">
            <Plus size={15} />
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
