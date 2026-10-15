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

export interface Project {}
