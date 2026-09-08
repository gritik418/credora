"use client";

import { MapPin, Globe2 } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const LocationPage = () => {
  const router = useRouter();

  const handleOnContinue = () => {
    router.push("/onboarding/skills");
  };

  return (
    <OnboardingShell
      currentStep="LOCATION"
      title="Where are you based?"
      description="Add your location so people can better understand your professional context."
      onContinue={handleOnContinue}
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-white/70">Country</label>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4">
            <Globe2 size={17} className="text-white/25" />

            <select className="w-full bg-transparent py-3.5 text-sm outline-none">
              <option value="">Select country</option>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">City</label>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4">
            <MapPin size={17} className="text-white/25" />

            <input
              placeholder="e.g. Chandigarh"
              className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-sm">🌎 Open to remote work</p>
          <p className="mt-1 text-xs text-white/30">
            Let people know you're comfortable working remotely.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
};

export default LocationPage;
