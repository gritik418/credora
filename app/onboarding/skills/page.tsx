"use client";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import SkillSearchInput from "@/components/onboarding/SkillSearchInput";
import { useAddSkillsOnboardingInfoMutation } from "@/features/onboarding/onboarding.api";
import { useGetPopularSkillsQuery } from "@/features/skills/skills.api";
import { Skill } from "@/features/skills/skills.interface";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SkillsPage = () => {
  const [addSkillsOnboardingInfo, { isLoading: isLoadingAddSkills }] =
    useAddSkillsOnboardingInfoMutation();

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [popularSkills, setPopularSkills] = useState<Skill[]>([]);

  const { data: popularSkillsData, isLoading: isLoadingPopularSkills } =
    useGetPopularSkillsQuery();

  const handleOnContinue = async () => {
    try {
      const skills = selectedSkills.map((skill: Skill) => skill.slug);

      if (!skills.length) {
        toast.error("Please add at least one skill.");
        return;
      }

      const result = await addSkillsOnboardingInfo({
        skills,
      }).unwrap();
      if (result.success) {
        toast.success(result.message || "Skills added successfully.");
      } else {
        toast.error(result.message || "Failed to add skills.");
      }
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const addSkill = (skill: Skill) => {
    const isSkillAlreadySelected = selectedSkills.some(
      (s) => s.slug === skill.slug,
    );

    if (isSkillAlreadySelected) return;

    setSelectedSkills((prev) => [...prev, skill]);
  };

  const removeSkill = (skill: Skill) => {
    setSelectedSkills((prev) => prev.filter((s) => s.slug !== skill.slug));
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
      loading={isLoadingAddSkills}
    >
      <div className="space-y-6">
        <SkillSearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelect={addSkill}
        />

        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-white/25">
            Selected skills
          </p>

          <div className="flex min-h-12 flex-wrap gap-2">
            {selectedSkills.length > 0 ? (
              selectedSkills.map((skill: Skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-200"
                >
                  <span>{skill.name}</span>

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="flex cursor-pointer items-center justify-center rounded-md text-indigo-300/50 transition hover:bg-indigo-400/10 hover:text-indigo-200"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex w-full items-center rounded-xl border border-dashed border-white/8 bg-white/1.5 px-4 py-3">
                <p className="text-xs text-white/25">
                  No skills selected yet. Search above to add your skills.
                </p>
              </div>
            )}
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
                  className="rounded-lg cursor-pointer border border-white/8 bg-white/[0.035] px-3 py-2 text-sm text-white/40 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-300"
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
