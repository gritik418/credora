import { OnboardingStep } from "../auth/auth.interface";
import SaveSkillsDto from "../skills/dto/save-skills.dto";
import AddExperienceInfoDto from "./dto/add-experience-info.dto";
import AddLocationInfoDto from "./dto/add-location-info.dto";
import AddProfessionalInfoDto from "./dto/add-professional-info.dto";
import AddSummaryDto from "./dto/add-summary.dto";
import UpdateBasicInfoDto from "./dto/update-basic-info.dto";

export interface UpdateBasicOnboardingInfoResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<UpdateBasicInfoDto>;
  data?: {
    nextStep: OnboardingStep;
  };
}

export interface AddProfessionalOnboardingInfoResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<AddProfessionalInfoDto>;
  data?: {
    nextStep: OnboardingStep;
  };
}

export interface AddExperienceOnboardingInfoResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<AddExperienceInfoDto>;
  data?: {
    nextStep: OnboardingStep;
  };
}

export interface AddSummaryOnboardingInfoResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<AddSummaryDto>;
  data?: {
    nextStep: OnboardingStep;
  };
}

export interface AddLocationOnboardingInfoResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<AddLocationInfoDto>;
  data?: {
    nextStep: OnboardingStep;
  };
}

export interface AddSkillsOnboardingInfoResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<SaveSkillsDto>;
  data?: {
    nextStep: OnboardingStep;
  };
}

export enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  APPRENTICESHIP = "APPRENTICESHIP",
  OTHER = "OTHER",
}
