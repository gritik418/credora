"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Flame,
  Plus,
  TrendingUp,
} from "lucide-react";

const PostsRightSidebar = () => {
  return (
    <aside className="hidden w-72.5 shrink-0 border-l border-post-border px-5 py-8 xl:block">
      <div className="sticky top-23 space-y-4">
        <div className="rounded-2xl border border-post-border bg-post-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-post-text">
                Your Identity
              </p>

              <p className="mt-1 text-[10px] text-post-text-muted">
                Keep your professional history complete.
              </p>
            </div>

            <span className="text-xs font-semibold text-post-primary-light">
              82%
            </span>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/6">
            <div className="h-full w-[82%] rounded-full bg-post-gradient-primary" />
          </div>

          <button className="mt-4 flex w-full items-center justify-between text-[10px] font-semibold text-post-primary-light">
            Complete identity
            <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="rounded-2xl border border-post-border bg-post-surface p-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-post-blue" />

            <h3 className="text-sm font-semibold text-post-text">
              Trending skills
            </h3>
          </div>

          <div className="mt-4 space-y-3">
            {[
              ["React", "1.2k posts"],
              ["Next.js", "856 posts"],
              ["TypeScript", "621 posts"],
              ["Node.js", "578 posts"],
            ].map(([skill, count], index) => (
              <div key={skill} className="flex items-center gap-3">
                <span className="w-4 text-[9px] text-post-text-faint">
                  0{index + 1}
                </span>

                <div className="flex-1">
                  <p className="text-xs font-medium text-post-text-secondary">
                    #{skill}
                  </p>

                  <p className="mt-0.5 text-[9px] text-post-text-faint">
                    {count}
                  </p>
                </div>

                <Flame size={12} className="text-post-warning" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-post-border bg-post-surface p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-post-text">
              People to connect
            </h3>

            <button className="text-[10px] font-medium text-post-primary-light">
              See all
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {[
              ["AS", "Aman Sharma", "Frontend Engineer"],
              ["SK", "Sarah Khan", "Product Designer"],
            ].map(([initials, name, role]) => (
              <div key={name} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-post-gradient-primary text-[9px] font-bold text-white">
                  {initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-xs font-medium text-post-text">
                      {name}
                    </p>

                    <CheckCircle2
                      size={11}
                      className="shrink-0 text-post-success"
                    />
                  </div>

                  <p className="truncate text-[9px] text-post-text-muted">
                    {role}
                  </p>
                </div>

                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-post-border text-post-text-muted transition hover:border-post-primary hover:text-post-primary-light">
                  <Plus size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PostsRightSidebar;
