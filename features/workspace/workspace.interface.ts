import CreateWorkspaceDto from "./dto/create-workspace.dto";

export interface Workspace {
  id: string;

  organizationId: string;

  name: string;
  slug: string;
  description?: string;
  logo?: string;

  status: WorkspaceStatus;

  createdById: string;
  updatedAt: string;
}

export interface CreateWorkspaceResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<CreateWorkspaceDto>;
  data?: {
    workspace: Workspace;
  };
}

export interface GetWorkspacesResponseDto {
  success: boolean;
  message: string;
  data?: {
    workspaces: Workspace[];
  };
}

export interface GetWorkspaceBySlugResponseDto {
  success: boolean;
  message: string;
  data?: {
    workspace: Workspace;
  };
}

export interface GetWorkspaceBySlugRequestDto {
  organizationId: string;
  workspaceSlug: string;
}

export interface SwitchWorkspaceRequestDto {
  organizationId: string;
  workspaceId: string;
}

export interface SwitchWorkspaceResponseDto {
  success: boolean;
  message: string;
  data?: {
    workspace: Workspace;
  };
}

export enum WorkspaceStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}
