import baseApi from "@/store/api/base-api";
import {
  AddProjectMembersRequestDto,
  AddProjectMembersResponseDto,
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
  }),
});

export const { useAddProjectMembersMutation } = projectMemberApi;

export default projectMemberApi;
