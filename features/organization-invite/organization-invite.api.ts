import baseApi from "@/store/api/base-api";
import { GetOrganizationMemberInvitesResponseDto } from "./organization-invite.interface";

const organizationInviteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizationInvites: build.query<
      GetOrganizationMemberInvitesResponseDto,
      { orgId: string }
    >({
      query: ({ orgId }) => ({
        url: `/organizations/${orgId}/invites`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetOrganizationInvitesQuery } = organizationInviteApi;

export default organizationInviteApi;
