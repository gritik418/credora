"use client";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import AddProfessionalInfoDto from "@/features/onboarding/dto/add-professional-info.dto";
import { useAddProfessionalInfoMutation } from "@/features/onboarding/onboarding.api";
import AddProfessionalInfoSchema from "@/features/onboarding/schemas/add-professional-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Building2, Code2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { toast } from "react-toastify";

const ProfessionalPage = () => {
  const [addProfessionalInfo] = useAddProfessionalInfoMutation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProfessionalInfoDto>({
    defaultValues: {
      headline: "",
      industry: "",
      profession: "",
    },
    resolver: zodResolver(AddProfessionalInfoSchema),
  });

  const handleOnContinue = async (data: AddProfessionalInfoDto) => {
    try {
      setIsLoading(true);

      const result = await addProfessionalInfo(data).unwrap();

      if (result.success) {
        toast.success(
          result.message || "Professional info added successfully.",
        );
      } else {
        toast.error(result.message || "Failed to add professional info.");
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

  return (
    <OnboardingShell
      currentStep="PROFESSIONAL"
      title="Tell us about your work."
      description="Help people understand what you do and where your professional journey is headed."
      onContinue={handleSubmit(handleOnContinue)}
      loading={isLoading || isSubmitting}
    >
      <div className="space-y-6">
        <Field
          icon={<Briefcase size={17} />}
          label="Profession"
          placeholder="e.g. Full Stack Developer"
          register={register("profession")}
          isError={!!errors.profession}
          error={errors.profession?.message}
        />

        <Field
          icon={<Building2 size={17} />}
          label="Industry"
          register={register("industry")}
          placeholder="e.g. Information Technology"
          isError={!!errors.industry}
          error={errors.industry?.message}
        />

        <div>
          <label className="mb-2 block text-sm text-white/70">Headline</label>

          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 focus-within:border-indigo-500/60">
            <span className="mt-4 text-white/25">
              <Sparkles size={17} />
            </span>

            <textarea
              {...register("headline")}
              rows={3}
              placeholder={"e.g. Aspiring Full Stack Developer"}
              className="w-full resize-none bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
            />
          </div>

          {errors.headline?.message && (
            <p className="mt-2 text-xs text-red-500">
              {errors.headline?.message}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/4 p-4">
          <div className="flex gap-3">
            <Code2 className="mt-0.5 text-indigo-400" size={18} />
            <div>
              <p className="text-sm font-medium">Make it meaningful</p>
              <p className="mt-1 text-xs leading-5 text-white/35">
                Your professional information will help build a more credible
                and useful identity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
};

export default ProfessionalPage;

function Field({
  icon,
  label,
  placeholder,
  register,
  isError,
  error,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  isError?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>

      <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 focus-within:border-indigo-500/60">
        <span className="text-white/25">{icon}</span>

        <input
          {...register}
          placeholder={placeholder}
          className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
        />
      </div>
      {isError && error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
