"use client";

import CreatePost from "./CreatePost";
import FeedHeader from "./FeedHeader";
import PostCard from "./PostCard";

const PostsMain = () => {
  return (
    <section className="mx-auto w-full max-w-180 px-5 py-8">
      <FeedHeader />

      <CreatePost />

      <div className="mt-6 space-y-4">
        <PostCard />
        <PostCard />
      </div>
    </section>
  );
};

export default PostsMain;
