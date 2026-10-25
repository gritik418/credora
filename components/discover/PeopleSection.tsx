import { Users } from "lucide-react";
import type { Person } from "./discover.data";
import DiscoverSectionHeader from "./DiscoverSectionHeader";
import PersonCard from "./PersonCard";

type PeopleSectionProps = {
  people: Person[];
  onViewAll?: () => void;
  title?: string;
  description?: string;
};

export default function PeopleSection({
  people,
  onViewAll,
  title = "People you may know",
  description = "Meet professionals with shared interests and skills.",
}: PeopleSectionProps) {
  if (people.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-(--org-border) px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10">
          <Users size={21} className="text-indigo-300" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-(--org-text)">
          No people found
        </h3>
        <p className="mt-1 text-xs text-(--org-text-muted)">
          Try another name, skill, or keyword.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <DiscoverSectionHeader
        title={title}
        description={description}
        onAction={onViewAll}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}
