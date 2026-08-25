const Input = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <input
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
};

export default Input;
