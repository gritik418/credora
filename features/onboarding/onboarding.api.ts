import baseApi from "@/store/api/base-api";
import {
  AddExperienceOnboardingInfoResponseDto,
  AddLocationOnboardingInfoResponseDto,
  AddProfessionalOnboardingInfoResponseDto,
  AddSkillsOnboardingInfoResponseDto,
  AddSummaryOnboardingInfoResponseDto,
  UpdateBasicOnboardingInfoResponseDto,
} from "./onboarding.interface";
import AddProfessionalInfoDto from "./dto/add-professional-info.dto";
import AddExperienceInfoDto from "./dto/add-experience-info.dto";
import AddSummaryDto from "./dto/add-summary.dto";
import AddLocationInfoDto from "./dto/add-location-info.dto";
import SaveSkillsDto from "../skills/dto/save-skills.dto";

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
    addExperienceInfo: builder.mutation<
      AddExperienceOnboardingInfoResponseDto,
      AddExperienceInfoDto
    >({
      query: (data) => ({
        url: "/onboarding/experience",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
    addSummary: builder.mutation<
      AddSummaryOnboardingInfoResponseDto,
      AddSummaryDto
    >({
      query: (data) => ({
        url: "/onboarding/summary",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
    addLocationInfo: builder.mutation<
      AddLocationOnboardingInfoResponseDto,
      AddLocationInfoDto
    >({
      query: (data) => ({
        url: "/onboarding/location",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
    addSkillsOnboardingInfo: builder.mutation<
      AddSkillsOnboardingInfoResponseDto,
      SaveSkillsDto
    >({
      query: (data) => ({
        url: "/onboarding/skills",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
  }),
});

export const {
  useAddSummaryMutation,
  useAddLocationInfoMutation,
  useUpdateBasicInfoMutation,
  useAddExperienceInfoMutation,
  useAddProfessionalInfoMutation,
  useAddSkillsOnboardingInfoMutation,
} = onboardingApi;

export default onboardingApi;
