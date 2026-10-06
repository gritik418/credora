import { ICurrentProfile } from "@/features/auth/auth.interface";
import { BriefcaseBusiness, CalendarDays, MapPin, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  profile?: ICurrentProfile;
}

const ProfileExperience = ({ profile }: Props) => {
  const experiences = [...(profile?.experiences || [])].sort((a, b) => {
    if (a.isCurrentlyWorking && !b.isCurrentlyWorking) return -1;
    if (!a.isCurrentlyWorking && b.isCurrentlyWorking) return 1;

    const aDate = a.endDate
      ? new Date(a.endDate).getTime()
      : new Date(a.startDate).getTime();

    const bDate = b.endDate
      ? new Date(b.endDate).getTime()
      : new Date(b.startDate).getTime();

    return bDate - aDate;
  });

  return (
    <section className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Experience</h2>
          <p className="mt-1 text-xs text-white/25">
            Professional experience and work history
          </p>
        </div>

        <BriefcaseBusiness size={18} className="text-white/20" />
      </div>

      {experiences.length ? (
        <div className="mt-6 space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative flex gap-4">
              {index !== experiences.length - 1 && (
                <div className="absolute left-5 top-10 z-0 h-[calc(100%+8px)] w-px bg-white/6" />
              )}

              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-400">
                <BriefcaseBusiness size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-medium text-white">
                    {experience.position}
                  </h3>

                  {experience.isCurrentlyWorking && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-white/45">
                  {experience.company}
                </p>

                <div className="mt-2 flex flex-wrap flex-col items-start gap-3 text-xs text-white/25">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {new Date(experience.startDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )}{" "}
                    —{" "}
                    {experience.isCurrentlyWorking
                      ? "Present"
                      : new Date(experience.endDate!).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                  </span>

                  {experience.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {experience.location}
                    </span>
                  )}
                </div>

                {experience.description && (
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/35">
                    {experience.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Link
          href="/profile/edit"
          className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-white/8 bg-white/1.5 p-4 transition hover:border-indigo-400/20 hover:bg-indigo-500/4"
        >
          <div>
            <p className="text-sm font-medium text-white/60">
              Add your experience
            </p>
            <p className="mt-0.5 text-xs text-white/25">
              Showcase your professional experience and work history
            </p>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Plus size={16} />
          </div>
        </Link>
      )}
    </section>
  );
};

export default ProfileExperience;
