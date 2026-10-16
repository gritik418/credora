import AddWorkspaceMembersDto from "./dto/add-workspace-members.dto";

export interface GetWorkspaceMembersRequestDto {
  workspaceId: string;
}

export interface GetWorkspaceMembersResponseDto {
  success: boolean;
  message: string;
  data?: {
    members: WorkspaceMember[];
  };
}

export enum WorkspaceMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceMemberRole;

  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isActive: boolean;
    lastLoginAt: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface AddWorkspaceMembersRequestDto {
  workspaceId: string;
  data: AddWorkspaceMembersDto;
}

export interface AddWorkspaceMembersResponseDto {
  success: boolean;
  message: string;
  errors?: {
    members?: string;
  };
  data?: {
    addedCount: number;
  };
}
