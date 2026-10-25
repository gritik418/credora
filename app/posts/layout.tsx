import PostsProvider from "@/components/posts/PostsProvider";
import React from "react";

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PostsProvider>{children}</PostsProvider>;
}
