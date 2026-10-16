"use client";

import { ArrowUpRight, Network } from "lucide-react";

const ConnectionsHeader = () => (
  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div className="flex flex-col items-start gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
        <Network size={22} />
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Your connections
        </h1>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-gray-400">
          Build meaningful professional relationships with people who move your
          career forward.
        </p>
      </div>
    </div>

    <a
      href="/identity"
      className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-white/8 bg-white/3 px-3.5 text-sm font-medium text-gray-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/7 hover:text-white sm:self-center"
    >
      Your identity
      <ArrowUpRight size={15} />
    </a>
  </div>
);

export default ConnectionsHeader;
