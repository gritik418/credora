import React from "react";
import OptionCard from "./OptionCard";
import { ArrowLeft, Building2, UserRound, Users } from "lucide-react";

const StartStep = ({ onBack }: { onBack: () => void }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Where do you want to start?
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          You can join your team, create an organization, or continue building
          your professional identity independently.
        </p>
      </div>

      <div className="space-y-4">
        <OptionCard
          icon={<Users className="h-5 w-5" />}
          title="Join an organization"
          description="Accept an invitation and start collaborating with your team."
        />

        <OptionCard
          icon={<Building2 className="h-5 w-5" />}
          title="Create an organization"
          description="Set up your organization and build a verified work environment."
        />

        <OptionCard
          icon={<UserRound className="h-5 w-5" />}
          title="Continue independently"
          description="Build your professional profile and join an organization later."
        />
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    </div>
  );
};

export default StartStep;
