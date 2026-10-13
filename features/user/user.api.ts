import baseApi from "@/store/api/base-api";
import { GetSelectedOrganizationResponseDto } from "./user.interface";

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
  }),
});

export const { useGetSelectedOrganizationQuery } = userApi;

export default userApi;
