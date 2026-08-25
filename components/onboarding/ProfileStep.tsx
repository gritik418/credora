import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import Input from "./Input";

const ProfileStep = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Build your professional identity
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          This is how you&apos;ll appear across Credora.
        </p>
      </div>

      <div className="space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
            <UserRound className="h-6 w-6 text-muted-foreground" />
          </div>

          <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Upload photo
          </button>
        </div>

        <Input label="Full name" placeholder="Ritik Gupta" />

        <div>
          <Input label="Username" placeholder="ritikgupta" />

          <p className="mt-2 text-xs text-muted-foreground">
            credora.com/ritikgupta
          </p>
        </div>

        <Input
          label="Professional headline"
          placeholder="Full Stack Developer"
        />

        <div>
          <label className="mb-2 block text-sm font-medium">Short bio</label>

          <textarea
            rows={4}
            placeholder="Tell us a little about yourself and your professional journey..."
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          onClick={onNext}
          className="group flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground transition hover:opacity-90"
        >
          Continue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ProfileStep;
