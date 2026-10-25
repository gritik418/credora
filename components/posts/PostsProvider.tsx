"use client";

import { useGetPublicPostsQuery } from "@/features/post/post.api";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const PostsProvider = ({ children }: Props) => {
  useGetPublicPostsQuery();

  return <div>{children}</div>;
};

export default PostsProvider;
