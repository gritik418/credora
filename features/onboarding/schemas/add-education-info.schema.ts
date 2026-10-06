import { z } from "zod";

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
    message: "End date is required when you are not currently studying.",
  }),
);

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
      .min(1, "Degree is required.")
      .max(150, "Degree must be at most 150 characters."),

    fieldOfStudy: z
      .string()
      .trim()
      .max(150, "Field of study must be at most 150 characters.")
      .optional(),

    startDate: dateSchema,

    endDate: dateSchema.optional(),

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

export { EducationSchema };

export default AddEducationInfoSchema;
