"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, X } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

type NotificationBellProps = {
  onOpenAll?: () => void;
};

export default function NotificationBell({ onOpenAll }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={open ? "Close notifications" : "Open notifications"}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
          open
            ? "border-indigo-400/20 bg-indigo-500/10 text-indigo-200"
            : "border-transparent text-(--org-text-secondary) hover:border-(--org-border) hover:bg-white/4 hover:text-white"
        }`}
      >
        {open ? <X size={19} /> : <Bell size={19} />}

        {!open && (
          <>
            <span className="absolute right-2.25 top-2 h-2 w-2 rounded-full bg-indigo-400 ring-2 ring-(--org-bg)" />
            <span className="sr-only">You have unread notifications</span>
          </>
        )}
      </button>

      {open && (
        <NotificationDropdown
          onClose={() => setOpen(false)}
          onOpenAll={onOpenAll}
        />
      )}
    </div>
  );
}
