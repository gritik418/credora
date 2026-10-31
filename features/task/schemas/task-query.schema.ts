import z from "zod";
import { TaskPriority, TaskStatus } from "../task.interface";

const TaskQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
  sortBy: z
    .enum(["dueDate", "startDate", "createdAt", "completedAt", "updatedAt"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export default TaskQuerySchema;
