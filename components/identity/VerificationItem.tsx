const VerificationItem = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 p-3">
      <Icon className="h-4 w-4 shrink-0 text-emerald-500" />

      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VerificationItem;
