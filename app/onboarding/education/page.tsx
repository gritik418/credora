"use client";

import { useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const EducationPage = () => {
  const router = useRouter();

  const [education, setEducation] = useState([
    {
      degree: "Bachelor of Computer Applications",
      institution: "University",
      field: "Computer Applications",
    },
  ]);

  const handleOnContinue = () => {
    router.push("/onboarding/availability");
  };

  return (
    <OnboardingShell
      currentStep="EDUCATION"
      title="Add your education."
      description="Showcase the academic experiences that shaped your professional journey."
      onContinue={handleOnContinue}
    >
      <div className="space-y-4">
        {education.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <GraduationCap size={20} />
              </div>

              <div>
                <p className="font-medium">{item.degree}</p>
                <p className="mt-1 text-sm text-white/40">{item.institution}</p>
                <p className="mt-1 text-xs text-white/25">{item.field}</p>
              </div>
            </div>
          </div>
        ))}

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-4 text-sm text-white/35 transition hover:border-indigo-500/30 hover:text-white">
          <Plus size={17} />
          Add another education
        </button>
      </div>
    </OnboardingShell>
  );
};

export default EducationPage;
