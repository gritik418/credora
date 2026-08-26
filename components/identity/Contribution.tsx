const Contribution = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) => {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5">
      <Icon className="h-4 w-4 text-primary" />

      <p className="mt-4 text-2xl font-bold">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default Contribution;
