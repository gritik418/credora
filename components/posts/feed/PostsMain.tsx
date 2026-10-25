"use client";

import { useAppSelector } from "@/store/hooks";
import CreatePost from "./CreatePost";
import FeedHeader from "./FeedHeader";
import PostCard from "./PostCard";
import { selectPublicPosts } from "@/features/post/post.selectors";

const PostsMain = () => {
  const posts = useAppSelector(selectPublicPosts);

  return (
    <section className="mx-auto w-full max-w-180 px-5 py-8">
      <FeedHeader />

      <CreatePost />

      <div className="mt-6 space-y-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostsMain;
