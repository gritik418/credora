import z from "zod";
import AddEducationInfoSchema, {
  EducationSchema,
} from "../../onboarding/schemas/add-education-info.schema";

type AddEducationInfoDto = z.infer<typeof AddEducationInfoSchema>;

export type EducationDto = z.infer<typeof EducationSchema>;

export default AddEducationInfoDto;
