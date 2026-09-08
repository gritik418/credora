"use client";

import { useState } from "react";
import { Camera, User } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useRouter } from "next/navigation";

const BasicInfoPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleOnContinue = () => {
    router.push("/onboarding/professional");
  };

  return (
    <OnboardingShell
      currentStep="BASIC_INFO"
      title="Let's start with the basics."
      description="Create the foundation of your professional identity on Credora."
      onContinue={handleOnContinue}
    >
      <div className="space-y-7">
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
            <User className="text-white/25" size={30} />

            <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg border border-[#080b14] bg-indigo-500">
              <Camera size={14} />
            </button>
          </div>

          <div>
            <p className="text-sm font-medium">Profile photo</p>
            <p className="mt-1 text-xs text-white/35">
              A professional photo works best.
            </p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm text-white/70">Full Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ritik Gupta"
            className="w-full rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-indigo-500/60"
          />
        </div>

        {/* Username */}
        <div>
          <label className="mb-2 block text-sm text-white/70">Username</label>

          <div className="flex overflow-hidden rounded-xl border border-white/8 bg-white/[0.035] cursor-default">
            <span className="flex items-center border-r border-white/6 px-4 text-sm text-white/30">
              credora.me/
            </span>

            <input
              value={username}
              readOnly
              placeholder="username"
              className="min-w-0 cursor-default outline-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-white/20"
            />
          </div>

          <p className="mt-2 text-xs text-white/25">
            This will be your public Credora URL.
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-white/70">Email</label>

          <div className="flex overflow-hidden rounded-xl border border-white/8 bg-white/[0.035]">
            <input
              readOnly
              value={email}
              placeholder="Email address"
              className="min-w-0 cursor-default border-0 flex-1 bg-transparent px-4 py-3.5 text-sm focus:outline-none placeholder:text-white/20"
            />
          </div>

          <p className="mt-2 text-xs text-white/25">
            We will send you important notifications on this email address.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
};

export default BasicInfoPage;
