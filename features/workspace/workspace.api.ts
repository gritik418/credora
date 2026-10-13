import baseApi from "@/store/api/base-api";
import {
  CreateWorkspaceResponseDto,
  GetWorkspaceBySlugRequestDto,
  GetWorkspaceBySlugResponseDto,
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
      providesTags: ["SwitchOrg"],
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
  }),
});

export const {
  useGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceBySlugQuery,
} = workspaceApi;

export default workspaceApi;
