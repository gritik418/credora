import { ProjectMemberRole } from "../project/project.interface";
import AddProjectMembersDto from "./dto/add-project-members.dto";

export interface AddProjectMembersRequestDto {
  projectId: string;
  data: AddProjectMembersDto;
}

export interface AddProjectMembersResponseDto {
  success: boolean;
  message: string;
  data?: {
    addedCount: number;
  };
}

export interface GetProjectMembersResponseDto {
  success: boolean;
  message: string;
  data?: {
    members: ProjectMember[];
  };
}

export interface ProjectMember {
  id: string;
  userId: string;
  role: ProjectMemberRole;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;

  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    avatar: string | null;
    email: string;
  };
}
