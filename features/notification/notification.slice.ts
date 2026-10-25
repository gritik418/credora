import { createSlice } from "@reduxjs/toolkit";
import { GetNotificationResponseDto } from "./notification.interface";
import notificationApi from "./notification.api";

interface NotificationState {
  notifications: any[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  reducerPath: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        notificationApi.endpoints.getNotifications.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload?.data?.notifications) {
            state.notifications = action.payload.data.notifications;
          } else {
            state.notifications = [];
          }
        },
      )
      .addMatcher(
        notificationApi.endpoints.getNotifications.matchRejected,
        (state) => {
          state.notifications = [];
        },
      );
  },
});

export default notificationSlice;
