"use client";

import { Home, Settings, Sparkles, Users } from "lucide-react";

const PostsSidebar = () => {
  return (
    <aside className="hidden w-57.5 shrink-0 border-r border-post-border px-4 py-6 lg:block">
      <div className="sticky top-23">
        <div className="mb-6 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-(--post-text-faint)">
            Workspace
          </p>
        </div>

        <nav className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-xl border border-[rgba(99,102,241,0.14)] bg-[rgba(99,102,241,0.10)] px-3 py-2.5 text-left text-xs font-medium text-post-text">
            <Home size={16} className="text-post-primary-light" />
            Feed
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-post-primary-light" />
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-post-text-muted transition hover:bg-white/[0.035] hover:text-post-text-secondary">
            <Sparkles size={16} />
            Discover
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-post-text-muted transition hover:bg-white/[0.035] hover:text-post-text-secondary">
            <Users size={16} />
            Network
          </button>
        </nav>

        <div className="my-6 h-px bg-post-border" />

        <div className="mt-8 rounded-2xl border border-post-border bg-(--post-gradient-surface) p-4">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-(--post-primary-soft) text-post-primary-light">
            <Sparkles size={15} />
          </div>

          <p className="text-xs font-medium text-post-text">
            Build your identity
          </p>

          <p className="mt-1.5 text-[10px] leading-5 text-post-text-muted">
            Add projects and experience to make your professional history
            stronger.
          </p>

          <button className="mt-3 text-[10px] font-semibold text-post-primary-light">
            Complete identity →
          </button>
        </div>

        <button className="mt-6 flex w-full items-center gap-3 px-3 text-xs text-(--post-text-faint) transition hover:text-post-text-muted">
          <Settings size={15} />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default PostsSidebar;
