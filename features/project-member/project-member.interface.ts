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
