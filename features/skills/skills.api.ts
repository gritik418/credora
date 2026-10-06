import baseApi from "@/store/api/base-api";
import {
  GetPopularSkillsResponseDto,
  GetSkillsSuggestionRequestDto,
  GetSkillsSuggestionResponseDto,
} from "./skills.interface";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSkillSuggestions: build.query<
      GetSkillsSuggestionResponseDto,
      GetSkillsSuggestionRequestDto
    >({
      query: ({ limit = 10, searchQuery = "" }) => {
        const params: Record<string, string | number> = {};
        if (limit) {
          params.limit = limit;
        }
        if (searchQuery) {
          params.search = searchQuery;
        }
        return {
          url: "/skills/suggestions",
          method: "GET",
          params,
        };
      },
    }),
    getPopularSkills: build.query<GetPopularSkillsResponseDto, void>({
      query: () => ({
        url: "/skills/popular",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSkillSuggestionsQuery, useGetPopularSkillsQuery } =
  skillsApi;

export default skillsApi;
