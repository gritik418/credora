import RegisterDto from "./dto/register.dto";
import ResendVerificationEmailDto from "./dto/resend-verification-email.dto";

export enum UserRole {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export interface RegisterResponseDto {
  success: boolean;
  message: string;
  data?: { userId: string; userEmail: string };
  errors?: Partial<RegisterDto>;
}

export interface ResendVerificationEmailResponseDto {
  success: boolean;
  message: string;
  data?: { userId: string; userEmail: string };
  errors?: Partial<ResendVerificationEmailDto>;
}
