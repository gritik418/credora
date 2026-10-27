import baseApi from "@/store/api/base-api";
import {
  GetReceivedOrganizationInvitesResponseDto,
  GetSelectedOrganizationResponseDto,
  GetSelectedWorkspaceResponseDto,
} from "./user.interface";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSelectedOrganization: build.query<
      GetSelectedOrganizationResponseDto,
      void
    >({
      query: () => ({
        url: "/users/me/selected-organization",
        method: "GET",
      }),
      providesTags: ["SwitchOrg", "AcceptOrgInvite"],
    }),
    getSelectedWorkspace: build.query<GetSelectedWorkspaceResponseDto, void>({
      query: () => ({
        url: "/users/me/selected-workspace",
        method: "GET",
      }),
      providesTags: ["SwitchWorkspace"],
    }),
    getReceivedOrganizationInvites: build.query<
      GetReceivedOrganizationInvitesResponseDto,
      void
    >({
      query: () => ({
        url: "/users/me/organization-invites",
        method: "GET",
      }),
      providesTags: ["AcceptOrgInvite", "DeclineOrgInvite"],
    }),
  }),
});

export const {
  useGetSelectedWorkspaceQuery,
  useGetSelectedOrganizationQuery,
  useGetReceivedOrganizationInvitesQuery,
} = userApi;

export default userApi;
