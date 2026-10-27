import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
  }),

  endpoints: () => ({}),
  tagTypes: [
    "Auth",
    "Onboarding",
    "Organization",
    "OrgInvite",
    "SwitchOrg",
    "SwitchWorkspace",
    "Workspace",
    "Project",
    "ConnectionRequestSend",
    "ConnectionRequestAccept",
    "AcceptOrgInvite",
    "DeclineOrgInvite",
  ],
});

export default baseApi;
