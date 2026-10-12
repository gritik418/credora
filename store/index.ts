import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/base-api";
import authSlice from "@/features/auth/auth.slice";
import organizationSlice from "@/features/organization/organization.slice";
import organizationMemberSlice from "@/features/organization-member/organization-member.slice";
import organizationInviteSlice from "@/features/organization-invite/organization-invite.slice";
import workspaceSlice from "@/features/workspace/workspace.slice";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [organizationSlice.reducerPath]: organizationSlice.reducer,
    [organizationMemberSlice.reducerPath]: organizationMemberSlice.reducer,
    [organizationInviteSlice.reducerPath]: organizationInviteSlice.reducer,
    [workspaceSlice.reducerPath]: workspaceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
