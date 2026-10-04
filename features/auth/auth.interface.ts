import LoginDto from "./dto/login.dto";
import RegisterDto from "./dto/register.dto";
import ResendVerificationEmailDto from "./dto/resend-verification-email.dto";
import VerifyEmailDto from "./dto/verify-email.dto";

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

export interface LoginResponseDto {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      avatar: string;
      name: string;
      email: string;
      username: string;
      role: UserRole;
    };
  };
  errors?: Partial<LoginDto>;
}

export interface VerifyEmailResponseDto {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      avatar: string;
      name: string;
      email: string;
      username: string;
      role: UserRole;
    };
  };
  errors?: Partial<VerifyEmailDto>;
}

export interface ResendVerificationEmailResponseDto {
  success: boolean;
  message: string;
  data?: { userId: string; userEmail: string };
  errors?: Partial<ResendVerificationEmailDto>;
}

export interface GetMeResponseDto {
  success: boolean;
  message: string;
  data?: { user: ICurrentUser };
}

export interface ICurrentUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email: string;
  role: UserRole;
  lastLoginAt: string;
  isActive: boolean;
}
