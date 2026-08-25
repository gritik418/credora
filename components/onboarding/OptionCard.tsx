import { ArrowRight } from "lucide-react";

const OptionCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <button className="group flex w-full items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:border-primary/50 hover:shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <h3 className="font-medium group-hover:text-primary">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <ArrowRight className="ml-auto mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </button>
  );
};

export default OptionCard;
