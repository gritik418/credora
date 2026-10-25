import baseApi from "@/store/api/base-api";
import { GetNotificationResponseDto } from "./notification.interface";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<GetNotificationResponseDto, void>({
      query: () => "/notifications",
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;

export default notificationApi;
