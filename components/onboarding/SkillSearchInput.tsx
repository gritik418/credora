"use client";

import { useGetSkillSuggestionsQuery } from "@/features/skills/skills.api";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Skill {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  onSelect: (skill: Skill) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const SkillSearchInput = ({ onSelect, searchQuery, setSearchQuery }: Props) => {
  const [suggestions, setSuggestions] = useState<Skill[]>([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const showDropdown = searchQuery.trim().length > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const {
    data: suggestionsData,
    isFetching,
    isLoading,
  } = useGetSkillSuggestionsQuery(
    {
      limit: 10,
      searchQuery: debouncedSearchQuery,
    },
    {
      skip: !debouncedSearchQuery,
    },
  );

  useEffect(() => {
    if (suggestionsData?.success) {
      setSuggestions(suggestionsData.data.skills);
    } else {
      setSuggestions([]);
    }
  }, [suggestionsData]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 transition focus-within:border-indigo-500/30 focus-within:bg-white/4.5">
        <Search size={17} className="shrink-0 text-white/25" />

        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search or add a skill..."
          className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-white/20"
        />
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/8 bg-[#0c0c0f]/95 shadow-2xl shadow-black/30 backdrop-blur-xl">
          {isLoading || isFetching ? (
            <div className="space-y-2 p-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 animate-pulse rounded-lg bg-white/4"
                />
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <div className="p-2">
              {suggestions.map((skill: Skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => onSelect(skill)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5"
                >
                  <span className="text-sm text-white/70">{skill.name}</span>

                  <span className="rounded-md bg-white/4 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white/25">
                    {skill.slug}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-sm text-white/40">No matching skills found</p>

              <p className="mt-1 text-xs text-white/20">
                You can add a new skill manually.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillSearchInput;
