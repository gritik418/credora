"use client";

import { SlidersHorizontal, Sparkles } from "lucide-react";

const FeedHeader = () => {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles size={17} className="text-post-primary-light" />

          <h1 className="text-xl font-semibold tracking-tight text-post-text">
            Your Feed
          </h1>
        </div>

        <p className="mt-1 text-xs text-post-text-muted">
          Work, ideas and achievements from your professional network.
        </p>
      </div>

      <button className="flex items-center gap-2 rounded-lg border border-post-border px-3 py-2 text-[10px] font-medium text-post-text-muted transition hover:border-post-border-hover hover:text-post-text-secondary">
        <SlidersHorizontal size={13} />
        Latest
      </button>
    </div>
  );
};

export default FeedHeader;
