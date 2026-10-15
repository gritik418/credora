import baseApi from "@/store/api/base-api";
import {
  CreateProjectRequestDto,
  CreateProjectResponseDto,
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
  }),
});

export const { useCreateProjectMutation } = projectApi;

export default projectApi;
