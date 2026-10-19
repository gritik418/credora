import React from "react";

const StatCard = ({
  icon,
  label,
  value,
  detail,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  accent: "violet" | "blue" | "emerald";
}) => {
  const accents = {
    violet: "border-violet-400/15 bg-violet-400/7 text-violet-300",
    blue: "border-blue-400/15 bg-blue-400/7 text-blue-300",
    emerald: "border-emerald-400/15 bg-emerald-400/7 text-emerald-300",
  };

  return (
    <div className="rounded-2xl border border-white/7 p-5 transition hover:border-white/12">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <p className="mt-3 text-xl font-semibold tracking-tight text-zinc-100">
            {value}
          </p>
          <p className="mt-1 text-xs text-zinc-600">{detail}</p>
        </div>
        <div className={`rounded-xl border p-2.5 ${accents[accent]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
