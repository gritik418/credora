import { ArrowRight, Sparkles } from "lucide-react";

const WelcomeStep = ({ onNext }: { onNext: () => void }) => {
  return (
    <div>
      <div className="mb-8">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="h-7 w-7" />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome to Credora
        </h2>

        <p className="mt-3 max-w-md leading-7 text-muted-foreground">
          Let&apos;s set up your professional identity and get you ready to
          start building a record of your real work.
        </p>
      </div>

      <button
        onClick={onNext}
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground transition hover:opacity-90"
      >
        Get started
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        This will only take a few minutes.
      </p>
    </div>
  );
};

export default WelcomeStep;
