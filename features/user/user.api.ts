import baseApi from "@/store/api/base-api";
import {
  GetSelectedOrganizationResponseDto,
  GetSelectedWorkspaceResponseDto,
} from "./user.interface";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSelectedOrganization: build.query<
      GetSelectedOrganizationResponseDto,
      void
    >({
      query: () => ({
        url: "/users/me/selected-organization",
        method: "GET",
      }),
      providesTags: ["SwitchOrg"],
    }),
    getSelectedWorkspace: build.query<GetSelectedWorkspaceResponseDto, void>({
      query: () => ({
        url: "/users/me/selected-workspace",
        method: "GET",
      }),
      providesTags: ["SwitchWorkspace"],
    }),
  }),
});

export const { useGetSelectedOrganizationQuery, useGetSelectedWorkspaceQuery } =
  userApi;

export default userApi;
