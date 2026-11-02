import {
  PaginatedResponse,
  PaginationQueryDto,
} from "@/common/interfaces/pagination.interface";
import { ProjectMemberRole } from "../project/project.interface";
import CreateTaskDto from "./dto/create-task.dto";
import TaskQueryDto from "./dto/task-query.dto";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  startDate?: Date;
  dueDate?: Date;
  completedAt?: Date;

  projectId?: string;
  organizationId: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface TaskInfo extends Task {
  assignees: TaskAssignee[];
  reviewRecipients: TaskReviewRecipient[];
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  ESCALATED = "ESCALATED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface TaskReviewRecipient {
  id: string;

  taskId: string;

  memberId: string;
  member: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string | null;
  };

  isDefault: boolean;

  createdAt: Date;
}

export interface TaskAssignee {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  role: ProjectMemberRole;
  projectId: string;
  joinedAt: Date;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string | null;
  };
}

export interface CreateTaskResponseDto {
  success: boolean;
  message: string;
  errors?: Record<keyof CreateTaskDto, string>;
}

export interface CreateTaskRequestDto {
  projectId: string;
  data: CreateTaskDto;
}

export interface GetTasksResponseDto {
  success: boolean;
  message: string;
  data?: PaginatedResponse<Task[], "tasks">;
}

export interface GetTasksRequestDto {
  projectId: string;
  pagination: PaginationQueryDto;
  query: TaskQueryDto;
}
