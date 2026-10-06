import { z } from "zod";

const AddSummarySchema = z.object({
  summary: z
    .string()
    .min(1, "Summary is required.")
    .max(1000, "Summary must be at most 1000 characters."),
});

export default AddSummarySchema;
