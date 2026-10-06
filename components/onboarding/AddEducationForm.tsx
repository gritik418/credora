"use client";

import { EducationSchema } from "@/features/onboarding/schemas/add-education-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  onAdd: (education: EducationFormOutput) => void;
  onCancel: () => void;
}

type EducationFormInput = z.input<typeof EducationSchema>;

export type EducationFormOutput = z.output<typeof EducationSchema>;

const AddEducationForm = ({ onAdd, onCancel }: Props) => {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EducationFormInput, unknown, EducationFormOutput>({
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      description: "",
      endDate: undefined,
      grade: "",
      isCurrentlyStudying: false,
      startDate: new Date().toISOString().split("T")[0],
    },
    resolver: zodResolver(EducationSchema),
    mode: "onChange",
  });

  const isCurrentlyStudying = watch("isCurrentlyStudying");
  const startDate = watch("startDate");

  useEffect(() => {
    if (isCurrentlyStudying) {
      clearErrors("endDate");
      setValue("endDate", undefined);
    }
  }, [isCurrentlyStudying, clearErrors, setValue]);

  const handleAddEducation = (data: EducationFormOutput) => {
    onAdd(data);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Institution
        </label>

        <input
          {...register("institution")}
          placeholder="University or college"
          className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
        />

        {errors.institution?.message && (
          <p className="mt-2 text-xs text-red-400">
            {errors.institution.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Degree
          </label>

          <input
            {...register("degree")}
            placeholder="Bachelor's, Master's, etc."
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />

          {errors.degree?.message && (
            <p className="mt-2 text-xs text-red-400">{errors.degree.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Field of study
          </label>

          <input
            {...register("fieldOfStudy")}
            placeholder="Computer Applications"
            className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
          />

          {errors.fieldOfStudy?.message && (
            <p className="mt-2 text-xs text-red-400">
              {errors.fieldOfStudy.message}
            </p>
          )}
        </div>
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
            disabled={isCurrentlyStudying}
            min={startDate as string}
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
          {...register("isCurrentlyStudying")}
          className="h-4 w-4 cursor-pointer accent-blue-500"
        />
        I am currently studying here
      </label>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Grade
        </label>

        <input
          {...register("grade")}
          placeholder="CGPA, percentage, GPA, etc."
          className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
        />

        {errors.grade?.message && (
          <p className="mt-2 text-xs text-red-400">{errors.grade.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75">
          Description
        </label>

        <textarea
          {...register("description")}
          placeholder="Add anything relevant about your education..."
          rows={4}
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
          onClick={handleSubmit(handleAddEducation)}
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Adding..." : "Add education"}
        </button>
      </div>
    </div>
  );
};

export default AddEducationForm;
