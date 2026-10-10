"use client";

import Navbar from "@/components/navbar/Navbar";
import PostsMain from "@/components/posts/feed/PostsMain";
import PostsRightSidebar from "@/components/posts/feed/PostsRightSidebar";
import PostsSidebar from "@/components/posts/feed/PostsSidebar";

const PostsPage = () => {
  return (
    <div className="h-screen bg-post-bg text-post-text">
      <Navbar />

      <div className="mx-auto h-[calc(100vh-68px)] flex max-w-375">
        <PostsSidebar />

        <main className="min-w-0 flex-1 overflow-y-scroll">
          <PostsMain />
        </main>

        <PostsRightSidebar />
      </div>
    </div>
  );
};

export default PostsPage;
