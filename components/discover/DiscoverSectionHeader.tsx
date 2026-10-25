import { ArrowRight } from "lucide-react";

type DiscoverSectionHeaderProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function DiscoverSectionHeader({
  title,
  description,
  actionLabel = "View all",
  onAction,
}: DiscoverSectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight text-(--org-text) sm:text-lg">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs leading-5 text-(--org-text-muted) sm:text-sm">
            {description}
          </p>
        )}
      </div>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="group flex shrink-0 items-center gap-1.5 text-xs font-medium text-(--org-primary-light) transition hover:text-white sm:text-sm"
        >
          {actionLabel}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      )}
    </div>
  );
}
