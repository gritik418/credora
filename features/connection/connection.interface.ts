import { Skill } from "../skills/skills.interface";

export interface SuggestedPeople {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  profile: {
    headline: string | null;
    industry: string | null;
    city: string | null;
    profession: string | null;
    skills: Skill[] | null;
  };
  is2ndDegree: boolean;
  is3rdDegree: boolean;
  matchReasons: string[];
}

export interface GetSuggestedPeopleParams {
  page: number;
  limit: number;
  search?: string;
}

export interface GetSuggestedPeopleResponseDto {
  success: boolean;
  message: string;
  data: {
    suggestedPeople: SuggestedPeople[];
  };
}
