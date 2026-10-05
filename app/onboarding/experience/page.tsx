"use client";

import AddExperienceForm from "@/components/onboarding/AddExperienceForm";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import AddExperienceInfoDto, {
  ExperienceDto,
} from "@/features/onboarding/dto/add-experience-info.dto";
import { EmploymentType } from "@/features/onboarding/onboarding.interface";
import AddExperienceInfoSchema from "@/features/onboarding/schemas/add-experience-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ExperiencePage = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experiences: [],
    },
    resolver: zodResolver(AddExperienceInfoSchema),
  });

  const handleAddExperience = (experience: ExperienceDto) => {
    const experiences = getValues("experiences");
    setValue("experiences", [...experiences, experience]);
    setShowForm(false);
  };

  const handleOnContinue = (data: any) => {
    console.log(data);
    // router.push("/onboarding/summary");
  };

  return (
    <OnboardingShell
      currentStep="EXPERIENCE"
      title="Tell us about your experience."
      description="Add your professional experience to build a stronger and more complete Credora profile."
      onContinue={handleSubmit(handleOnContinue)}
    >
      <div className="space-y-4">
        {showForm ? (
          <div className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
            <AddExperienceForm
              onAdd={handleAddExperience}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : getValues("experiences").length > 0 ? (
          <>
            {getValues("experiences").map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/8 bg-white/2.5 p-5"
              >
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-white">{item.position}</p>

                    <p className="mt-1 text-sm text-white/40">{item.company}</p>

                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/25">
                      {item.employmentType && (
                        <span>
                          {item.employmentType
                            .replaceAll("_", " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char: string) =>
                              char.toUpperCase(),
                            )}
                        </span>
                      )}

                      {item.location && <span>{item.location}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-4 text-sm text-white/35 transition hover:border-indigo-500/30 hover:text-white"
            >
              <Plus size={17} />
              Add another experience
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/1.5 px-6 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <BriefcaseBusiness size={22} />
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              No experience added yet
            </p>

            <p className="mt-1 max-w-sm text-xs leading-5 text-white/35">
              Add your professional experience to help others understand your
              background and expertise.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              <Plus size={16} />
              Add your first experience
            </button>
          </div>
        )}
      </div>
    </OnboardingShell>
  );
};

export default ExperiencePage;
