import { ArrowUpRight, Network, Sparkles } from "lucide-react";

const ConnectionsHeader = () => {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/9 bg-white/2.5 px-6 py-7 sm:px-9 sm:py-9">
      <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-violet-500/9 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/6 px-3 py-1.5 text-xs font-medium text-violet-300">
            <Sparkles size={13} />
            Your professional network
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Relationships that
            <span className="block bg-linear-to-r from-violet-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
              move you forward.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
            Connect with people, discover shared expertise, and build a network
            around the work you do.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/9 bg-white/[0.035]">
            <Network className="h-5 w-5 text-violet-300" />
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              Built on credibility
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Your network, your next opportunity
            </p>
          </div>

          <ArrowUpRight className="ml-2 hidden h-5 w-5 text-gray-500 sm:block" />
        </div>
      </div>
    </header>
  );
};

export default ConnectionsHeader;
