import { Skill } from "../skills/skills.interface";

export type MatchReason =
  | "search"
  | "second-degree"
  | "third-degree"
  | "industry"
  | "profession"
  | "headline"
  | "skills"
  | "bio"
  | "city"
  | "institution"
  | "company";

export interface SuggestedPeople {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  isVerified: boolean;
  profile: {
    headline: string | null;
    industry: string | null;
    city: string | null;
    profession: string | null;
    skills: Skill[] | null;
    educations: { institution: string }[];
    experiences: { company: string }[];
  };
  is2ndDegree: boolean;
  is3rdDegree: boolean;
  matchReasons: MatchReason[];
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
