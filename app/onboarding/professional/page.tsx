"use client";

import { useState } from "react";
import { Briefcase, Building2, Code2 } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const ProfessionalPage = () => {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");

  const handleOnContinue = () => {
    router.push("/onboarding/summary");
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
          label="Current role"
          placeholder="e.g. Full Stack Developer"
          value={role}
          onChange={setRole}
        />

        <Field
          icon={<Building2 size={17} />}
          label="Company"
          placeholder="e.g. Acme Inc."
          value={company}
          onChange={setCompany}
        />

        <div>
          <label className="mb-3 block text-sm text-white/70">
            Years of experience
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["0–1", "1–3", "3–5", "5+"].map((item) => (
              <button
                key={item}
                onClick={() => setExperience(item)}
                className={`rounded-xl border px-4 py-3 text-sm transition ${
                  experience === item
                    ? "border-indigo-500 bg-indigo-500/10 text-white"
                    : "border-white/[0.08] bg-white/[0.03] text-white/40 hover:border-white/20"
                }`}
              >
                {item} years
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/[0.04] p-4">
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

      <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 focus-within:border-indigo-500/60">
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
