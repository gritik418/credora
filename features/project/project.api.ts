import baseApi from "@/store/api/base-api";
import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
  GetProjectsRequestDto,
  GetProjectsResponseDto,
} from "./project.interface";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<
      CreateProjectResponseDto,
      CreateProjectRequestDto
    >({
      query: ({ workspaceId, data }) => ({
        url: `/workspaces/${workspaceId}/projects`,
        method: "POST",
        body: data,
      }),
    }),
    getProjects: build.query<GetProjectsResponseDto, GetProjectsRequestDto>({
      query: ({ workspaceId }) => ({
        url: `/workspaces/${workspaceId}/projects`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;

export default projectApi;
