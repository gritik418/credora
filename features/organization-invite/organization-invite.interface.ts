import SendInviteDto from "./dto/send-invite.dto";

export interface GetOrganizationMemberInvitesResponseDto {
  success: boolean;
  message: string;
  data: {
    invites: any[];
  };
}

export interface SendOrganizationInviteResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<SendInviteDto>;
  data?: { inviteId: string };
}
