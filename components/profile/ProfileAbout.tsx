import { ICurrentProfile } from "@/features/auth/auth.interface";
import { Pencil, UserRound } from "lucide-react";

interface Props {
  profile?: ICurrentProfile;
}

const ProfileAbout = ({ profile }: Props) => {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
          <UserRound size={17} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">About</h2>
          <p className="text-xs text-white/45">
            A little about my professional journey
          </p>
        </div>
      </div>

      <div className="mt-5">
        {profile?.bio ? (
          <p className="max-w-3xl text-sm leading-7 text-white/50">
            {profile.bio}
          </p>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/8 bg-white/2 px-4 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300/70">
              <Pencil size={15} />
            </div>

            <div>
              <p className="text-sm font-medium text-white/60">
                Add a short introduction
              </p>
              <p className="mt-0.5 text-xs text-white/30">
                Tell people a little about your experience, interests, and what
                you are working on.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileAbout;
