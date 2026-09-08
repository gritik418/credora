"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const suggestions = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "NestJS",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
];

const SkillsPage = () => {
  const [skills, setSkills] = useState<string[]>(["React", "Node.js"]);
  const router = useRouter();

  const handleOnContinue = () => {
    router.push("/onboarding/education");
  };

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  return (
    <OnboardingShell
      currentStep="SKILLS"
      title="What are you good at?"
      description="Add the technologies and skills that represent your professional strengths."
      onContinue={handleOnContinue}
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4">
          <Search size={17} className="text-white/25" />

          <input
            placeholder="Search or add a skill..."
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
          />
        </div>

        {/* Selected */}
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

        {/* Suggestions */}
        <div>
          <p className="mb-3 text-xs uppercase tracking-wider text-white/25">
            Popular skills
          </p>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 text-sm text-white/40 transition hover:border-white/20 hover:text-white"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
};

export default SkillsPage;
