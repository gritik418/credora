export interface GetSkillsSuggestionRequestDto {
  limit: number;
  searchQuery?: string;
}

export interface GetSkillsSuggestionResponseDto {
  success: boolean;
  message: string;
  data: {
    skills: Skill[];
  };
}

export interface GetPopularSkillsResponseDto {
  success: boolean;
  message: string;
  data: {
    skills: Skill[];
  };
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
}
