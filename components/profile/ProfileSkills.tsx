import { ICurrentProfile } from "@/features/auth/auth.interface";
import { Skill } from "@/features/skills/skills.interface";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  profile?: ICurrentProfile;
}

const ProfileSkills = ({ profile }: Props) => {
  const skills = profile?.skills;

  return (
    <section className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
          <Sparkles size={17} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Skills</h2>
          <p className="text-xs text-white/25">
            Technologies and areas I work with
          </p>
        </div>
      </div>

      {skills?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill: Skill) => (
            <span
              key={skill.id}
              className="rounded-lg cursor-default border border-white/8 bg-white/[0.035] px-3 py-2 text-xs font-medium text-white/45 transition hover:border-indigo-400/20 hover:bg-indigo-500/10 hover:text-indigo-300"
            >
              {skill.name}
            </span>
          ))}
        </div>
      ) : (
        <Link
          href="/profile/edit"
          className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-white/8 bg-white/1.5 p-3.5 transition hover:border-indigo-400/20 hover:bg-indigo-500/4"
        >
          <div>
            <p className="text-sm font-medium text-white/60">Add your skills</p>
            <p className="mt-0.5 text-xs text-white/25">
              Showcase the technologies and areas you work with
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

export default ProfileSkills;
