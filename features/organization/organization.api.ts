import baseApi from "@/store/api/base-api";
import CreateOrganizationDto from "./dto/create-organization.dto";
import {
  CreateOrganizationResponseDto,
  GetOrganizationBySlugResponseDto,
  GetOrganizationProjectsRequestDto,
  GetOrganizationProjectsResponseDto,
  GetOrganizationsResponseDto,
  SwitchOrganizationRequestDto,
  SwitchOrganizationResponseDto,
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
      invalidatesTags: ["Organization", "SwitchOrg"],
    }),
    getOrganizations: build.query<GetOrganizationsResponseDto, void>({
      query: () => ({
        url: "/organizations",
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),
    getOrganizationBySlug: build.query<
      GetOrganizationBySlugResponseDto,
      string
    >({
      query: (slug) => ({
        url: `/organizations/${slug}`,
        method: "GET",
      }),
      providesTags: ["SwitchOrg", "AcceptOrgInvite"],
    }),
    switchOrganization: build.mutation<
      SwitchOrganizationResponseDto,
      SwitchOrganizationRequestDto
    >({
      query: ({ organizationId }) => ({
        url: `/organizations/${organizationId}/switch`,
        method: "PATCH",
      }),
      invalidatesTags: ["SwitchOrg"],
    }),
    getOrganizationProjects: build.query<
      GetOrganizationProjectsResponseDto,
      GetOrganizationProjectsRequestDto
    >({
      query: ({ organizationId }) => ({
        url: `/organizations/${organizationId}/projects`,
        method: "GET",
      }),
      providesTags: ["SwitchOrg"],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useGetOrganizationBySlugQuery,
  useSwitchOrganizationMutation,
  useGetOrganizationProjectsQuery,
} = organizationApi;

export default organizationApi;
