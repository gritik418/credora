"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, User } from "lucide-react";
import { useRouter } from "next/navigation";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/features/auth/auth.selectors";
import { useForm } from "react-hook-form";
import UpdateBasicInfoDto from "@/features/onboarding/dto/update-basic-info.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdateBasicInfoSchema from "@/features/onboarding/schemas/update-basic-info.schema";
import { useUpdateBasicInfoMutation } from "@/features/onboarding/onboarding.api";
import { toast } from "react-toastify";

const BasicInfoPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector(selectCurrentUser);
  const [updateBasicInfo] = useUpdateBasicInfoMutation();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    user?.avatar || "",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBasicInfoDto>({
    defaultValues: {
      name: user?.name,
    },
    resolver: zodResolver(UpdateBasicInfoSchema),
    mode: "onChange",
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleOnContinue = async (data: UpdateBasicInfoDto) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", getValues("name"));
      if (avatar) formData.append("avatar", avatar);

      const result = await updateBasicInfo(formData).unwrap();

      if (result.success) {
        toast.success(result.message || "Basic info updated successfully.");
      } else {
        toast.error(result.message || "Failed to update basic info.");
      }
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <OnboardingShell
      currentStep="BASIC_INFO"
      title="Let's start with the basics."
      description="Create the foundation of your professional identity on Credora."
      onContinue={handleSubmit(handleOnContinue)}
      loading={isSubmitting || isLoading}
    >
      <div className="space-y-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#51566343]">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={28} className="text-white/25" />
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute cursor-pointer -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg border-[3px] border-[#050505] bg-credora-blue text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
            >
              <Camera size={14} />
            </button>

            <input
              ref={fileInputRef}
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-white">Profile photo</p>

            <p className="mt-1 text-xs text-white/40">
              Use a clear, professional photo.
            </p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 cursor-pointer text-xs font-medium text-credora-blue transition hover:text-blue-400"
            >
              {avatar ? "Change photo" : "Upload photo"}
            </button>
          </div>
        </div>

        <div className="h-px bg-white/[0.07]" />

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Full name
            </label>

            <input
              {...register("name")}
              placeholder="John Doe"
              className="h-12 w-full rounded-xl border border-white/10 px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 hover:border-credora-blue/60 focus:border-credora-blue/60 focus:ring-1 focus:ring-credora-blue/20"
            />
          </div>
          {errors.name?.message && (
            <p className="mt-2 text-xs text-red-500">{errors.name?.message}</p>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Username
            </label>

            <div className="flex h-12 overflow-hidden rounded-xl border border-white/10 transition-all">
              <span className="flex items-center border-r border-white/[0.07] bg-white/2.5 px-4 text-sm text-white/30">
                credora.me/
              </span>

              <input
                value={user?.username}
                placeholder="username"
                readOnly
                className="h-12 w-full cursor-default rounded-r-xl border border-white/10 px-4 text-sm text-white/60 outline-none transition-all placeholder:text-white/25"
              />
            </div>

            <p className="mt-2 text-xs text-white/30">
              Your unique public profile URL.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Email
            </label>

            <input
              readOnly
              value={user?.email}
              placeholder="Email address"
              className="h-12 w-full cursor-default rounded-xl border border-white/10 px-4 text-sm text-white/60 outline-none transition-all placeholder:text-white/25"
            />

            <p className="mt-2 text-xs text-white/30">
              Used for important account notifications.
            </p>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
};

export default BasicInfoPage;
