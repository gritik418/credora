import z from "zod";

const optionalUrl = (message: string) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.url({ message }).optional(),
  );

const CreateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Workspace name is required.")
    .min(3, "Workspace name must be at least 3 characters long.")
    .max(50, "Workspace name can be at most 50 characters long."),

  description: z
    .string()
    .trim()
    .max(255, "Description can be at most 255 characters long.")
    .optional(),

  slug: z
    .string()
    .trim()
    .min(1, "Workspace slug is required.")
    .min(3, "Workspace slug must be at least 3 characters long.")
    .max(50, "Workspace slug can be at most 50 characters long.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Invalid slug format. Use only lowercase letters, numbers, and single hyphens.",
    ),

  logo: optionalUrl("Logo must be a valid URL."),
});

export default CreateWorkspaceSchema;
