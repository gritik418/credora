import { z } from "zod";
import { EmploymentType } from "../onboarding.interface";

const dateSchema = z.preprocess(
  (value) => {
    if (value === "" || value === undefined || value === null) {
      return undefined;
    }

    if (value instanceof Date) {
      return value;
    }

    return new Date(value as string);
  },
  z.date({
    message: "End date is required when you are not currently working.",
  }),
);

const ExperienceSchema = z
  .object({
    company: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters.")
      .max(200, "Company name must be at most 200 characters."),

    position: z
      .string()
      .trim()
      .min(2, "Position must be at least 2 characters.")
      .max(150, "Position must be at most 150 characters."),

    employmentType: z.enum(EmploymentType).default(EmploymentType.FULL_TIME),

    startDate: dateSchema,

    endDate: dateSchema.optional(),

    isCurrentlyWorking: z.boolean().default(false),

    location: z
      .string()
      .trim()
      .max(200, "Location must be at most 200 characters.")
      .optional(),

    description: z
      .string()
      .trim()
      .max(2000, "Description must be at most 2000 characters.")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.isCurrentlyWorking && !data.endDate) {
        return false;
      }

      return true;
    },
    {
      message: "End date is required when you are not currently working.",
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      if (!data.endDate) {
        return true;
      }

      return data.endDate >= data.startDate;
    },
    {
      message: "End date must be after the start date.",
      path: ["endDate"],
    },
  );

const AddExperienceInfoSchema = z.object({
  experiences: z
    .array(ExperienceSchema)
    .min(1, "Please add at least one experience record.")
    .max(20, "Maximum 20 experience records allowed."),
});

export { ExperienceSchema };

export default AddExperienceInfoSchema;
