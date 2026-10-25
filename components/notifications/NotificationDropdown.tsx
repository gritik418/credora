"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  ChevronRight,
  Inbox,
  Settings2,
  Sparkles,
} from "lucide-react";

import NotificationItem from "./NotificationItem";
import {
  initialNotifications,
  type AppNotification,
} from "./notifications.data";

type NotificationDropdownProps = {
  onClose: () => void;
  onOpenAll?: () => void;
};

type NotificationFilter = "all" | "unread";

export default function NotificationDropdown({
  onClose,
  onOpenAll,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] =
    useState<AppNotification[]>(initialNotifications);

  const [filter, setFilter] = useState<NotificationFilter>("all");

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const visibleNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) => filter === "all" || !notification.read,
      ),
    [notifications, filter],
  );

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  };

  const handleAction = (
    notification: AppNotification,
    action: "primary" | "secondary",
  ) => {
    if (notification.type === "connection_request" && action === "secondary") {
      dismissNotification(notification.id);
      return;
    }

    markAsRead(notification.id);

    if (notification.href) {
      onClose();
      window.location.assign(notification.href);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="org-bg absolute right-0 top-[calc(100%+14px)] z-100 flex w-[calc(100vw-24px)] max-w-105 flex-col overflow-hidden rounded-2xl border border-(--org-border-hover) shadow-[0_24px_90px_rgba(0,0,0,0.55)] sm:w-105"
      style={{ maxHeight: "min(660px, calc(100dvh - 100px))" }}
    >
      {/* Header */}
      <div className="shrink-0 border-b border-(--org-border) bg-[#0d1018]/95 px-5 pb-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10">
              <Bell size={19} className="text-indigo-300" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-(--org-text)">
                Notifications
              </h2>

              <p className="mt-1 text-[11px] text-(--org-text-muted)">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
                  : "You're all caught up"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-[10px] font-medium text-(--org-text-muted) transition hover:bg-white/4 hover:text-indigo-300 disabled:cursor-default disabled:opacity-40"
          >
            <CheckCheck size={13} />
            <span className="hidden min-[360px]:inline">Mark all read</span>
          </button>
        </div>

        {/* Filter tabs */}
        <div className="mt-5 flex items-center gap-1 rounded-xl border border-(--org-border) bg-black/10 p-1">
          {(["all", "unread"] as const).map((tab) => {
            const active = filter === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium capitalize transition ${
                  active
                    ? "border border-white/6 bg-white/6 text-white shadow-sm"
                    : "text-(--org-text-muted) hover:text-(--org-text-secondary)"
                }`}
              >
                {tab === "all" ? "All activity" : "Unread"}

                {tab === "unread" && unreadCount > 0 && (
                  <span className="rounded-md bg-indigo-500/15 px-1.5 py-0.5 text-[10px] text-indigo-300">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification list */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#0d1018]/95 overscroll-contain">
        {visibleNotifications.length > 0 ? (
          <div className="divide-y divide-(--org-border)">
            {visibleNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={markAsRead}
                onDismiss={dismissNotification}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center px-8 py-10 text-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-(--org-border) bg-white/2.5">
              <Inbox size={27} className="text-(--org-text-muted)" />

              <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-(--org-border) bg-[#10131c]">
                <Sparkles size={12} className="text-indigo-300" />
              </span>
            </div>

            <h3 className="mt-5 text-sm font-semibold text-(--org-text)">
              {filter === "unread" ? "All caught up" : "It's quiet in here"}
            </h3>

            <p className="mt-2 max-w-57.5 text-xs leading-5 text-(--org-text-muted)">
              {filter === "unread"
                ? "You've read all your notifications. We'll let you know when something new happens."
                : "Your activity will show up here as your professional network grows."}
            </p>

            {filter === "unread" && notifications.length > 0 && (
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-4 text-xs font-medium text-indigo-300 transition hover:text-white"
              >
                View all activity
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-(--org-border) bg-[#0d1018]/95 p-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAll?.();
            }}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-(--org-border) bg-white/2.5 px-3 py-3 text-xs font-medium text-(--org-text-secondary) transition hover:border-indigo-400/20 hover:bg-indigo-500/5 hover:text-white"
          >
            View all notifications
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button
            type="button"
            aria-label="Notification settings"
            onClick={() => {
              onClose();
              window.location.assign("/settings/notifications");
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--org-border) text-(--org-text-muted) transition hover:bg-white/4 hover:text-white"
          >
            <Settings2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
