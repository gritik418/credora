"use client";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import AddSummaryDto from "@/features/onboarding/dto/add-summary.dto";
import { useAddSummaryMutation } from "@/features/onboarding/onboarding.api";
import { AddSummaryOnboardingInfoResponseDto } from "@/features/onboarding/onboarding.interface";
import AddSummarySchema from "@/features/onboarding/schemas/add-summary.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FileText } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SummaryPage = () => {
  const [addSummary] = useAddSummaryMutation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddSummaryDto>({
    defaultValues: {
      summary: "",
    },
    mode: "onChange",
    resolver: zodResolver(AddSummarySchema),
  });

  const handleOnContinue = async (data: AddSummaryDto) => {
    try {
      setIsLoading(true);

      const result = await addSummary(data).unwrap();

      if (result.success) {
        toast.success(result.message || "Summary added successfully.");
      } else {
        toast.error(result.message || "Failed to add summary.");
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as AddSummaryOnboardingInfoResponseDto;

        if (response.errors) {
          Object.entries(response.errors).forEach(([field, message]) => {
            if (message) {
              setError(field as keyof AddSummaryDto, {
                type: "server",
                message,
              });
            }
          });
        }
        return;
      }

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
      currentStep="SUMMARY"
      title="Tell your story."
      description="Write a short introduction that represents who you are professionally."
      onContinue={handleSubmit(handleOnContinue)}
      loading={isLoading || isSubmitting}
    >
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm text-white/70">Professional summary</label>

          <span className="text-xs text-white/25">
            {watch().summary.length}/1000
          </span>
        </div>

        <div className="relative">
          <FileText size={17} className="absolute top-5 left-4 text-white/20" />

          <textarea
            {...register("summary")}
            maxLength={1000}
            placeholder="Tell people what you do, what you're passionate about, and what you're building..."
            className="min-h-55 w-full resize-none rounded-xl border border-white/8 bg-white/[0.035] px-11 py-4 text-sm leading-6 outline-none placeholder:text-white/20 focus:border-indigo-500/60"
          />

          {errors.summary && (
            <p className="mt-2 text-xs text-red-500">
              {errors.summary.message}
            </p>
          )}
        </div>

        <p className="mt-3 text-xs text-white/25">
          Keep it concise. You can always update this later.
        </p>
      </div>
    </OnboardingShell>
  );
};

export default SummaryPage;
