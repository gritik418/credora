import { RootState } from "@/store";

export const selectPublicPosts = (state: RootState) => state.posts.publicPosts;
