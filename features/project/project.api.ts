import baseApi from "@/store/api/base-api";
import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
  GetAvailableTaskAssigneesRequestDto,
  GetAvailableTaskAssigneesResponseDto,
  GetProjectBySlugRequestDto,
  GetProjectBySlugResponseDto,
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
    getProjectBySlug: build.query<
      GetProjectBySlugResponseDto,
      GetProjectBySlugRequestDto
    >({
      query: ({ workspaceId, projectSlug }) => ({
        url: `/workspaces/${workspaceId}/projects/${projectSlug}`,
        method: "GET",
      }),
    }),
    getTaskAssignees: build.query<
      GetAvailableTaskAssigneesResponseDto,
      GetAvailableTaskAssigneesRequestDto
    >({
      query: ({ workspaceId, projectId }) => ({
        url: `workspaces/${workspaceId}/projects/${projectId}/all-assignees`,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectBySlugQuery,
  useGetTaskAssigneesQuery,
} = projectApi;

export default projectApi;
