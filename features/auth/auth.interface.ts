import RegisterDto from "./dto/register.dto";

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
