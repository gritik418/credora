"use client";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import AddAvailabilityInfoDto from "@/features/onboarding/dto/add-availability-info.dto";
import { useAddAvailabilityInfoMutation } from "@/features/onboarding/onboarding.api";
import { AddAvailabilityInfoResponseDto } from "@/features/onboarding/onboarding.interface";
import AddAvailabilityInfoSchema from "@/features/onboarding/schemas/add-availability-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BriefcaseBusiness, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AvailabilityPage = () => {
  const [addAvailability, { isLoading }] = useAddAvailabilityInfoMutation();
  const router = useRouter();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Partial<AddAvailabilityInfoDto>>({
    defaultValues: {
      isOpenToCollaborate: false,
      isOpenToWork: true,
    },
    mode: "onChange",
    resolver: zodResolver(AddAvailabilityInfoSchema),
  });

  const isOpenToWork = watch("isOpenToWork");
  const isOpenToCollaborate = watch("isOpenToCollaborate");

  const handleOnContinue = async (data: Partial<AddAvailabilityInfoDto>) => {
    try {
      const result = await addAvailability({
        isOpenToWork: data.isOpenToWork ?? false,
        isOpenToCollaborate: data.isOpenToCollaborate ?? false,
      }).unwrap();

      if (result.success) {
        toast.success(
          result.message || "Availability information added successfully.",
        );
        router.replace("/onboarding/completed");
      } else {
        toast.error(
          result.message || "Failed to save availability information.",
        );
      }
    } catch (error: any) {
      if ("data" in (error as FetchBaseQueryError)) {
        const response = (error as FetchBaseQueryError)
          .data as AddAvailabilityInfoResponseDto;

        if (response.errors && Object.entries(response.errors).length) {
          toast.error(
            response.errors.isOpenToWork ||
              response.errors.isOpenToCollaborate ||
              "Failed to save availability information.",
          );
        }
        return;
      }

      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  const toggleWorkStatus = () => {
    setValue("isOpenToWork", !isOpenToWork, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const toggleCollaborationStatus = () => {
    setValue("isOpenToCollaborate", !isOpenToCollaborate, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <OnboardingShell
      currentStep="AVAILABILITY"
      title="What are you open to?"
      description="Let people know what kind of professional opportunities you're interested in."
      continueText="Finish onboarding"
      onContinue={handleSubmit(handleOnContinue)}
      loading={isLoading || isSubmitting}
    >
      <div className="space-y-3">
        <button
          type="button"
          onClick={toggleWorkStatus}
          className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-5 text-left transition ${
            isOpenToWork
              ? "border-indigo-500/50 bg-indigo-500/10"
              : "border-white/8 bg-white/2.5 hover:border-white/15"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isOpenToWork
                ? "bg-indigo-500 text-white"
                : "bg-white/5 text-white/30"
            }`}
          >
            <BriefcaseBusiness size={19} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-white">Open to work</p>

            <p className="mt-1 text-xs text-white/35">
              I'm open to full-time, part-time, or other job opportunities.
            </p>
          </div>

          <div
            className={`relative h-5 w-9 shrink-0 rounded-full transition ${
              isOpenToWork ? "bg-indigo-500" : "bg-white/10"
            }`}
          >
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                isOpenToWork ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>

        <button
          type="button"
          onClick={toggleCollaborationStatus}
          className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-5 text-left transition ${
            isOpenToCollaborate
              ? "border-indigo-500/50 bg-indigo-500/10"
              : "border-white/8 bg-white/2.5 hover:border-white/15"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isOpenToCollaborate
                ? "bg-indigo-500 text-white"
                : "bg-white/5 text-white/30"
            }`}
          >
            <UsersRound size={19} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              Open to collaborate
            </p>

            <p className="mt-1 text-xs text-white/35">
              I'm open to collaborating on projects, ideas, and professional
              opportunities.
            </p>
          </div>

          <div
            className={`relative h-5 w-9 shrink-0 rounded-full transition ${
              isOpenToCollaborate ? "bg-indigo-500" : "bg-white/10"
            }`}
          >
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                isOpenToCollaborate ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>

        {(errors.isOpenToWork?.message ||
          errors.isOpenToCollaborate?.message) && (
          <p className="pt-2 text-center text-xs text-red-400">
            {errors.isOpenToWork?.message ||
              errors.isOpenToCollaborate?.message}
          </p>
        )}

        <div className="flex items-center gap-2 px-1 pt-3">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <p className="text-xs text-white/25">
            You can change these preferences anytime from your profile.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
};

export default AvailabilityPage;
