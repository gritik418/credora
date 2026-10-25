import { createSlice } from "@reduxjs/toolkit";
import postApi from "./post.api";

interface PostState {
  publicPosts: any[];
}

const initialState: PostState = {
  publicPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        postApi.endpoints.getPublicPosts.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload.data.posts) {
            state.publicPosts = action.payload.data.posts;
          } else {
            state.publicPosts = [];
          }
        },
      )
      .addMatcher(postApi.endpoints.getPublicPosts.matchRejected, (state) => {
        state.publicPosts = [];
      });
  },
});

export default postSlice;
