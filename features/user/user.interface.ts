import { OrganizationInviteStatus } from "../organization-invite/organization-invite.interface";
import {
  Organization,
  OrganizationMemberRole,
} from "../organization/organization.interface";
import { Workspace } from "../workspace/workspace.interface";

export interface GetSelectedOrganizationResponseDto {
  success: boolean;
  message: string;
  data?: {
    organization: Organization;
  };
}

export interface GetSelectedWorkspaceResponseDto {
  success: boolean;
  message: string;
  data?: {
    workspace: Workspace;
  };
}

export interface GetReceivedOrganizationInvitesResponseDto {
  success: boolean;
  message: string;
  data?: {
    invites: ReceivedOrganizationInvite[];
  };
}

export interface ReceivedOrganizationInvite {
  id: string;
  email: string;
  department?: string;
  designation?: string;
  acceptedAt?: string;
  createdAt: string;
  expiresAt: string;
  invitedById: string;
  organizationId: string;
  role: OrganizationMemberRole;
  status: OrganizationInviteStatus;

  organization: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    website: string | null;
    slug: string;
    supportEmail: string;
    description: string | null;
    logo: string | null;
  };
  invitedBy: {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string | null;
  };
}
