import baseApi from "@/store/api/base-api";
import {
  CreateWorkspaceResponseDto,
  GetWorkspacesResponseDto,
} from "./workspace.interface";
import CreateWorkspaceDto from "./dto/create-workspace.dto";

const workspaceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createWorkspace: build.mutation<
      CreateWorkspaceResponseDto,
      {
        orgId: string;
        data: CreateWorkspaceDto;
      }
    >({
      query: ({ data, orgId }) => ({
        url: `/organizations/${orgId}/workspaces`,
        method: "POST",
        body: data,
      }),
    }),
    getWorkspaces: build.query<GetWorkspacesResponseDto, { orgId: string }>({
      query: ({ orgId }) => ({
        url: `/organizations/${orgId}/workspaces`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateWorkspaceMutation, useGetWorkspacesQuery } =
  workspaceApi;

export default workspaceApi;
