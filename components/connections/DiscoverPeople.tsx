import { Sparkles } from "lucide-react";
import ConnectionsGrid from "./ConnectionsGrid";

interface Props {
  users: any[];
}

const DiscoverPeople = ({ users }: Props) => (
  <div className="space-y-5">
    <div className="relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-linear-to-br from-indigo-500/10 via-[#10111a] to-violet-500/6 p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
          <Sparkles size={19} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">
            People worth knowing
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">
            Discover professionals across your interests and build a network
            around the work you care about.
          </p>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold text-white">
          Suggested professionals
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          Based on shared skills and mutual connections
        </p>
      </div>

      <span className="shrink-0 rounded-lg border border-white/7 bg-white/2.5 px-2.5 py-1.5 text-xs text-gray-400">
        {users.length} people
      </span>
    </div>

    <ConnectionsGrid users={users} mode="discover" />
  </div>
);

export default DiscoverPeople;
