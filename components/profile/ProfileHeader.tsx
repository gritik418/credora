"use client";

import countries from "@/constants/countries";
import { selectCurrentUser } from "@/features/auth/auth.selectors";
import { useAppSelector } from "@/store/hooks";
import {
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Pencil,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfileHeader = () => {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    router.replace("/auth");
    return null;
  }

  const initials =
    user.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const getCountryName = (countryCode: string) => {
    const country = countries.find(
      (country) => country.code === countryCode,
    )?.name;

    return country || countryCode;
  };

  const getRecentEducation = () => {
    const educations = user.profile?.educations;

    if (!educations?.length) return null;

    const currentEducation = educations.find(
      (education) => education.isCurrentlyStudying,
    );

    if (currentEducation) return currentEducation;

    return [...educations].sort((a, b) => {
      const aDate = a.endDate
        ? new Date(a.endDate).getTime()
        : new Date(a.startDate).getTime();

      const bDate = b.endDate
        ? new Date(b.endDate).getTime()
        : new Date(b.startDate).getTime();

      return bDate - aDate;
    })[0];
  };

  const getRecentExperience = () => {
    const experiences = user.profile?.experiences;

    if (!experiences?.length) return null;

    const currentExperience = experiences.find(
      (experience) => experience.isCurrentlyWorking,
    );

    if (currentExperience) return currentExperience;

    return [...experiences].sort((a, b) => {
      const aDate = a.endDate
        ? new Date(a.endDate).getTime()
        : new Date(a.startDate).getTime();

      const bDate = b.endDate
        ? new Date(b.endDate).getTime()
        : new Date(b.startDate).getTime();

      return bDate - aDate;
    })[0];
  };

  const recentEducation = getRecentEducation();
  const recentExperience = getRecentExperience();

  return (
    <section className="overflow-hidden rounded-3xl border border-white/8 bg-white/2.5">
      <div className="relative flex h-36 items-start justify-end overflow-hidden rounded-t-2xl border-b border-white/6 bg-linear-to-br from-indigo-950/70 via-[#111633] to-blue-950/60 backdrop-blur-xl sm:h-44">
        <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="absolute -right-10 -top-12 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="absolute -bottom-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-indigo-400/4" />

        <div className="absolute inset-0 bg-linear-to-br from-white/2.5 via-transparent to-indigo-400/2.5" />

        <div className="z-10 flex gap-2 px-5 pt-6 sm:px-8 sm:pt-8">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/8 bg-white/3.5 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/15 hover:bg-white/6 hover:text-white"
          >
            <Share2 size={15} />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            <Pencil size={15} />
            Edit profile
          </button>
        </div>
      </div>

      <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
        <div className="absolute top-0 flex h-24 w-24 -translate-y-1/2 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-linear-to-br from-[#171536] via-[#11162d] to-[#0b1020] text-3xl font-semibold text-white shadow-2xl shadow-indigo-950/40 sm:h-28 sm:w-28">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              height={120}
              width={120}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500/30 via-violet-500/20 to-blue-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_50%)]" />

              <span className="relative bg-linear-to-br from-white via-indigo-100 to-blue-200 bg-clip-text font-semibold text-transparent">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 pt-20">
          <div className="pb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {user.name}
            </h1>

            {user.profile?.profession ? (
              <p className="mt-1 text-sm text-white/50 sm:text-base">
                {user.profile.profession}
              </p>
            ) : null}

            {user.profile?.country ? (
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-white/35" />

                  {user.profile.city}

                  {user.profile.city && user.profile.state && ", "}

                  {user.profile.state}

                  {user.profile.state && ", "}

                  {getCountryName(user.profile.country)}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {user.profile?.headline ? (
          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/45">
            {user.profile.headline}
          </p>
        ) : null}

        {(recentExperience || recentEducation) && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {recentExperience ? (
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-400/15 bg-linear-to-br from-indigo-500/10 via-white/3.5 to-blue-500/6 p-4 transition hover:border-indigo-400/25 hover:bg-indigo-500/12">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20" />

                <div className="relative flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-indigo-200/50">
                        Experience
                      </p>

                      {recentExperience.isCurrentlyWorking && (
                        <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-400/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 truncate text-sm font-semibold text-white/90">
                      {recentExperience.position}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-white/45">
                      {recentExperience.company}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {recentEducation ? (
              <div className="group relative overflow-hidden rounded-2xl border border-violet-400/15 bg-linear-to-br from-violet-500/10 via-white/3.5 to-indigo-500/6 p-4 transition hover:border-violet-400/25 hover:bg-violet-500/12">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/20" />

                <div className="relative flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
                    <GraduationCap size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-violet-200/50">
                        Education
                      </p>

                      {recentEducation.isCurrentlyStudying && (
                        <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-400/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 truncate text-sm font-semibold text-white/90">
                      {recentEducation.degree}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-white/45">
                      {recentEducation.institution}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;
