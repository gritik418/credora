"use client";

import { Notification } from "@/features/notification/notification.interface";
import { getInitials } from "@/lib/string.utils";
import { Check, TypeIcon, X } from "lucide-react";

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  // const meta = notificationMeta[notification.type];
  // const TypeIcon = meta.icon;

  const onAction = () => {};
  const onRead = () => {};
  const onDismiss = () => {};

  return (
    <article
      className={`group relative px-4 py-4 transition-colors hover:bg-white/[0.035] ${
        notification.readAt ? "" : "bg-indigo-500/[0.035]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          {notification?.actor?.avatar ? (
            <img
              src={notification.actor.avatar}
              alt={notification.actor.name}
              className="h-10 w-10 rounded-full border border-white/8 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-linear-to-br from-indigo-500/20 to-violet-500/20 text-xs font-semibold text-indigo-200">
              {getInitials(notification.actor?.name || "")}
            </div>
          )}

          <span
            className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0d1018]`}
          >
            <TypeIcon size={10} />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[12px] leading-[1.65] text-(--org-text-secondary)">
                {notification.title}
              </p>

              <p className="text-sm">{notification.message}</p>

              <p className="mt-1.5 text-[10px] text-(--org-text-muted)">
                {notification.createdAt}
              </p>
            </div>

            {!notification.readAt && (
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.35)]"
                aria-label="Unread"
              />
            )}
          </div>

          <div className="mt-2 flex items-center gap-3 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
            {!notification.readAt && (
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[10px] text-(--org-text-muted) transition hover:text-indigo-300"
              >
                <Check size={12} />
                Mark as read
              </button>
            )}

            <button
              type="button"
              aria-label="Dismiss notification"
              className="inline-flex items-center gap-1 text-[10px] text-(--org-text-muted) transition hover:text-rose-300"
            >
              <X size={12} />
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
