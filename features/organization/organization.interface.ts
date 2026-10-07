import CreateOrganizationDto from "./dto/create-organization.dto";

export interface CreateOrganizationResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<CreateOrganizationDto>;
  data?: {
    organizationId: string;
  };
}

export interface GetOrganizationsResponseDto {
  success: boolean;
  message: string;
  data?: {
    organizations: Organization[];
  };
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  supportEmail: string;
  description?: string;
  website?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  role: OrganizationMemberRole;
  membershipId: string;
  joinedAt: string;
}

export enum OrganizationMemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  RECRUITER = "RECRUITER",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER",
}
