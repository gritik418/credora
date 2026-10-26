"use client";

import {
  BadgeCheck,
  Bookmark,
  ExternalLink,
  MessageCircle,
  MoreHorizontal,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { Post } from "@/features/post/post.interface";
import Image from "next/image";
import { getInitials } from "@/lib/string.utils";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const author = post.author;

  return (
    <article className="overflow-hidden rounded-2xl border border-credora-border">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-credora-gradient-primary text-sm font-bold text-white">
                {getInitials(author.name)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm capitalize font-semibold text-credora-text">
                  {author.name}
                </h3>

                <BadgeCheck
                  size={15}
                  className="fill-credora-primary text-credora-primary"
                />
              </div>

              <p className="text-xs text-credora-text-muted">
                @{author.username} · {new Date(post.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <button className="rounded-lg p-2 text-credora-text-muted transition hover:bg-white/4 hover:text-credora-text">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="mt-5">
          <p className="text-[15px] leading-7 text-credora-text-secondary">
            {post.content}
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-credora-border bg-credora-surface-elevated">
          <div className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-credora-primary-soft text-credora-primary">
              T
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-credora-text">Trackr</p>

              <p className="text-xs text-credora-text-muted">
                Project · SaaS Application
              </p>
            </div>

            <ExternalLink size={16} className="text-credora-text-muted" />
          </div>

          <div className="border-t border-credora-border px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {["NestJS", "PostgreSQL", "Redis", "Socket.IO"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-credora-primary-soft px-2.5 py-1 text-[11px] font-medium text-credora-primary-hover"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-b border-credora-border pb-4 text-xs text-credora-text-muted">
          <span>24 reactions</span>
          <span>6 comments</span>
        </div>

        <div className="flex items-center pt-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium text-credora-text-muted transition hover:bg-white/[0.035] hover:text-credora-primary-hover">
            <ThumbsUp size={16} />
            React
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium text-credora-text-muted transition hover:bg-white/[0.035] hover:text-credora-text">
            <MessageCircle size={16} />
            Comment
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium text-credora-text-muted transition hover:bg-white/[0.035] hover:text-credora-text">
            <Share2 size={16} />
            Share
          </button>

          <button className="rounded-lg p-2.5 text-credora-text-muted transition hover:bg-white/[0.035] hover:text-credora-text">
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
