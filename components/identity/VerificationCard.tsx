import { CheckCircle2, FileCheck2, ShieldCheck, Users } from "lucide-react";
import VerificationItem from "./VerificationItem";

const VerificationCard = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Verified
          </span>
        </div>

        <h3 className="mt-5 text-base font-semibold">
          Trusted professional record
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Key information on this Identity has been verified through
          organizations and documented work activity.
        </p>

        <div className="mt-5 space-y-3">
          <VerificationItem
            icon={Users}
            title="Organization verified"
            description="1 organization"
          />

          <VerificationItem
            icon={FileCheck2}
            title="Employment verified"
            description="1 employment record"
          />

          <VerificationItem
            icon={CheckCircle2}
            title="Work contributions"
            description="46 documented tasks"
          />
        </div>
      </div>
    </section>
  );
};

export default VerificationCard;
