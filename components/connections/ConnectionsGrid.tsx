import { SuggestedPeople } from "@/features/connection/connection.interface";
import ConnectionCard from "./ConnectionCard";

interface ConnectionsGridProps {
  users: SuggestedPeople[];
}

const ConnectionsGrid = ({ users }: ConnectionsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {users.map((user) => (
        <ConnectionCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default ConnectionsGrid;
