import { Search } from "lucide-react";
import React from "react";

const EmptyState = ({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="flex min-h-70 flex-col items-center justify-center px-5 py-12 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-400/7 text-violet-300">
      {icon ?? <Search size={22} />}
    </div>
    <h3 className="text-base font-semibold text-zinc-200">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
      {description}
    </p>
    {action}
  </div>
);

export default EmptyState;
