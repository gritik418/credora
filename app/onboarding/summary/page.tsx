"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const SummaryPage = () => {
  const router = useRouter();
  const [summary, setSummary] = useState("");

  const handleOnContinue = () => {
    router.push("/onboarding/location");
  };
  return (
    <OnboardingShell
      currentStep="SUMMARY"
      title="Tell your story."
      description="Write a short introduction that represents who you are professionally."
      onContinue={handleOnContinue}
    >
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm text-white/70">Professional summary</label>

          <span className="text-xs text-white/25">{summary.length}/500</span>
        </div>

        <div className="relative">
          <FileText size={17} className="absolute top-5 left-4 text-white/20" />

          <textarea
            value={summary}
            maxLength={500}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Tell people what you do, what you're passionate about, and what you're building..."
            className="min-h-55 w-full resize-none rounded-xl border border-white/8 bg-white/[0.035] px-11 py-4 text-sm leading-6 outline-none placeholder:text-white/20 focus:border-indigo-500/60"
          />
        </div>

        <p className="mt-3 text-xs text-white/25">
          Keep it concise. You can always update this later.
        </p>
      </div>
    </OnboardingShell>
  );
};

export default SummaryPage;
