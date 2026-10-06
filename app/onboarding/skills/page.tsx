"use client";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import SkillSearchInput from "@/components/onboarding/SkillSearchInput";
import { useGetPopularSkillsQuery } from "@/features/skills/skills.api";
import { Skill } from "@/features/skills/skills.interface";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const SkillsPage = () => {
  const [skills, setSkills] = useState<string[]>(["React", "Node.js"]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [popularSkills, setPopularSkills] = useState<Skill[]>([]);

  const { data: popularSkillsData, isLoading: isLoadingPopularSkills } =
    useGetPopularSkillsQuery();

  const handleOnContinue = () => {};

  const addSkill = (skill: Skill) => {
    if (!skills.includes(skill.name)) {
      setSkills([...skills, skill.name]);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  useEffect(() => {
    if (popularSkillsData?.success && popularSkillsData.data.skills.length) {
      setPopularSkills(popularSkillsData.data.skills);
    }
  }, [popularSkillsData]);

  return (
    <OnboardingShell
      currentStep="SKILLS"
      title="What are you good at?"
      description="Add the technologies and skills that represent your professional strengths."
      onContinue={handleOnContinue}
    >
      <div className="space-y-6">
        <SkillSearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelect={handleOnContinue}
        />

        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-white/25">
            Selected skills
          </p>

          <div className="flex min-h-12 flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-200"
              >
                {skill}

                <button onClick={() => removeSkill(skill)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-white/25">
            Popular skills
          </p>

          <div className="flex flex-wrap gap-2">
            {isLoadingPopularSkills ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-24 animate-pulse rounded-lg border border-white/8 bg-white/[0.035]"
                />
              ))
            ) : popularSkills.length > 0 ? (
              popularSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 text-sm text-white/40 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-300"
                >
                  + {skill.name}
                </button>
              ))
            ) : (
              <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-white/8 bg-white/1.5 px-4 py-6">
                <p className="text-xs text-white/30">
                  No popular skills available right now.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
};

export default SkillsPage;
