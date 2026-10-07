import baseApi from "@/store/api/base-api";
import CreateOrganizationDto from "./dto/create-organization.dto";
import { CreateOrganizationResponseDto } from "./organization.interface";

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
  }),
});

export const { useCreateOrganizationMutation } = organizationApi;

export default organizationApi;
