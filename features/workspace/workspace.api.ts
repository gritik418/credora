import baseApi from "@/store/api/base-api";
import {
  CreateWorkspaceResponseDto,
  GetWorkspaceBySlugRequestDto,
  GetWorkspaceBySlugResponseDto,
  GetWorkspacesResponseDto,
  SwitchWorkspaceRequestDto,
  SwitchWorkspaceResponseDto,
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
      providesTags: ["SwitchOrg", "Organization"],
    }),
    getWorkspaceBySlug: build.query<
      GetWorkspaceBySlugResponseDto,
      GetWorkspaceBySlugRequestDto
    >({
      query: ({ organizationId, workspaceSlug }) => ({
        url: `/organizations/${organizationId}/workspaces/${workspaceSlug}`,
        method: "GET",
      }),
    }),
    switchWorkspace: build.mutation<
      SwitchWorkspaceResponseDto,
      SwitchWorkspaceRequestDto
    >({
      query: ({ organizationId, workspaceId }) => ({
        url: `/organizations/${organizationId}/workspaces/${workspaceId}/switch`,
        method: "PATCH",
      }),
      invalidatesTags: ["SwitchWorkspace"],
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceBySlugQuery,
  useSwitchWorkspaceMutation,
} = workspaceApi;

export default workspaceApi;
