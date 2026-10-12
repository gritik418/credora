import CreateWorkspaceDto from "./dto/create-workspace.dto";

export interface Workspace {
  id: string;

  organizationId: string;

  name: string;
  slug: string;
  description?: string;
  logo?: string;

  isActive: boolean;

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
