import { SuggestedPeople } from "@/features/connection/connection.interface";
import DiscoverCard from "./DiscoverCard";

interface DiscoverGridProps {
  users: SuggestedPeople[];
}

const DiscoverGrid = ({ users }: DiscoverGridProps) => {
  console.log(users);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <DiscoverCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default DiscoverGrid;
