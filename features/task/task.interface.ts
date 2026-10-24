import { ProjectMemberRole } from "../project/project.interface";

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
