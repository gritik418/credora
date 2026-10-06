"use client";

import AddExperienceForm, {
  ExperienceFormOutput,
} from "@/components/onboarding/AddExperienceForm";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useAddExperienceInfoMutation } from "@/features/onboarding/onboarding.api";
import AddExperienceInfoSchema from "@/features/onboarding/schemas/add-experience-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type AddExperienceInfoInput = z.input<typeof AddExperienceInfoSchema>;
type AddExperienceInfoOutput = z.output<typeof AddExperienceInfoSchema>;

const ExperiencePage = () => {
  const [addExperience] = useAddExperienceInfoMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddExperienceInfoInput, unknown, AddExperienceInfoOutput>({
    defaultValues: {
      experiences: [],
    },
    resolver: zodResolver(AddExperienceInfoSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const handleAddExperience = (experience: ExperienceFormOutput) => {
    append(experience);
    setShowForm(false);
  };

  const handleRemoveExperience = (index: number) => {
    remove(index);
  };

  const handleOnContinue = async (data: AddExperienceInfoOutput) => {
    try {
      setIsLoading(true);

      const result = await addExperience(data).unwrap();

      if (result.success) {
        toast.success(result.message || "Experience info added successfully.");
      } else {
        toast.error(result.message || "Failed to add experience info.");
      }
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatEmploymentType = (value: string) =>
    value
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });

  return (
    <OnboardingShell
      currentStep="EXPERIENCE"
      title="Tell us about your experience."
      description="Add your professional experience to build a stronger and more complete Credora profile."
      onContinue={handleSubmit(handleOnContinue)}
      loading={isLoading || isSubmitting}
    >
      <div className="space-y-4">
        {showForm && (
          <div className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
            <AddExperienceForm
              onAdd={handleAddExperience}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {fields.length > 0 && (
          <>
            <div className="space-y-4">
              {fields.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-5 transition duration-200 hover:border-white/12 hover:bg-white/4"
                >
                  <div className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-indigo-500/70 via-indigo-500/20 to-transparent" />

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-400">
                      <BriefcaseBusiness size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-white">
                            {item.position}
                          </h3>

                          <p className="mt-1 text-sm text-white/45">
                            {item.company}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="w-fit shrink-0 rounded-full border border-white/8 bg-white/3 px-3 py-1 text-[11px] font-medium text-white/45">
                            {formatDate(item.startDate as Date)}
                            {" — "}
                            {item.endDate
                              ? formatDate(item.endDate as Date)
                              : "Present"}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-white/25 transition hover:bg-red-500/10 hover:text-red-400"
                            aria-label={`Delete ${item.position} experience`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {item.employmentType && (
                          <span className="rounded-md bg-indigo-500/10 px-2 py-1 text-[11px] font-medium text-indigo-300">
                            {formatEmploymentType(item.employmentType)}
                          </span>
                        )}

                        {item.location && (
                          <span className="flex items-center gap-1.5 text-xs text-white/30">
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {item.description?.trim() && (
                        <div className="mt-4 border-t border-white/6 pt-4">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/25">
                            Description
                          </p>

                          <p className="mt-2 text-sm leading-6 text-white/45">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-4 text-sm text-white/35 transition hover:border-indigo-500/30 hover:text-white"
              >
                <Plus size={17} />
                Add another experience
              </button>
            )}
          </>
        )}

        {fields.length === 0 && !showForm && (
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

        {errors.experiences?.message && (
          <p className="text-center text-xs text-red-400">
            {errors.experiences.message}
          </p>
        )}
      </div>
    </OnboardingShell>
  );
};

export default ExperiencePage;
