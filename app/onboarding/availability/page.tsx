"use client";

import { useState } from "react";
import { BriefcaseBusiness, Clock3, Home } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

const options = [
  {
    id: "full-time",
    title: "Full-time",
    description: "I'm looking for a full-time opportunity.",
    icon: BriefcaseBusiness,
  },
  {
    id: "part-time",
    title: "Part-time",
    description: "I'm open to part-time opportunities.",
    icon: Clock3,
  },
  {
    id: "remote",
    title: "Remote",
    description: "I'm specifically looking for remote work.",
    icon: Home,
  },
];

const AvailabilityPage = () => {
  const [selected, setSelected] = useState("full-time");

  return (
    <OnboardingShell
      currentStep="AVAILABILITY"
      title="What are you looking for?"
      description="Tell us about your availability and the kind of opportunities you're open to."
      continueText="Finish onboarding"
      onContinue={() => console.log(selected)}
    >
      <div className="space-y-3">
        {options.map((option) => {
          const Icon = option.icon;
          const active = selected === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
                active
                  ? "border-indigo-500/50 bg-indigo-500/10"
                  : "border-white/[0.08] bg-white/[0.025] hover:border-white/15"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  active
                    ? "bg-indigo-500 text-white"
                    : "bg-white/[0.05] text-white/30"
                }`}
              >
                <Icon size={19} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">{option.title}</p>

                <p className="mt-1 text-xs text-white/35">
                  {option.description}
                </p>
              </div>

              <div
                className={`h-4 w-4 rounded-full border ${
                  active ? "border-indigo-400 bg-indigo-400" : "border-white/20"
                }`}
              />
            </button>
          );
        })}
      </div>
    </OnboardingShell>
  );
};

export default AvailabilityPage;
