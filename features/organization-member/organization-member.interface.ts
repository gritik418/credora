import { OrganizationMemberRole } from "../organization/organization.interface";

export interface GetOrganizationMembersResponseDto {
  success: boolean;
  message: string;
  data: {
    members: OrganizationMember[];
  };
}

export interface OrganizationMember {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  organizationId: string;
  role: OrganizationMemberRole;
  joinedAt: Date;
  designation: string;
  department: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar: string | null;
    isActive: boolean;
  };
}
