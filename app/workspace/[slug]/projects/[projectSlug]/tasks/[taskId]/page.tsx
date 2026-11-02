"use client";
import TaskInfoContent from "@/components/task-info/TaskInfoContent";
import { ProjectMemberRole } from "@/features/project/project.interface";
import {
  TaskInfo,
  TaskPriority,
  TaskStatus,
} from "@/features/task/task.interface";
import React from "react";

const TaskInfoScreen = () => {
  const dummyTaskInfo: TaskInfo = {
    id: "task_01",
    title: "Implement organization member management",
    description:
      "Build the organization member management module with the following features:\n\n- Display all organization members\n- Implement search and filtering\n- Add role-based access control\n- Support member removal and role updates\n- Ensure responsive UI across devices\n\nFollow the existing design system and maintain consistent UI patterns.",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,

    startDate: new Date("2026-10-28T09:00:00.000Z"),
    dueDate: new Date("2026-11-05T18:00:00.000Z"),
    completedAt: undefined,

    projectId: "project_01",
    organizationId: "org_01",

    createdAt: new Date("2026-10-27T10:30:00.000Z"),
    updatedAt: new Date("2026-11-01T14:45:00.000Z"),

    assignees: [
      {
        id: "assignee_01",
        userId: "user_01",
        role: ProjectMemberRole.ADMIN,
        projectId: "project_01",
        joinedAt: new Date("2026-09-15T10:00:00.000Z"),
        createdAt: new Date("2026-10-28T09:15:00.000Z"),
        updatedAt: new Date("2026-10-28T09:15:00.000Z"),
        user: {
          id: "user_01",
          name: "Ritik Gupta",
          username: "ritikgupta",
          email: "ritik@example.com",
          avatar: null,
        },
      },
      {
        id: "assignee_02",
        userId: "user_02",
        role: ProjectMemberRole.MEMBER,
        projectId: "project_01",
        joinedAt: new Date("2026-09-20T10:00:00.000Z"),
        createdAt: new Date("2026-10-28T09:20:00.000Z"),
        updatedAt: new Date("2026-10-28T09:20:00.000Z"),
        user: {
          id: "user_02",
          name: "Aarav Sharma",
          username: "aaravsharma",
          email: "aarav@example.com",
          avatar: null,
        },
      },
    ],

    reviewRecipients: [
      {
        id: "reviewer_01",
        taskId: "task_01",
        memberId: "user_03",
        isDefault: true,
        createdAt: new Date("2026-10-28T09:30:00.000Z"),
        member: {
          id: "user_03",
          name: "Priya Verma",
          username: "priyaverma",
          email: "priya@example.com",
          avatar: null,
        },
      },
      {
        id: "reviewer_02",
        taskId: "task_01",
        memberId: "user_04",
        isDefault: false,
        createdAt: new Date("2026-10-28T09:35:00.000Z"),
        member: {
          id: "user_04",
          name: "Karan Mehta",
          username: "karanmehta",
          email: "karan@example.com",
          avatar: null,
        },
      },
    ],
  };

  return (
    <TaskInfoContent
      task={dummyTaskInfo}
      onClose={() => {}}
      onEdit={() => {}}
    />
  );
};

export default TaskInfoScreen;
