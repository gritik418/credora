import baseApi from "@/store/api/base-api";
import {
  AddAvailabilityInfoResponseDto,
  AddEducationOnboardingInfoResponseDto,
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
import AddEducationInfoDto from "./dto/add-education-info.dto";
import AddAvailabilityInfoDto from "./dto/add-availability-info.dto";

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
    addEducationInfo: builder.mutation<
      AddEducationOnboardingInfoResponseDto,
      AddEducationInfoDto
    >({
      query: (data) => ({
        url: "/onboarding/education",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Onboarding"],
    }),
    addAvailabilityInfo: builder.mutation<
      AddAvailabilityInfoResponseDto,
      AddAvailabilityInfoDto
    >({
      query: (data) => ({
        url: "/onboarding/availability",
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
  useAddEducationInfoMutation,
  useAddExperienceInfoMutation,
  useAddProfessionalInfoMutation,
  useAddAvailabilityInfoMutation,
  useAddSkillsOnboardingInfoMutation,
} = onboardingApi;

export default onboardingApi;
