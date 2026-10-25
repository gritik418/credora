"use client";

import { ArrowUpRight, Check, CheckCheck, X } from "lucide-react";

import { notificationMeta, type AppNotification } from "./notifications.data";

type NotificationItemProps = {
  notification: AppNotification;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onAction: (
    notification: AppNotification,
    action: "primary" | "secondary",
  ) => void;
};

export default function NotificationItem({
  notification,
  onRead,
  onDismiss,
  onAction,
}: NotificationItemProps) {
  const meta = notificationMeta[notification.type];
  const TypeIcon = meta.icon;

  return (
    <article
      className={`group relative px-4 py-4 transition-colors hover:bg-white/[0.035] ${
        notification.read ? "" : "bg-indigo-500/[0.035]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          {notification.actor.avatar ? (
            <img
              src={notification.actor.avatar}
              alt={notification.actor.name}
              className="h-10 w-10 rounded-full border border-white/8 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-linear-to-br from-indigo-500/20 to-violet-500/20 text-xs font-semibold text-indigo-200">
              {notification.actor.initials}
            </div>
          )}

          <span
            className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0d1018] ${meta.background}`}
          >
            <TypeIcon size={10} className={meta.color} />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[12px] leading-[1.65] text-(--org-text-secondary)">
                <span className="font-semibold text-(--org-text)">
                  {notification.title}
                </span>{" "}
                {notification.description}
              </p>

              <p className="mt-1.5 text-[10px] text-(--org-text-muted)">
                {notification.createdAt}
              </p>
            </div>

            {!notification.read && (
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.35)]"
                aria-label="Unread"
              />
            )}
          </div>

          {(notification.actionLabel || notification.secondaryActionLabel) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {notification.actionLabel && (
                <button
                  type="button"
                  onClick={() => onAction(notification, "primary")}
                  className="org-primary-button rounded-lg px-3 py-1.5 text-[11px] font-medium"
                >
                  {notification.actionLabel}
                </button>
              )}

              {notification.secondaryActionLabel && (
                <button
                  type="button"
                  onClick={() => onAction(notification, "secondary")}
                  className="org-secondary-button rounded-lg px-3 py-1.5 text-[11px]"
                >
                  {notification.secondaryActionLabel}
                </button>
              )}
            </div>
          )}

          <div className="mt-2 flex items-center gap-3 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
            {!notification.read && (
              <button
                type="button"
                onClick={() => onRead(notification.id)}
                className="inline-flex items-center gap-1 text-[10px] text-(--org-text-muted) transition hover:text-indigo-300"
              >
                <Check size={12} />
                Mark as read
              </button>
            )}

            <button
              type="button"
              onClick={() => onDismiss(notification.id)}
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
