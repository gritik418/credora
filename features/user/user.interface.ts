import { Organization } from "../organization/organization.interface";
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
