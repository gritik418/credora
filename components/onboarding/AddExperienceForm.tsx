"use client";

import { ExperienceDto } from "@/features/onboarding/dto/add-experience-info.dto";
import { EmploymentType } from "@/features/onboarding/onboarding.interface";
import { ExperienceSchema } from "@/features/onboarding/schemas/add-experience-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  onAdd: (experience: ExperienceDto) => void;
  onCancel: () => void;
}

type ExperienceFormInput = z.input<typeof ExperienceSchema>;

export type ExperienceFormOutput = z.output<typeof ExperienceSchema>;

const AddExperienceForm = ({ onAdd, onCancel }: Props) => {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormInput, unknown, ExperienceFormOutput>({
    defaultValues: {
      company: "",
      description: "",
      employmentType: EmploymentType.FULL_TIME,
      isCurrentlyWorking: false,
      location: "",
      position: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: undefined,
    },
    resolver: zodResolver(ExperienceSchema),
    mode: "onChange",
  });

  const isCurrentlyWorking = watch("isCurrentlyWorking");

  useEffect(() => {
    if (isCurrentlyWorking) {
      clearErrors("endDate");
      setValue("endDate", undefined);
    }
  }, [isCurrentlyWorking, clearErrors, setValue]);

  const handleAddExperience = (data: ExperienceFormOutput) => {
    onAdd(data);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Company
          </label>

          <input
            {...register("company")}
            placeholder="Company name"
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />

          {errors.company?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Position
          </label>

          <input
            {...register("position")}
            placeholder="e.g. Frontend Developer"
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />

          {errors.position?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.position.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Employment type
        </label>

        <select
          {...register("employmentType")}
          className="h-12 w-full cursor-pointer rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20 scheme-dark"
        >
          <option value="">Select employment type</option>
          <option value="FULL_TIME">Full-time</option>
          <option value="PART_TIME">Part-time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="FREELANCE">Freelance</option>
          <option value="SELF_EMPLOYED">Self-employed</option>
          <option value="APPRENTICESHIP">Apprenticeship</option>
          <option value="OTHER">Other</option>
        </select>

        {errors.employmentType?.message && (
          <p className="mt-2 text-xs text-red-400">
            {errors.employmentType.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Start date
          </label>

          <input
            type="date"
            {...register("startDate")}
            max={new Date().toISOString().split("T")[0]}
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20 scheme-dark"
          />

          {errors.startDate?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            End date
          </label>

          <input
            type="date"
            {...register("endDate")}
            disabled={isCurrentlyWorking}
            min={watch("startDate") as string}
            max={new Date().toISOString().split("T")[0]}
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-30 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20 scheme-dark"
          />

          {errors.endDate?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-white/60">
        <input
          type="checkbox"
          {...register("isCurrentlyWorking")}
          className="h-4 w-4 cursor-pointer accent-blue-500"
        />
        I currently work here
      </label>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Location
        </label>

        <input
          {...register("location")}
          placeholder="e.g. New Delhi, India or Remote"
          className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
        />

        {errors.location?.message && (
          <p className="mt-2 text-xs text-red-400">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Description
        </label>

        <textarea
          {...register("description")}
          placeholder="Describe your responsibilities, achievements, or work..."
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
        />

        {errors.description?.message && (
          <p className="mt-2 text-xs text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-white/40 transition hover:text-white"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit(handleAddExperience)}
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Adding..." : "Add experience"}
        </button>
      </div>
    </div>
  );
};

export default AddExperienceForm;
