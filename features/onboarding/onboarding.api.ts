import baseApi from "@/store/api/base-api";
import {
  AddProfessionalOnboardingInfoResponseDto,
  UpdateBasicOnboardingInfoResponseDto,
} from "./onboarding.interface";
import AddProfessionalInfoDto from "./dto/add-professional-info.dto";

const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateBasicInfo: builder.mutation<
      UpdateBasicOnboardingInfoResponseDto,
      FormData
    >({
      query: (data) => ({
        url: "/onboarding/basic-info",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
    addProfessionalInfo: builder.mutation<
      AddProfessionalOnboardingInfoResponseDto,
      AddProfessionalInfoDto
    >({
      query: (data) => ({
        url: "/onboarding/professional",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
  }),
});

export const { useUpdateBasicInfoMutation, useAddProfessionalInfoMutation } =
  onboardingApi;

export default onboardingApi;
