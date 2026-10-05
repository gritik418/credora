import { OnboardingStep } from "../auth/auth.interface";
import UpdateBasicInfoDto from "./dto/update-basic-info.dto";

export interface UpdateBasicOnboardingInfoResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<UpdateBasicInfoDto>;
  data?: {
    nextStep: OnboardingStep;
  };
}
