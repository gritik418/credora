import { Users } from "lucide-react";
import ConnectionCard from "./ConnectionCard";

interface Props {
  users: any[];
  mode: "connected" | "discover";
}

const ConnectionsGrid = ({ users, mode }: Props) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/9 px-5 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/7 bg-white/3 text-gray-500">
          <Users size={21} />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">
          {mode === "connected" ? "No connections found" : "No people found"}
        </h3>
        <p className="mt-1.5 max-w-sm text-sm leading-6 text-gray-500">
          {mode === "connected"
            ? "Try another search or explore new professionals to grow your network."
            : "Try changing your search or location filter to discover more people."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <ConnectionCard key={user.id} user={user} mode={mode} />
      ))}
    </div>
  );
};

export default ConnectionsGrid;
