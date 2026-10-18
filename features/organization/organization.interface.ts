import { ProjectStatus } from "../project/project.interface";
import { WorkspaceStatus } from "../workspace/workspace.interface";
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

export interface GetOrganizationBySlugResponseDto {
  success: boolean;
  message: string;
  data?: {
    organization: Organization;
  };
}

export interface SwitchOrganizationResponseDto {
  success: boolean;
  message: string;
  data?: {
    organization: Organization;
  };
}

export interface SwitchOrganizationRequestDto {
  organizationId: string;
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

export interface GetOrganizationProjectsRequestDto {
  organizationId: string;
}

export interface GetOrganizationProjectsResponseDto {
  success: boolean;
  message: string;
  data?: {
    projects: ProjectWithWorkspace[];
  };
}

export interface ProjectWithWorkspace {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description?: string;
  status: ProjectStatus;

  startDate?: string;
  dueDate?: string;

  createdAt: string;
  updatedAt: string;

  workspace: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo: string;
    status: WorkspaceStatus;
    createdAt: string;
    updatedAt: string;
  };
}
