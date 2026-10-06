import { ICurrentProfile } from "@/features/auth/auth.interface";
import { CalendarDays, GraduationCap, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  profile?: ICurrentProfile;
}

const ProfileEducation = ({ profile }: Props) => {
  const educations = [...(profile?.educations || [])].sort((a, b) => {
    if (a.isCurrentlyStudying && !b.isCurrentlyStudying) return -1;
    if (!a.isCurrentlyStudying && b.isCurrentlyStudying) return 1;

    const aDate = a.endDate
      ? new Date(a.endDate).getTime()
      : new Date(a.startDate).getTime();

    const bDate = b.endDate
      ? new Date(b.endDate).getTime()
      : new Date(b.startDate).getTime();

    return bDate - aDate;
  });

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  return (
    <section className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Education</h2>
          <p className="text-xs text-white/25">Academic background</p>
        </div>

        <GraduationCap size={18} className="text-white/20" />
      </div>

      {educations.length ? (
        <div className="mt-6 space-y-6">
          {educations.map((education, index) => (
            <div key={education.id} className="relative flex gap-4">
              {index !== educations.length - 1 && (
                <div className="absolute left-5 top-12 z-0 h-[calc(100%)] w-px bg-white/6" />
              )}

              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-indigo-400">
                <GraduationCap size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-medium text-white">
                    {education.degree}
                  </h3>

                  {education.isCurrentlyStudying && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-white/45">
                  {education.institution}
                </p>

                {education.fieldOfStudy && (
                  <p className="mt-1 text-xs text-white/30">
                    {education.fieldOfStudy}
                  </p>
                )}

                <div className="mt-2 flex flex-col items-start gap-2 text-xs text-white/25">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {formatDate(education.startDate)} —{" "}
                    {education.isCurrentlyStudying
                      ? "Present"
                      : education.endDate
                        ? formatDate(education.endDate)
                        : "Present"}
                  </span>

                  {education.grade && <span>Grade: {education.grade}</span>}
                </div>

                {education.description && (
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/35">
                    {education.description}
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
              Add your education
            </p>

            <p className="mt-0.5 text-xs text-white/25">
              Showcase your academic background and qualifications
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

export default ProfileEducation;
