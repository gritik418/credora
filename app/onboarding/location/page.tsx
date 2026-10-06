"use client";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { Globe2, Map, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import AddLocationInfoSchema from "@/features/onboarding/schemas/add-location-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddLocationInfoDto from "@/features/onboarding/dto/add-location-info.dto";
import countries from "@/constants/countries";
import { toast } from "react-toastify";
import { useAddLocationInfoMutation } from "@/features/onboarding/onboarding.api";

const LocationPage = () => {
  const [addLocationInfo, { isLoading }] = useAddLocationInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddLocationInfoDto>({
    defaultValues: {
      city: "",
      country: "",
      state: "",
    },
    mode: "onChange",
    resolver: zodResolver(AddLocationInfoSchema),
  });

  const handleOnContinue = async (data: AddLocationInfoDto) => {
    try {
      const result = await addLocationInfo(data).unwrap();

      if (result.success) {
        toast.success(result.message || "Location info added successfully.");
      } else {
        toast.error(result.message || "Failed to add location info.");
      }
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <OnboardingShell
      currentStep="LOCATION"
      title="Where are you based?"
      description="Add your location so people can better understand your professional context."
      onContinue={handleSubmit(handleOnContinue)}
      loading={isLoading || isSubmitting}
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-white/70">City</label>

          <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4">
            <MapPin size={17} className="text-white/25" />

            <input
              {...register("city")}
              placeholder="e.g. Gurugram"
              className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
            />
          </div>
          {errors.city?.message && (
            <p className="mt-2 text-xs text-red-500">{errors.city?.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">State</label>

          <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4">
            <Map size={17} className="text-white/25" />

            <input
              {...register("state")}
              placeholder="e.g. Haryana"
              className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-white/20"
            />
          </div>
          {errors.state?.message && (
            <p className="mt-2 text-xs text-red-500">{errors.state?.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">Country</label>

          <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4">
            <Globe2 size={17} className="shrink-0 text-white/25" />

            <select
              {...register("country")}
              className="w-full bg-transparent py-3.5 text-sm text-white outline-none"
            >
              <option value="" className="bg-[#0a0a0a] text-white/50">
                Select country
              </option>

              {countries.map((country) => (
                <option
                  key={country.code}
                  value={country.code}
                  className="bg-[#0a0a0a] text-white"
                >
                  {country.name} · {country.code}
                </option>
              ))}
            </select>
          </div>
          {errors.country?.message && (
            <p className="mt-2 text-xs text-red-500">
              {errors.country?.message}
            </p>
          )}
        </div>
      </div>
    </OnboardingShell>
  );
};

export default LocationPage;
