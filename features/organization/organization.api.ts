import baseApi from "@/store/api/base-api";
import CreateOrganizationDto from "./dto/create-organization.dto";
import {
  CreateOrganizationResponseDto,
  GetOrganizationBySlugResponseDto,
  GetOrganizationsResponseDto,
} from "./organization.interface";

const organizationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrganization: build.mutation<
      CreateOrganizationResponseDto,
      CreateOrganizationDto
    >({
      query: (data) => ({
        url: "/organizations",
        method: "POST",
        body: data,
      }),
    }),
    getOrganizations: build.query<GetOrganizationsResponseDto, void>({
      query: () => ({
        url: "/organizations",
        method: "GET",
      }),
    }),
    getOrganizationBySlug: build.query<
      GetOrganizationBySlugResponseDto,
      string
    >({
      query: (slug) => ({
        url: `/organizations/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useGetOrganizationBySlugQuery,
} = organizationApi;

export default organizationApi;
