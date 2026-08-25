import RegisterDto from "./dto/register.dto";

export enum UserRole {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  RECRUITER = "RECRUITER",
}

export interface RegisterResponseDto {
  success: boolean;
  message: string;
  userId?: string;
  errors?: Partial<RegisterDto>;
}
