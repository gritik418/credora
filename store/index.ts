import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/base-api";
import authSlice from "@/features/auth/auth.slice";
import organizationSlice from "@/features/organization/organization.slice";
import organizationMemberSlice from "@/features/organization-member/organization-member.slice";
import organizationInviteSlice from "@/features/organization-invite/organization-invite.slice";
import workspaceSlice from "@/features/workspace/workspace.slice";
import projectSlice from "@/features/project/project.slice";
import workspaceMemberSlice from "@/features/workspace-member/workspace-member.slice";
import postSlice from "@/features/post/post.slice";
import notificationSlice from "@/features/notification/notification.slice";
import connectionSlice from "@/features/connection/connection.slice";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [organizationSlice.reducerPath]: organizationSlice.reducer,
    [organizationMemberSlice.reducerPath]: organizationMemberSlice.reducer,
    [organizationInviteSlice.reducerPath]: organizationInviteSlice.reducer,
    [workspaceSlice.reducerPath]: workspaceSlice.reducer,
    [projectSlice.reducerPath]: projectSlice.reducer,
    [workspaceMemberSlice.reducerPath]: workspaceMemberSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [connectionSlice.reducerPath]: connectionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
