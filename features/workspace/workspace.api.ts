import baseApi from "@/store/api/base-api";
import { CreateWorkspaceResponseDto } from "./workspace.interface";
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
  }),
});

export const { useCreateWorkspaceMutation } = workspaceApi;

export default workspaceApi;
