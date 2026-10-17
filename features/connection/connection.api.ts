import baseApi from "@/store/api/base-api";
import {
  GetSuggestedPeopleParams,
  GetSuggestedPeopleResponseDto,
} from "./connection.interface";

const connectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuggestedPeople: builder.query<
      GetSuggestedPeopleResponseDto,
      GetSuggestedPeopleParams
    >({
      query: (params) => ({
        url: "/connections/discover",
        params,
      }),
    }),
  }),
});

export const { useGetSuggestedPeopleQuery } = connectionApi;
