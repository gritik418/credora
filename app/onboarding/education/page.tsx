"use client";

import { useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import AddEducationForm from "@/components/onboarding/AddEducationForm";

const EducationPage = () => {
  const router = useRouter();

  const [education, setEducation] = useState<any[]>([
    {
      degree: "Bachelor of Computer Applications",
      institution: "Sunderdeep Group of Institutions",
      fieldOfStudy: "Computer Applications",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2025-01-01"),
      grade: undefined,
      description: undefined,
      isCurrentlyStudying: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddEducation = (newEducation: any) => {
    setEducation((prev) => [...prev, newEducation]);
    setShowForm(false);
  };

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
        {education.length > 0 ? (
          education.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/8 bg-white/2.5 p-5"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <GraduationCap size={20} />
                </div>

                <div>
                  <p className="font-medium text-white">
                    {item.degree || "Education"}
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    {item.institution}
                  </p>

                  {item.fieldOfStudy && (
                    <p className="mt-1 text-xs text-white/25">
                      {item.fieldOfStudy}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/1.5 px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <GraduationCap size={22} />
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              No education added yet
            </p>

            <p className="mt-1 max-w-sm text-xs leading-5 text-white/35">
              Add your academic background to help build a more complete
              professional profile.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              <Plus size={16} />
              Add your first education
            </button>
          </div>
        )}
        {showForm ? (
          <div className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
            <AddEducationForm
              onAdd={handleAddEducation}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : education.length > 0 ? (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-4 text-sm text-white/35 transition hover:border-indigo-500/30 hover:text-white"
          >
            <Plus size={17} />
            Add another education
          </button>
        ) : null}
      </div>
    </OnboardingShell>
  );
};

export default EducationPage;
