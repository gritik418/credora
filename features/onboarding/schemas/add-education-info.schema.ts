import { z } from "zod";

const EducationSchema = z
  .object({
    institution: z
      .string()
      .trim()
      .min(2, "Institution name must be at least 2 characters.")
      .max(200, "Institution name must be at most 200 characters."),

    degree: z
      .string()
      .trim()
      .max(150, "Degree name must be at most 150 characters.")
      .optional(),

    fieldOfStudy: z
      .string()
      .trim()
      .max(150, "Field of study must be at most 150 characters.")
      .optional(),

    startDate: z.coerce.date({
      message: "Invalid start date.",
    }),

    endDate: z.coerce.date().optional(),

    grade: z
      .string()
      .trim()
      .max(50, "Grade must be at most 50 characters.")
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, "Description must be at most 1000 characters.")
      .optional(),

    isCurrentlyStudying: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.isCurrentlyStudying && !data.endDate) {
        return false;
      }

      return true;
    },
    {
      message: "End date is required when you are not currently studying.",
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      if (!data.endDate) return true;

      return data.endDate >= data.startDate;
    },
    {
      message: "End date must be after the start date.",
      path: ["endDate"],
    },
  );

const AddEducationInfoSchema = z.object({
  educations: z
    .array(EducationSchema)
    .min(1, "Please add at least one education record.")
    .max(10, "Maximum 10 education records allowed."),
});

export default AddEducationInfoSchema;
