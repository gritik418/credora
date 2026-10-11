export interface GetOrganizationMemberInvitesResponseDto {
  success: boolean;
  message: string;
  data: {
    invites: any[];
  };
}
