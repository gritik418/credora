import baseApi from "@/store/api/base-api";
import SendInviteDto from "./dto/send-invite.dto";
import {
  AcceptOrgInviteRequestDto,
  BaseOrgInviteResponseDto,
  DeclineOrgInviteRequestDto,
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

    acceptOrgInvite: build.mutation<
      BaseOrgInviteResponseDto,
      AcceptOrgInviteRequestDto
    >({
      query: ({ inviteId, token }) => ({
        url: `/organization-invites/${inviteId}/${token}/accept`,
        method: "PATCH",
      }),
    }),

    declineOrgInvite: build.mutation<
      BaseOrgInviteResponseDto,
      DeclineOrgInviteRequestDto
    >({
      query: ({ inviteId, token }) => ({
        url: `/organization-invites/${inviteId}/${token}/decline`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useAcceptOrgInviteMutation,
  useDeclineOrgInviteMutation,
  useGetOrganizationInvitesQuery,
  useSendOrganizationInviteMutation,
} = organizationInviteApi;

export default organizationInviteApi;
