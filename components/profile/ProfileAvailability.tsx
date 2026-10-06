import { ICurrentProfile } from "@/features/auth/auth.interface";
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleOff,
  UsersRound,
} from "lucide-react";

interface Props {
  profile?: ICurrentProfile;
}

const ProfileAvailability = ({ profile }: Props) => {
  const isOpenToWork = profile?.isOpenToWork;
  const isOpenToCollaborate = profile?.isOpenToCollaborate;

  return (
    <section className="rounded-2xl border border-white/8 bg-white/2.5 p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-white">Availability</h2>

      <p className="mt-1 text-xs text-white/25">What I'm currently open to</p>

      <div className="mt-5 space-y-3">
        <div
          className={`flex items-center gap-3 rounded-xl border p-3.5 ${
            isOpenToWork
              ? "border-emerald-500/10 bg-emerald-500/4"
              : "border-white/6 bg-white/1.5"
          }`}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              isOpenToWork
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-white/5 text-white/25"
            }`}
          >
            <BriefcaseBusiness size={16} />
          </div>

          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                isOpenToWork ? "text-white/80" : "text-white/50"
              }`}
            >
              Open to work
            </p>

            <p className="mt-0.5 text-xs text-white/30">
              {isOpenToWork
                ? "Full-time, part-time, and other opportunities"
                : "Currently not looking for work opportunities"}
            </p>
          </div>

          {isOpenToWork ? (
            <CheckCircle2 size={16} className="text-emerald-400" />
          ) : (
            <CircleOff size={16} className="text-white/20" />
          )}
        </div>

        <div
          className={`flex items-center gap-3 rounded-xl border p-3.5 ${
            isOpenToCollaborate
              ? "border-indigo-500/10 bg-indigo-500/4"
              : "border-white/6 bg-white/1.5"
          }`}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              isOpenToCollaborate
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-white/5 text-white/25"
            }`}
          >
            <UsersRound size={16} />
          </div>

          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                isOpenToCollaborate ? "text-white/80" : "text-white/50"
              }`}
            >
              Open to collaborate
            </p>

            <p className="mt-0.5 text-xs text-white/30">
              {isOpenToCollaborate
                ? "Projects, ideas, and professional opportunities"
                : "Currently not open to collaboration"}
            </p>
          </div>

          {isOpenToCollaborate ? (
            <CheckCircle2 size={16} className="text-indigo-400" />
          ) : (
            <CircleOff size={16} className="text-white/20" />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileAvailability;
