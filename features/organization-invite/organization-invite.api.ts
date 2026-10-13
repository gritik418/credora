import baseApi from "@/store/api/base-api";
import SendInviteDto from "./dto/send-invite.dto";
import {
  GetOrganizationMemberInvitesResponseDto,
  SendOrganizationInviteResponseDto,
} from "./organization-invite.interface";

const organizationInviteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendOrganizationInvite: build.mutation<
      SendOrganizationInviteResponseDto,
      {
        orgId: string;
        data: SendInviteDto;
      }
    >({
      query: ({ orgId, data }) => ({
        url: `/organizations/${orgId}/invites`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OrgInvite"],
    }),

    getOrganizationInvites: build.query<
      GetOrganizationMemberInvitesResponseDto,
      { orgId: string }
    >({
      query: ({ orgId }) => ({
        url: `/organizations/${orgId}/invites`,
        method: "GET",
      }),
      providesTags: ["OrgInvite", "SwitchOrg"],
    }),
  }),
});

export const {
  useGetOrganizationInvitesQuery,
  useSendOrganizationInviteMutation,
} = organizationInviteApi;

export default organizationInviteApi;
