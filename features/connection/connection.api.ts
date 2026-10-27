import baseApi from "@/store/api/base-api";
import {
  GetSuggestedPeopleParams,
  GetConnectionsResponseDto,
  GetSuggestedPeopleResponseDto,
} from "./connection.interface";

const connectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConnections: builder.query<GetConnectionsResponseDto, void>({
      query: () => ({ url: "/connections" }),
      providesTags: ["ConnectionRequestAccept"],
    }),
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

export const { useGetConnectionsQuery, useGetSuggestedPeopleQuery } =
  connectionApi;

export default connectionApi;
