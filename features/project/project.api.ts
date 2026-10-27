import baseApi from "@/store/api/base-api";
import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
  GetAvailableTaskAssigneesRequestDto,
  GetAvailableTaskAssigneesResponseDto,
  GetAvailableTaskReviewersRequestDto,
  GetAvailableTaskReviewersResponseDto,
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
      invalidatesTags: ["Project"],
    }),
    getProjects: build.query<GetProjectsResponseDto, GetProjectsRequestDto>({
      query: ({ workspaceId }) => ({
        url: `/workspaces/${workspaceId}/projects`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    getProjectBySlug: build.query<
      GetProjectBySlugResponseDto,
      GetProjectBySlugRequestDto
    >({
      query: ({ workspaceId, projectSlug }) => ({
        url: `/workspaces/${workspaceId}/projects/${projectSlug}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    getTaskAssignees: build.query<
      GetAvailableTaskAssigneesResponseDto,
      GetAvailableTaskAssigneesRequestDto
    >({
      query: ({ workspaceId, projectId }) => ({
        url: `workspaces/${workspaceId}/projects/${projectId}/all-assignees`,
      }),
    }),
    getTaskReviewers: build.query<
      GetAvailableTaskReviewersResponseDto,
      GetAvailableTaskReviewersRequestDto
    >({
      query: ({ workspaceId, projectId }) => ({
        url: `workspaces/${workspaceId}/projects/${projectId}/reviewers`,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectBySlugQuery,
  useGetTaskAssigneesQuery,
  useGetTaskReviewersQuery,
} = projectApi;

export default projectApi;
