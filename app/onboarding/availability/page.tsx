"use client";

import { useState } from "react";
import { BriefcaseBusiness, UsersRound } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const AvailabilityPage = () => {
  const [isOpenToWork, setIsOpenToWork] = useState(false);
  const [isOpenToCollaborate, setIsOpenToCollaborate] = useState(false);
  const router = useRouter();

  const handleOnContinue = () => {
    router.push("/onboarding/completed");
  };

  return (
    <OnboardingShell
      currentStep="AVAILABILITY"
      title="What are you open to?"
      description="Let people know what kind of professional opportunities you're interested in."
      continueText="Finish onboarding"
      onContinue={handleOnContinue}
    >
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setIsOpenToWork((prev) => !prev)}
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
          onClick={() => setIsOpenToCollaborate((prev) => !prev)}
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
      </div>
    </OnboardingShell>
  );
};

export default AvailabilityPage;
