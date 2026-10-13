import { Organization } from "../organization/organization.interface";

export interface GetSelectedOrganizationResponseDto {
  success: boolean;
  message: string;
  data?: {
    organization: Organization;
  };
}
