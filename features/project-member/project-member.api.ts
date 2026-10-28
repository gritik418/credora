import baseApi from "@/store/api/base-api";
import {
  AddProjectMembersRequestDto,
  AddProjectMembersResponseDto,
  GetProjectMembersResponseDto,
} from "./project-member.interface";

const projectMemberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProjectMembers: build.mutation<
      AddProjectMembersResponseDto,
      AddProjectMembersRequestDto
    >({
      query: ({ projectId, data }) => ({
        url: `/projects/${projectId}/members`,
        method: "POST",
        body: data,
      }),
    }),
    getProjectMembers: build.query<
      GetProjectMembersResponseDto,
      { projectId: string }
    >({
      query: ({ projectId }) => ({ url: `/projects/${projectId}/members` }),
    }),
  }),
});

export const { useAddProjectMembersMutation, useGetProjectMembersQuery } =
  projectMemberApi;

export default projectMemberApi;
