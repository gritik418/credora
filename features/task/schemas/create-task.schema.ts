import { z } from "zod";
import { TaskPriority, TaskStatus } from "../task.interface";

const optionalDate = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.date().optional(),
);

const CreateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Task title is required.")
      .max(200, "Task title is too long."),

    description: z.string().optional(),

    status: z.enum(TaskStatus).default(TaskStatus.TODO),

    priority: z.enum(TaskPriority).default(TaskPriority.MEDIUM),

    startDate: z.preprocess(
      (value) =>
        value === "" || value === null || value === undefined
          ? new Date()
          : value,
      z.coerce.date(),
    ),

    dueDate: optionalDate,

    assignees: z
      .array(z.string().min(1, "Assignee ID is required"))
      .min(1, "At least one assignee is required."),

    reviewers: z
      .array(z.string().min(1, "Reviewer ID is required"))
      .optional()
      .default([]),

    labels: z.array(z.string()).optional().default([]),
  })
  .superRefine((values, context) => {
    if (values.dueDate && values.startDate > values.dueDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dueDate"],
        message: "Due date must be on or after the start date.",
      });
    }
  });

export default CreateTaskSchema;
