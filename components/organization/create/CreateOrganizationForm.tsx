"use client";

import { APP_CONFIG } from "@/constants";
import { selectCurrentUser } from "@/features/auth/auth.selectors";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateOrganizationForm = () => {
  const user = useAppSelector(selectCurrentUser);
  const [useAccountEmail, setUseAccountEmail] = useState(true);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      supportEmail: "",
      slug: "",
      description: "",
      logo: "",
      website: "",
    },
  });

  const supportEmail = watch("supportEmail");

  useEffect(() => {
    if (user?.email && useAccountEmail) {
      setValue("supportEmail", user.email);
    }
  }, [user?.email, useAccountEmail, setValue]);

  const handleEmailToggle = () => {
    const nextValue = !useAccountEmail;

    setUseAccountEmail(nextValue);

    if (nextValue) {
      setValue("supportEmail", user?.email ?? "", {
        shouldValidate: true,
      });
    } else {
      setValue("supportEmail", "", {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Organization name
        </label>

        <input
          {...register("name")}
          placeholder="Acme Inc."
          className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-500/50"
        />

        {errors.name && (
          <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Support email
        </label>

        <div className="rounded-xl border border-white/10 bg-white/2.5 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white">Use my account email</p>

              <p className="mt-1 text-xs text-white/40">
                {user?.email || "Loading account email..."}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={useAccountEmail}
              onClick={handleEmailToggle}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                useAccountEmail ? "bg-indigo-500" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                  useAccountEmail ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {!useAccountEmail && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <input
                {...register("supportEmail")}
                type="email"
                placeholder="support@company.com"
                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-500/50"
              />
            </div>
          )}

          {useAccountEmail && supportEmail && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <p className="text-xs text-white/35">
                Support requests will be directed to
              </p>

              <p className="mt-1 text-sm text-white/70">{supportEmail}</p>
            </div>
          )}
        </div>

        {errors.supportEmail && (
          <p className="mt-2 text-xs text-red-400">
            {errors.supportEmail.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Organization slug
        </label>

        <div className="flex items-center rounded-xl border border-white/10 bg-white/4 focus-within:border-indigo-500/50">
          <span className="border-r border-white/10 px-4 text-sm text-white/30">
            {APP_CONFIG.DOMAIN}org/
          </span>

          <input
            {...register("slug")}
            placeholder="acme"
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
          />
        </div>

        {errors.slug && (
          <p className="mt-2 text-xs text-red-400">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-white">Description</label>

          <span className="text-xs text-white/25">Optional</span>
        </div>

        <textarea
          {...register("description")}
          rows={4}
          placeholder="Tell people what your organization does..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-500/50"
        />

        {errors.description && (
          <p className="mt-2 text-xs text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-white">Logo URL</label>

            <span className="text-xs text-white/25">Optional</span>
          </div>

          <input
            {...register("logo")}
            type="url"
            placeholder="https://..."
            className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-500/50"
          />

          {errors.logo && (
            <p className="mt-2 text-xs text-red-400">{errors.logo.message}</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-white">Website</label>

            <span className="text-xs text-white/25">Optional</span>
          </div>

          <input
            {...register("website")}
            type="url"
            placeholder="https://example.com"
            className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-indigo-500/50"
          />

          {errors.website && (
            <p className="mt-2 text-xs text-red-400">
              {errors.website.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="org-primary-button w-full rounded-xl px-5 py-3 text-sm font-medium"
      >
        Create organization
      </button>
    </form>
  );
};

export default CreateOrganizationForm;
