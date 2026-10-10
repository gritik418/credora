import baseApi from "@/store/api/base-api";
import { GetOrganizationMembersResponseDto } from "./organization-member.interface";

const organizationMemberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizationMembers: build.query<
      GetOrganizationMembersResponseDto,
      {
        orgId: string;
      }
    >({
      query: ({ orgId }) => ({
        url: `/organizations/${orgId}/members`,
      }),
    }),
  }),
});

export const { useGetOrganizationMembersQuery } = organizationMemberApi;

export default organizationMemberApi;
