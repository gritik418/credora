import { OnboardingStep } from "../auth/auth.interface";
import AddProfessionalInfoDto from "./dto/add-professional-info.dto";
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
