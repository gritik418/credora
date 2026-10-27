import { OrganizationMemberRole } from "../organization/organization.interface";
import SendInviteDto from "./dto/send-invite.dto";

export interface GetOrganizationMemberInvitesResponseDto {
  success: boolean;
  message: string;
  data: {
    invites: OrganizationInvite[];
  };
}

export interface SendOrganizationInviteResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<SendInviteDto>;
  data?: { inviteId: string };
}

export interface AcceptOrgInviteRequestDto {
  inviteId: string;
}

export interface DeclineOrgInviteRequestDto {
  inviteId: string;
}

export interface BaseOrgInviteResponseDto {
  success: boolean;
  message: string;
}

export interface OrganizationInvite {
  id: string;
  email: string;
  invitedBy: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isActive: boolean;
  };
  role: OrganizationMemberRole;
  status: OrganizationInviteStatus;
  department?: string;
  designation?: string;

  createdAt: string;
  expiresAt: string;
}

export enum OrganizationInviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}
