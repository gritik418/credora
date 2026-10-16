import baseApi from "@/store/api/base-api";
import {
  AddWorkspaceMembersRequestDto,
  AddWorkspaceMembersResponseDto,
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
    addWorkspaceMembers: build.mutation<
      AddWorkspaceMembersResponseDto,
      AddWorkspaceMembersRequestDto
    >({
      query: ({ workspaceId, data }) => ({
        url: `/workspaces/${workspaceId}/members`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetWorkspaceMembersQuery, useAddWorkspaceMembersMutation } =
  workspaceMemberApi;

export default workspaceMemberApi;
