import { WorkspaceStatus } from "../workspace/workspace.interface";
import CreateProjectDto from "./dto/create-project.dto";

export interface CreateProjectRequestDto {
  workspaceId: string;
  data: CreateProjectDto;
}

export interface CreateProjectResponseDto {
  success: boolean;
  message: string;
  errors?: Partial<{
    name: string;
    slug: string;
    startDate: string;
    dueDate: string;
    description?: string;
  }>;
  data?: {
    project: Project;
  };
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description?: string;

  status: ProjectStatus;

  startDate?: string;
  dueDate?: string;

  createdAt: string;
  updatedAt: string;
}

export enum ProjectStatus {
  PLANNING = "PLANNING",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ARCHIVED = "ARCHIVED",
}

export interface GetProjectsRequestDto {
  workspaceId: string;
}

export interface GetProjectsResponseDto {
  success: boolean;
  message: string;
  data?: { projects: ProjectWithWorkspaceAndMembers[] };
}

export interface ProjectWithWorkspace {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description?: string;
  status: ProjectStatus;

  startDate?: string;
  dueDate?: string;

  createdAt: string;
  updatedAt: string;

  workspace: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo: string;
    status: WorkspaceStatus;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProjectWithWorkspaceAndMembers {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description?: string;
  status: ProjectStatus;

  startDate?: string;
  dueDate?: string;

  createdAt: string;
  updatedAt: string;

  workspace: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo: string;
    status: WorkspaceStatus;
    createdAt: string;
    updatedAt: string;
  };
  members: ProjectMember[];
}

export interface ProjectMember {
  id: string;
  projectId: string;
  role: ProjectMemberRole;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
  userId: string;

  updatedAt: string;
  createdAt: string;
  joinedAt: string;
}

export enum ProjectMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
