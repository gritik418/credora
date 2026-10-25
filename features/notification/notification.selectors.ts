import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectNotifications = createSelector(
  (state: RootState) => state.notification,
  (notification) => notification.notifications,
);
