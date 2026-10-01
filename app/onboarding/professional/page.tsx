"use client";

import { useState } from "react";
import { Briefcase, Building2, Code2, Sparkles } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const ProfessionalPage = () => {
  const router = useRouter();

  const [profession, setProfession] = useState("");
  const [industry, setIndustry] = useState("");
  const [headline, setHeadline] = useState("");

  const handleOnContinue = () => {
    router.push("/onboarding/experience");
  };

  return (
    <OnboardingShell
      currentStep="PROFESSIONAL"
      title="Tell us about your work."
      description="Help people understand what you do and where your professional journey is headed."
      onContinue={handleOnContinue}
    >
      <div className="space-y-6">
        <Field
          icon={<Briefcase size={17} />}
          label="Profession"
          placeholder="e.g. Full Stack Developer"
          value={profession}
          onChange={setProfession}
        />

        <Field
          icon={<Building2 size={17} />}
          label="Industry"
          placeholder="e.g. Information Technology"
          value={industry}
          onChange={setIndustry}
        />

        <div>
          <label className="mb-2 block text-sm text-white/70">Headline</label>

          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 focus-within:border-indigo-500/60">
            <span className="mt-4 text-white/25">
              <Sparkles size={17} />
            </span>

            <textarea
              value={headline}
              rows={3}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder={"e.g. Aspiring Full Stack Developer"}
              className="w-full resize-none bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
            />
          </div>
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
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">{label}</label>

      <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 focus-within:border-indigo-500/60">
        <span className="text-white/25">{icon}</span>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
        />
      </div>
    </div>
  );
}
