import baseApi from "@/store/api/base-api";
import { GetPublicPostsResponseDto } from "./post.interface";

const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicPosts: build.query<GetPublicPostsResponseDto, void>({
      query: () => ({
        url: `/posts`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPublicPostsQuery } = postApi;

export default postApi;
