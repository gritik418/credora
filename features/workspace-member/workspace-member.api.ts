import baseApi from "@/store/api/base-api";
import {
  GetWorkspaceMembersRequestDto,
  GetWorkspaceMembersResponseDto,
} from "./workspace-member.interface";

const workspaceMemberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkspaceMembers: build.query<
      GetWorkspaceMembersResponseDto,
      GetWorkspaceMembersRequestDto
    >({
      query: ({ workspaceId }) => ({
        url: `/workspaces/${workspaceId}/members`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetWorkspaceMembersQuery } = workspaceMemberApi;

export default workspaceMemberApi;
