import { z } from "zod";
import AddExperienceInfoSchema, {
  ExperienceSchema,
} from "../schemas/add-experience-info.schema";

type AddExperienceInfoDto = z.infer<typeof AddExperienceInfoSchema>;

export type ExperienceDto = z.infer<typeof ExperienceSchema>;

export default AddExperienceInfoDto;
